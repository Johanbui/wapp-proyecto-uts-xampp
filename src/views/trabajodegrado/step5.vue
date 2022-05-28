<template>
  <div class="app-step5">
    <div class="container-img">
      <img v-if="estadoFinal ==='APREIDEA'" src="https://www.uts.edu.co/sitio/wp-content/uploads/2022/05/UTS5387.jpg">
      <h2 v-if="estadoFinal ==='APREIDEA'"> Su trabajo de grado se encuentra en estado aprobado</h2>

      <img v-if="estadoFinal !=='APREIDEA' && estadoFinal !==''" src="https://www.uts.edu.co/sitio/wp-content/uploads/2022/05/UTS5387.jpg">
      <h2 v-if="estadoFinal !=='APREIDEA' && estadoFinal !==''"> Su trabajo de grado se encuentra en estado cancelado</h2>

    </div>

    <el-button-group>
      <el-button type="primary" @click="atras">Atras</el-button>
    </el-button-group>
    <el-button-group>
      <el-button type="primary" @click="inicio">Inicio</el-button>
    </el-button-group>
  </div>
</template>

<script>
import { getResultadoProyecto } from '@/api/idea'

export default {
  props: {
    ideaSelected: {
      type: Object,
      default: function() {
        return {

        }
      }
    }
  },
  data() {
    return {
      estadoFinal: ''
    }
  },
  async mounted() {
    const { data } = await getResultadoProyecto(
      this.ideaSelected.id
    )
    this.estadoFinal = data.codigoEstado
  },
  methods: {
    atras() {
      this.$emit('atras')
    },
    inicio() {
      this.$emit('inicio')
    }
  }
}
</script>

<style lang="scss">
.line{
  text-align: center;
}
.app-step5{
  .container-img{
      display: grid;
    align-content: center;
    justify-content: center;
    align-items: center;
    justify-items: center;
    img{
      width: 50%;
    }
  }

}
</style>

