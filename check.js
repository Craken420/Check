/*** Archivos ***/
const { leerCarpetaFiltrada } = require('./Utilerias/OperadoresArchivos/readDirOnlyFile')
const separarEsp = require('./Utilerias/OperadoresArchivos/separarCmpIncorrectoEsp')

/*** Operadores de archivos ***/
const recodificar = require('./Utilerias/Codificacion/contenidoRecodificado')

const carpeta = 'Testing\\'

leerCarpetaFiltrada(carpeta, ['.esp',])
    .then(archivos => {
        archivos.forEach(archivo => {
            separarEsp.crearArchivoCmpAddCmpArchivo(
                archivo,
                recodificar.extraerContenidoRecodificado(archivo))
            console.log('Procesando...')
        })
    })
    .catch(e => console.error(e))