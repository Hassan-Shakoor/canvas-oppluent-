const express = require('express');
const cors = require('cors');
const { app, database } = require('../FirebaseAuthComp/firebase'); // Update the path as needed
const firebase = require('firebase');
const firebaseConfig = require('../FirebaseAuthComp/firebase');

// Initialize Firebase using your configuration
firebase.initializeApp(firebaseConfig);


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Store user favorites in Firebase Realtime Database
app.post('/store-favorites', async (req, res) => {
    const { userId, favorites } = req.body;
  
    try {
      await database.ref(`users/${userId}/favorites`).set(favorites);
      res.status(200).send('Favorites stored successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error storing favorites');
    }
  });

  app.get('/get-json/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const snapshot = await firebase.database().ref(`users/${userId}`).once('value');
      const data = snapshot.val();
  
      if (data !== null) {
        res.status(200).json(data.jsonData);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving JSON data');
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });