import os
from dotenv import load_dotenv
from ninja import Router
from .schema import UserSchema,CreateUserSchema,LogineUserSchema
from .models import CustomUser
from ninja.errors import AuthenticationError
import jwt
import datetime 

router =Router()

@router.get('/users',response =list[UserSchema])
def get_users(request):
    return CustomUser.objects.all()

@router.post('/register',response=UserSchema)
def register_user(request,data:CreateUserSchema):
    email=data.email
    first_name=data.first_name
    last_name=data.last_name
    password=data.password

    print(password)

    user =CustomUser.objects.create(email=email,first_name=first_name,last_name=last_name)

    user.set_password(password)

    user.save()

    return user

@router.post('/login')
def login_user(request,data:LogineUserSchema):
    load_dotenv()

    key=os.getenv("SECRET_KEY")
    time=int(os.getenv("TOKEN_EXPIRATION_TIME"))
    email=data.email
    password=data.password

    user =CustomUser.objects.filter(email=email).first()

    if user is None:
        raise AuthenticationError("No user with this email")
    
    if not user.check_password(password):
        raise AuthenticationError("invalid password")
    
    payload ={
        "id" :str(user.id),
        "exp":datetime.datetime.utcnow()+datetime.timedelta(minutes=time),
        "iat":datetime.datetime.utcnow()
    }

    token =jwt.encode(payload=payload,key=key,algorithm='HS256')

    return{"jwt":token}
    
