[Forma]
Clave=EspecificarImporteConImpuestosVtas
Nombre=Importe con Impuestos Incluidos
Icono=0
Modulos=(Todos)
ListaCarpetas=(Variables)
CarpetaPrincipal=(Variables)
PosicionInicialIzquierda=505
PosicionInicialArriba=449
PosicionInicialAlturaCliente=98
PosicionInicialAncho=270
VentanaTipoMarco=Diálogo
VentanaPosicionInicial=Centrado
VentanaExclusiva=S
VentanaEscCerrar=S
BarraAcciones=S
AccionesTamanoBoton=15x5
ListaAcciones=Aceptar<BR>Cancelar
AccionesCentro=S
VentanaEstadoInicial=Normal
ExpresionesAlMostrar=Asigna(Info.PorcentajeImpuesto,SQL(<T>Select DefImpuesto from EmpresaGral where Empresa=:tval1<T>,Empresa))

[(Variables)]
Estilo=Ficha
Clave=(Variables)
PermiteEditar=S
AlineacionAutomatica=S
AcomodarTexto=S
MostrarConteoRegistros=S
Zona=A1
Vista=(Variables)
Fuente={Tahoma, 8, Negro, []}
FichaEspacioEntreLineas=6
FichaEspacioNombres=100
FichaEspacioNombresAuto=S
FichaNombres=Izquierda
FichaAlineacion=Izquierda
FichaColorFondo=Plata
FichaAlineacionDerecha=S
CampoColorLetras=Negro
CampoColorFondo=Blanco
ListaEnCaptura=Info.Importe<BR>Info.PorcentajeImpuesto
CarpetaVisible=S

[(Variables).Info.Importe]
Carpeta=(Variables)
Clave=Info.Importe
Editar=S
LineaNueva=S
ValidaNombre=S
3D=S
Tamano=20
ColorFondo=Blanco
ColorFuente=Negro

[(Variables).Info.PorcentajeImpuesto]
Carpeta=(Variables)
Clave=Info.PorcentajeImpuesto
Editar=N
LineaNueva=S
ValidaNombre=S
3D=S
Tamano=5
ColorFondo=Blanco
ColorFuente=Negro

[Acciones.Aceptar]
Nombre=Aceptar
Boton=0
NombreDesplegar=<T>&Aceptar<T>
EnBarraAcciones=S
TipoAccion=Controles Captura
ClaveAccion=Variables Asignar / Ventana Aceptar
Activo=S
Visible=S

[Acciones.Cancelar]
Nombre=Cancelar
Boton=0
NombreDesplegar=<T>&Cancelar<T>
EnBarraAcciones=S
TipoAccion=Ventana
ClaveAccion=Cancelar
Activo=S
Visible=S
