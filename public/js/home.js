
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:8080/api/product'); 
        if (!response.ok) {
            throw new Error('respuesta erronea ' + response.statusText);
        }
        const productos = await response.json();

        const productsTableBody = document.querySelector('#productsTable tbody');

        productos.forEach((prod) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${prod.id}</td>
                <td>${prod.title}</td>
                <td>${prod.price}</td>
            `;
            productsTableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
});