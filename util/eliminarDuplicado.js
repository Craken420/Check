exports.eliminarDuplicado = function (arreglo) {
    let set                 = new Set( arreglo.map( JSON.stringify ) )
    let arrSinDuplicaciones = Array.from( set ).map( JSON.parse );
    return arrSinDuplicaciones
    //console.log( arrSinDuplicaciones );
}