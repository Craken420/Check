let cadena = `;**** Ultima modificación:20-Oct-08
;**** Modifico:Leticia Quezada Garcia
;**** Se modifico: Se agrego el campo CentroCostos.DiaEspeMAVI
ola`

cadena =  cadena.replace(/^;.*/gm, '')

console.log(cadena)

fs.open('/open/some/file.txt', 'r', (err, fd) => {
    if (err) throw err;
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  });

  texto = texto.replace(/((?=[\ \t])|^\s+|$)+/mg, '')
  texto = texto.replace(/\[/g, ' \n[')