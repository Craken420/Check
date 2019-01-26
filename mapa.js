const fs = require('fs')
const path = require('path')
const {jsonRegEx} = require('./util/jsonRgx')
const {unirComponentes,unirArchivo} = require('./util/unirComponentes')
const {listarArchivos} = require('./util/listarArchivos')
const {leerArchivo,siExisteArchivo} = require('./util/leerArchivo')
const {encode,decode,unifica} = require('./util/encode')
const {buscarDuplicado} = require('./util/eliminarDuplicado')

var dir = {
	original3100: '../3100Capacitacion/Codigo Original',
	original5000: '../5000Capacitacion/Codigo Original',
	reportesMavi: '../5000Capacitacion/Reportes MAVI',
	reportesMavi31: '../3100Capacitacion/Reportes MAVI',
	maviTest: '../5000Capacitacion/Reportes MAVI/test'
}

noVisibles = [
	'Config.Partidas',
	'Config.VIN',
	'General.AccesoPaginas',
	'General.CerrarDia',
	'General.Prod',
	'General.PC',
	'General.Autotransportes',
	'General.ContAuto',
	'General.Espacios',
	'General.Ford',
	'General.Chrysler',
	'General.AC',
	'General.Capital',
	'General.WMS',
	'General.HASP',
	'no General.PM',
	'General.OFER',
	'General.ARO',
	'General.Fiscal',
	'General.eDoc',
	'General.CFDFlex',
	'General.CR',
	'General.CR y CuboActivo(<T>CR<T>)',
	'General.Cambios y CuboActivo(<T>CAM<T>)',
	'CuboActivo(<T>INV_FLUJO<T>)',
	'CuboActivo(<T>AGENT<T>) y CuboActivo(<T>AUTO_RESULTADO<T>)',
	'CuboActivo(<T>SERVEVA<T>)',
	'SQL(<T>SELECT Hist FROM Modulo WHERE Modulo=:tModulo<T>, <T>VTAS<T>)',
	'SQL(<T>SELECT Hist FROM Modulo WHERE Modulo=:tModulo<T>, <T>COMS<T>)',
	'SQL(<T>SELECT Hist FROM Modulo WHERE Modulo=:tModulo<T>, <T>INV<T>)',
	'SQL(<T>SELECT Hist FROM Modulo WHERE Modulo=:tModulo<T>, <T>CXC<T>)',
	'SQL(<T>SELECT Hist FROM Modulo WHERE Modulo=:tModulo<T>, <T>CXP<T>)',
	'SQL(<T>SELECT Hist FROM Modulo WHERE Modulo=:tModulo<T>, <T>NOM<T>)',
	'Version.ModuloCentral',
]

siVisibles = [
	'General.NomAuto','General.PM','General.CMP',
	'CuboActivo(<T>VTAS<T>)',
	'CuboActivo(<T>CXC<T>)',
	'CuboActivo(<T>CXP<T>)',
	'CuboActivo(<T>AF<T>)',
	'CuboActivo(<T>ST_CTE<T>)',
	'CuboActivo(<T>EMB<T>)',
	'CuboActivo(<T>GAS<T>)',
	'CuboActivo(<T>NOM<T>)',
	'CuboActivo(<T>DIN<T>)',
	'CuboActivo(<T>COMS<T>)',
	'CuboActivo(<T>INV<T>)',
	'CuboActivo(<T>SERV<T>)',
	'CuboActivo(<T>PER<T>)',
	'CuboActivo(<T>SL<T>)',
	'CuboActivo(<T>CONT<T>)',
	'CuboActivo(<T>CTE<T>)',
	'CuboActivo(<T>ALM<T>)',
	'CuboActivo(<T>PROY<T>)',
	'CuboActivo(<T>MPROY<T>)',
	'CuboActivo(<T>PROV<T>)',
	'CuboActivo(<T>MAGENTE<T>)',
	'CuboActivo(<T>RETARDO<T>)',
	'CuboActivo(<T>IVA<T>)'
]

var MenuPrincipal = path.join(dir.maviTest,'MenuPrincipal.dlg')
var MenuPrincipalEsp = path.join(dir.maviTest,'MenuPrincipal_DLG_MAVI.esp')
// var texto = leerArchivo(MenuPrincipalEsp)
// var MenuPrincipalEsp = leerArchivo(path.join(dir.maviTest,'MenuPrincipal_DLG_MAVI.esp'))

MenuPrincipal = decode(leerArchivo(MenuPrincipal),MenuPrincipal)
MenuPrincipalEsp = decode(leerArchivo(MenuPrincipalEsp),MenuPrincipalEsp)

var objeto = unifica(MenuPrincipal,MenuPrincipalEsp,'MenuPrincipal.dlg')

// fs.appendFileSync('test.txt',JSON.stringify(objeto)+'\n')
//	Verifica si hay duplicados en la listaAcciones

var componentes = Object.keys(objeto)
	.filter(x =>/^Acciones\./g.test(x))
	.map(x => x.replace('Acciones.',''))

var listaAcciones = objeto['Dialogo']['ListaAcciones']

listaAcciones.forEach(accion => {
	if(componentes.indexOf(accion) < 0){
		fs.appendFileSync('log.txt',`Funcional: en el archivo: {nombreArchivo} en ListaAcciones: ${accion} no tiene componente\n`)
	}
})

var componentes = componentes.filter(componente => {

	if(listaAcciones.indexOf(componente) < 0){
		fs.appendFileSync('log.txt',`Funcional: en el archivo: {nombreArchivo} en el componente: ${componente} no esta en la listaAcciones\n`)
	}
	// console.log(objeto['Acciones.'+componente]['EnMenu'],componente)
	if(!objeto['Acciones.'+componente]['EnMenu'] || objeto['Acciones.'+componente]['EnMenu'] != 'S') {
		fs.appendFileSync('log.txt',`Funcional: en el archivo: {nombreArchivo} en el componente: ${componente} no tiene EnMenu=S\n`)
	}

	if (objeto['Dialogo']['MenuPrincipal'].indexOf(objeto['Acciones.'+componente]['Menu']) < 0){
		fs.appendFileSync('log.txt',`Funcional: en el archivo: {nombreArchivo} en el componente: ${componente} apunta a un menu inexistente\n`)
	}

	if(objeto['Acciones.'+componente]['Visible'] && objeto['Acciones.'+componente]['VisibleCondicion']){
		// console.log(objeto['Acciones.'+componente]['Visible'],componente)
		fs.appendFileSync('log.txt',`Funcional: en el archivo: {nombreArchivo} en el componente: ${componente} tiene Visible y VisibleCondicion\n`)
	}

	if(objeto['Acciones.'+componente]['VisibleCondicion'] && objeto['Acciones.'+componente]['Visible'] != 'S'){
		if(noVisibles.indexOf(objeto['Acciones.'+componente]['VisibleCondicion']) > -1){
			fs.appendFileSync('log.txt',`Advertencia: en el archivo: {nombreArchivo} en el componente: ${componente} VisibleCondicion retorna falso\n`)
		}
		if(siVisibles.indexOf(objeto['Acciones.'+componente]['VisibleCondicion']) < 0
			&& noVisibles.indexOf(objeto['Acciones.'+componente]['VisibleCondicion']) < 0){
			fs.appendFileSync('log.txt',`Acceso: en el archivo: {nombreArchivo} en el componente: ${componente} Favor de revisar condicion att Beto\n`)
		}
	}

	if(objeto['Acciones.'+componente]['Nombre'] != componente){
		fs.appendFileSync('log.txt',`Acceso: en el archivo: {nombreArchivo} en el componente: ${componente} el nombre es diferente al componente\n`)
	}

	return listaAcciones.indexOf(componente) > -1
		&& objeto['Acciones.'+componente]['EnMenu']
		&& objeto['Acciones.'+componente]['EnMenu'] == 'S'
		&& objeto['Dialogo']['MenuPrincipal'].indexOf(objeto['Acciones.'+componente]['Menu']) > -1
		&& (objeto['Acciones.'+componente]['Visible'] == 'S'
			|| noVisibles.indexOf(objeto['Acciones.'+componente]['VisibleCondicion']) < 0)
})

// console.log(
	// siExisteArchivo('FoRmAs 	 ','CR',dir.original3100,dir.reportesMavi),
	// siExisteArchivo('FoRmAs 	 ','MAVIClaveSeguimiento',dir.original3100,dir.reportesMavi),
	// siExisteArchivo('FoRmAs 	 ','Cxc',dir.original3100,dir.reportesMavi),
	// siExisteArchivo('Otros','Calculadora',dir.original3100,dir.reportesMavi),
	// siExisteArchivo('Reportes Pantalla','MaviSupervisionMaestro',dir.original3100,dir.reportesMavi),
	siExisteArchivo('Expresion','Si(Usuario.ModifComisnsChoferesMAVI, Forma(<T>ProductividadEMBMAVI<T>), Forma(<T>ProductividadEMBMAVI<T>))',dir.original3100,dir.reportesMavi)
// )
// console.log(componentes)


// console.log(listaAcciones.length,componentes.length,objeto['Dialogo']['MenuPrincipal'])

// console.log(noVisibles,siVisibles)
// 		}
// 		// console.log(compBase,MenuPrincipal['Acciones.Mov.Ventas'])
// 	// }

// }

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


