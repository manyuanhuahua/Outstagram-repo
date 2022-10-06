from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import UserProfileForm
from .auth_routes import validation_errors_to_error_messages

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


@user_routes.route('/<int:user_id>/edit', methods=['PUT'])
@login_required
def edit_user_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return {'errors': ['User can not be found']},404

    if user_id != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = UserProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user.username = form.data['username']
        user.profile_image = form.data['profile_image']

        db.session.commit()
        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
