from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', fullname="Demo User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Demo User's bio", password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', fullname="Marnie User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Marnie User's bio", password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', fullname="Bobbie User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Bobbie User's bio", password='password')
    Emma = User(
        username='Emma', email='Emma@aa.io', fullname="Emma User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Emma User's bio", password='password')
    Eva = User(
        username='Eva', email='Eva@aa.io', fullname="Eva User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Eva User's bio", password='password')
    Leo = User(
        username='Leo', email='Leo@aa.io', fullname="Leo User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Leo User's bio", password='password')
    Luca = User(
        username='Luca', email='Luca@aa.io', fullname="Luca User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Luca User's bio", password='password')
    Lily = User(
        username='Lily', email='Lily@aa.io', fullname="Lily User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Lily User's bio", password='password')
    Jack = User(
        username='Jack', email='Jack@aa.io', fullname="Jack User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Jack User's bio", password='password')
    Nora = User(
        username='Nora', email='Nora@aa.io', fullname="Nora User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Nora User's bio", password='password')
    Theo = User(
        username='Theo', email='Theo@aa.io', fullname="Theo User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Theo User's bio", password='password')
    David = User(
        username='David', email='David@aa.io', fullname="David User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="David User's bio", password='password')
    Leila = User(
        username='Leila', email='Leila@aa.io', fullname="Leila User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Leila User's bio", password='password')
    Elias = User(
        username='Elias', email='Elias@aa.io', fullname="Elias User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Elias User's bio", password='password')
    Jacob = User(
        username='Jacob', email='Jacob@aa.io', fullname="Jacob User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Jacob User's bio", password='password')
    Luke = User(
        username='Luke', email='Luke@aa.io', fullname="Luke User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Luke User's bio", password='password')



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(Emma)
    db.session.add(Eva)
    db.session.add(Leo)
    db.session.add(Luca)
    db.session.add(Lily)
    db.session.add(Jack)
    db.session.add(Nora)
    db.session.add(Theo)
    db.session.add(David)
    db.session.add(Leila)
    db.session.add(Elias)
    db.session.add(Jacob)
    db.session.add(Luke)
    demo.followers = [marnie, bobbie, Emma]
    marnie.followers = [Eva, Jack, David, Elias]
    bobbie.followers = [Emma, Eva, Elias]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
