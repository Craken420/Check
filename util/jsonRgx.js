exports.jsonRegEx = {
    'clsComentarios': /\;.*/g,
    'clsAmpersand':   /\&/g,
    'reducirRuta':    /.*\\/,
    'buscarSaltoLinea': /\s\n(?=\w)(?!$)/g,
    'clsSaltoLinea': /((?=[\ \t])|^\s+|$)+/mg,
    'metodos': {
      'limpiarComentarios': texto => {return texto.replace(this.clsComentarios, '')},
      'limpiarRuta':        ruta => { return ruta.replace(this.reducirRuta, '')},
      'remplazarPunto':     texto => {return texto.replace(/\./g, '\\.')},
      'limpiarSaltoLinea':  texto => { return texto.replace(this.clsSaltoLinea, '') },
      'retornoCarroPorComa': texto => { return texto.replace(this.buscarSaltoLinea, ', ')},
      'prepararObjeto': texto => { 
          texto = texto.replace(/=/g, ':').replace(/\[.*?(?=\/)|\]/g, '')
          texto = texto.replace(/(?<=\/\w+)\./g, ':').replace(/\//, '')
          texto = texto.replace(/[^\w:,\.]/gm, "").replace(/,/g, ', ')
          return texto
        }
    }
}