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
        </div><br>
        <div class="card col-5" style="float:left; margin:12px; min-height: 240px;width: 150%;">
            <div class="card-body">
                <h5 class="card-title" style="margin-bottom: 12px;">Acciones</h5>
                <div class="card-text">
                    <div class="input-group mb-2">
                        <span class="input-group-text">Documento: </span>
                        <input type="text" placeholder="Digite el documento..." v-model="documento" aria-label="Last name"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Nombre: </span>
                        <input type="text" placeholder="Digite el nombre..." v-model="nombre" aria-label="First name"
                            class="form-control">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text">Apellido: </span>
                        <input type="text" placeholder="Digite el apellido..." v-model="apellido" aria-label="Last name"
                            class="form-control">
                    </div>
                </div>
                <div class="btn-group" role="group" aria-label="Basic outlined example" style="margin-top:12px">
                    <button @click="crear" :disabled="botonCrearDeshabilitado" type="button"
                        class="btn btn-outline-primary">Crear</button>
                    <button @click="actualizar" :disabled="botonActualizarDeshabilitado" type="button"
                        class="btn btn-outline-primary">Actualizar</button>
                    <button @click="eliminar" :disabled="botonActualizarDeshabilitado" type="button"
                        class="btn btn-outline-danger">Eliminar</button>
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

</script>
  <style>
  
  </style>
  
  