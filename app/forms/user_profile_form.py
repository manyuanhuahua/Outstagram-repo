from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


class UserProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message='Username is required'), Length(max=40, message="Username is 40 characters or less")])
    profile_image = StringField('profile image', validators=[DataRequired(message='Profile image is required'), Length(max=500, message="Url of profile image is 500 characters or less")])
