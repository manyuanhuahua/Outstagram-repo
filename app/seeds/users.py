from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', fullname="Demo User", profile_image="https://res.cloudinary.com/zhihongliu/image/upload/v1658940427/cld-sample.jpg", bio="Like to take pictures", password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', fullname="Marnie User", profile_image="https://4.bp.blogspot.com/--Jb5xRQqOBQ/VNUUjduewAI/AAAAAAAAItM/CvSghXaXDG4/s1600/Awesome-Facebook-Profile-Pictures-for-Girls-2015%2B(6).jpg", bio="I like to party on the weekends", password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', fullname="Bobbie User", profile_image="https://image.shutterstock.com/mosaic_250/2780032/1770074666/stock-photo-head-shot-of-african-self-assured-executive-manager-portrait-successful-staff-member-company-1770074666.jpg", bio="I like to go on hikes", password='password')
    Emma = User(
        username='Emma', email='Emma@aa.io', fullname="Emma User", profile_image="https://cdn.pixabay.com/photo/2016/11/22/21/42/woman-1850703__340.jpg", bio="I enjoy time with family and friends", password='password')
    Eva = User(
        username='Eva', email='Eva@aa.io', fullname="Eva User", profile_image="https://s.itl.cat/pngfile/s/83-832842_unique-dps-for-fb-with-quotes-visit-us.jpg", bio="I just got this account so trying to learn more about it", password='password')
    Leo = User(
        username='Leo', email='Leo@aa.io', fullname="Leo User", profile_image="https://www.teahub.io/photos/full/364-3646944_cool-profile-pictures-hd-pic-hwb37635-cat-with.jpg", bio="Enjoy reading as a past time and watching movies", password='password')
    Luca = User(
        username='Luca', email='Luca@aa.io', fullname="Luca User", profile_image="https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562__340.jpg", bio="I have 2 dogs I love very much", password='password')
    Lily = User(
        username='Lily', email='Lily@aa.io', fullname="Lily User", profile_image="https://cdn.pixabay.com/photo/2016/04/21/22/29/girl-1344646__340.jpg", bio="Aspiring to be a software engineer in the coming years", password='password')
    Jack = User(
        username='Jack', email='Jack@aa.io', fullname="Jack User", profile_image="https://images.unsplash.com/photo-1510917065317-aa26965fe730?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80", bio="Like to take photos of nature", password='password')
    Nora = User(
        username='Nora', email='Nora@aa.io', fullname="Nora User", profile_image="https://i.pinimg.com/originals/69/e9/3b/69e93bc04784b616a8eabde78d5bcb40.jpg", bio="Enjoy walks on the beach", password='password')
    Theo = User(
        username='Theo', email='Theo@aa.io', fullname="Theo User", profile_image="https://i.pinimg.com/736x/9a/68/7c/9a687c559de12b8d5df94e98508d5469.jpg", bio="Im on my phone 24/7", password='password')
    David = User(
        username='David', email='David@aa.io', fullname="David User", profile_image="https://i.pinimg.com/736x/68/ff/f1/68fff1b8797527499b7de8e78c774b14.jpg", bio="I am studying at lewis University", password='password')
    Leila = User(
        username='Leila', email='Leila@aa.io', fullname="Leila User", profile_image="https://1.bp.blogspot.com/-bGRGaZpDrYU/YTdYgCA0Z0I/AAAAAAAAGuc/PlWykAd3NlE3lMEldEi2S9kcXyTTeswzQCLcBGAsYHQ/s500/2d2ab8e714ae13c8b7fe280095f10e44.jpg", bio="Like to play basketball and soccer", password='password')
    Elias = User(
        username='Elias', email='Elias@aa.io', fullname="Elias User", profile_image="https://i.pinimg.com/550x/bd/80/b1/bd80b1e1bc40234c3527d6b70c899484.jpg", bio="New to the site", password='password')
    Jacob = User(
        username='Jacob', email='Jacob@aa.io', fullname="Jacob User", profile_image="https://data.whicdn.com/images/233748857/original.jpg", bio="New to the site", password='password')
    Luke = User(
        username='Luke', email='Luke@aa.io', fullname="Luke User", profile_image="https://1.bp.blogspot.com/-qES8XCPCoMs/YPenPwxubUI/AAAAAAAAFdg/txOuXwSLWGQLT-QGAh98a-8m26UjMU9XQCLcBGAsYHQ/s224/20210721_101605.jpg", bio="Like to travel", password='password')
    Tom = User(
        username='TomMySpace', email='Tom@aa.io', fullname="Tom MySpace", profile_image="https://hips.hearstapps.com/digitalspyuk.cdnds.net/16/23/1465636878-myspace-tom.jpg", bio="Hi i'm Tom", password='Tom')


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
    db.session.add(Tom)
    Tom.followers = [demo, marnie]
    demo.followers = [marnie, bobbie, Emma]
    marnie.followers = [Eva, Jack, David, Elias]
    bobbie.followers = [Emma, Eva, Elias]
    Emma.followers = [bobbie, marnie, Lily]
    Eva.followers = [Lily, Eva]
    Leo.followers = [Jack, Nora]
    Luca.followers = [Theo, David]
    Lily.followers = [Luke, Jacob]
    Jack.followers = [Leila, Elias]
    Nora.followers = [David, Leila]
    Theo.followers = [Jack, Lily]
    David.followers = [Elias, Eva]
    Leila.followers = [Luke, Nora]
    Elias.followers = [Nora, Theo, Leila]
    Jacob.followers = [Emma, Eva, Leo, Luca]
    Luke.followers = [Jacob, Luca, Emma, Eva, Theo, Nora]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
