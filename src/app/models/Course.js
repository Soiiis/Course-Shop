const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Course = new Schema({
    _id : {type: Number,},
    name: { type: String, required: true},
    description: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    slug: { type: String, maxLength: 255},
    videoId: { type: String, required: true },
    level: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name' , unique: true },
    deletedAt :{},
   

},

    
     {
        _id: false,
        timestamps: true , },
);

// Add plugins
mongoose.plugin(slug);
// Auto increment Id 
Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete,{ 
    deletedAt : true ,
    overrideMethods: 'all',
    indexFields: ['deletedAt'] });

module.exports = mongoose.model('Course', Course);