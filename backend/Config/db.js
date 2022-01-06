const mongoose = require('mongoose');

const connectDB = async()=>{
    const dbURI = 'mongodb+srv://menna:menna1234@cluster0.xbiwv.mongodb.net/dashofdelish';
    await mongoose.connect(dbURI,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
    });

    console.log(`~ CONNECTED TO DATABASE SUCCESSFULLY ~`);
}

module.exports = connectDB;