# project-week-6
week-6-project
heroku link - thats not working- !(https://noor-week-6.herokuapp.com/)
* first i created my file tree
* then finished with the html and server files so i can code easier and clearer
* i make a db in heroku and used the url in .env file
* start with createing the tables in postgresql from the terminal so i can update them using my database queries
* my tables are :
1- users (user_id, username) = where user_id is the primary key
2- places (place_id, place_name) = where place_id is the primary key
3- ratings (u_id, p_id, rating) = where u_id and p_id are a composed primary key made of 2 foreign keys

the issue is that i am not able to see my url in the handler (the one i composed using the fetch!)

and im keep having this error of
"[Error: ENOENT: no such file or directory, open '/home/noor7188/Lotus/week-6/project-week-6/add-place?userName=saf&placeName=&rating=']
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path:
   '/home/noor7188/Lotus/week-6/project-week-6/add-place?userName=testname&placeName=testplace&rating=2' }
"

damn ! :(
