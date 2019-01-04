[Forma]
Clave=EspecificarClienteA
Nombre=Endosar Documentos
Icono=0
Modulos=(Todos)
ListaCarpetas=(Variables)
CarpetaPrincipal=(Variables)
PosicionInicialIzquierda=524
PosicionInicialArriba=343
PosicionInicialAltura=106
PosicionInicialAncho=231
VentanaTipoMarco=Diálogo
VentanaPosicionInicial=Centrado
VentanaExclusiva=S
VentanaEscCerrar=S
AccionesTamanoBoton=15x5
ListaAcciones=Aceptar<BR>Cancelar
BarraAcciones=S
AccionesCentro=S
AccionesDivision=S
PosicionInicialAlturaCliente=79

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
ListaEnCaptura=Info.ClienteA
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
[(Variables).Info.ClienteA]
Carpeta=(Variables)
Clave=Info.ClienteA
Editar=S
LineaNueva=S
ValidaNombre=S
3D=S
Tamano=20
ColorFondo=Blanco
ColorFuente=Negro
