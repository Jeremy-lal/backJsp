import { GalleryController } from './controller/gallery.controller';

// (firstname, lastname, birthday, tel, email, adress, imgURL, status)
// ('Inconu2', 'Inconnu2', '1992-01-27','06-20-46-04-48', 'inconnu2@gmail.com', '11 rue des jardin 33700 Mérignac', 'https://i.skyrock.net/2905/86002905/pics/3164012828_1_2_SlQQps0s.gif', 'jsp1'),

import { UserController } from './controller/user.controller';
import { CommentController } from './controller/comment.controller';
import { NoteController } from './controller/note.controller';
import { AuthController } from './controller/auth.controller';

import express from 'express';
import loaders from './loaders';
import { PictureController } from './controller/picture.controller';
import { FilesController } from './controller/files.controller';
import { environment } from './environment';

const fs = require('fs')


async function startServer() {

  // // Récupération de l'application initiale
  var access = fs.createWriteStream(environment.logFile);
  process.stdout.write = process.stderr.write = access.write.bind(access);
  // var myConsole = new console.Console(access, access);
  console.log('here');

  const app = express();

  await loaders(app);
  app.use('/src/images', express.static('images'));
  app.use(express.static('/images' + '/public'));

  app.get('/', function (req, res) {
    res.sendFile('/images' + '/index.html');
  })
  // Ajout des différentes route de votre application

  UserController(app);
  CommentController(app);
  NoteController(app);
  AuthController(app);
  PictureController(app)
  FilesController(app)
  GalleryController(app)

  app.get('/api/jsp/', (req, res) => {
    res.send('Hello world');
  });


  // Démarrage du serveur une fois que tout est correctement init
  app.listen(3000, () => console.log('Express server is running'));
}

startServer(); 