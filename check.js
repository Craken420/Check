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
    let archivoFrm      =  archivo.replace(/.*(\/|\\)|\_MAVI.*|\.esp/g, '')
    archivoFrm = archivoFrm.replace(/\_/g, '.')
    archivoFrm = archivoFrm.replace(/(?<=\.)\w+$/gm, (archivoFrm) => {
        return archivoFrm.toLowerCase()
    })
    let expresion       = crearExpresion(archivoFrm)
    //Extraccion para las acciones con nombres diferentes al archivo
    let txtExtraccion      = texto.match(expresion).join('\n')

    txtExtraccion = txtExtraccion + '\n['
    
    //Extrae los nombres de las acciones ejemplo:'UsuarioCfg', 'Cont'
    let nomNuevoArchivo = txtExtraccion.match(/(?<=\[).*?\.(frm|vis|tbl|dlg|rep)/g)
        
    //Elimina datos duplicados del objeto y formatear para busqueda
    let set                 = new Set( nomNuevoArchivo.map( JSON.stringify ) )
    let arrSinDuplicaciones = Array.from( set ).map( JSON.parse )
    
    let nombresArchivos = arrSinDuplicaciones.map(x => {
        x = x.replace('.', '_') + '_MAVI.esp'
        x = x.replace(/(?<=\_)\w+(?=\_)/g, x => x.toUpperCase())
        return x
    })
    // console.log(archivo,arrSinDuplicaciones,nombresArchivos)


    for (key2 in arrSinDuplicaciones) {

        let regExNuevoArchivo   = `\\[${arrSinDuplicaciones[key2]}.*?\\.[^~]*?(?=\\[)`
        let extraerAccion       = new RegExp(`${regExNuevoArchivo}`, `gi`)
        let resBool             = txtExtraccion.match(extraerAccion)
        let txtFinal            = ''

        for (key3 in resBool) {
           txtFinal += resBool[key3]
        }
        console.log(archivo,txtFinal)
        //chocolate
        // fileExists(archivosOriginales + arrSinDuplicaciones[key2]+'_FRM_MAVI.esp', (err, exists) => {
 
        //     if(err) {
        //       // manejar otro tipo de error
        //     }
        //     if(exists) {
        //         // console.log('existe')
        //     } else {
        //         remplazarTexto (ArchivosCreados+arrSinDuplicaciones[key2] + '_FRM_MAVI.esp', txtFinal)
        //         texto = texto.replace(expresion, '')
        //         texto = texto.replace(/\[(?!(\s+|)\w)/g, '')

        //         remplazarTexto(archivosModificados + archivo.replace(/.*(\/|\\)/, ''), texto)
        //     }
        // })
        //A la hora de crear el nuevo archivo se tiene que 
        //verificar si existe en la carpeta orioginal o en la capeta de archivos creados
        //y si existe se tiene que abrir y colocar al final
        remplazarTexto (ArchivosCreados+nombresArchivos[key2], txtFinal)
    }

    //Elimina el texto del match para quitar el contenido incorrecto
    texto = texto.replace(expresion, '')
    texto = texto.replace(/\[(?!(\s+|)\w)/g, '')

    remplazarTexto(archivo, texto)
}

function recodificar(archivo, recodificacion) {
    return iconvlite.decode(fs.readFileSync(archivo), recodificacion)
}

function remplazarTexto (archivo, texto) {
    fs.writeFile(archivo, texto, (err) => {
        if (err) {
            return console.log(err)
        }
        // console.log('Archivo : ' + archivo.replace(/.*(\/|\\)/, ''))
    })
}

function filtrarExtension (archivos) {
    return archivos.filter(archivo => /\.esp$/i.test(archivo))
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