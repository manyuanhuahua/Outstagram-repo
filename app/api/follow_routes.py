from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db
import json


follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/follow/<int:id>')
def follow(id):

    user = User.query.filter_by(id=id).first()
    current_user_query = User.query.filter_by(id=current_user.id).first()
    user.followers.append(current_user_query)
    db.session.commit()
    return user.to_dict()


@follow_routes.route('/unfollow/<int:id>')
def unfollow(id):
    user = User.query.filter_by(id=id).first()
    current_user_query = User.query.filter_by(id=current_user.id).first()
    user.followers.remove(current_user_query)
    db.session.commit()
    return user.to_dict()
