from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from ..database import get_session
from ..models import Category, TransactionType

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[Category])
def list_categories(session: Session = Depends(get_session)):
    return session.exec(select(Category)).all()


@router.post("", response_model=Category, status_code=201)
def create_category(category: Category, session: Session = Depends(get_session)):
    if category.type not in {TransactionType.INCOME, TransactionType.EXPENSE}:
        raise HTTPException(status_code=422, detail="Category type must be income or expense")
    session.add(category)
    session.commit()
    session.refresh(category)
    return category
