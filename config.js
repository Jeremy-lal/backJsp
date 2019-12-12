const  mysql = require('mysql');
const  connection = mysql.createConnection({
  host :  'localhost', // address of the server
  user :  process.env.user_mysql, // username
  password :  process.env.pwd_mysql,
  database :  'jsp',
});
module.exports = connection;
