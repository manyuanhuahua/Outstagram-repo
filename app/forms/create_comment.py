from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Comment

class CreateCommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
