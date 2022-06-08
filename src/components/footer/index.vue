<template>
  <div
    :style="(activarBg ? 'background-color: #212529;':'')+
      (positionAbsolute ? 'position: absolute;':'')"

    class="container-footer"
  >
    <footer>
      <div class="footer">
        <div
          class="row"
          style="display: grid;
    align-content: center;
    justify-content: center;
    align-items: center;
    justify-items: center;"
        >
          <img :src="logoSis" style="max-width: 100px;">

          <p>Copyright © 2022 UTS. Ingeniería de Sistemas - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import logoSis from '@/assets/logoSistemas.png'

export default {
  name: 'Footer',
  props: {
    activarBg: {
      type: Boolean,
      required: true,
      default: true
    },
    positionAbsolute: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data() {
    return {
      logoSis
    }
  },
  watch: {

  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

.container-footer{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;

    bottom: 0;
    width: 100%;
}
.footer{
padding:30px 0px;
font-family: 'Play', sans-serif;
text-align:center;
    padding-top: 36px;
}

.footer .row{
width:100%;
margin:1% 0%;
padding:0.6% 0%;
color:gray;
font-size:0.8em;
}

.footer .row a{
text-decoration:none;
color:gray;
transition:0.5s;
}

.footer .row a:hover{
color:#fff;
}

.footer .row ul{
width:100%;
}

.footer .row ul li{
display:inline-block;
margin:0px 30px;
}

.footer .row a i{
font-size:2em;
margin:0% 1%;
}

@media (max-width:720px){
.footer{
text-align:left;
padding:5%;
}
.footer .row ul li{
display:block;
margin:10px 0px;
text-align:left;
}
.footer .row a i{
margin:0% 3%;
}
}
</style>
