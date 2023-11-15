const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:jacko123@cluster0.zvw5bky.mongodb.net/mean?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`BD conectada`);

    } catch (error) {
        console.log(error);
        process.exit(1); //Detiene la app
    }
}

module.exports = conectarDB