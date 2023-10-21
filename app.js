const fs=require('fs');
const http=require('http');
const port=8080;
const express=require('express');
const { error } = require('console');
const app=express;
app.use(express.urlencoded({extended:true}))

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
        const productos= JSON.parse(data);
        res.JSON(productos);
    })
})

app.get('/productos/:userId',(req,res)=>{
  const productoId= parseInt(req.params.productoId,1);
  fs.readFile('Productos.JSON',(err,data)=>{
    if(err){
      res.status(500).send('Error al leer el archivo productos');
      return;
    }
    const productos=JSON.parse(data);
    const producto=productos.find(product=>product.id===productoId);
    if(producto){
      res.JSON(producto);
    }else{
      res.status(404).send('Producto no encontrado');
    }
    

  })
})