from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
# from flask_login import UserMixin

class Comment(db.Model):
  __tablename__ = "comments"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
  postId = db.Column(db.Integer)
  content = db.Column(db.String(500))
  postedAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

  user = relationship("User", back_populates="comments")
  posts = relationship("Post", back_populates="comments")

  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "postId": self.postId,
      "content": self.content,
      "postedAt": self.postedAt
    }
