from app.models import db, Post, User


def seed_posts():
    post1 = Post(
        userId = 0,
        description = "This is my first post",
        image_url = "https://res.cloudinary.com/zhihongliu/image/upload/v1658940428/cld-sample-2.jpg",
        post_like_users = [User.query.get(0),User.query.get(2) , User.query.get(3)]
    )

    post2 = Post(
        userId = 0,
        description = "This is my second post",
        image_url = "https://res.cloudinary.com/zhihongliu/image/upload/v1658940428/cld-sample-2.jpg",
        post_like_users = [User.query.get(5),User.query.get(8) , User.query.get(9)]
    )

    post3 = Post(
        userId = 0,
        description = "This is my third post",
        image_url = "https://res.cloudinary.com/zhihongliu/image/upload/v1658940428/cld-sample-2.jpg",
        post_like_users = [User.query.get(4),User.query.get(10) , User.query.get(12)]
    )

    post4 = Post(
        userId = 1,
        description = "This is my first post",
        image_url = "https://res.cloudinary.com/zhihongliu/image/upload/v1658940428/cld-sample-2.jpg",
        post_like_users = [User.query.get(0),User.query.get(2) , User.query.get(4)]
    )

    post5 = Post(
        userId = 1,
        description = "This is my second post",
        image_url = "https://res.cloudinary.com/zhihongliu/image/upload/v1658940428/cld-sample-2.jpg",
        post_like_users = [User.query.get(6),User.query.get(7) , User.query.get(8)]
    )

    post6 = Post(
        userId = 2,
        description = "This is my first post",
        image_url = "https://res.cloudinary.com/zhihongliu/image/upload/v1658940428/cld-sample-2.jpg",
        post_like_users = [User.query.get(11),User.query.get(12) , User.query.get(14)]
    )

    post7 = Post(
        userId = 3,
        description = "This is my first post",
        image_url = "https://res.cloudinary.com/zhihongliu/image/upload/v1658940428/cld-sample-2.jpg",
        post_like_users = [User.query.get(6),User.query.get(9) , User.query.get(15)]
    )

    post8 = Post(
        userId = 4,
        description = "This is my first post",
        image_url = "https://res.cloudinary.com/zhihongliu/image/upload/v1658940428/cld-sample-2.jpg",
        post_like_users = [User.query.get(8),User.query.get(9) , User.query.get(10)]
    )

    post9 = Post(
        userId = 5,
        description = "This is my first post",
        image_url = "https://res.cloudinary.com/zhihongliu/image/upload/v1658940428/cld-sample-2.jpg",
        post_like_users = [User.query.get(4),User.query.get(15) , User.query.get(14)]
    )

    post10 = Post(
        userId = 6,
        description = "This is my first post",
        image_url = "https://res.cloudinary.com/zhihongliu/image/upload/v1658940428/cld-sample-2.jpg",
        post_like_users = [User.query.get(1),User.query.get(7) , User.query.get(9)]
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)

    db.session.commit()




def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
