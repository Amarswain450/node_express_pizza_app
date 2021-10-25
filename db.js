const mongoose = require('mongoose');

const connect = async () => {
    try{
        const response = await mongoose.connect(process.env.MONGO_URL);
        if(response){
            console.log("Connection successful...");
        }
    }catch(err){
        console.log("Connection failed...");
    }
}

module.exports = connect;