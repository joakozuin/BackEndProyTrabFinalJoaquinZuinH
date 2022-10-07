/* import  Api from '../modelo/apiClass.js';
const api=new Api('/dataBase/productos.json'); */

import {productosDao as api}   from "../persistencia/daos/factory.js";

import {funcUtil} from '../util/util.js'
const{calcFechaHora}=funcUtil



export const funcProductos = {

  //Envia todos los productos
  //
  getProductos: async (req, res, next) => {
    try {

      let productos = await api.findAll();

      res.json({
        mensage: "Lista de Productos de la BD",
        productos,
       });
    } catch (error) {
      const error1 = new Error(
        `(getAll)-No se encuentran los productos error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }
  },

  //Envia un producto por id
  //
  getProducto: async (req, res, next) => {
    try {

      const { id } = req.params;
      
        let prod = await api.findById(id);

        res.json({
          mensage: `Producto con id:${id}`,
          producto: prod,
         });
    

    } catch (error) {
      const error1 = new Error(
        `(getId)-No se encuentra el producto error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }
  },

  //Envia un producto por Categoria
  //
  getCatProducto: async (req, res, next) => {
    try {
      const { cat } = req.params;

      let prod = await api.findAllByCat(cat);

      res.json({
        mensage: `Productos por Categoria:${cat}`,
        producto: prod,
      });
    } catch (error) {
      const error1 = new Error(
        `(getId)-No se encuentra los productos por categoria error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }
  },
  //Agrega un producto
  //
  postProducto: async (req, res, next) => {
    try {
      const { fecha, nombre, descripcion, codigo, urlFoto, precio, stock,categoria} =
        req.body;

      let producto = {
        fecha: calcFechaHora(),
        nombre,
        descripcion,
        codigo: Number(codigo),
        urlFoto,
        precio: Number(precio),
        stock: Number(stock),
        categoria:categoria
      };
     

      let idProd = await api.create(producto);

      
      res.json({
        mensage: `Se agregó el producto con id:${idProd._id}`,
        producto,
      });
    } catch (error) {
      const error1 = new Error(
        `(post)-No se pudo agregar un producto error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }
  },

  //Agrega un producto desde un formulario
  //
  postFormProducto: async (req, res,next) => {
    try {
      const { fecha, nombre, descripcion, codigo, urlFoto, precio, stock,categoria } =
        req.body;

      let producto = {
        fecha: calcFechaHora(),
        nombre,
        descripcion,
        codigo: Number(codigo),
        urlFoto,
        precio: Number(precio),
        stock: Number(stock),
        categoria:categoria
      };

      let prod = await api.create(producto);

      res.redirect("/");

    } catch (error) {
      const error1 = new Error(
        `(post)-No se pudo agregar un producto desde el formulario error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }

   



  },

  //Modifica un producto
  //
  putProducto: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fecha, nombre, descripcion, codigo, urlFoto, precio, stock } =
        req.body;

      let producto = {
        fecha: calcFechaHora(),
        nombre,
        descripcion,
        codigo,
        urlFoto,
        precio,
        stock,
      };

      let prod = await api.editById(id, producto);

      res.json({
        mensage: `Se modificó el producto con id:${id}`,
        producto,
      });
    } catch (error) {
      const error1 = new Error(
        `(put)-No se pudo modificar el producto error: ${error}`
      );
      error.httpStatusCode = 400;
      return next(error1);
    }
  },

  //Borrar un producto
  //
  deleteProducto: async (req, res, next) => {
    try {
      const { id } = req.params;

      let producto = await api.findById(id);

      let prod = await api.deleteById(id);

      res.json({
        mensage: `Se borró el producto con id:${id}`,
        producto
      });
    } catch (error) {
      const error1 = new Error(
        `(delete)-No se pudo borrar el producto, error: ${error}`
      );
      error.httpStatusCode = 400;
      return next(error1);
    }
  },
};
