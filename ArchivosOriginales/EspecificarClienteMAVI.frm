[Forma]
Clave=EspecificarClienteMAVI
Nombre=Especificar Cliente
Icono=0
Modulos=(Todos)
ListaCarpetas=(Variables)
CarpetaPrincipal=(Variables)
PosicionInicialIzquierda=513
PosicionInicialArriba=341
PosicionInicialAltura=106
PosicionInicialAncho=253
VentanaTipoMarco=Normal
VentanaPosicionInicial=Centrado
VentanaExclusiva=S
AccionesTamanoBoton=15x5
ListaAcciones=Aceptar<BR>Cancelar
BarraAcciones=S
AccionesCentro=S
AccionesDivision=S
PosicionInicialAlturaCliente=81
VentanaEstadoInicial=Normal
VentanaSinIconosMarco=S
ExpresionesAlMostrar=Asigna(Info.ClienteA,Info.ClienteD)

[(Variables)]
Estilo=Ficha
Clave=(Variables)
PermiteEditar=S
AlineacionAutomatica=S
AcomodarTexto=S
MostrarConteoRegistros=S
Zona=A1
Vista=(Variables)
Fuente={MS Sans Serif, 8, Negro, []}
FichaEspacioEntreLineas=6
FichaEspacioNombres=100
FichaEspacioNombresAuto=S
FichaNombres=Izquierda
FichaAlineacion=Izquierda
FichaColorFondo=Plata
FichaAlineacionDerecha=S
CampoColorLetras=Negro
CampoColorFondo=Blanco
ListaEnCaptura=Info.ClienteD
CarpetaVisible=S


[Acciones.Aceptar]
Nombre=Aceptar
Boton=23
NombreEnBoton=S
NombreDesplegar=&Aceptar
EnBarraHerramientas=S
TipoAccion=Controles Captura
ClaveAccion=Variables Asignar / Ventana Aceptar
Activo=S
Visible=S
EnBarraAcciones=S
GuardarAntes=S
Multiple=S
ListaAccionesMultiples=VentanaAcepta

[Acciones.Cancelar]
Nombre=Cancelar
Boton=36
NombreEnBoton=S
NombreDesplegar=<T>&Cancelar<T>
EnBarraHerramientas=S
TipoAccion=Ventana
ClaveAccion=Cancelar
Activo=S
Visible=S
EnBarraAcciones=S
Antes=S
AntesExpresiones=Asigna(Info.ClienteD,Info.ClienteA)
[(Variables).Info.ClienteD]
Carpeta=(Variables)
Clave=Info.ClienteD
Editar=S
LineaNueva=S
ValidaNombre=S
3D=S
Tamano=20
ColorFondo=Blanco
ColorFuente=Negro
[Acciones.Aceptar.VentanaAcepta]
Nombre=VentanaAcepta
Boton=0
TipoAccion=Ventana
ClaveAccion=Aceptar
Activo=S
ConCondicion=S
Visible=S
EjecucionConError=S
EjecucionCondicion=Si((SQL(<T>SELECT COUNT(*) FROM Cte WHERE Cliente=:tCte<T>,Info.ClienteD))>0,Verdadero,Falso)
EjecucionMensaje=<T>Cliente No Existe<T>
