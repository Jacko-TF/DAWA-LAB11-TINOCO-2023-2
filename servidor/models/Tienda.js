const mongoose = require('mongoose');
const DistritoSchema = require("./Distrito");

const TiendaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  distrito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Distrito', 
    required: true,
  },
  latitud: {
    type: Number,
    required: true,
  },
  longitud: {
    type: Number,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Tienda", TiendaSchema);
