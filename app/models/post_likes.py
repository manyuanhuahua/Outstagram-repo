from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

# from flask_login import UserMixin

class Like(db.Model):
  __tablename__ = "likes"

  id = db.Column(db.Integer, primary_key=True)
  postId = db.Column(db.Integer, ForeignKey("posts.id"), nullable=False)
  userId = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)


  user = relationship("User", back_populates="likes")
  posts = relationship("Post", back_populates="likes")

  def to_dict(self):
    return {
      "id": self.id,
      "postId": self.postId,
      "userId": self.userId,
    }
