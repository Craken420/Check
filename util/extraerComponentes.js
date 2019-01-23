
exports.extraerAccionesDelContenido = function (contenidoArchivo) {
    contenidoArchivo = contenidoArchivo + '\n['

    let acciones = contenidoArchivo.match(/\[.*?.*?[^*]*?(?=\[)/g)
    for (key in acciones) {
        //appendArchivo(carpeta + '4.-Acciones.txt', accion)
        let nombreAccion = acciones[key].match(/(?!\[\])\[.*?\]/g)

        if (nombreAccion != null) {
            appendArchivo(carpeta + '3.-ObjetosEncontrados.txt', '\t\t' + nombreAccion + ':')
            // appendArchivo(carpeta + '4.-ObjetosEncontradosJSON.txt', '\t\t\t\"' + nombreAccion + '\":')
        }

        if (acciones[key] != null) {
             //Enviar las acciones
            let textoFinal = extraerObjetosCampo(texto, tipoCampo)
            //console.log('coding', textoFinal)
            if(textoFinal != null && textoFinal != undefined) {
                fq.crearArchivoPrueba(archivo, textoFinal.replace(/^\n[\s\t]*/gm, ''))
                let detected = chardet.detectFileSync(archivo)
                //console.log('detected', detected)
            }
        }
    }
    // appendArchivo(carpeta + '4.-ObjetosEncontradosJSON.txt', '\t\t}\n\t}\n}' )
}