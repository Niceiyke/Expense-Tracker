from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlmodel import Session, select

from ..database import get_session
from ..models import Category, Summary, Transaction, TransactionCreate, TransactionType

router = APIRouter(prefix="/transactions", tags=["transactions"])


def _get_category(session: Session, category_id: int | None) -> Category | None:
    if category_id is None:
        return None
    category = session.get(Category, category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.get("", response_model=list[Transaction])
def list_transactions(session: Session = Depends(get_session)):
    statement = select(Transaction).order_by(Transaction.occurred_at.desc()).limit(50)
    return session.exec(statement).all()


@router.post("", response_model=Transaction, status_code=201)
def create_transaction(payload: TransactionCreate, session: Session = Depends(get_session)):
    _get_category(session, payload.category_id)
    transaction = Transaction(**payload.dict())
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction


@router.get("/summary", response_model=Summary)
def get_summary(session: Session = Depends(get_session)):
    income_total = session.exec(
        select(func.coalesce(func.sum(Transaction.amount), 0)).where(Transaction.type == TransactionType.INCOME)
    ).one()
    expense_total = session.exec(
        select(func.coalesce(func.sum(Transaction.amount), 0)).where(Transaction.type == TransactionType.EXPENSE)
    ).one()
    balance = float(income_total or 0) - float(expense_total or 0)
    return Summary(
        balance=balance,
        total_income=float(income_total or 0),
        total_expenses=float(expense_total or 0),
    )


@router.get("/daily", response_model=list[dict])
def daily_flow(session: Session = Depends(get_session)):
    statement = (
        select(
            func.date(Transaction.occurred_at).label("date"),
            func.sum(func.case((Transaction.type == TransactionType.INCOME, Transaction.amount), else_=0)).label("income"),
            func.sum(func.case((Transaction.type == TransactionType.EXPENSE, Transaction.amount), else_=0)).label("expenses"),
        )
        .group_by(func.date(Transaction.occurred_at))
        .order_by(func.date(Transaction.occurred_at).desc())
        .limit(14)
    )
    rows = session.exec(statement).all()
    return [
        {"date": datetime.strptime(str(row.date), "%Y-%m-%d").isoformat(), "income": float(row.income or 0), "expenses": float(row.expenses or 0)}
        for row in rows
    ]
