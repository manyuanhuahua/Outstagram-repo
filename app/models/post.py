from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
# from flask_login import UserMixin

class Post(db.Model):
  __tablename__ = "posts"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
  description = db.Column(db.String(500))
  imageUrl = db.Column(db.String(500))
  postedAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

  user = relationship("User", back_populates="posts")
  likes = relationship("Like", back_populates="posts")
  comments = relationship("Comment", back_populates="posts")


  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "description": self.description,
      "imageUrl": self.imageUrl,
      "postedAt": self.postedAt,
      "username": self.user.username
    }
