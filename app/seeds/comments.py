from app.models import db, Post, User, Comment


def seed_comments():
    comment1 = Comment(
        userId = 1,
        postId = 1,
        content = "This is good.",
        comment_like_users = [User.query.get(1), User.query.get(3), User.query.get(6)]
    )

    comment2 = Comment(
        userId = 2,
        postId = 1,
        content = "This is good.",
        comment_like_users = [User.query.get(3), User.query.get(5), User.query.get(8)]
    )

    comment3 = Comment(
        userId = 2,
        postId = 2,
        content = "This is good.",
        comment_like_users = []
    )

    comment4 = Comment(
        userId = 16,
        postId = 3,
        content = "This is good.",
        comment_like_users = [User.query.get(6), User.query.get(10), User.query.get(12)]
    )

    comment5 = Comment(
        userId = 1,
        postId = 4,
        content = "This is good.",
        comment_like_users = [User.query.get(5), User.query.get(10), User.query.get(14)]
    )

    comment6 = Comment(
        userId = 13,
        postId = 5,
        content = "This is good.",
        comment_like_users = [User.query.get(6), User.query.get(7), User.query.get(10)]
    )

    comment7 = Comment(
        userId = 10,
        postId = 6,
        content = "This is good.",
        comment_like_users = [User.query.get(2), User.query.get(4), User.query.get(9)]
    )

    comment8 = Comment(
        userId = 7,
        postId = 7,
        content = "This is good.",
        comment_like_users = [User.query.get(4), User.query.get(10), User.query.get(11)]
    )

    comment9 = Comment(
        userId = 11,
        postId = 8,
        content = "This is good.",
        comment_like_users = [User.query.get(5), User.query.get(6), User.query.get(7)]
    )

    comment10 = Comment(
        userId = 12,
        postId = 1,
        content = "This is good.",
        comment_like_users = [User.query.get(4), User.query.get(8), User.query.get(10)]
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
