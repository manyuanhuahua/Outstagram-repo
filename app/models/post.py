from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
# from flask_login import UserMixin

post_likes = db.Table(
  "post_likes",
  db.Column("postId", db.Integer, db.ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True),
  db.Column("userId", db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
)

class Post(db.Model):
  __tablename__ = "posts"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
  description = db.Column(db.String(500))
  # imageUrl = db.Column(db.String(500))
  image_url = db.Column(db.String(500))
  # postedAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
  created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

  # user = relationship("User", back_populates="posts")
  user = db.relationship("User", back_populates="posts")

  # likes = relationship("Like", back_populates="posts")
  # comments = relationship("Comment", back_populates="posts")
  comments = db.relationship("Comment", back_populates="post", cascade="all, delete")

  post_like_users = db.relationship(
        "User",
        secondary=post_likes,
        back_populates="like_posts",
        passive_deletes=True
  )


  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "description": self.description,
      "imageUrl": self.image_url,
      "createdAt": self.created_at,
      "user": {
          "profileImage":self.user.profile_image,
          "username":self.user.username,
          'total_followers': self.user.followers.count(),
          'total_followings': self.user.following.count(),
          'total_posts': len(self.user.posts),
          'fullname': self.user.fullname
      },
      "totalComments": len(self.comments),
      "totalLikes": len(self.post_like_users),
    }
