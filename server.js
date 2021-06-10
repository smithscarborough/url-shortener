const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

mongoose.connect('mongodb://localhost/urlShortener', {
    // these two just allow us to not have to worry about any deprecation warnings that appear otherwise:
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // this tells the app that we are using URL parameters

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls });
});

app.post('/shortUrls', async (req, res) => {
    // ShortUrl is what we named our db object, so ShortUrl.create is how we create a new short url
    await ShortUrl.create({ full: req.body.fullUrl }) // note: the fullUrl value here on req.body.fullUrl is just what we named the input on the form in index.ejs
    res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full);
})

app.listen(process.env.PORT || 5000);
