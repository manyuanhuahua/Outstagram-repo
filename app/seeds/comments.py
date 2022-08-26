from app.models import db, Post, User, Comment


def seed_comments():
    comment1 = Comment(
        userId = 1,
        postId = 1,
        content = "I love this picture!!",
        comment_like_users = [User.query.get(1), User.query.get(3), User.query.get(6)]
    )

    comment2 = Comment(
        userId = 2,
        postId = 1,
        content = "What are thoooseeeee",
        comment_like_users = [User.query.get(3), User.query.get(5), User.query.get(8)]
    )

    comment3 = Comment(
        userId = 2,
        postId = 2,
        content = "Cool shot!",
        comment_like_users = []
    )

    comment4 = Comment(
        userId = 16,
        postId = 3,
        content = "Ratio",
        comment_like_users = [User.query.get(1),User.query.get(2),User.query.get(3),User.query.get(4),User.query.get(5),User.query.get(6),User.query.get(7),User.query.get(8),User.query.get(9), User.query.get(10), User.query.get(11), User.query.get(12)]
    )

    comment5 = Comment(
        userId = 1,
        postId = 4,
        content = "F4F",
        comment_like_users = [User.query.get(5), User.query.get(10), User.query.get(14)]
    )

    comment6 = Comment(
        userId = 13,
        postId = 5,
        content = "OOF",
        comment_like_users = [User.query.get(6), User.query.get(7), User.query.get(10)]
    )

    comment7 = Comment(
        userId = 10,
        postId = 6,
        content = "Yoooo lets meet up today",
        comment_like_users = [User.query.get(2), User.query.get(4), User.query.get(9)]
    )

    comment8 = Comment(
        userId = 7,
        postId = 7,
        content = "I am the best commenter in the world",
        comment_like_users = [User.query.get(4), User.query.get(10), User.query.get(11)]
    )

    comment9 = Comment(
        userId = 11,
        postId = 8,
        content = "Where is this?",
        comment_like_users = [User.query.get(5), User.query.get(6), User.query.get(7)]
    )

    comment10 = Comment(
        userId = 12,
        postId = 1,
        content = "This is bad.",
        comment_like_users = [User.query.get(4), User.query.get(8), User.query.get(10)]
    )
    comment11 = Comment(
        userId = 1,
        postId = 7,
        content = "So Cool.",
        comment_like_users = [User.query.get(4), User.query.get(8), User.query.get(10)]
    )

    comment12 = Comment(
        userId = 7,
        postId = 9,
        content = "So Cool.",
        comment_like_users = [User.query.get(4), User.query.get(8), User.query.get(10)]
    )

    comment13 = Comment(
        userId = 9,
        postId = 9,
        content = "Hi",
        comment_like_users = [User.query.get(4), User.query.get(8), User.query.get(10)]
    )

    comment14 = Comment(
        userId = 12,
        postId = 10,
        content = "So Cool.",
        comment_like_users = [User.query.get(4), User.query.get(8), User.query.get(10)]
    )

    comment15 = Comment(
        userId = 8,
        postId = 10,
        content = "Testing...",
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
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)


    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
