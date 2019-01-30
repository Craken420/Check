/*** Archivos ***/
const leerCarpeta = require('./Utilerias/OperadoresArchivos/leerCarpeta')
const separarEsp = require('./Utilerias/OperadoresArchivos/separarCmpIncorrectoEsp')

/*** Operadores de archivos ***/
const filtro = require('./Utilerias/OperadoresArchivos/filtrarArchivos')
const recodificar = require('./Utilerias/Codificacion/contenidoRecodificado')

const carpeta = 'ArchivosOriginales\\'

leerCarpeta.obtenerArchivos(carpeta)
    .then(archivos => {
        filtro.filtrarExtension(archivos).forEach(archivo => {
            separarEsp.crearArchivoCmpAddCmpArchivo(
                archivo,
                recodificar.extraerContenidoRecodificado(archivo))
            console.log('Procesando...')
        })
    })
    .catch(e => console.error(e))