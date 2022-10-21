<template>
    <div>
        Bienvenido usuario:
        {{nombre}}
        <router-link to="/inicioSesion" @click = "sesionFinalizada">Salir</router-link>
    </div>
  </template>
  <script>
  export default{
    data(){
        return{
            token:localStorage.getItem("token"),
            nombre:localStorage.getItem("nombre")
        }
    },
    methods:{
        sesionFinalizada(){
            this.token = localStorage.removeItem("token");
        }
    },
    mounted(){
        if (!this.token) {
            this.$router.push("inicioSesion");
        }
    }
}
  </script>
  <style>
  
  </style>
  
  