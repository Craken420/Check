const fs = require('fs')
const path = require('path')

exports.leerArchivo = function (archivo,codificacon) {
	fileType = fs.statSync(path.join(archivo))
	var texto = ''
	if(fileType.isFile()){
		var texto = fs.readFileSync(path.join(archivo),{encoding:'latin1'}) + '\n'
		texto = texto.replace(/^;.*/gm, '')
		texto = texto.replace(/^\n[\s\t]*/gm, '')
	}
	return texto
}