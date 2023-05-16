const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    });

    console.log(`connected ${conn.connection.host}`.cyan);
}

module.exports = connectDB;