const socket = io();

socket.on('loadProducts', async (msg) => {
    console.log(msg);
    try {
        const response = await fetch('http://localhost:8080/api/product'); 
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const productos = await response.json();
        const productsTableBody = document.querySelector('#productsTable tbody');

        productsTableBody.innerHTML = '';

        productos.forEach((prod) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${prod.id}</td>
                <td>${prod.title}</td>
                <td>${prod.price}</td>
                <td><a href="#" class="delete-link" data-id="${prod.id}">Eliminar</a></td>
            `;
            productsTableBody.appendChild(row);
        });

        const deleteLinks = document.querySelectorAll('.delete-link');
        deleteLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.target.getAttribute('data-id');
                socket.emit('deleteProducto', id);
            });
        });

    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
});

socket.on('productCreated', (prod) => {
    const productsTableBody = document.querySelector('#productsTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${prod.id}</td>
        <td>${prod.title}</td>
        <td>${prod.price}</td>
        <td><a href="#" class="delete-link" data-id="${prod.id}">Eliminar</a></td>
    `;
    productsTableBody.appendChild(row);

    // Add event listener to the new delete link
    const deleteLink = row.querySelector('.delete-link');
    deleteLink.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        socket.emit('deleteProducto', id);
    });
});

socket.on('productDeleted', (id) => {
    const rowToDelete = document.querySelector(`a[data-id="${id}"]`).closest('tr');
    if (rowToDelete) {
        rowToDelete.remove();
    }
});

const form = document.getElementById('formProductos');

form.onsubmit = (e) => {
    const producto = {
        title: String(document.getElementById('nameProd').value),
        description : String(document.getElementById('nameProd').value),
        code : String(document.getElementById('idProd').value),
        price : Number(document.getElementById('precioProd').value),
        stock: 100,
        category: String(document.getElementById('categoriaProd').value),
        thumbnails: "thumbnails prod3"
    }
    socket.emit('newProducto', producto);
}
