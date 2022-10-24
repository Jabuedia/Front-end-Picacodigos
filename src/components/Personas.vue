<template>
    <div>
        <head>
    <meta charset="UTF-8">
    <title>Personas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>
<div id="app" class="container col-12">
        <div style="margin-top: 60px;">
            <h1 style="text-align: center;">Gestión de Personas</h1>
        </div>
        
        

        <br>
        <div class="card col-5" style="float:left; margin:12px; min-height: 240px;width: 150%;">
            <div class="card-body">
                <h5 class="card-title" style="margin-bottom: 12px;">Acciones</h5>
                <div class="card-text">
                    <div class="input-group mb-2">
                        <span class="input-group-text">Email: </span>
                        <input type="text" placeholder="Digite el email..." v-model="documento" aria-label="Last name"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Nombre: </span>
                        <input type="text" placeholder="Digite el nombre..." v-model="nombre" aria-label="First name"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Telefono: </span>
                        <input type="text" placeholder="Digite el telefon..." v-model="apellido" aria-label="Last name"
                            class="form-control">
                    </div>
                </div>
                <div class="btn-group" role="group" aria-label="Basic outlined example" style="margin-top:12px">
                    <button @click="crearP" :disabled="botonCrearDeshabilitadoP" type="button"
                        class="btn btn-outline-primary">Crear</button>
                    <button @click="actualizarP" :disabled="botonActualizarDeshabilitadoP" type="button"
                        class="btn btn-outline-primary">Actualizar</button>
                    <button @click="eliminarP" :disabled="botonActualizarDeshabilitadoP" type="button"
                        class="btn btn-outline-danger">Eliminar</button>
                    <button @click="limpiarformulario" :disabled="noExisteTokenP" type="button"
                        class="btn btn-outline-primary">Recargar</button>    
                </div>
            </div>
        </div>
        <div class="card col-12" style="float:left; margin:12px;margin-left: 70%;width: 200%; min-height: 250px;">
            <div class="card-body">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Consultar: </span>
                    <input v-model="prefijo" placeholder="Digite el texto..." class="form-control"
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>

                <select size="6"  v-model="seleccionado" class="form-select" aria-label="multiple select example">
                    <option v-for="nombreCompleto in nombresFiltrados" :key="nombreCompleto" @click="actualizando=true">
                        {{ nombreCompleto }}</option>
                </select>
            </div>
        </div>
        <br>
    </div>
    </div>
  </template>
<script>
//import AppVue from '../App.vue';

import AppVue from '../App.vue';

 
    export default({
        name:'Personas',
        data() {
            return {
                recargateplis:1,
                nombres: [],
                seleccionado: '',
                idP: '',
                prefijo: '',
                nombre: '',
                apellido: '',
                documento: '',
                token: localStorage.getItem('token'),
                mensajeErrorP: '',
                actualizando: false,
                
            }
        },
        mounted(){
     
             this.consultarPersonas();
        },
        
        computed: {
            nombresFiltrados() {
                return this.nombres.filter((n) =>
                    n.toLowerCase().startsWith(this.prefijo.toLowerCase())
                )
            },
            botonCrearDeshabilitadoP() {
                return this.actualizando;
            },
            botonActualizarDeshabilitadoP() {
                return !this.actualizando;
            },
            noExisteTokenP() {
                return !this.token=="pendiente";
            }
        },
        watch: {
            seleccionado(nombreCompleto) {
                [this.nombre, this.apellido, this.documento, this.idP] = nombreCompleto.toString().split(', ');
                
            }
            
        }, 
        methods:{
            
            actualizarP() {

                if (this.entradaValida() && this.seleccionado) {
                    this.actualizarPersona(this.nombre, this.apellido, this.documento, this.idP);
                    const i = this.nombres.indexOf(this.seleccionado);
                    this.nombres[i] = this.seleccionado = `${this.nombre}, ${this.apellido}, ${this.documento}, ${this.idP}`;
                    this.nombre = this.apellido = this.documento=this.idP='';
                    this. mensajeErrorP = '';
                    this.actualizando = false;
                    this.$forceUpdate();
                } else {
                    this.mensajeErrorP = "Por favor ingrese todos los datos para actualizar la información.";
                }
            },
            eliminarP() {
                this.eliminarPersona(this.idP);
                
                if (this.seleccionado) {
                    const i = this.nombres.indexOf(this.seleccionado);
                    
                    this.nombres.splice(i, 0);
                    this.nombre = this.apellido = this.documento=this.idP='';
                    this.mensajeError = '';
                    this.actualizando = false;
                    this.$forceUpdate();
                    
                }
                
            },
            entradaValida() {
                return this.nombre.trim() && this.apellido.trim();
            },
            limpiarformulario(){
                location.reload();
            },
        
        async consultarPersonas() {
            
            const options = {
                method: 'GET',
                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.token                }
            };

            fetch('http://132.145.156.154:8080/PicacodigoAdmin/api/personas', options)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        this.mensajeError = error.message;
                        throw error;
                    } else {
                        
                        const data = await response.json();
                        console.log(data);
                        for (const indice in data){
                            
                            this.nombres.push(data[indice].nombre  +', '+ data[indice].telefono+', '+ data[indice].email+', '+ data[indice].idpersona)
                            
                        } 
                        
                    }
                });
        },
        async crearPersona (nombrePersona, apellidoPersona, emailPersona){
            const options = {
            method: 'POST',
            body: JSON.stringify(
                {
                email: emailPersona, 
                nombre: nombrePersona,
                telefono: apellidoPersona,
                
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.token
                }                
            };

            fetch('http://132.145.156.154:8080/PicacodigoAdmin/api/personas', options)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        this.mensajeError = error.message;
                        throw error;
                    } else {
                        const data = await response.json();
                        console.log(data);
                        
                        this.idP=String(data['idpersona']);
                        console.log(this.idP);
                        localStorage.setItem('idcreado', this.idP);
                        
                                               
                    }
                });

        
        },
        crearP() {
                if (this.entradaValida()) {
                    //this.limpiarformulario();
                    this.crearPersona(this.nombre, this.apellido, this.documento);
                    //this.consultarPersonas();
                    //console.log(localStorage.getItem("idcreado"));
                    const nombreCompleto = `${this.nombre}, ${this.apellido}, ${this.documento}, ${this.idP}`
                    if (!this.nombres.includes(nombreCompleto)) {
                        this.nombres.push(nombreCompleto)
                        this.nombre = this.apellido = this.documento='';
                        this.mensajeError = '';
                        this.actualizando = false;
                        this.$forceUpdate();
                    }
                    
                } else {
                    this.mensajeError = "Por favor ingrese todos los datos para crear la persona.";
                }
                
            },
        async actualizarPersona (nombrePersona, apellidoPersona, emailPersona, idpers){
            const direccion = 'http://132.145.156.154:8080/PicacodigoAdmin/api/personas/'+idpers;
            const options = {
            method: 'PUT',
            body: JSON.stringify(
                {
                    idpersona: idpers,
                    email: emailPersona, 
                    nombre: nombrePersona,
                    telefono: apellidoPersona,
                
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.token
                }                
            };
            
            fetch(direccion, options)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        this.mensajeError = error.message;
                        throw error;
                    } else {
                        
                        const data = await response.json();
                        console.log(data);
                                               
                    }
                });

        
        },
        async eliminarPersona (idpers){
            const direccion = 'http://132.145.156.154:8080/PicacodigoAdmin/api/personas/'+idpers;
            const options = {
            method: 'DELETE',
            body: JSON.stringify(
                {
                    idpersona: idpers,
                                    
                }),
            
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.token
                }                
            };
            
            fetch(direccion, options)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        this.mensajeError = error.message;
                        throw error;
                    } else {
                        
                        //const data = await response.json();
                        console.log("id eliminado");
                                               
                    }
                });

        
        }
    }
    
});

</script>

  
  