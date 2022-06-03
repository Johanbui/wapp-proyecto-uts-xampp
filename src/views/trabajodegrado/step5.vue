<template>
  <div class="app-step5">
    <div class="container-img">

      <template v-if="estadoFinal ==='APREIDEA'">
        <img src="https://www.uts.edu.co/sitio/wp-content/uploads/2022/05/UTS5387.jpg">
        <h2> Su trabajo de grado se encuentra en estado aprobado</h2>
      </template>
      <template v-else-if="estadoFinal ==='CANEIDEA'">
        <img src="https://www.uts.edu.co/sitio/wp-content/uploads/2022/05/UTS5387.jpg">
        <h2> Su trabajo de grado se encuentra en estado NO aprobado</h2>
      </template>

      <template v-else-if="estadoFinal ==='EXPIDEA'">
        <img src="https://www.uts.edu.co/sitio/wp-content/uploads/2022/05/UTS5387.jpg">
        <h2> Su trabajo de grado se encuentra en estado expirado</h2>
      </template>
      <template v-else-if="estado!==null">
        <img src="https://www.uts.edu.co/sitio/wp-content/uploads/2022/05/UTS5387.jpg">
        <h2> {{ estado.codigoNombre }}</h2>
      </template>

      <template v-else>
        <h2> Su trabajo de grado aun no tiene un resultado asignado</h2>
      </template>
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
      estadoFinal: '',
      estado: null
    }
  },
  async mounted() {
    const { data } = await getResultadoProyecto(
      this.ideaSelected.id
    )
    if (typeof data.codigoEstado !== 'undefined') {
      this.estadoFinal = data.codigoEstado
      this.estado = data
    }
  },
  methods: {
    atras() {
      this.$emit('atras')
    },
    inicio() {
      this.$emit('inicio')
    }
  },
  isEmpty(obj) {
    return Object.keys(obj).length === 0
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

