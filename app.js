const fs=require('fs');
const http=require('http');
const port=8080;
const express=require('express');
const { error } = require('console');
const app=express;
app.use(express.urlencoded({extended:true}))
const productManager=require('./productManager')

const server=http.createServer((req,res)=>{
  res.writeHead(200,{'content-type':'text/plain'});
  res.end ('Hola mundo!');
})
server.listen(8080,()=>{
  console.log("Listen on port 8080")
})


app.get ('/productos',(req,res)=>{
    fs.readFile('Productos.JSON','utf-8',(err,data)=>{
        if(err){
            res.status(500).send('Error al leer el archivo')
            return;
        }
        const allProducts = productManager.obtenerProductos();
          res.json(allProducts);
    })
})

app.get('/productos/:productId',(req,res)=>{
  const productId= parseInt(req.params.productId,1);
  fs.readFile('Productos.JSON',(err,data)=>{
    if(err){
      res.status(500).send('Error al leer el archivo productos');
      return;
    }
    const products=JSON.parse(data);
    const product=products.find(product=>product.id===productId);
    if(product){
      res.JSON(product);
    }else{
      res.status(404).send('Producto no encontrado');
    }
    

  })
})