<template>
  <div class="card">
    <div class="card_landing" style="--i:url(https://www.oikos.com.co/inmobiliaria/images/Noticias_2021/linea1.jpg)">
    </div>

    <div class="card_info">
      <div class="head">
        <p class="title">Mas informacion</p>
      <div class="descripcion">
        <div class="item">
          <svg style="width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84.1 96c0-11.1-9-20.1-20.1-20.1s-20.1 9-20.1 20.1v6c-5.6 1.2-10.9 2.9-15.9 5.1c-15 6.8-27.9 19.4-31.1 37.7c-1.8 10.2-.8 20 3.4 29c4.2 8.8 10.7 15 17.3 19.5c11.6 7.9 26.9 12.5 38.6 16l2.2 .7c13.9 4.2 23.4 7.4 29.3 11.7c2.5 1.8 3.4 3.2 3.8 4.1c.3 .8 .9 2.6 .2 6.7c-.6 3.5-2.5 6.4-8 8.8c-6.1 2.6-16 3.9-28.8 1.9c-6-1-16.7-4.6-26.2-7.9l0 0 0 0 0 0 0 0c-2.2-.8-4.3-1.5-6.3-2.1c-10.5-3.5-21.8 2.2-25.3 12.7s2.2 21.8 12.7 25.3c1.2 .4 2.7 .9 4.4 1.5c7.9 2.7 20.3 6.9 29.8 9.1V416c0 11.1 9 20.1 20.1 20.1s20.1-9 20.1-20.1v-5.5c5.4-1 10.5-2.5 15.4-4.6c15.7-6.7 28.4-19.7 31.6-38.7c1.8-10.4 1-20.3-3-29.4c-3.9-9-10.2-15.6-16.9-20.5c-12.2-8.8-28.3-13.7-40.4-17.4l-.8-.2c-14.2-4.3-23.8-7.3-29.9-11.4c-2.6-1.8-3.4-3-3.6-3.5c-.2-.3-.7-1.6-.1-5c.3-1.9 1.9-5.2 8.2-8.1c6.4-2.9 16.4-4.5 28.6-2.6c4.3 .7 17.9 3.3 21.7 4.3c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-4.4-1.2-14.4-3.2-21-4.4V224z"/></svg>
          <p>Cuotas</p>
        </div>
        <div class="item">
          <svg style="width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM96 280C96 293.3 106.8 304 120 304h144C277.3 304 288 293.3 288 280S277.3 256 264 256h-144C106.8 256 96 266.8 96 280zM264 352h-144C106.8 352 96 362.8 96 376s10.75 24 24 24h144c13.25 0 24-10.75 24-24S277.3 352 264 352z"/></svg>
          <p>Administracion</p>
        </div>
      </div>
      </div> 
      <div class="content">
        <p class="title">
          Mis acciones:
        </p>
        <ul class="lista">
          <li>Consultar cuotas</li>
          <li>Consultar administracion</li>
          <li>Mi alquiler</li>
          <li>Estado</li>
        </ul>
      </div>
      <div class="action">
        <RouterLink class="btn" to="/inicioSesion">Acceder</RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card{
position: relative;
width: 350px;
height: 330px;
margin-left: 75%;
margin-top: -15%;
}
.card .card_landing{
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: 0 5px 10px rgb(103, 204, 103);
  background: linear-gradient(transparent 80%, rgb(3, 5, 3)), var(--i);
  background-position: center;
  background-size: cover;
  z-index: 100;
}
.card .card_info{
  position: absolute;
  width: 90%;
  height: 90%;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  margin: auto;
  padding: 15px;
  background: #fff;
  z-index: 900;
  box-shadow: 0 5px 10px  rgb(103, 204, 103);
  left: 100%;
}
.card_info .head{
  padding: 5px 0;
  border-bottom: solid 1px  rgb(103, 204, 103);
}
.card_info .head .title{
  font-size: 20px;
  font-weight: 700;
  color:  rgb(103, 204, 103);
}
.card_info .head .descripcion{
  display: flex;
  gap: 10px;
}
.card_info .head .descripcion .item{
  display: flex;
  gap: 5px;
  align-items: center;
}
.card_info .head .descripcion .item i{
  color:  rgb(103, 204, 103);
  font-size: 15px;
}
.card_info .head .descripcion .item p{
  font-size: 15px;
}
.card_info .content{
  margin-top: 15px;
}
.card_info .content .lista{
padding: 10px 15px;
}
.card_info .content li{
font-size: 14px;
margin-bottom: 5px;
}
.card_info .action .btn{
  box-shadow: 0 5px 10px  rgb(103, 204, 103);
  padding: 10px;
  color: white;
  width: 100%;
  text-decoration: none;
  text-align: center;
  background:  rgb(103, 204, 103);
  display: block;
  margin-top: -10px;
  margin-left: 0;
}
</style>