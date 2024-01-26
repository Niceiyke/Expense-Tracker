from ninja import ModelSchema,Schema
from .models import CustomUser


class UserSchema(ModelSchema):
    class Meta:
        model=CustomUser
        fields =('id','email','first_name','last_name')

class CreateUserSchema(Schema):
    email:str
    first_name:str
    last_name:str
    password:str

class LogineUserSchema(Schema):
    email:str
    password:str

