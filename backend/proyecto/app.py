from flask import Flask ,jsonify ,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend


# configuro la base de datos, con el nombre el usuario y la clave

#
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root@127.0.0.1/proyecto'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow


# defino las tablas
class Producto(db.Model):   # la clase Producto hereda de db.Model    
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    precio=db.Column(db.Integer)
    stock=db.Column(db.Integer)
    imagen=db.Column(db.String(400))
    categoria=db.Column(db.String(100))
    descripcion=db.Column(db.String(400))
    def __init__(self,nombre,precio,descripcion,categoria,imagen,stock):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.precio=precio
        self.descripcion=descripcion
        self.categoria=categoria
        self.imagen=imagen
        self.stock=stock
    #  si hay que crear mas tablas , se hace aqui



with app.app_context():
    db.create_all()  # aqui crea todas las tablas
#  ************************************************************
class ProductoSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','precio','descripcion','categoria','imagen','stock')




producto_schema=ProductoSchema()            # El objeto producto_schema es para traer un producto
productos_schema=ProductoSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto




# crea los endpoint o rutas (json)
@app.route('/productos',methods=['GET'])
def get_Productos():
    all_productos=Producto.query.all()         # el metodo query.all() lo hereda de db.Model
    result=productos_schema.dump(all_productos)  # el metodo dump() lo hereda de ma.schema y                                           # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla

@app.route('/productos/categoria/<categoria>', methods=['GET'])
def get_productos_por_categoria(categoria):
    productos_en_categoria = Producto.query.filter_by(categoria=categoria).all()
    return productos_schema.jsonify(productos_en_categoria)

@app.route('/productos/<id>',methods=['GET'])
def get_producto(id):
    producto=Producto.query.get(id)
    return producto_schema.jsonify(producto)   # retorna el JSON de un producto recibido como parametro


@app.route('/productos/<id>',methods=['DELETE'])
def delete_producto(id):
    producto=Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()                     # confirma el delete
    return producto_schema.jsonify(producto) # me devuelve un json con el registro eliminado


@app.route('/productos', methods=['POST']) # crea ruta o endpoint
def create_producto():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    precio=request.json['precio']
    stock=request.json['stock']
    imagen=request.json['imagen']
    categoria=request.json['categoria']
    descripcion=request.json['descripcion']
    new_producto=Producto(nombre,precio,descripcion,categoria,imagen,stock)
    db.session.add(new_producto)
    db.session.commit() # confirma el alta
    return producto_schema.jsonify(new_producto)


@app.route('/productos/<id>' ,methods=['PUT'])
def update_producto(id):
    producto=Producto.query.get(id)
    producto.nombre=request.json['nombre']
    producto.precio=request.json['precio']
    producto.stock=request.json['stock']
    producto.imagen=request.json['imagen']
    producto.categoria=request.json['categoria']
    db.session.commit()    # confirma el cambio
    return producto_schema.jsonify(producto)    # y retorna un json con el producto

@app.route('/productosMany', methods=['POST'])
def create_productos():
    try:
        productos_data = request.json  # Supongamos que request.json es una lista de productos
        nuevos_productos = []

        for producto_data in productos_data:
            nombre = producto_data['nombre']
            precio = producto_data['precio']
            stock = producto_data['stock']
            imagen = producto_data['imagen']
            categoria = producto_data['categoria']
            descripcion = producto_data['descripcion']

            nuevo_producto = Producto(nombre, precio, descripcion, categoria, imagen, stock)
            nuevos_productos.append(nuevo_producto)
            db.session.add(nuevo_producto)

        db.session.commit()  # Confirma el alta de todos los productos

        # Puedes devolver la lista de productos creados si es necesario
        return producto_schema.jsonify(nuevos_productos)
    
    except Exception as e:
        # Maneja cualquier excepción que pueda ocurrir durante el proceso
        return jsonify({'error': str(e)}), 500

# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000)    # ejecuta el servidor Flask en el puerto 5000
