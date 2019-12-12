
// (firstname, lastname, birthday, tel, email, adress, imgUrl, status)
//('Sebastien', 'De Marco', '1992-01-27','06-20-46-04-48', 'sebastienleboss@gmail.com', '11 rue des lilas 33700 Mérignac', 'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/1656021_10203296925362795_1343939831_n.jpg?_nc_cat=101&_nc_ohc=bNQWW5Zz27wAQkQDLTHBTVhNLZ_2aeZKBvNlD5Y6Tg3s1gjZoMAL5X6Pg&_nc_ht=scontent-cdt1-1.xx&oh=ac9a28e981590cffad5d7a803e089465&oe=5E82F6FA', 'superAdmin')
const express = require('express');
const app = express();
var cors = require('cors')
const port = 3000;
const connection = require('./config');
const bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.get('/', (request, response) => {
  response.send('Welcome to Express');
});

//user

app.get('/api/users', (req, res) => {
    connection.query('SELECT * from user', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des utilisateur');
      } else {
        res.json(results);
      }
    });
  });

app.get('/api/users/:id', (req, res) => {
    const iduser = req.params.id;
    connection.query('SELECT * from user WHERE id = ?', [iduser],(err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/users/role/:status', (req, res) => {
    const status = req.params.status;
    connection.query('SELECT * from user WHERE status = ?', [status],(err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
      } else {
        res.json(results);
      }
    });
  });

  app.post('/api/users', (req, res) => {

    const formData = req.body;
  
    connection.query('INSERT INTO user SET ?', formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving an user");
      } else {
        res.sendStatus(204);
      }
    });
  });



// comment

app.get('/api/comment/:grp', (req, res) => {
  const groupe = req.params.grp;
  connection.query('SELECT c.*, u.id AS userID, u.firstname, u.lastname, u.status, u.imgURL, u.status FROM comment AS c  JOIN user AS u ON c.user_id= u.id WHERE grp = ?;', [groupe],(err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des commentaires');
    } else {
      res.json(results);
    }
  });
});

  app.post('/api/comment', (req, res) => {

    const formData = req.body;
  
    connection.query('INSERT INTO comment SET ?', formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving an comment");
      } else {
        res.sendStatus(204);
      }
    });
  });

  app.delete('/api/comment/:id', (req, res) => {

    const idComment = req.params.id;
  
    connection.query('DELETE FROM comment WHERE id = ?', [idComment], err => {
      if (err) {
         console.log(err);
        res.status(500).send("Error deleting a comment");
      } else {
        res.sendStatus(204);
      }
    });
  });





app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});