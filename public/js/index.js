const socket = io();

// socket.on('saludoDesdeBack',(msg) => {
//     console.log(msg);    
//     socket.emit('respuestaDesdeFront', 'gracias!')
// })

const form = document.getElementById('formProductos');

form.onsubmit = (e) =>{
    const producto = {
        id : document.getElementById('idProd').value,
        descripcion : document.getElementById('nameProd').value,
        precio : document.getElementById('precioProd').value
    }
    socket.emit('newProducto', producto);

}

socket.on('listaProductos',(productos)=>{    
    let infoProducts = '';
    productos.forEach((prod)=>{
        infoProducts += `${prod.descripcion} - ${prod.precio} </br>`;
    })
    productsList.innerHTML = infoProducts    
})