console.log(location.search)     // lee los argumentos pasados a este formulario
var id = location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const app = Vue.createApp({
    data() {
        return {
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
            // url:'https://fakestoreapi.com/products/category/electronics'+id,
            url: 'https://danidev6.pythonanywhere.com/productos/' + id,
            loading: false,
            post: null,
            error: null,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id = data.id
                    this.nombre = data.nombre
                    this.imagen = data.imagen
                    this.stock = data.stock
                    this.precio = data.precio
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./productos.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
})
app.component('nav-barr', {
    template: `
    <header class="site-header">
        <label for="check">|||</label>
        <input type="checkbox" id="check">
        <nav class="barra-celu">
            <a href="./login.html">Login</a>
            <a href="../index.html">Inicio</a>
            <a href="./nosotros.html">Nosotros</a>
            <a href="./todos.html">Productos</a>
        </nav>
        <nav class="barra-pc">
            <a href="./login.html">Login</a>
            <a href="../index.html">Inicio</a>
            <a href="./nosotros.html">Nosotros</a>
            <a href="./todos.html">Productos</a>
        </nav>
    </header>`
});

app.component('footer-com', {
    template: '<footer><section class="footer-header"><article><img src="" alt="" width=""><div><h3>Elegi como Pagar</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum odit reprehenderit nisi, labore assumenda excepturi similique error harum ut ab esse, qui odio asperiores iure, corrupti facilis laboriosam eum in.</p><span>como pagar tus compras</span></div></article><article><img src="#" alt=""><div><h3>Envio gratis desde $10.000</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum odit reprehenderit nisi, labore assumenda excepturi similique error harum ut ab esse, qui odio asperiores iure, corrupti facilis laboriosam eum in.</p><span>conoce mas sobre este beneficio</span></div></article><article><img src="#" alt=""><div><h3>Seguridad, de principio a fin</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum odit reprehenderit nisi, labore assumenda excepturi similique error harum ut ab esse, qui odio asperiores iure, corrupti facilis laboriosam eum in.</p><span>como te protegemos</span></div></article></section><section class="footer-mid"><article><p>boton de arrepentimiento</p><a href="#">cancelar una compra</a><a href="#">cancelar una suscripcion</a><a href="#">cancelar un seguro o garantia</a></article><article><p>CONOCE LAS NORMAS QUE APLICAN CUANDO COMPRAS</p><a href="#">ver contrato de adhesion-Ley 679</a></article></section><section class="footer-end"><span>Todos los derechos reservados &copy</span><a href="mailto:example@gmail.com">example@gmail.com</a></section></footer>'
});

app.mount('#app')
