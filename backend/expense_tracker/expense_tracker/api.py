from ninja import NinjaAPI


api = NinjaAPI()
api.add_router("account/", "account.api.router")
api.add_router("budget/", "budget.api.router")
api.add_router("expenses/", "expenses.apis.router")
api.add_router("income/", "income.apis.router")
api.add_router("category", "management.apis.router")
