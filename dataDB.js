var mongoose = require('mongoose');

module.exports = {add_chat_data};

mongoose.connect('mongodb://ec2-3-142-225-181.us-east-2.compute.amazonaws.com:27017/testDB');
var db = mongoose.connection;

db.on('error', function(){
    console.log('Connection Failed!');
});
  
db.once('open', function() {
    console.log('Connected!');
});

var chat_data = mongoose.Schema({
    name : 'string',
    msg : 'string',
    ip : 'string'
});
  
var Chat = mongoose.model('Schema', chat_data);

function add_chat_data(name,msg,ip){

    var tmp_join = new Chat({name:name,msg:msg,ip:ip});
    
    tmp_join.save(function(error, data){
        if(error){
            console.log(error);
        }else{
            console.log('Saved!');
        }
    });

}