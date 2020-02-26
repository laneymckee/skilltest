const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', (req, res) => {
    const storyID = req.params.id;
    axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json?print=pretty`)
        .then(response => {
            console.log(`Story "${response.data.title}" retrieved`);
            res.send(response.data);
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
