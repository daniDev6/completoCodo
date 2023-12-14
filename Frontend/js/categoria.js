
let categoria
if(localStorage.getItem('categoria')===null){
    categoria="jewelery"
}else{
    categoria=localStorage.getItem('categoria')
    }

    let id
    if (localStorage.getItem('id') == null) {
        localStorage.clear();
        id = 1;
    } else {
        id = localStorage.getItem('id');
    }
    
//const API_URL_CAT = `http://127.0.0.1:5000/productos/categoria/${categoria}`;
const API_URL_CAT = `https://danidev6.pythonanywhere.com/productos/categoria/${categoria}`;
//const API_URL=`http://127.0.0.1:5000/productos/`
const API_URL=`https://danidev6.pythonanywhere.com/productos/`
const app=Vue.createApp({
    el: '#app',
    data() {
        return {
            loading: false,
            post: null,
            error: null,
        };
    },
    created() {
        this.fetchData();
        this.fetchDataId();
    },
    methods: {
        fetchData() {
            this.error = this.post = null;
            this.loading = true;

            //   const postId = 1;  // You can change this to the desired post ID
            const apiUrl = `${API_URL_CAT}`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(post => {
                    this.loading = false;
                    this.post = post;
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                });
        },
        fetchDataId(){
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
            if(localStorage.getItem('id') == null){
                localStorage.clear();
                localStorage.setItem('id', id);
            }else{
                localStorage.setItem('id', id);
            }
            localStorage.setItem('id', id);
            // window.location.href = "../paginas/producto.html";

        }
    },
});
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


  app.mount('#app');