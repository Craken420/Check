const fs = require('fs')
const iconvlite = require('iconv-lite')
const path = require('path')

const archivosOriginales = 'ArchivosOriginales\\'
const recodificacion = 'Latin1'

function crearExpresion (texto) {
    // console.log(texto)
    let regEx = `\\[(?!\\w+;)(?!${texto})(?=.*?\\/.*?\\])[^~]*?(?=(\\n|)^\\[)`
    //let regEx = `\\[(?!${texto})[^~]*?(?=(\\n|)\\[)`
    return new RegExp(`${regEx}`, `gim`)
}

function transformar (archivo, texto) {
    if(!/\w+/g.test(texto)) {
        fs.unlinkSync(archivo)
        // console.log('retorno')
        return
    }
    texto = texto + '\n['
    let textoBorrar = texto
    texto = texto.replace(/^;.*/gm, '')
    //Crear el nombre de la accion con el archivo, ejemplo: UsuarioCfg.frm
    let archivoFrm      =  archivo.replace(/.*(\/|\\)|\_MAVI.*|\.esp/gi, '')
    // console.log('aqui',archivoFrm)
    archivoFrm = archivoFrm.replace(/\_(?=(frm|vis|tbl|dlg|rep))/gi, '.')
    // console.log('aca',archivoFrm)
    archivoFrm = archivoFrm.replace(/(?<=\.)\w+$/gim, (archivoFrm) => {
        // /\.(?=(frm|vis|tbl|dlg|rep))/gi
        return archivoFrm.toLowerCase()
    })
    let expresion       = crearExpresion(archivoFrm)
    // console.log(expresion,archivoFrm)

    // if(texto.match(expresion) != null)
    // console.log(archivo)//,expresion,texto.match(expresion))

    //if(texto.match(expresion).join('\n') != null) console.log(archivo)
    
    if(texto.match(expresion) != null){

        //Extraccion para las acciones con nombres diferentes al archivo
        let txtExtraccion      = texto.match(expresion).join('\n')

        txtExtraccion = txtExtraccion + '\n['
        
        //Extrae los nombres de las acciones ejemplo:'UsuarioCfg', 'Cont'
        let nomNuevoArchivo = txtExtraccion.match(/(?<=\[).*?\.(frm|vis|tbl|dlg|rep)/gi)
        
        if(nomNuevoArchivo != null){
        //Elimina datos duplicados del objeto y formatear para busqueda
        let set                 = new Set( nomNuevoArchivo.map( JSON.stringify ) )
        let arrSinDuplicaciones = Array.from( set ).map( JSON.parse )
        
        let nombresArchivos = arrSinDuplicaciones.map(x => {
            x = x.replace(/\.(?=(frm|vis|tbl|dlg|rep))/gi, '_') + '_MAVI.esp'
            x = x.replace(/(?<=\_)\w+(?=\_)/gi, x => x.toUpperCase())
            return x
        })
        // console.log('aqui',archivo,arrSinDuplicaciones,nombresArchivos,expresion)


        for (key2 in arrSinDuplicaciones) {
            console.log('err',archivo)
            let regExNuevoArchivo   = `\\[${arrSinDuplicaciones[key2]}[^~]*?(?=\\[)`
            let extraerAccion       = new RegExp(`${regExNuevoArchivo}`, `gi`)
            let resBool             = txtExtraccion.match(extraerAccion)
            // console.log('err',archivo,extraerAccion,txtExtraccion)
            // if(txtExtraccion.match(extraerAccion) == null) return
            let txtFinal            = resBool.join('\n')


            //console.log(archivo,regExNuevoArchivo)
            // if(fileExists(archivosOriginales + nombresArchivos[key2])){
            //     // Añadir al archivo
            //     console.log('añadir',txtFinal)
            txtFinal = txtFinal.replace(/((?=[\ \t])|^\s+|$)+/mg, '')
            txtFinal = txtFinal.replace(/\[/g, ' \n[')
            fs.appendFileSync(archivosOriginales + nombresArchivos[key2],'\n'+txtFinal,{flag:'as'})
            // } else {
            //     // Crear archivo
            //     console.log('creacion',txtFinal)
            //     remplazarTexto (archivosOriginales + nombresArchivos[key2], txtFinal)
            // }
        }}

        
        //Elimina el texto del match para quitar el contenido incorrecto
        textoBorrar = textoBorrar.replace(expresion, '')
        textoBorrar = textoBorrar.replace(/\[(?!(\s+|)\w)/gi, '')

        textoComentario = textoBorrar.replace(/^;.*/gm, '')
        
        if(!/\w+/g.test(textoBorrar) || !/\w+/g.test(textoComentario)) {
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
    fs.writeFile(archivo, texto, (err) => {
        if (err) {
            //return console.log(err)
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
        // return archivo == 'ArchivosOriginales\\Usuario_FRM_MAVI.esp.esp' 
        //     || archivo == 'ArchivosOriginales\\ActivarDesafectar.esp'
        //     || archivo == 'ArchivosOriginales\\UsuarioCfg2_FRM_MAVI.esp'
        return fs.statSync(archivo).isFile()
    }).forEach((archivo) => {
        transformar (archivo, recodificar(archivo, recodificacion))
    })
}

fs.readdir(archivosOriginales, (error, archivos) => {
    if (error) throw error
    comprobar(archivosOriginales, archivos)
})