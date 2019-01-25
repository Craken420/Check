const fs = require('fs')
const {jsonRegEx} = require('./jsonRgx')

exports.decode = function(texto){
	// texto = texto.replace(jsonRegEx.clsComentarios,'')
	fs.appendFileSync('test.txt',JSON.stringify({'algo': jsonRegEx.clsComentarios}))
	return {'algo': jsonRegEx.clsComentarios}

}

exports.encode = function(){

}
