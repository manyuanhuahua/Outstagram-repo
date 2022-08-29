# Outstagram.md

Website Link: https://outstagram--app.herokuapp.com/

Outstagram is a place where users post their photos, and engage with other creators and their content

Created by: Tim Reinhardt, Ting Feng, Zhihong Liu, and Brian Aguilar

Created with: 
  * React
  * Redux
  * Flask
  * Postgres
  * Sqlalchemy
  * Python
  * Javascript

Live Link to our app: https://outstagram--app.herokuapp.com/

# How to use this project locally:
  * Clone the repository
  * Create a database and a DB user with ownership rights to the database
  * Create a .env file with the specifications provided in the .env.example file provided in the repository.
  * In the root directory of the project repo, run ```install --python "$PYENV_ROOT/version/3.9.4/bin/python"``` then run the command ```pipenv shell```
  * Set up the backend DB with ```flask db migrate```, then afterwards run ```flask db upgrade``` followed by ```flask seed all```. You may now run the backend server with ```flask run```
  * Open a second terminal, cd into the current project directory, then cd into the subfolder ```cd react-app```, once in this folder run the command ```npm start``` to start the frontend server.
  * By default, the frontend port will be on localhost:3000, and the backend will port on localhost:5000



# Website Features

* Users
    ## Can sign up to be a user on the website
    
    ![signup](https://user-images.githubusercontent.com/95321368/187122368-bdf55a25-91ff-4d38-84d4-2b019df84ef1.png)

    ## Can login a user to the website
    
    ![Screenshot 2022-08-28 211851](https://user-images.githubusercontent.com/95321368/187122261-bb4e4cee-6d39-4a86-8835-f5e08b2291fa.png)
    
    ## Have the ability to post, comment, like, and follow
    
    ![home-posts](https://user-images.githubusercontent.com/95321368/187122512-86d3054a-96b5-49db-afdd-736a7d53f0c7.png)
    ![post-detail](https://user-images.githubusercontent.com/95321368/187122749-07086698-3762-437e-aca0-08a37345df75.png)
    
    ## Have a user profile to display all post, follower/following count
    
    ![image](https://user-images.githubusercontent.com/95321368/187122676-0643ebdb-44e1-4762-9c95-4dfd97fd7305.png)



