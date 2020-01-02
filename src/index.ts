
// (firstname, lastname, birthday, tel, email, adress, imgURL, status)
// ('Inconu2', 'Inconnu2', '1992-01-27','06-20-46-04-48', 'inconnu2@gmail.com', '11 rue des jardin 33700 Mérignac', 'https://i.skyrock.net/2905/86002905/pics/3164012828_1_2_SlQQps0s.gif', 'jsp1'),

// import express from 'express';
import express from 'express';


// import { UserController } from './controller/user.controller';
import {UserController} from './controller/user.controller';
// import { CommentController } from './controller/comment.controller';
import {CommentController} from './controller/comment.controller';

// import { NoteController } from './controller/note.controller';
import {NoteController} from './controller/note.controller';

import loaders from './loaders';


async function startServer() {
  // Récupération de l'application initiale
  const app = express();

  await loaders(app);

  // Ajout des différentes route de votre application
  
  UserController(app);
  CommentController(app);
  NoteController(app);


  // Démarrage du serveur une fois que tout est correctement init
  app.listen(3000, () => console.log('Express server is running'));
}

startServer();