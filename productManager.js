const fs=require('fs');
//const { json } = require('stream/consumers');

class ProductManager{
    
    constructor(path){
        this.productos=[];
        this.idIncremental=1;
        this.path=path
    }

    agregarProductos(title,description,price,thumbnail,code,stock){
        if (!title || !description || !price || !thumbnail || !code || !stock) {

            console.error('Todos los campos son obligatorios.');
            
            return
            
            }
        const id=this.idIncremental
        const producto={
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.idIncremental++
        const productoExistente = this.productos.find((producto) => producto.code === code);

            if(productoExistente){

        console.log(`El producto: ${producto.code} ya existe`);

        }else{
            console.log('El producto fue registrado')
        }
        this.productos.push(producto);
        return fs.promises.writeFile(this.path,JSON.stringify(this.productos));
    }
    obtenerProductos(){
        return fs.promises.readFile(this.path)
        .then((data)=>JSON.parse(data))
    }
    async borrarPorId(id) {
        try {
          const data = await this.obtenerProductos();
          const filteredData = data.filter(
            (producto) => producto.id !== id
          );
    
          if (data.length !== filteredData.length) {
            await fs.promises.writeFile(this.path, JSON.stringify(data));
            return console.log ('Elproducto fue eliminado: Lista de productos',filteredData)
          } else {
            console.log(`ID ${id} no existe en este archivo`);
            return null;
          }
        } catch (error) {
          console.log(
            `Error Code: ${error.code} | Hubo un error (${id})`
          );
        }
      }
}
const instancia = new ProductManager('Productos.JSON')

    instancia.agregarProductos(`Estetoscopio`, `Estetoscopio Littman`, 49000, `image`, `cod1`, 7);
    instancia.agregarProductos(`Oximetro`, `Oximetro Beurer`, 20000, `image`, `cod2`, 10);
    instancia.agregarProductos(`Tensiometro`, `Tensiometro Philco`, 18000, `image`, `cod3`, 5);

instancia.obtenerProductos().then((productos)=>{
    console.log(productos)
})
instancia.borrarPorId(3)



