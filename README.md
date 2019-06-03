# Recomending places with Rating

heroku link - that I took the url of the database from - !(https://noor-week-6.herokuapp.com/) (The link is not working :cry: )  

* first I created my file tree :
   - the public files for the client side
   - src folder for the server side


* I finished with the html and server files so I can code easier and clearer.
* I make a databaseb in heroku and used the url in .env file
* start with createing the tables in postgresql from the terminal so I can update them using my database queries
* my tables are :  
  1- users (user_id, username) = where user_id is the primary key  
  2- places (place_id, place_name) = where place_id is the primary key  
  3- ratings (u_id, p_id, rating) = where u_id and p_id are a composed primary key made of 2 foreign keys

* I worked on the `sign up` and `log in` pages , where in the `sign up` when you register the hashed pass word in added to the users table and a cookie set in the browser using `bcrypt`, `jwt`
* In the `log in ` I want to see the password in the database for that user if it's valid to I can "send" him to the form where he can add the data of recommending the places :smile:



  - It's been hell of weeks- I managed to learn the databse materials by my own - while having some issues at home
  I'm very satisfied with where am at !
  I really want to improve myself more and read more about sertain materials => it's just a matter of time ! :confused: 
