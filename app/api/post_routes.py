from flask import Blueprint, jsonify, Response,request
# from flask_api import status
from flask_login import login_required, current_user
from app.models import Post,db, Comment
from app.forms.create_post import CreatePostForm
from app.forms.create_comment import CreateCommentForm
import json


post_routes = Blueprint('posts', __name__)

#get all posts
@post_routes.route('/all')
def get_all_posts_from_users():
    posts = Post.query.all()
    res = {}

    for post in posts:
        like_status=list(filter(lambda user: user.id==current_user.id, post.post_like_users))
        post_dict = post.to_dict()
        post_dict["likeStatus"] = 1 if len(like_status) > 0 else 0
        res[post.id] = post_dict

    return {"Posts": res}


#get all posts for the session user
@post_routes.route('/user/session')
@login_required
def get_all_posts():
    posts = Post.query.filter(Post.userId == current_user.id).all()
    res = {}

    for post in posts:
        like_status=list(filter(lambda user: user.id==current_user.id, post.post_like_users))
        post_dict = post.to_dict()
        post_dict["likeStatus"] = 1 if len(like_status) > 0 else 0
        res[post.id] = post_dict

    return {"Posts": res}

#get all posts from other user
@post_routes.route('/user/<int:id>')
@login_required
def get_others_posts(id):
    posts = Post.query.filter(Post.userId == id).all()
    res = {}
    for post in posts:
        like_status=list(filter(lambda user: user.id==current_user.id, post.post_like_users))
        post_dict = post.to_dict()
        post_dict["likeStatus"] = 1 if len(like_status) > 0 else 0
        res[post.id] = post_dict

    return {"Posts": res}


#get the detail from a selected post
@post_routes.route('/<int:postId>')
@login_required
def get_post_detail(postId):
    post = Post.query.get(postId)
    if not post:
        return {'errors': ['post can not be found']},404

    like_status=list(filter(lambda user: user.id==current_user.id, post.post_like_users))
    post_dict = post.to_dict()
    post_dict["likeStatus"] = 1 if len(like_status) > 0 else 0
    return post_dict


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

        res=post.to_dict()
        res["likeStatus"] = 0
        return res
    return  {'errors': ['image is required']}, 400


#update a post
@post_routes.route('/<int:postId>',methods=['PUT'])
@login_required
def update_post(postId):
    post = Post.query.get(postId)
    if post.userId != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = CreatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if post.image_url != form.data['image_url']:
        return {'errors': ['image cannot be changed']}, 400

    post.description=(form.data['description'])
    db.session.commit()
    like_status=list(filter(lambda user: user.id==current_user.id, post.post_like_users))
    res = post.to_dict()
    res["likeStatus"] = 1 if len(like_status) > 0 else 0

    return res

#delete a post
@post_routes.route('/<int:postId>',methods=['DELETE'])
@login_required
def delete_post(postId):
    post = Post.query.get(postId)
    if not post:
        return {'errors': ['post cannot be found']}, 400

    if post.userId != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    db.session.delete(post)
    db.session.commit()
    return {"message":"Successfully deleted"}


#get all comments for a specified post
@post_routes.route('/<int:postId>/comments')
@login_required
def get_all_comments(postId):
    post = Post.query.get(postId)
    if not post:
        return {'errors': ['post can not be found']}, 404
    comments = Comment.query.filter(Comment.postId == postId).all()
    res = {}
    for comment in comments:
        like_status = list(filter(lambda user: user.id==current_user.id, comment.comment_like_users))
        comment_dict = comment.to_dict()
        comment_dict["likeStatus"] = 1 if len(like_status) > 0 else 0
        res[comment.id] = comment_dict
    return {"Comments": res}


#Create a comment
@post_routes.route('/<int:postId>/comments/new', methods=["POST"])
@login_required
def create_comments(postId):
    post = Post.query.get(postId)
    if not post:
        return {'errors': ['post can not be found']}, 404

    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            content=form.data['content'],
        )
        comment.userId = current_user.id
        comment.postId = postId
        db.session.add(comment)
        db.session.commit()

        res = comment.to_dict()
        res["likeStatus"] = 0
        return res
    return  {'errors': ['content is required']}, 400


#Update a comment
@post_routes.route('/<int:postId>/comments/<int:commentId>', methods=["PUT"])
@login_required
def update_comments(postId, commentId):
    post = Post.query.get(postId)
    if not post:
        return {'errors': ['post can not be found']}, 404

    comment = Comment.query.get(commentId)
    if not comment:
        return {'errors': ['comment can not be found']}, 404

    if comment.userId != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.content = form.data["content"]
        db.session.commit()
        like_status = list(filter(lambda user: user.id==current_user.id, comment.comment_like_users))
        res = comment.to_dict()
        res["likeStatus"] = 1 if len(like_status) > 0 else 0
        # res = {
        #     "id": comment.id,
        #     "userId": comment.userId,
        #     "content": comment.content,
        #     "createdAt": comment.created_at,
        #     "user": {
        #         "profileImage":comment.user.profile_image,
        #         "username":comment.user.username
        #     },
        #     "totalLikes":len(comment.comment_like_users),
        #     "likeStatus": True if len(like_status) > 0 else False
        # }
        return res
    return  {'errors': ['content is required']}, 400



#delete a comment
@post_routes.route('/<int:postId>/comments/<int:commentId>',methods=['DELETE'])
@login_required
def delete_comment(postId, commentId):
    post = Post.query.get(postId)
    if not post:
        return {'errors': ['post cannot be found']}, 400

    comment = Comment.query.get(commentId)
    if not comment:
        return {'errors': ['comment cannot be found']}, 400

    if comment.userId != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    db.session.delete(comment)
    db.session.commit()
    return {"message":"Successfully deleted"}


#Get all likes of specified post
@post_routes.route('/<int:postId>/likes')
@login_required
def get_post_likes(postId):
    post = Post.query.get(postId)
    if not post:
        return {'errors': ['post cannot be found']}, 400
    like_users = list(post.post_like_users)
    res = {}
    for user in like_users:
        res[user.id] = {
            "username": user.username,
            "fullname": user.fullname,
            "profileImage": user.profile_image
        }

    return {"like_users": res}


#update the like status for a specified post
@post_routes.route('/<int:postId>/likes', methods=["PUT"])
@login_required
def update_post_likes(postId):

    post = Post.query.get(postId)
    if not post:
        return {'errors': ['post cannot be found']}, 400
    like_users = list(post.post_like_users)
    current_user_like = list(filter(lambda user: user.id == current_user.id, like_users))
    if len(current_user_like) == 0:
        post.post_like_users.append(current_user)
        db.session.commit()
    else:
        post.post_like_users.remove(current_user)
        db.session.commit()


    updated_post = Post.query.get(postId)
    updated_like_users = list(updated_post.post_like_users)
    updated_current_user_like = list(filter(lambda user: user.id == current_user.id, updated_like_users))
    current_user_like_status = 1 if len(updated_current_user_like) else 0
    return {"postId": postId, "likeStatus": current_user_like_status, "totalLikes": len(updated_post.post_like_users)}

#Get all likes of specified comment
@post_routes.route('/<int:postId>/comments/<int:commentId>/likes')
@login_required
def get_comment_likes(postId,commentId):
    post = Post.query.get(postId)
    if not post:
        return {'errors': ['post cannot be found']}, 400
    comment = Comment.query.get(commentId)
    if not comment:
        return {'errors': ['comment cannot be found']}, 400
    res = {}
    for user in comment.comment_like_users:
        res[user.id] = {
            "username": user.username,
            "fullname": user.fullname,
            "profileImage": user.profile_image
        }

    return {"like_users": res}

#update the like status for a specified comment
@post_routes.route('/<int:postId>/comments/<int:commentId>/likes', methods=["PUT"])
@login_required
def update_comment_likes(postId,commentId):

    post = Post.query.get(postId)
    if not post:
        return {'errors': ['post cannot be found']}, 400
    comment = Comment.query.get(commentId)

    if not comment:
        return {'errors': ['comment cannot be found']}, 400

    like_users = comment.comment_like_users
    current_user_like = list(filter(lambda user: user.id == current_user.id, like_users))
    if len(current_user_like) == 0:
        comment.comment_like_users.append(current_user)
        print("comment.comment_like_users", comment.comment_like_users)

        db.session.commit()
    else:
        comment.comment_like_users.remove(current_user)
        db.session.commit()


    updated_comment = Comment.query.get(commentId)
    updated_like_users = updated_comment.comment_like_users
    updated_current_user_like = list(filter(lambda user: user.id == current_user.id, updated_like_users))
    current_user_like_status = 1 if len(updated_current_user_like) else 0
    return {
        "commentId":commentId,
        "postId": postId,
        "likeStatus": current_user_like_status,
        "totalLikes": len(updated_comment.comment_like_users)
        }
