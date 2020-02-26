const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
   axios
      .get(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`)
      .then(response => {
         console.log('New Story Feed successfully retrieved');
         res.send(response.data);
      })
      .catch(err => {
         console.log(err);
      });
});

module.exports = router;
