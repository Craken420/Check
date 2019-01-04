const fs = require('fs')
const iconvlite = require('iconv-lite')
const path = require('path')

//const carpeta = 'C:/Users/lapena/Documents/Luis Angel/Intelisis/Intelisis3100/Reportes MAVI/'
const ArchivosCreados = 'ArchivosCreados\\'
const archivosOriginales = 'ArchivosOriginales\\'
const archivosModificados = 'ArchivosModificados\\'
const recodificacion = 'Latin1'

function fileExists(file, cb) {
    fs.stat(file, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return cb(null, false);
        } else { // en caso de otro error
          return cb(err);
        }
      }
      // devolvemos el resultado de `isFile`.
      return cb(null, stats.isFile());
    });
}

function crearExpresion (texto) {
    let regEx = `\\[(?!${texto})[^~]*?(?=(\\n|)\\[)`
    return new RegExp(`${regEx}`, `g`)
}

function transformar (archivo, texto) {
    texto = texto + '\n['
    //Crear el nombre de la accion con el archivo, ejemplo: UsuarioCfg.frm
    let archivoFrm      =  archivo.replace(/.*(\/|\\)|\_.*|\.esp/g, '') + '.frm'
    let expresion       = crearExpresion(archivoFrm)
    //Extraccion para las acciones con nombres diferentes al archivo
    let extraccion      = texto.match(expresion)
    let txtExtraccion   = ''

    for (key in extraccion) {
        txtExtraccion += extraccion[key]
    }

    txtExtraccion = txtExtraccion + '\n['
    
    //Extrae los nombres de las acciones ejemplo:'UsuarioCfg', 'Cont'
    let nomNuevoArchivo = txtExtraccion.match(/(?<=\[).*?(?=\.frm)/g)

    //Elimina datos duplicados del objeto
    let set                 = new Set( nomNuevoArchivo.map( JSON.stringify ) )
    let arrSinDuplicaciones = Array.from( set ).map( JSON.parse )

    for (key2 in arrSinDuplicaciones) {

        let regExNuevoArchivo   = `\\[${arrSinDuplicaciones[key2]}.*?\\.frm[^~]*?(?=\\[)`
        let extraerAccion       = new RegExp(`${regExNuevoArchivo}`, `gi`)
        let resBool             = txtExtraccion.match(extraerAccion)
        let txtFinal            = ''

        for (key3 in resBool) {
           txtFinal += resBool[key3]
        }
        console.log('El archivo aa verificar\n-------------------')
        console.log(archivosOriginales + arrSinDuplicaciones[key2]+'_FRM_MAVI.esp')
        console.log('------------------------------------------')
        fileExists(archivosOriginales + arrSinDuplicaciones[key2]+'_FRM_MAVI.esp', (err, exists) => {
 
            if(err) {
              // manejar otro tipo de error
            }
            if(exists) {
                console.log('existe')
            } else {
                remplazarTexto (ArchivosCreados+arrSinDuplicaciones[key2] + '_FRM_MAVI.esp', txtFinal)
                texto = texto.replace(expresion, '')
                texto = texto.replace(/\[(?!(\s+|)\w)/g, '')

                remplazarTexto(archivosModificados + archivo.replace(/.*(\/|\\)/, ''), texto)
            }
        })
        //A la hora de crear el nuevo archivo se tiene que 
        //verificar si existe en la carpeta orioginal o en la capeta de archivos creados
        //y si existe se tiene que abrir y colocar al final
        //remplazarTexto (ArchivosCreados+arrSinDuplicaciones[key2] + '_FRM_MAVI.esp', txtFinal)
    }

    //Elimina el texto del match para quitar el contenido incorrecto
    //texto = texto.replace(expresion, '')
    //texto = texto.replace(/\[(?!(\s+|)\w)/g, '')

    //remplazarTexto(archivosModificados + archivo.replace(/.*(\/|\\)/, ''), texto)
}

function recodificar(archivo, recodificacion) {
    return iconvlite.decode(fs.readFileSync(archivo), recodificacion)
}

function remplazarTexto (archivo, texto) {
    fs.writeFile(archivo, texto, (err) => {
        if (err) {
            return console.log(err)
        }
        console.log('Archivo : ' + archivo.replace(/.*(\/|\\)/, ''))
    })
}

function filtrarExtension (archivos) {
    return archivos.filter(archivo => /\.vis|\.frm|\.esp|\.tbl|\.rep|\.dlg$/i.test(archivo))
}

function comprobar (carpeta, archivos) {
    filtrarExtension(archivos).map((archivo) => {
        return path.join(carpeta, archivo)
    }).filter((archivo) => {
        return fs.statSync(archivo).isFile()
    }).forEach((archivo) => {
        transformar (archivo, recodificar(archivo, recodificacion))
    })
}

fs.readdir(archivosOriginales, (error, archivos) => {
    if (error) throw error
    comprobar(archivosOriginales, archivos)
})