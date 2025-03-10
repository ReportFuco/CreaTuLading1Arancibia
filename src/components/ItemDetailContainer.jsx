import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemCount from './ItemCount';


const productosMock = [
  { id: '1', nombre: 'Producto 1', descripcion: 'Descripción del producto 1', stock: 10 },
  { id: '2', nombre: 'Producto 2', descripcion: 'Descripción del producto 2', stock: 5 },
  { id: '3', nombre: 'Producto 3', descripcion: 'Descripción del producto 3', stock: 8 },
];

const fetchProduct = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = productosMock.find(prod => prod.id === id);
      if (producto) {
        resolve(producto);
      } else {
        reject('Producto no encontrado');
      }
    }, 1000);
  });
};

function ItemDetailContainer() {
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id)
      .then(data => setProducto(data))
      .catch(err => setError(err));
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!producto) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{producto.nombre}</h1>
      <p>{producto.descripcion}</p>
      <p>Stock: {producto.stock}</p>
      <ItemCount stock={producto.stock} initial={1} />
    </div>
  );
}

export default ItemDetailContainer;
