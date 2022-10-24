<template>
<div class="wrapper fadeInDown">
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  </head>
  <div id="formContent">
    <div class="fadeIn first">
      <img src="../assets/img/logo.png" id="icon" alt="User Icon" />
    </div><br>

    <form v-on:submit.prevent="formularioLogueo">
      <input type="text" id="login" v-model="usuario" class="fadeIn second" placeholder="Usuario">
      <input type="password" id="password" v-model="password" class="fadeIn third" placeholder="Contraseña"><br><br>
      <div class="action">
        <input type="submit" class="fadeIn fourth" value="Iniciar sesion">
      </div>
    </form>

    <div id="formFooter">
        <RouterLink class="underlineHover" to="/">Regresar</RouterLink>
    </div>

  </div>
</div>
</template>

/* JAVASCRIPT */

<script>
export default({
  data() {
        return {
            login: [],
            password: '',
            usuario: '',
            token: 'pendiente',
            mensajeError: '',
            actualizando: false,
            nombre: ''
        }
    },
    methods:{
      async formularioLogueo(){
        const options = {
                method: 'POST',

                body: JSON.stringify({ 
                  password: this.password,
                  usuario: this.usuario,
                }),

                headers: {
                    'Content-Type': 'application/json'
                }
            };
            fetch('http://132.145.156.154:8080/PicacodigoAdmin/api/auth', options)
            .then(async (response) => {

              if (this.password == "") {
                alert("Datos Inconpletos")
              } else if (this.usuario == "") {
                alert("Datos Inconpletos")
              }
               else if (!response.ok) {
                    const error = new Error(response.statusText);
                    error.json = response.json();
                    this.mensajeError = error.message;
                    console.log(error.message);
                    alert("Usted no tiene acceso");
                    throw error;
                } 
                else {
                    const data = await response.json();
                    this.token = data.access;
                    this.nombre = data.usuario[0].idpersona.nombre;
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('nombre', this.nombre);
                    this.$router.push("activo");
                }
            });
      }
    }
});
</script>

/* STYLE */

<style scoped>
  a {
  color: rgb(103, 204, 103);
  display:inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  margin: 40px 8px 10px 8px; 
  color: #cccccc;
}
.wrapper {
    margin-left: 50%;
    margin-top: -10%;
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgb(103, 204, 103);
  box-shadow: 0 30px 60px 0 rgb(103, 204, 103);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  padding: 15px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}



/* TABS */

h2.inactive {
  color: rgb(103, 204, 103);
}

h2.active {
  color: rgb(103, 204, 103);
  border-bottom: 2px solid rgb(103, 204, 103);
}



/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit], input[type=reset]  {
  background-color: rgb(103, 204, 103);
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgb(103, 204, 103);
  box-shadow: 0 10px 30px 0 rgb(103, 204, 103);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
  background-color: rgb(103, 204, 103);
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 1px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid rgb(103, 204, 103);
}

input[type=text]:placeholder {
  color: #cccccc;
}
input[type=password] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 1px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=password]:focus {
  background-color: #fff;
  border-bottom: 2px solid rgb(103, 204, 103);
}

input[type=password]:placeholder {
  color: #cccccc;
}



/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: rgb(103, 204, 103);
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}
*:focus {
    outline: none;
} 

#icon {
  width:40%;
}
.action .btn{
  box-shadow: 0 5px 10px  rgb(103, 204, 103);
  padding: 10px;
  color: white;
  width: 100%;
  text-decoration: none;
  text-align: center;
  background:  rgb(103, 204, 103);
  display: block;
  margin-top: 10px;
  width: 40%;
  margin-left: 30%;
}
</style>
