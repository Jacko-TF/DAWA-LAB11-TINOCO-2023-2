const Distrito = require("../models/Distrito");
const Tienda = require("../models/Tienda");

// Crear un nuevo distrito
exports.crearDistrito = async (req, res) => {
  try {
    const { nombre, departamento, cantidadDeTiendas } = req.body;

    const nuevoDistrito = new Distrito({
      nombre,
      departamento,
      cantidadDeTiendas,
    });

    await nuevoDistrito.save();
    res.status(201).json(nuevoDistrito);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al crear el distrito");
  }
};

// Obtener todos los distritos
exports.obtenerDistritos = async (req, res) => {
  try {
    const distritos = await Distrito.find();
    res.status(200).json(distritos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al obtener los distritos");
  }
};

// Obtener un distrito por su ID
exports.obtenerDistritoPorId = async (req, res) => {
  try {
    const distrito = await Distrito.findById(req.params.id);

    if (!distrito) {
      return res.status(404).json({ msg: "No existe el distrito" });
    }

    res.status(200).json(distrito);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al obtener el distrito por ID");
  }
};

// Actualizar un distrito por su ID
exports.actualizarDistrito = async (req, res) => {
  try {
    const { nombre, departamento, cantidadDeTiendas } = req.body;
    let distrito = await Distrito.findById(req.params.id);

    if (!distrito) {
      return res.status(404).json({ msg: "No existe el distrito" });
    }

    distrito.nombre = nombre;
    distrito.departamento = departamento;
    distrito.cantidadDeTiendas = cantidadDeTiendas;

    distrito = await distrito.save();
    res.status(200).json(distrito);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al actualizar el distrito");
  }
};

// Eliminar un distrito por su ID
exports.eliminarDistrito = async (req, res) => {
  try {
    const distrito = await Distrito.findById(req.params.id);

    if (!distrito) {
      return res.status(404).json({ msg: 'No existe el distrito' });
    }

    // Eliminar las tiendas asociadas al distrito
    await Tienda.deleteMany({ 'distrito': distrito._id });

    // Eliminar el distrito
    await Distrito.findByIdAndRemove(req.params.id);

    res.status(200).json({ msg: 'El distrito y las tiendas asociadas se han eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al eliminar el distrito y las tiendas asociadas');
  }
};

exports.obtenerMapDistrito = async (req, res) => {
  try {
    // Obtener la lista de distritos
    const distritos = await Distrito.find();

    // Crear un arreglo para almacenar los resultados formateados
    const distritosFormateados = [];

    // Iterar sobre cada distrito y obtener las tiendas asociadas
    for (const distrito of distritos) {
      const tiendasEnDistrito = await Tienda.find({ 'distrito': distrito._id });

      // Formatear el distrito con las tiendas asociadas
      for (const tienda of tiendasEnDistrito) {
        const tiendaFormateada = {
          position: { lat: tienda.latitud, lng: tienda.longitud },
          label: { color: 'black', text: `${tienda.nombre}`, fontSize: '20px', fontWeight: 'bold' },
          title: 'ciudad',
          info: distrito.nombre // Puedes ajustar esto según tus necesidades
        };

        distritosFormateados.push(tiendaFormateada);
      }
    }

    res.status(200).json(distritosFormateados);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al obtener los distritos con tiendas en formato JSON');
  }
};