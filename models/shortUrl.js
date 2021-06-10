const mongoose = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
    // this object represents all of the columns in our db:
    // so, for example, "full" is the name of the first column, etc.
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate // note: shortId.generate is a function, so writing it like this is the same as writing () => shortId.generate();
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
});

// this is what hooks up our db to the above model that we created:
module.exports = mongoose.model('ShortUrl', shortUrlSchema);