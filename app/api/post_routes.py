from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Post


post_routes = Blueprint('posts', __name__)

#get all posts for the session user
@post_routes.route('/user/session')
@login_required
def get_all_posts():
    posts = Post.query.filter(Post.userId == current_user.id).all()
    res = {}

    for post in posts:
        like_status=list(filter(lambda user: user.id==current_user.id, post.post_like_users))
        res[post.id]={
            "id": post.id,
            "user_id": post.userId,
            "description": post.description,
            "image_url": post.image_url,
            "created_at": post.created_at,
            "user": {
                "profile_image":post.user.profile_image,
                "username":post.user.username,
            },
            "total_comments": len(post.comments),
            "total_likes":len(post.post_like_users),
            "like_status":True if len(like_status) > 0 else False,
        }
    return {"Posts": res}

@post_routes.route('/user/<int:id>')
@login_required
def get_others_posts(id):
    posts = Post.query.filter(Post.userId == id).all()
    res = {}
    for post in posts:
        like_status=list(filter(lambda user: user.id==current_user.id, post.post_like_users))
        res[post.id]={
            "id": post.id,
            "user_id": post.userId,
            "description": post.description,
            "image_url": post.image_url,
            "created_at": post.created_at,
            "user": {
                "profile_image":post.user.profile_image,
                "username":post.user.username
            },
            "total_comments": len(post.comments),
            "total_likes":len(post.post_like_users),
            "like_status":True if len(like_status) > 0 else False
        }
    return {"Posts": res}
