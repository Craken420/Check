[Forma]
Clave=EspecificarAlmacenIFRM
Nombre=<T>Especificar Articulo<T>
Icono=0
Modulos=(Todos)
ListaCarpetas=(Variables)
CarpetaPrincipal=(Variables)
BarraAcciones=S
AccionesTamanoBoton=15x5
ListaAcciones=Aceptar<BR>Cancelar
AccionesCentro=S
AccionesDivision=S
PosicionInicialIzquierda=519
PosicionInicialArriba=442
PosicionInicialAltura=108
PosicionInicialAncho=241
VentanaTipoMarco=Diálogo
VentanaPosicionInicial=Centrado
VentanaExclusiva=S
VentanaEscCerrar=S
PosicionInicialAlturaCliente=111
VentanaBloquearAjuste=S
VentanaEstadoInicial=Normal
ExpresionesAlMostrar=asigna(Mavi.almacenV,<T>I96010<T>)<BR>ASIGNA(INFO.ARTICULOD,NULO)

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
FichaEspacioNombres=62
FichaNombres=Izquierda
FichaAlineacion=Izquierda
FichaColorFondo=Plata
FichaAlineacionDerecha=S
CampoColorLetras=Negro
CampoColorFondo=Blanco
ListaEnCaptura=Mavi.AlmacenV<BR>Info.ArticuloD
CarpetaVisible=S


[Acciones.Aceptar]
Nombre=Aceptar
Boton=0
NombreDesplegar=&Aceptar
EnBarraAcciones=S
TipoAccion=Controles Captura
ClaveAccion=Variables Asignar / Ventana Aceptar
Activo=S
Visible=S

[Acciones.Cancelar]
Nombre=Cancelar
Boton=0
NombreDesplegar=Cancelar
EnBarraAcciones=S
TipoAccion=Ventana
ClaveAccion=Cancelar
Activo=S
Visible=S
[(Variables).Mavi.AlmacenV]
Carpeta=(Variables)
Clave=Mavi.AlmacenV
Editar=N
LineaNueva=S
ValidaNombre=S
3D=S
Tamano=20
ColorFondo=Blanco
ColorFuente=Negro
[(Variables).Info.ArticuloD]
Carpeta=(Variables)
Clave=Info.ArticuloD
Editar=S
LineaNueva=S
ValidaNombre=S
3D=S
Tamano=20
ColorFondo=Blanco
ColorFuente=Negro
