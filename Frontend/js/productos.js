const { createApp } = Vue
//let URL_API = 'http://127.0.0.1:5000/productos';
let API_URL = 'https://danidev6.pythonanywhere.com/productos';
let id
if (localStorage.getItem('id') == null) {
    localStorage.clear();
    id = 1;
} else {
    id = localStorage.getItem('id');
}

const app = Vue.createApp({
    data() {
        return {
            productos: [],
            url: API_URL,
            // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
            // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
            loading: false,
            post: null,
            error: null,
            postId:null
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.post=data
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen,
                categoria: this.categoria,
                descripcion: this.descripcion
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "../paginas/productos.html";  // recarga productos.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })
        },
        fetchDataId() {
            const apiUrlId = `${API_URL}/${id}`;
            this.error = this.postId = null;
            this.loading = true;
            fetch(apiUrlId)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(postId => {
                    this.loading = false;
                    this.postId = postId;
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                });
        }
        ,
        ir(id) {
            if (localStorage.getItem('id') == null) {
                localStorage.clear();
                localStorage.setItem('id', id);
            } else {
                localStorage.setItem('id', id);
            }
            localStorage.setItem('id', id);
            window.location.href = "./producto.html";
            console.log(id,'soy productos js');

        }
    },
    created() {
        this.fetchData(this.url)
        this.fetchDataId()
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

let letra = []
letra.push("a")