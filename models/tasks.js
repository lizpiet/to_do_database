
////// added 10/12 - whole page
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TODOSchema = new mongoose.Schema({
    event: String,
    time: Date

});

var tasks = mongoose.model('task', TODOSchema);

module.exports = tasks;