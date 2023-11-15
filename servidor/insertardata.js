const mongoose = require('mongoose');
const Distrito = require('./models/Distrito')
const Tienda = require('./models/Tienda')

// Conexión a la base de datos
mongoose.connect("mongodb+srv://admin:jacko123@cluster0.zvw5bky.mongodb.net/mean?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

const insertardata = async () => {
  try {
    // Insertar tres distritos
    const distrito1 = await Distrito.create({
      nombre: 'ATE',
      departamento: 'LIMA',
      cantidadDeTiendas: 0 // Se inicializa en 0 y se actualizará después
    });

    const distrito2 = await Distrito.create({
      nombre: 'SURCO',
      departamento: 'LIMA',
      cantidadDeTiendas: 0
    });

    const distrito3 = await Distrito.create({
      nombre: 'CHORRILLOS',
      departamento: 'LIMA',
      cantidadDeTiendas: 0
    });

    // Insertar tres tiendas por distrito
    const tienda1Distrito1 = await Tienda.create({
      nombre: 'Tienda 1',
      distrito: distrito1._id,
      latitud: -12.032678,
      longitud: -76.905348
    });

    const tienda2Distrito1 = await Tienda.create({
      nombre: 'Tienda 2',
      distrito: distrito1._id,
      latitud: -12.132678,
      longitud: -76.895348
    });

    const tienda3Distrito1 = await Tienda.create({
      nombre: 'Tienda 3',
      distrito: distrito1._id,
      latitud: -12.022678,
      longitud: -76.855348
    });

    const tienda1Distrito2 = await Tienda.create({
      nombre: 'Tienda 4',
      distrito: distrito2._id,
      latitud: -12.106445,
      longitud: -76.963674
    });

    const tienda2Distrito2 = await Tienda.create({
      nombre: 'Tienda 5',
      distrito: distrito2._id,
      latitud: -12.116445,
      longitud: -76.983674
    });

    const tienda3Distrito2 = await Tienda.create({
      nombre: 'Tienda 6',
      distrito: distrito2._id,
      latitud: -12.136445,
      longitud: -76.963674
    });

    const tienda1Distrito3 = await Tienda.create({
      nombre: 'Tienda 7',
      distrito: distrito3._id,
      latitud: -12.107909,
      longitud: -77.019780
    });

    const tienda2Distrito3 = await Tienda.create({
      nombre: 'Tienda 8',
      distrito: distrito3._id,
      latitud: -12.117909,
      longitud: -77.029780
    });

    const tienda3Distrito3 = await Tienda.create({
      nombre: 'Tienda 9',
      distrito: distrito3._id,
      latitud: -12.108909,
      longitud: -77.015780
    });

    // Actualizar la cantidad de tiendas en cada distrito
    distrito1.cantidadDeTiendas = 3;
    distrito2.cantidadDeTiendas = 3;
    distrito3.cantidadDeTiendas = 3;

    await distrito1.save();
    await distrito2.save();
    await distrito3.save();

    console.log('Datos insertados correctamente.');

  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    // Cerrar la conexión después de completar las operaciones
    mongoose.disconnect();
  }
};

// Ejecutar la función
insertardata();
