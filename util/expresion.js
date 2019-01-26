const {jsonRegEx} = require('./jsonRgx')

exports.buscaArchivo = function (expresion) {
	// expresion = expresion.replace('<T>',"'")
	console.log(expresion.match(jsonRegEx.parentesisAnidados))
	return 'ProductividadEMBMAVI.frm'
}