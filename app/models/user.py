from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
# from sqlalchemy ForeignKey
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from .post import Post, post_likes
from .comments import comment_likes

follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    fullname = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(500))
    bio = db.Column(db.String(300))

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

    like_posts = db.relationship(
        "Post",
        secondary=post_likes,
        back_populates="post_like_users"
    )

    like_comments = db.relationship(
        "Comment",
        secondary=comment_likes,
        back_populates="comment_like_users"
    )

    # posts = relationship("Post", back_populates="user", foreign_keys="Post.userId")
    posts = relationship("Post", back_populates="user", cascade="all, delete")
    # likes = relationship("Like", back_populates="user")
    # comments = relationship("Comment", back_populates="user")
    comments = relationship("Comment", back_populates="user", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
