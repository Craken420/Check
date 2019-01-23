const iconvlite = require('iconv-lite')
const fs = require('fs')
const path = require('path')

<<<<<<< HEAD
const archivosOriginales    = 'ArchivosOriginales\\'
const recodificacion        = 'Latin1'
=======
const archivosOriginales = 'ArchivosOriginales\\'
const recodificacion = 'Latin1'
>>>>>>> c6f94e1f0b9f85c1cf7b098d2259e04636dccebf

function crearExpresion (texto) {
    return new RegExp(`\\[(?!\\w+;)(?!${texto})(?=.*?\\/.*?\\])[^~]*?(?=(\\n|)^\\[)`, `gim`)
}

function transformar (archivo, texto) {
    if( !/\w+/g.test(texto) ) {
        fs.unlinkSync(archivo)
        return
    }

    texto           = texto + '\n['
    let textoBorrar = texto

    texto           = texto.replace(/^;.*/gm, '')
    let archivoFrm  = archivo.replace(/.*(\/|\\)|\_MAVI.*|\.esp/gi, '')
    archivoFrm      = archivoFrm.replace(/\_(?=(frm|vis|tbl|dlg|rep))/gi, '.')

    archivoFrm      = archivoFrm.replace(/(?<=\.)\w+$/gim, archivoFrm => {
        return archivoFrm.toLowerCase()
    })

    let expresion = crearExpresion(archivoFrm)

    if(texto.match(expresion) != null) {

        let txtExtraccion   = texto.match(expresion).join('\n')
        txtExtraccion       = txtExtraccion + '\n['
        let nomNuevoArchivo = txtExtraccion.match(/(?<=\[).*?\.(frm|vis|tbl|dlg|rep)/gi)
        
        if(nomNuevoArchivo != null) {
      
            let set                 = new Set( nomNuevoArchivo.map( JSON.stringify ) )
            let arrSinDuplicaciones = Array.from( set ).map( JSON.parse )
            
            let nombresArchivos = arrSinDuplicaciones.map(x => {
                x = x.replace(/\.(?=(frm|vis|tbl|dlg|rep))/gi, '_') + '_MAVI.esp'
                x = x.replace(/(?<=\_)\w+(?=\_)/gi, x => x.toUpperCase())
                return x
            })

            for (key2 in arrSinDuplicaciones) {
                let regExNuevoArchivo   = `\\[${arrSinDuplicaciones[key2]}[^~]*?(?=\\[)`
                let extraerAccion       = new RegExp(`${regExNuevoArchivo}`, `gi`)
                let resBool             = txtExtraccion.match(extraerAccion)
                let txtFinal            = resBool.join('\n')

                txtFinal = txtFinal.replace(/((?=[\ \t])|^\s+|$)+/mg, '')
                txtFinal = txtFinal.replace(/\[/g, ' \n[')
                fs.appendFileSync(archivosOriginales + nombresArchivos[key2], '\n' + txtFinal, { flag:'as' })
            }
        }

        textoBorrar     = textoBorrar.replace(expresion, '')
        textoBorrar     = textoBorrar.replace(/\[(?!(\s+|)\w)/gi, '')

        textoComentario = textoBorrar.replace(/^;.*/gm, '')
        
        if ( !/\w+/g.test(textoBorrar) || !/\w+/g.test(textoComentario) ) {
            fs.unlinkSync(archivo)
            return
        }

        remplazarTexto(archivo, textoBorrar)

    }
}

function recodificar(archivo, recodificacion) {
    return iconvlite.decode(fs.readFileSync(archivo), recodificacion)
}

function remplazarTexto (archivo, texto) {
    fs.writeFile(archivo, texto, err => {
        if (err)  return console.log(err)
    })
}

function filtrarExtension (archivos) {
    return archivos.filter(archivo => /\.esp$/i.test(archivo))
}

function comprobar (carpeta, archivos) {
    filtrarExtension(archivos).map(archivo => {
        return path.join(carpeta, archivo)
    }).filter(archivo => {
        // return archivo == 'ArchivosOriginales\\Usuario_FRM_MAVI.esp.esp' 
        //     || archivo == 'ArchivosOriginales\\ActivarDesafectar.esp'
        //     || archivo == 'ArchivosOriginales\\UsuarioCfg2_FRM_MAVI.esp'
        return fs.statSync(archivo).isFile()
    }).forEach(archivo => {
        transformar (archivo, recodificar(archivo, recodificacion))
    })
}

fs.readdir(archivosOriginales, (error, archivos) => {
    if (error) throw error
    comprobar(archivosOriginales, archivos)
})