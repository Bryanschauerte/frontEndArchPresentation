docker-compose up

starts the db, react, server and seeds the db (sequalzs)

server is on localhost:6500
Just one health route for now GET /

use gui like sequal pro at 127.0.0.1
port 3306
MYSQL_DATABASE: 'db' # So you don't have to use root, but you can if you like
MYSQL_USER: 'user' # You can use whatever password you like
MYSQL_PASSWORD: 'password' # Password for root access
MYSQL_ROOT_PASSWORD: 'password'

db has a users and players table

react will be hosted on localhost 3001

<!--

db in app findable at

mysql-db:3306

 -->
