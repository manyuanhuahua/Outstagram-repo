from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    following = list(user.followers)
    follow_status = list(filter(lambda user: user.id==current_user.id, following))
    current_follow_status = 1 if len(follow_status) else 0
    user_dict = user.to_dict()
    user_dict['follow_status'] = current_follow_status
    return user_dict
