from flask import Blueprint, jsonify, Response,request
# from flask_api import status
from flask_login import login_required, current_user
from app.models import Post,db
from app.forms.create_post import CreatePostForm


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

#get all posts from other user
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


#get the detail from a selected post
@post_routes.route('/<int:id>')
@login_required
def get_post_detail(id):
    post = Post.query.get(id)
    if not post:

        return {'errors': ['post can not be found']},404

    # res = {}
    like_status=list(filter(lambda user: user.id==current_user.id, post.post_like_users))
    res={
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
    return res


#create a post
@post_routes.route('/new',methods=['POST'])
@login_required
def create_post():
    form = CreatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            description=form.data['description'],
            image_url=form.data['image_url']
        )
        post.userId = current_user.id
        db.session.add(post)
        db.session.commit()
        res={
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
            "like_status": False
        }
        return res
    return  {'errors': ['image is required']}, 400

#update a post
@post_routes.route('/<int:postId>',methods=['POST'])
@login_required
def update_post(postId):
    form = CreatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post = Post(
        description=form.data['description'],
        image_url=form.data['image_url']
    )
        post.userId = current_user.id
        db.session.add(post)
        db.session.commit()
        res={
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
            "like_status": False
        }
        return res



    return  {'errors': ['image is required']}, 400
