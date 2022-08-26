from app.models import db, Post, User


def seed_posts():
    post1 = Post(
        userId = 8,
        description = "First Upload!!",
        image_url = "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
        post_like_users = [User.query.get(1),User.query.get(2) , User.query.get(3)]
    )

    post2 = Post(
        userId = 3,
        description = "I love trees",
        image_url = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        post_like_users = [User.query.get(5),User.query.get(8) , User.query.get(9)]
    )

    post3 = Post(
        userId = 5,
        description = "Take me hoooome country roaaaaad",
        image_url = "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg",
        post_like_users = [User.query.get(4),User.query.get(10) , User.query.get(12)]
    )

    post4 = Post(
        userId = 6,
        description = "Electric avenue",
        image_url = "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__340.jpg",
        post_like_users = [User.query.get(1),User.query.get(2) , User.query.get(4)]
    )

    post5 = Post(
        userId = 2,
        description = "My fav flowers",
        image_url = "https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175__340.jpg",
        post_like_users = [User.query.get(6),User.query.get(7) , User.query.get(8)]
    )

    post6 = Post(
        userId = 3,
        description = "This is arguably the best time of the year",
        image_url = "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg",
        post_like_users = [User.query.get(11),User.query.get(12) , User.query.get(14)]
    )

    post7 = Post(
        userId = 3,
        description = "Magic shrooms and butterflies",
        image_url = "https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567__340.jpg",
        post_like_users = [User.query.get(6),User.query.get(9) , User.query.get(16)]
    )

    post8 = Post(
        userId = 4,
        description = "The lighting thoooo like what",
        image_url = "https://cdn.pixabay.com/photo/2018/04/16/16/16/sunset-3325080__340.jpg",
        post_like_users = [User.query.get(8),User.query.get(9) , User.query.get(10)]
    )

    post9 = Post(
        userId = 1,
        description = "Hoo am I",
        image_url = "https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267__340.jpg",
        post_like_users = [User.query.get(4),User.query.get(15) , User.query.get(14)]
    )

    post10 = Post(
        userId = 1,
        description = "Uh, wheres my boat",
        image_url = "https://cdn.pixabay.com/photo/2014/08/01/00/08/pier-407252__340.jpg",
        post_like_users = [User.query.get(1),User.query.get(7) , User.query.get(9)]
    )

    post11 = Post(
        userId = 9,
        description = "I was bit by 12 mosquitos to get this shot",
        image_url = "https://cdn.pixabay.com/photo/2016/09/21/04/46/barley-field-1684052__340.jpg",
        post_like_users = [User.query.get(5),User.query.get(7) , User.query.get(15)]
    )
    post12 = Post(
        userId = 14,
        description = "Bought an island today #richboi",
        image_url = "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072__340.jpg",
        post_like_users = [User.query.get(4),User.query.get(6) , User.query.get(2)]
    )
    post13 = Post(
        userId = 11,
        description = "The contrast here is so cool",
        image_url = "https://cdn.pixabay.com/photo/2013/04/03/21/25/flower-100263__340.jpg",
        post_like_users = [User.query.get(5),User.query.get(8) , User.query.get(12)]
    )
    post14 = Post(
        userId = 12,
        description = "Sunday stroll in my pirate ship",
        image_url = "https://cdn.pixabay.com/photo/2016/05/02/10/13/ship-1366926__340.jpg",
        post_like_users = [User.query.get(4),User.query.get(12) , User.query.get(6)]
    )
    post15 = Post(
        userId = 13,
        description = "My pet elephant is getting so big",
        image_url = "https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636__340.jpg",
        post_like_users = [User.query.get(3),User.query.get(16) , User.query.get(1)]
    )
    post16 = Post(
        userId = 15,
        description = "You ever seen a parrot dab?",
        image_url = "https://cdn.pixabay.com/photo/2018/08/12/16/59/parrot-3601194__340.jpg",
        post_like_users = [User.query.get(2),User.query.get(1) , User.query.get(9)]
    )
    post17 = Post(
        userId = 9,
        description = "Is putting hearts in leaves bad for the environment? You be the",
        image_url = "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746__340.jpg",
        post_like_users = [User.query.get(1),User.query.get(3) , User.query.get(2)]
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
    db.session.add(post11)
    db.session.add(post12)
    db.session.add(post13)
    db.session.add(post14)
    db.session.add(post15)
    db.session.add(post16)
    db.session.add(post17)


    db.session.commit()




def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
