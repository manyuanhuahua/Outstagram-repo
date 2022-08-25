# from crypt import methods
from curses.ascii import US
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db
import json


follow_routes = Blueprint('follows', __name__)

# @follow_routes.route('/follow/<int:id>')
# def follow(id):

#     user = User.query.filter_by(id=id).first()
#     current_user_query = User.query.filter_by(id=current_user.id).first()
#     user.followers.append(current_user_query)
#     db.session.commit()
#     return user.to_dict()


# @follow_routes.route('/unfollow/<int:id>')
# def unfollow(id):
#     user = User.query.filter_by(id=id).first()
#     current_user_query = User.query.filter_by(id=current_user.id).first()
#     user.followers.remove(current_user_query)
#     db.session.commit()
#     return user.to_dict()

# @post_routes.route('/<int:postId>/likes', methods=["PUT"])
# @login_required
# def update_post_likes(postId):

#     post = Post.query.get(postId)
#     if not post:
#         return {'errors': ['post cannot be found']}, 400
#     like_users = list(post.post_like_users)
#     current_user_like = list(filter(lambda user: user.id == current_user.id, like_users))
#     if len(current_user_like) == 0:
#         post.post_like_users.append(current_user)
#         db.session.commit()
#     else:
#         post.post_like_users.remove(current_user)
#         db.session.commit()


#     updated_post = Post.query.get(postId)
#     updated_like_users = list(updated_post.post_like_users)
#     updated_current_user_like = list(filter(lambda user: user.id == current_user.id, updated_like_users))
#     current_user_like_status = 1 if len(updated_current_user_like) else 0
#     return {"postId": postId, "likeStatus": current_user_like_status, "totalLikes": len(updated_post.post_like_users)}



@follow_routes.route('/following/<int:userId>', methods=['PUT'])
def update_follow_status(userId):

    user = User.query.get(userId)
    if not user:
        return {'errors': ['user cannot be found']}, 400

    follow_users = list(user.followers)
    current_user_follower = list(filter(lambda user: user.id == current_user.id, follow_users))
    if len(current_user_follower) == 0:
        user.followers.append(current_user)
        db.session.commit()
    else:
        user.followers.remove(current_user)
        db.session.commit()

    updated_user = User.query.get(userId)
    updated_following = list(updated_user.followers)
    updated_current_user_follow = list(filter(lambda user: user.id == current_user.id, updated_following))
    current_user_follow_status = 1 if len(updated_current_user_follow) else 0
    user_to_dict = updated_user.to_dict()
    return {'userId': userId, 'follow_status': current_user_follow_status, 'totalFollows': updated_user.followers.count()}
