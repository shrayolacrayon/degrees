var mongoose= require('mongoose'),
    Schema= mongoose.Schema,
    ObjectId= mongoose.ObjectId;

function defineModels(mongoose, fn){

/* User Model */

var User= new Schema({
    username: {type: String, index: {unique: true}},
    hashed_pass: String,
    salt: String
});



}
