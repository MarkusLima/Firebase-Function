const functions = require('firebase-functions');
const express = require('express');
const app = express();
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

app.get('/hello', (req, res) => {
    res.end("Received GET request!");
});

app.post('/hello', (req, res) => {
    res.end("Received POST request!");
});


app.post('/register',(request, response) => {
    
    if (request.method !== "POST") {
        response.json("Ultilize metodo Post!");
        return 0;
    }
    else {
        
        const email = req.body.email;
        const password = req.body.password;
        const phoneNumber = req.body.phoneNumber;
        const displayName = req.body.displayName;
        const photoURL = req.body.photoURL;
        //const end = req.body.end;
        
        admin.auth().createUser({
            email: email,
            emailVerified: true,
            password: password,
            phoneNumber: phoneNumber,
            displayName: displayName,
            photoURL: photoURL,
            disabled: false,
            // end: end
            
        }).then((userRecord) => {
            response.send(userRecord.json());
            return 1;
        }).catch((error) => {
            response.json(error);
            return 1;
        });
        
        if (user) {
            response.setHeader('Content-Type', 'application/json');
            return response.json(user);
        } else {
            return response.json('Error');
        }

    }
    
})

exports.helloWorld = functions.https.onRequest((request, response) => {
    console.log('Markus Firebase!')
    response.send("Hello from Firebase!");
});

exports.widgets = functions.https.onRequest(app);