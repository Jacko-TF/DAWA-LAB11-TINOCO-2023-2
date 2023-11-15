const mongoose = require("mongoose");

const DistritoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
  cantidadDeTiendas: {
    type: Number,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Distrito", DistritoSchema);
