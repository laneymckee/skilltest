const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

/** ---------- ROUTE INCLUDES ---------- **/
const newsRouter = require('./routes/news.router');
const storyRouter = require('./routes/story.router');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/news', newsRouter);
app.use('/api/story', storyRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function() {
   console.log('Listening on port: ', port);
});
