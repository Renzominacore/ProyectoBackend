class ProductManager{
    
    constructor(){
        this.productos=[];
        this.Idincremental=1;
    }

    obtenerProductos() {
        return this.productos;
    }
    
    agregarProductos(title,description,price,thumbnail,code,stock){
        if (!title || !description || !price || !thumbnail || !code || !stock) {

            console.error('Todos los campos son obligatorios.');
            
            return
            
            }
        const id=this.productos.length+1
        const producto={
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const productoExistente = this.productos.find((producto) => producto.code === code);

            if(productoExistente){

        console.log(`El producto: ${producto.code} ya existe`);

        }else{
            console.log('El producto fue registrado')
        }
        this.productos.push('Producto agregado',producto);
        return producto;
    }
    
    getProductById(id) {

        const producto = this.productos.find((producto) => producto.id === id);
        
        if (producto) {
        
        return producto;
        
        } else {
        
        console.log('Producto no encontrado');
        
        return null;
        
        }
        
        }
}

const instancia = new ProductManager()

    instancia.agregarProductos(`Estetoscopio`, `Estetoscopio Littman`, 49000, `image`, `cod1`, 7);
    instancia.agregarProductos(`Oximetro`, `Oximetro Beurer`, 20000, `image`, `cod2`, 10);
    instancia.agregarProductos(`Tensiometro`, `Tensiometro Philco`, 18000, `image`, `cod3`, 5);
    
    console.log(instancia.obtenerProductos())
    //console.log(instancia.getProductById(3))
    
