const Tienda = require("../models/Tienda");
const Distrito = require("../models/Distrito");

exports.crearTienda = async (req, res) => {
  try {
    const { nombre, nombreDistrito, latitud, longitud } = req.body;

    // Busca el distrito por nombre
    const distritoExistente = await Distrito.findOne({
      nombre: nombreDistrito,
    });

    if (!distritoExistente) {
      return res
        .status(400)
        .json({ error: `El distrito "${nombreDistrito}" no existe.` });
    }

    const nuevaTienda = new Tienda({
      nombre,
      distrito: distritoExistente,
      latitud,
      longitud,
    });

    await nuevaTienda.save();
    res.json(nuevaTienda);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerTiendas = async (req, res) => {
  try {
    const tiendas = await Tienda.find();
    res.json(tiendas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarTienda = async (req, res) => {
  try {
    const { nombre, distrito, latitud, longitud } = req.body;
    let tienda = await Tienda.findById(req.params.id);

    if (!tienda) {
      return res.status(404).json({ msg: "No existe la tienda" });
    }

    // Busca el distrito por id
    const distritoExistente = await Distrito.findOne({
      _id: distrito,
    });

    if (!distritoExistente) {
      return res
        .status(400)
        .json({ error: `El distrito "${distrito}" no existe.` });
    }

    tienda.nombre = nombre;
    tienda.distrito = distritoExistente;
    tienda.latitud = latitud;
    tienda.longitud = longitud;

    tienda = await Tienda.findOneAndUpdate({ _id: req.params.id }, tienda, {
      new: true,
    });
    res.json(tienda);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};

exports.verTienda = async (req, res) => {
  try {
    let tienda = await Tienda.findById(req.params.id);

    if (!tienda) {
      return res.status(404).json({ msg: "No existe la tienda" });
    }

    res.json(tienda);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTienda = async (req, res) => {
  try {
    let tienda = await Tienda.findById(req.params.id);

    if (!tienda) {
      return res.status(404).json({ msg: "No existe la tienda" });
    }

    tienda = await Tienda.findOneAndRemove(req.params.id);
    res.json({ msg: "La tienda: " + tienda.nombre + " se ha eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerTiendasPorDistrito = async (req, res) => {
  try {
    const distritoId = req.params.id;

    // Busca el distrito por ID
    const distritoExistente = await Distrito.findById(distritoId);

    if (!distritoExistente) {
      return res.status(404).json({ msg: "No existe el distrito" });
    }
    console.log(distritoExistente);
    // Busca todas las tiendas asociadas al distrito por ID
    const tiendasEnDistrito = await Tienda.find({
      distrito: distritoExistente._id,
    });
    res.json(tiendasEnDistrito);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerMapTiendaDistritoID = async (req, res) => {
  try {
    // Obtener la lista de distritos
    const distrito = await Distrito.findById(req.params.id);

    // Crear un arreglo para almacenar los resultados formateados
    const distritosFormateados = [];

    // Iterar sobre cada distrito y obtener las tiendas asociadas
    const tiendasEnDistrito = await Tienda.find({ distrito: distrito._id });

    // Formatear el distrito con las tiendas asociadas
    for (const tienda of tiendasEnDistrito) {
      const tiendaFormateada = {
        position: { lat: tienda.latitud, lng: tienda.longitud },
        label: {
          color: "black",
          text: `${tienda.nombre}`,
          fontSize: "20px",
          fontWeight: "bold",
        },
        title: "ciudad",
        info: distrito.nombre, // Puedes ajustar esto según tus necesidades
      };

      distritosFormateados.push(tiendaFormateada);
    }

    res.status(200).json(distritosFormateados);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Hubo un error al obtener las tiendas"
      );
  }
};
