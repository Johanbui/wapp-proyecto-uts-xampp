<template>
  <div class="Hola">
    <p>aaaa</p>
    {{queryParams}}
  </div>

</template>

<script>

export default {
  name: 'azuretoken',
  data() {

  },
  computed:{
    queryParams() {

      return ""
    }
  },
  methods: {

  },
  mounted(){

    console.log(this.queryParams)
    console.log("Hola")
  }
}
</script>
