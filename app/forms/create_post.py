from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post

class CreatePostForm(FlaskForm):
    description = StringField('description')
    image_url=StringField("image",validators=[DataRequired()])
