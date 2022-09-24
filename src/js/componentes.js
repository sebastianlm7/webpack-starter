import '../css/componentes.css' // importo mi archivo de estilos CSS gracias a html y css loader (webpack)


export const saludar = (nombre => { // con export exporto la funcion que quiero usar

    console.log('Creando etiqueta h1')

    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${ nombre }!!!`;

    document.body.append( h1 );


})
