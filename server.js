const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());


const toxicWords = ["badword", "offensiveword", "toxicword","fuck"]; //add words as you wish


app.post('/filter', (req, res) => {
    let message = req.body.message;


    toxicWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        message = message.replace(regex, '*'.repeat(word.length));
    });

 
    res.send({ sanitizedMessage: message });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
