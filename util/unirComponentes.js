function unirComponentes (cmpDominador, cmpDenominador) {
    //console.log(cmpDenominador)
    let arregloCmpDenominador = cmpDenominador.replace(/^\n$|\r/gm, '').split('\n')
    //console.log('arreglocmpDenominador\n',arreglocmpDenominador[4])
    //console.log(cmpDenominador)
    let campo = []
    for (key in arregloCmpDenominador) {
        if(/.*?=/g.test(arregloCmpDenominador[key])) {
            campo.push(arregloCmpDenominador[key].match(/^(?!\s+).*?\=/gm).join(''))
        }
    }
    // console.log('1',campo)
    campo = eliminarDuplicado(campo)
    // console.log(campo)
    for (key2 in campo) {
        //if (campo[key2] != 'undefined'||campo[key2] != undefined) {
        let campoRegEx = new RegExp(`^${campo[key2]}`, `m`)
        //console.log(campo[key2])
        if (campoRegEx.test(cmpDominador)) {
        // console.log('Se encuentra en ambas', campoRegEx)
            let campoBuscar = new RegExp(`${campo[key2]}.*`, ``)
            //console.log('campoBuscar',campoBuscar)
            let campoRemplazar = new RegExp(`^${campo[key2]}.*`, `m`)
            // console.log('campoRemplazar',campoRemplazar)
            let remplazo = cmpDenominador.match(campoRemplazar).join('')
            //console.log('campoRemplazar',campoRemplazar)
            //console.log(`cmpDominador.replace(${campoBuscar}, ${remplazo})`)
            cmpDominador = cmpDominador.replace(campoBuscar, remplazo)
            //console.log(cmpDominador)
        } else {
            // console.log('No encuentra en ambas', campoRegEx)
            let campoAgregar = new RegExp(`^${campo[key2]}.*`, `m`)
            // console.log('campoAgregar',campoAgregar)
            cmpDominador += '\n' + cmpDenominador.match(campoAgregar).join('')
        }
    }
    //fq.appendArchivo(carpetas.carpetaTesting + '6-extraccionUnificadaCmpDominador.txt', cmpDominador)
    return cmpDominador
}