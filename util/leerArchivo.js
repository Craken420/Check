const fs = require('fs')
const path = require('path')
const {buscaArchivo} = require('./expresion')

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

exports.siExisteArchivo = function(TipoAccion,ClaveAccion,Original,Reporte) {
	// switch (TipoAccion.trim().toLowerCase()) {
	switch (true) {
		case /^formas/gi.test(TipoAccion):
			ClaveAccion = ClaveAccion.trim() + '.frm'
			break
		case /^dialogo/gi.test(TipoAccion):
			ClaveAccion = ClaveAccion.trim() + '.dlg'
			break
		case /^reportes/gi.test(TipoAccion):
			ClaveAccion = ClaveAccion.trim() + '.rep'
			break
		case /^expresion/gi.test(TipoAccion):
			ClaveAccion = buscaArchivo(ClaveAccion)
			break
		default:
		break
	}

	var isFile = {
		existe: false,
		claveAccion: ClaveAccion,
		origen: '',
		tieneEsp: false,
		archivoEsp:'',
		rutaArchivo: '',
		rutaArchivoEsp: ''
	}
	try{
		var ruta = path.join(Original,ClaveAccion)
		var file = fs.statSync(ruta)
		isFile.existe = file.isFile()
		isFile.origen = /Codigo Original/gm.test(ruta) ? 'Codigo Original' : ''
		isFile.rutaArchivo = ruta
		var espFile = ClaveAccion.split('.').map((x,k)=>k==1 ? x.toUpperCase() : x).join('_')+'_MAVI.esp'
		try{
			var rutaEsp = path.join(Reporte,espFile)
			var fileEsp = fs.statSync(rutaEsp)
			isFile.tieneEsp = fileEsp.isFile()
			isFile.archivoEsp = espFile
			isFile.rutaArchivoEsp = rutaEsp
		} catch(ex){}
	} catch(ex){}
	try{
		var ruta = path.join(Reporte,ClaveAccion)
		var file = fs.statSync(ruta)
		isFile.existe = file.isFile()
		isFile.origen = /Reportes MAVI/gm.test(ruta) ? 'Reportes MAVI' : ''
		isFile.rutaArchivo = ruta
	} catch(ex){}
	// console.log(TipoAccion,ClaveAccion,isFile.existe,path.join(Original,ClaveAccion))
	return isFile
}