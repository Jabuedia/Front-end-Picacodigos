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
            <h1 style="text-align: center;">Gestión de Apartamentos</h1>
        </div>
        
        

        <br>
        <div class="card col-5" style="float:left; margin:12px; min-height: 240px;width: 165%;">
            <div class="card-body">
                <h5 class="card-title" style="margin-bottom: 12px;">Acciones</h5>
                <div class="card-text">
                    
                    <div class="input-group mb-2">
                        <span class="input-group-text">Valor: </span>
                        <input type="text" placeholder="Digite el nombre..." v-model="nombre" aria-label="First name"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Propietario: </span>
                        <input type="text" placeholder="Digite el apellido..." v-model="apellido" aria-label="Last name"
                            class="form-control">
                    </div>
                </div>
                <div class="btn-group" role="group" aria-label="Basic outlined example" style="margin-top:12px">
                    <button @click="crearP" :disabled="botonCrearDeshabilitadoP" type="button"
                        class="btn btn-outline-primary">Crear</button>
                    <button @click="actualizarP" :disabled="botonActualizarDeshabilitadoP" type="button"
                        class="btn btn-outline-primary">Actualizar</button>
                        <button @click="actualizarA" :disabled="botonActualizarDeshabilitadoP" type="button"
                        class="btn btn-outline-primary">Confirmar</button>
                    <button @click="eliminarP" :disabled="botonActualizarDeshabilitadoP" type="button"
                        class="btn btn-outline-danger">Eliminar</button>
                    <button @click="limpiarformulario" :disabled="noExisteTokenP" type="button"
                        class="btn btn-outline-primary">Recargar</button>    
                </div>
            </div>
        </div>
        <div class="card col-12" style="float:left; margin:12px;margin-left: 80%;width: 200%; min-height: 250px;">
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
                apartamentos: [],
                personaBuscada: '',
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
     
             this.consultarApartamentos();
        },
        
        computed: {
            nombresFiltrados() {
                return this.apartamentos.filter((n) =>
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
                [this.nombre, this.apellido, this.idP] = nombreCompleto.toString().split(', ');
                
            }
            
        }, 
        methods:{
            
            actualizarP() {

                if (this.entradaValida() && this.seleccionado) {
                    this.personaBuscada = this.consultarPersonas(Number(this.apellido))
                    
                   
                    const i = this.apartamentos.indexOf(this.seleccionado);
                    this.apartamentos[i] = this.seleccionado = `${this.nombre}, ${this.apellido}, ${this.idP}`;
                    this.nombre = this.apellido = this.documento=this.idP='';
                    this. mensajeErrorP = '';
                    this.actualizando = true;
                    this.$forceUpdate();
                } else {
                    this.mensajeErrorP = "Por favor ingrese todos los datos para actualizar la información.";
                }
            },
            actualizarA(){
                console.log(this.personaBuscada);
                this.actualizarPersona(this.nombre,this.personaBuscada,this.idP)
            },
            eliminarP() {
                this.eliminarApartamento(this.idP);
                
                if (this.seleccionado) {
                    const i = this.apartamentos.indexOf(this.seleccionado);
                    
                    this.apartamentos.splice(i, 0);
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
        
        async consultarApartamentos() {
            
            const options = {
                method: 'GET',
                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.token                }
            };

            fetch('http://localhost:8080/api/inmuebles', options)
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
                            
                            this.apartamentos.push(data[indice].valor+', '+ data[indice].idpropietario+', '+ data[indice].idinmueble)
                            
                        } 
                        
                    }
                });
        },async consultarPersonas(idpers) {
            const direccion = 'http://localhost:8080/api/personas';
            const options = {
                method: 'GET',
                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.token                }
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
                        for (const indice in data){
                            
                            if (data[indice].idpersona == idpers){

                                const personaBuscada1 = data[indice];
                                this.personaBuscada=personaBuscada1;
                                //console.log(personaBuscada);
                                return personaBuscada1;

                            }
                            
                        } 
                        
                    }
                });
        },
        async crearPersona (nombrePersona){
            const options = {
            method: 'POST',
            body: JSON.stringify(
                {
                    
                    descripcion:0,
                    valor: nombrePersona,
                    idconjunto: null,
                    idpropietario: null,  
                
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.token
                }                
            };

            fetch('http://localhost:8080/api/inmuebles', options)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        this.mensajeError = error.message;
                        throw error;
                    } else {
                        const data = await response.json();
                        console.log(data);
                        
                        this.idP=String(data['idinmueble']);
                        console.log(this.idP);
                        localStorage.setItem('idcreado', this.idP);
                        
                                               
                    }
                });

        
        },
        crearP() {
                if (this.entradaValida()) {
                    //this.limpiarformulario();
                    this.crearPersona(Number(this.nombre));
                    //this.consultarPersonas();
                    //console.log(localStorage.getItem("idcreado"));
                    const nombreCompleto = `${this.nombre}, ${this.apellido}, ${this.idP}`
                    if (!this.apartamentos.includes(nombreCompleto)) {
                        this.apartamentos.push(nombreCompleto)
                        this.nombre = this.apellido = this.documento='';
                        this.mensajeError = '';
                        this.actualizando = false;
                        this.$forceUpdate();
                    }
                    
                } else {
                    this.mensajeError = "Por favor ingrese todos los datos para crear la persona.";
                }
                
            },
        async actualizarPersona (nombrePersona, objetoPersona, idpers){
            const direccion = 'http://localhost:8080/api/inmuebles/'+idpers;
            const options = {
            method: 'PUT',
            body: JSON.stringify(
                {
                    idinmueble:idpers,
                    descripcion:0,
                    valor: Number(nombrePersona),
                    idconjunto: null,
                    idpropietario: objetoPersona,  
               
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
        async eliminarApartamento(idpers){
            const direccion = 'http://localhost:8080/api/inmuebles/'+idpers;
            const options = {
            method: 'DELETE',
            body: JSON.stringify(
                {
                    idinmueble: idpers,
                                    
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
                        
                       
                        console.log("id eliminado");
                                               
                    }
                });

        
        }
    }
    
});

</script>
<style>
  
  </style>
  
  
  