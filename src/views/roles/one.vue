<template>
  <div class="app-container">
    <el-form ref="rolCreateForm" :model="rolCreateForm" :rules="userEditRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">User </h3>
      </div>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="name" label="Name">
            <el-input
              ref="name"
              v-model="rolCreateForm.name"
              placeholder="Last Name"
              name="name"
              type="text"
              tabindex="1"
              auto-complete="on"
              disabled=""
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="Code" prop="code">
            <el-input
              ref="code"
              v-model="rolCreateForm.code"
              placeholder="Code"
              name="code"
              type="text"
              tabindex="1"
              auto-complete="on"
              disabled=""
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="enable" label="Enable/Disable">
            <el-switch
              v-model="rolCreateForm.enable"
              disabled=""
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
import { getOne } from '@/api/rol'

export default {
  data() {
    return {
      id: 0,
      pageLoading: true,
      rolCreateForm: {
        name: '',
        code: '',
        enable: 1
      },
      userEditRules: {
        name: [{ required: true }],
        code: [{ required: true }],
        enable: [{ required: true }]

      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.id = route.params.id && route.params.id
      },
      immediate: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.pageLoading = true
      getOne(this.id).then(response => {
        response.data.enable = (response.data.enable === 1)
        // this.user = response.data
        this.pageLoading = false
        this.rolCreateForm = { ...response.data }
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
</style>
