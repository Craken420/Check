const fs = require('fs')
const path = require('path')
const {jsonRegEx} = require('./util/jsonRgx')
const {unirComponentes,unirArchivo} = require('./util/unirComponentes')
const {listarArchivos} = require('./util/listarArchivos')
const {leerArchivo} = require('./util/leerArchivo')
const {encode,decode} = require('./util/encode')

var dir = {
	original3100: '../3100Capacitacion/Codigo Original',
	original5000: '../5000Capacitacion/Codigo Original',
	reportesMavi: '../5000Capacitacion/Reportes MAVI',
	maviTest: '../5000Capacitacion/Reportes MAVI/test'
}

var archivo = leerArchivo(path.join(dir.maviTest,'AAA.dlg'))
// var MenuPrincipalEsp = leerArchivo(path.join(dir.maviTest,'MenuPrincipal_DLG_MAVI.esp'))

console.log(decode(archivo))

// var texto = unirArchivo(MenuPrincipal,MenuPrincipalEsp)
// var ts = leerDlg()
// console.log(ts['contenido']['Dialogo'])
// // console.log([ '[MenuPrincipal.dlg/Dialogo.dafs.dagfd]',
//   '[Acciones.Herramienta.CosteoFleteMAVI]',
// 	'[Acciones.Exp.MaviRefin]' ].map(x => x.match(jsonRegEx.nombreComponente))
// 	)
// console.log(unirComponentes('a','b'))


function leerDlg(file){
	var archivo = {
		"archivo":"AAA.dlg",
		"extension":".dlg",
		"tipo":"Dialogo",
		"origen":"Mavi",
		"contenido":{
			"Dialogo":{
				"componente":"Dialogo",
				"tipo":"Principal",
				"contenido":{
					"Clave":"AAA",
					"Nombre":"Menú",
					"Icono":14,
					"TipoDialogo":"Menú",
					"Modulos":"(Todos)",
					"Fuente":"{Tahoma, 8, Negro, []}",
					"MenuEstilo":"Lista Opciones",
					"MenuColumnas":1,
					"AccionesTamanoBoton":"15x5",
					"AccionesDerecha":"S",
					"ListaAcciones":"Expresions",
					"PosicionInicialAlturaCliente":80,
					"PosicionInicialAncho":500
				}
			},
			"Acciones.Expresion":{
				"componente":"Acciones.Expresion",
				"tipo":"Accion",
				"contenido":{
					"Nombre":"Expresion",
					"Boton":0,
					"NombreDesplegar":"Expresion",
					"EnMenu":"S",
					"EnBarraAcciones":"S",
					"TipoAccion":"Expresion",
					"Expresion":"Informacion(<T>Hola<T>)",
					"Activo":"S",
					"Visible":"S"
				}
			}
		}
	}
	return archivo
}