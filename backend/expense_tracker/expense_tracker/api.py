from ninja import NinjaAPI


api=NinjaAPI()
api.add_router('acount/','account.api.router')
api.add_router('budget/','budget.api.router')
api.add_router('expenses/','expenses.apis.router')
api.add_router('income/','income.apis.router')

