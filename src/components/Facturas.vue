<template>
    <div>

        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                crossorigin="anonymous">
        </head>
        <div id="app" class="container col-12">
            <div style="margin-top: 60px;">
                <h1 style="text-align: center;">Gestión de Facturas</h1>
            </div><br>
            <div class="card col-5" style="float:left; margin:12px; min-height: 240px;width: 150%;">
                <div class="card-body">
                    <h5 class="card-title" style="margin-bottom: 12px;">Crear factura</h5>
                    <div class="card-text">
                        <div class="input-group mb-2">
                            <span class="input-group-text">id inmueble: </span>
                            <input type="text" name="example" list="exampleList" v-model="idInmueble">
                                <datalist id="exampleList">
                                    <option value="1"></option>  
                                    <option value="2"></option>
                                </datalist>
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text">Mes: </span>
                            <input type="month" placeholder="Mes a facturar..." v-model="mes"
                                   class="form-control">
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text">Fecha limite: </span>
                            <input type="month" placeholder="Fecha limite de pago..." v-model="fechaVencimiento"
                                   class="form-control">
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text">Total: </span>
                            <input type="text" placeholder="total..." v-model="total"
                                  class="form-control">
                        </div>
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic outlined example" style="margin-top:12px">
                        <button @click="crear" type="button"
                            class="btn btn-outline-primary">Crear</button>
                        <button @click="actualizar" :disabled="botonActualizarDeshabilitado" type="button"
                            class="btn btn-outline-primary">Actualizar</button>
                        <button @click="eliminar" :disabled="botonActualizarDeshabilitado" type="button"
                            class="btn btn-outline-danger">Eliminar</button>
                        <button @click="consultarFacturas" type="button"
                            class="btn btn-outline-primary">Colsutar</button>
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

                    <select size="6" v-model="seleccionado" class="form-select" aria-label="multiple select example">
                        <option v-for="info in facturasFiltradas" :key="info" @click="actualizando=true">
                            {{ info }}</option>
                    </select>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>
<script>
export default ({
    name: 'Facturas',
    data() {
        return {
            seleccionado: '',
            prefijo: '',
            mes: '',
            fechaVencimiento: '',
            idInmueble: '',
            total: '',
            facturas: [],
            token: localStorage.getItem("token"),
            mensajeError: '',
            actualizando: false,
            nombre: ''
        }
    },
    watch: {
        seleccionado(info) {
            [this.mes, this.total] = info.toString().split(', ');
        }
    },    
    computed: {
        noExisteToken(){
            return this.token == 'pendiente';
        },
        facturasFiltradas(){
            return this.facturas.filter((n) =>
                n.toLowerCase().startsWith(this.prefijo.toLowerCase())
            )
        }
    },
    methods: {
        entradaValida() {
            return this.mes.trim() && this.total.trim() && this.idInmueble && this.fechaVencimiento;
        },
        crear() {
            if (this.entradaValida()) {
                this.crearFacturas(this.mes, this.total, this.fechaVencimiento, this.idInmueble)
                const factura = `${this.mes}, ${this.total}, ${this.fechaVencimiento}, ${this.idInmueble}`
                if (!this.facturas.includes(factura)) {
                    this.facturas.push(factura)
                    this.mes = this.total = this.fechaVencimiento = this.idInmueble = '';
                    this.mensajeError = '';
                    this.actualizando = false;
                    this.$forceUpdate();
                }
            } else {
                this.mensajeError = "Por favor ingrese todos los datos para crear la persona.";
            }
        },
        async consultarFacturas() {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ this.token,
                }
            };
            fetch('http://localhost:8080/api/facturas', options)
            .then(async (response) => {
                if (!response.ok) {
                    const error = new Error(response.statusText);
                    error.json = response.json();
                    this.mensajeError = error.message;
                    console.log(error.message);
                    throw error;
                } else {
                    const data = await response.json();
                    for(const indice in data){
                        this.facturas.push(data[indice].mes+", "+data[indice].total);
                    }
                    console.log(data);
                }
            });
        },
        async crearFacturas(mes,total,fechaVencimiento,idInmueble) {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    'mes': mes,
                    'fecha_limite': fechaVencimiento,
                    'total': total,
                    'idinmueble': idInmueble,
                }
                ),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ this.token,
                }
            };
            fetch('http://localhost:8080/api/facturas', options)
            .then(async (response) => {
                if (!response.ok) {
                    const error = new Error(response.statusText);
                    error.json = response.json();
                    this.mensajeError = error.message;
                    console.log(error.message);
                    throw error;
                } else {
                    const data = await response.json();
                    console.log(data);
                }
            });
        }
    }
});
</script>
<style>

</style>
  
  