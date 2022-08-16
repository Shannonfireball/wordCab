const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WordSchema = new Schema({
    word: { 
        type: String,
         unique: true
     },
    entries: [{
        partOfSpeech: { type: String },
        origin: [{ type: String }],
        definitions: [{ type: String }],
        examples: [{ type: String }]
    }]
});

                         // creating a model
                                 // mongoose will set Employee to lowercase and plural
module.exports = mongoose.model('Word', WordSchema);