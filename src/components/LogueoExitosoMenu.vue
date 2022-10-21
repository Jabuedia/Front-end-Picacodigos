<template>
    <div>

    <router-link to="/personas" @click = "personas">       
    <div class="container">  
        <div class="row" style="width: 217%;">
            <div class="col-md-8">
                <div class="firma-card row">
                    <div class="col-md-5 img-padding-no">
                        <div class="firma-resim">         
                                <span class="percent"><img style="height:160px;width: 255px; object-fit:cover" class="w-100 d-block" src="https://c8.alamy.com/compes/2bt6f3j/icono-de-gestion-de-la-organizacion-en-estilo-comico-personas-con-marca-de-verificacion-dibujo-vectorial-dibujos-animados-sobre-fondo-blanco-aislado-el-chapoteo-de-businessman-es-eficaz-2bt6f3j.jpg" alt="Slide Image"></span>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="firma-aciklama card-body">
                            <h4 style="font-family:Times New Roman;font-size:32px;margin-top: 8%;color: #000000;font-weight: bold;margin-left: 49%;">
                                Gestionar Personas
                            </h4>
                            <br><br>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2"></div>
        </div>
    </div>
</router-link>
<router-link to="/apartamento" @click = "apartamento">       
    <div class="container">  
        <div class="row" style="width: 217%;">
            <div class="col-md-8">
                <div class="firma-card row">
                    <div class="col-md-5 img-padding-no">
                        <div class="firma-resim">         
                                <span class="percent"><img style="height:160px;width: 255px; object-fit:cover" class="w-100 d-block" src="https://c8.alamy.com/zoomses/6/0be48d7a859d4feb8c009ad90ba83b5b/2dypbm8.jpg" alt="Slide Image"></span>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="firma-aciklama card-body">
                            <h4 style="font-family:Times New Roman;font-size:32px;margin-top: 8%;color: #000000;font-weight: bold;margin-left: 45%;">
                                Gestionar Apartamentos
                            </h4>
                            <br><br>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2"></div>
        </div>
    </div>
</router-link>
<router-link to="/facturas" @click = "facturas">       
    <div class="container">  
        <div class="row" style="width: 217%;">
            <div class="col-md-8">
                <div class="firma-card row">
                    <div class="col-md-5 img-padding-no">
                        <div class="firma-resim">         
                                <span class="percent"><img style="height:160px;width: 255px; object-fit:cover" class="w-100 d-block" src="https://c8.alamy.com/zoomses/6/dbd351983fcc46d1a23744e3497caeef/2dypfx7.jpg" alt="Slide Image"></span>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="firma-aciklama card-body">
                            <h4 style="font-family:Times New Roman;font-size:32px;margin-top: 8%;color: #000000;font-weight: bold;margin-left: 49%;">
                                Gestionar Facturas
                            </h4>
                            <br><br>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2"></div>
        </div>
    </div>
</router-link>
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
  .firma-card{
  background: rgb(103, 204, 103);
  border: 1px solid;
  border-color: rgb(255, 255, 255);
  margin: 1rem auto;
  border-radius: 5px;
  box-shadow: 0 4px 6px -1px black;
  margin-bottom: 1.6%;
  overflow: hidden;
}
.firma-resim{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  transition: -webkit-transform .2s;
  transition: transform .2s;
}
.firmalar{
  background: rgb(252, 255, 252);
}

@media (max-width: 768px) {

  .firma-logo{
        width: calc(33.66667% - .75rem);
        height: 6.5rem;
        margin: 5px .375rem;
  }
  .firma-resim {
    position: relative;
    z-index: 0;
    height: 200px;
  }
  .img-padding-no{
    padding-right: 0px;
    padding-left: 0px;
  }
}
  </style>
  
  