
# from flask_login import login_required, current_user
# from app.models import Comment, db, Post
# from .post_routes import post_routes


#get all comments for a specified post
# @post_routes.route('/<int:postId>/comments')
# @login_required
# def get_all_comments(postId):
#     print("in comment route")
#     post = Post.query.get(postId)
#     if not post:
#         return {'errors': ['post can not be found']}, 404
#     comments = Comment.query.filter(Comment.postId == postId).all()
#     res = {}
#     for comment in comments:
#         like_status = list(list(filter(lambda user: user.id==current_user.id, comment.comment_like_users)))
#         res[comment.id] = {
#             "id": comment.id,
#             "userId": comment.userId,
#             "postId": comment.postId,
#             "user": {
#                 "profileImage": comment.user.profile_image,
#                 "username": comment.user.username
#             },
#             "content": comment.content,
#             "likeStatus": True if len(like_status) > 0 else False,
#             "totalLikes": len(comment.comment_like_users),
#             "createdAt": comment.created_at
#         }
#     return {"Comments": res}
