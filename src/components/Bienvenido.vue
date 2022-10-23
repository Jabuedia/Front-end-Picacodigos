<template>
    <div class="contenedor">
      <h1 class="bienvenida">{{mensage}}</h1>
      <p>{{contenido}}</p><br><br><br>
    </div>
  </template>
  <script>
  export default({
    props:{
      mensage: String
    },
    data() {
    return {
      mensage: "BIENVENIDO",
      contenido: "En tu vecino encontraras lo mejor para su comodidad",
    }
  },
  })
  </script>
  <style scoped>
  .contenedor{
    margin-bottom: -50%;
    margin-left: -130%;
    background: rgb(255, 255, 255);
    width: 90%;
    box-shadow: 0 5px 10px  rgb(103, 204, 103);
  }
  .contenedor .bienvenida{
    font-family: 'Cooper Black';
    color: rgb(103, 204, 103);
    margin-left: 20%;
    margin-top: 20%;
  }
  .contenedor p{
    font-size: 20px;
    text-align: center;
    font-family: 'roboto';
  }
  </style>
  