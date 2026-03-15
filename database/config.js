const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CONN);
        console.log("DB ONLINE")

    } catch (error) {
        throw new Error('Error al inicializar DB')
    }
}

module.exports = {
    dbConnection
}