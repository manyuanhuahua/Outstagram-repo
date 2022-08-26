from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
# from flask_login import UserMixin

comment_likes = db.Table(
  "comment_likes",
  db.Column("commentId", db.Integer, db.ForeignKey("comments.id", ondelete="CASCADE"), primary_key=True),
  db.Column("userId", db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
)

class Comment(db.Model):
  __tablename__ = "comments"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
  postId = db.Column(db.Integer, db.ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
  content = db.Column(db.String(500))
  # postedAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
  created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

  user = relationship("User", back_populates="comments")
  post = relationship("Post", back_populates="comments")

  comment_like_users = db.relationship(
        "User",
        secondary=comment_likes,
        back_populates="like_comments",
        passive_deletes=True
  )

  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "postId": self.postId,
      "content": self.content,
      "createdAt": self.created_at,
      "user": {
                "profileImage": self.user.profile_image,
                "username": self.user.username
            },
      "totalLikes": len(self.comment_like_users)
    }
