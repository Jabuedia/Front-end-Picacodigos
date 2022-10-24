<template>
  <div class="principal">
    <img src="../assets/img/logo2.png">
    <router-link to="/inicioSesion" @click = "sesionFinalizada"><img src="../assets/img/salir.png" style="width: 60px;margin-left: 70%;"></router-link>
    <div id="eventos">
      <a href=""></a>
    </div>
  </div>
</template>
<script>
export default ({
  props: {
    conector: String,
  },
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
})
</script>
<style scoped>
.principal{
  background: rgb(103, 204, 103);
  box-shadow: 0 10px 40px 0 rgb(255, 255, 255);
  width: 300%;
  height: 70px;
  border-radius: 10px;
  margin-top: -5%;
  margin-left: -50%;
}
</style>

