<template>
  <div>

    <div class="app-container">
      <el-row :gutter="30">

        <el-col :span="24">
          <el-transfer
            v-model="value"
            :data="data"
            :titles="['Inactivos', 'Activos']"
          />
        </el-col>
      </el-row>
    </div>
    <Footer :activar-bg="true" />
  </div>
</template>

<script>
import { getAll, update } from '@/api/permission'
import { mapGetters } from 'vuex'
import Footer from '@/components/footer'

export default {
  components: { Footer },
  data() {
    return {
      data: [],
      value: null,
      id: 0
    }
  },
  computed: {
    ...mapGetters([
      'user_id',
      'users_roles'
    ])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.id = route.params.id && route.params.id
      },
      immediate: true
    },
    value(newValue, oldValue) {
      if (oldValue !== null) {
        this.onUpdate(newValue)
      }
    }
  },
  async created() {
    await this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const params = {
        rol_id: this.id
      }
      console.log(params)
      const data = []
      const value = []

      getAll(params).then(response => {
        for (let i = 0; i < response.data.length; i++) {
          data.push({
            key: response.data[i].id,
            label: response.data[i].name,
            disabled: false
          })
        }
        for (let i = 0; i < response.permission.length; i++) {
          console.log(response.permission[i])
          value.push(response.permission[i].id)
        }

        this.countItems = response.count
        this.listLoading = false
      })
      this.value = value
      this.data = data
    },
    onUpdate(newValue) {
      const params = {
        permissions: [...newValue],
        rol_id: this.id
      }

      update(params).then(response => {
        this.$message(
          {
            showClose: true,
            message: 'Created Succefully!',
            type: 'success'
          }
        )
      })
    }
  }
}
</script>
<style scoped>
img.row_avatar{
  width: 35px;
  border-radius: 50%;
}
.el-row{
  height: 70px;
  margin-top: 50px;
}
</style>
