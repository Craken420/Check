const fs = require('fs')
const {jsonRegEx} = require('./jsonRgx')
const {buscarDuplicado} = require('./eliminarDuplicado')

exports.decode = function(texto,ruta){
	var objeto = {}
	if(jsonRegEx.hasComponente.test(texto)){
		// var componentesTitulos = texto.match(jsonRegEx.hasComponente).map(x => x.replace('[','').replace(']',''))
		// componentesTitulos.forEach(componenteTitulo => { objeto[componenteTitulo] = {}})

		var componentes = texto.match(jsonRegEx.inComponente)
		componentes.forEach(componente => {
			var componenteTitulo = componente.match(jsonRegEx.hasComponente).join().replace('[','').replace(']','')
			if(/^\w.*/gm.test(componente)){
				if(objeto[componenteTitulo] != undefined){
					// si esta repetido el compomente, debe de borrar el anterior y dejar el ultimo leido
					fs.appendFileSync('log.txt',`Funcional: el componente: ${componenteTitulo} esta repetido en al archivo: ${ruta}\n`)
				}
				objeto[componenteTitulo] = {}
				var lineas = componente.match(/^\w.*/gm)
				lineas.forEach(linea => {
					var campo = linea.match(/^.*?=/gm)
					campo = campo ? campo.join('').replace(/=$/gm,'').replace(/'/gm,"''") : 'NULL'
					var valor = linea.match(/(?!\w)=.*/gm)
					valor = valor ? valor.join('').replace(/^=/gm,'').replace(/'/gm,"''") : 'NULL'
					if(objeto[componenteTitulo][campo] == undefined)
						objeto[componenteTitulo][campo] = valor.trim()
					else
					fs.appendFileSync('log.txt',`Funcional: el campo: ${campo} esta repetido en el componete ${componenteTitulo} del archivo: ${ruta}\n`)
					// si se repite un campo en un mismmo comonente debe de tomar el primero
				})
			} else {
				fs.appendFileSync('log.txt',`Funcional: el componente: ${componenteTitulo} esta vacio en al archivo: ${ruta}\n`)
				// Si el componete esta vasio, intelisis lo ignora
			}
		})
		// if
	} else {
		fs.appendFileSync('log.txt',`Funcional: el archivo: ${ruta} no tiene componentes\n`)
		// archivo vacio
	}
	// fs.appendFileSync('test.txt',JSON.stringify(objeto)+'\n')

	return objeto

}

exports.encode = function(){

}

exports.unifica = function(original,especial,nombreArchivo){
	var prepare = nombreArchivo.replace('.','\\.')
	var regex = new RegExp(`${prepare}`,'gi')
	for(comp in especial){
		// var esIgual = regex.test(comp)
		// console.log(regex.test(comp),!esIgual,regex,comp)
		// if(!esIgual)
		// 	fs.appendFileSync('log.txt',`${regex} ${comp} el nombre del ojeto al que se refiere no es correcto\n`)
		var compBase = comp.split('/')[1]
		if(original[compBase] == undefined) original[compBase] = {}
		for(lin in especial[comp]){
			// console.log(comp,lin)
			if(original[compBase][lin] == especial[comp][lin])
				fs.appendFileSync('log.txt',`Estetico: en el componete: ${compBase} el campo: ${lin} y valor ya esta igual en el objeto original\n`)
			if(original[compBase][lin] == undefined)
			original[compBase][lin] = {}
			original[compBase][lin] = especial[comp][lin]
		}
		var minimo = Object.keys(original[compBase]).filter(x => !/\d{3}$/gm.test(x))
		minimo.forEach(min => {
			var secuencia = 2
			var siguiente = min+'0'.repeat(3-secuencia.toString().length)+secuencia
			var actual = min
			while(/<CONTINUA>$/gm.test(original[compBase][actual]) && /^<CONTINUA>/gm.test(original[compBase][siguiente])){
				// console.log(actual,siguiente,compBase,min,/<CONTINUA>$/gm.test(original[compBase][min]))
				// console.log(/^<CONTINUA>/gm.test(original[compBase][siguiente]),actual,siguiente,compBase)
				original[compBase][min] = original[compBase][min].replace(/<CONTINUA>$/gm,'') + original[compBase][siguiente].replace(/^<CONTINUA>/gm,'')
				secuencia++
				siguiente = min+'0'.repeat(3-secuencia.toString().length)+secuencia
			}
			original[compBase][min] = original[compBase][min].replace(/<CONTINUA>$/gm,'')
			original[compBase][min] = original[compBase][min].replace(/<BR>$/gm,'')
			if(/<BR>/gm.test(original[compBase][min])){
				original[compBase][min] = original[compBase][min].split('<BR>')
			}
			// console.log(compBase,min,original[compBase][min])
			// console.log(original[compBase][min])
		})
		var borrar = Object.keys(original[compBase]).filter(x => /\d{3}$/gm.test(x))
		borrar.forEach(borr => delete original[compBase][borr])//console.log(borr))//original[compBase][borr]) )
		// console.log(Object.keys(original[compBase]).filter(x => !/\d{3}$/gm.test(x)))
	}

	if(original['Dialogo']['ListaAcciones.Cambios']){
		original['Dialogo']['ListaAcciones.Cambios'].forEach(x => {
			original['Dialogo']['ListaAcciones'].push(x.split('<TAB>')[1])
		})
		delete original['Dialogo']['ListaAcciones.Cambios']
	}

	var listaDuplicados = buscarDuplicado(original['Dialogo']['ListaAcciones'])
	if(listaDuplicados.length > 0){
		listaDuplicados.forEach((x,k) => {
			fs.appendFileSync('log.txt',`Funcional: en el archivo: ${nombreArchivo} en ListaAcciones esta duplicado: ${x}\n`)
			original['Dialogo']['ListaAcciones'].splice(k,1)
		})
	}

	return original
}
