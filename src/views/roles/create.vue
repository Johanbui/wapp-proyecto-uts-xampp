<template>
  <div>
    <div class="app-container">
      <el-form ref="rolCreateForm" :model="rolCreateForm" :rules="userEditRules" class="login-form" auto-complete="on" label-position="left">

        <div class="title-container">
          <h3 class="title">User Edit</h3>
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
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="enable" label="Enable/Disable">
              <el-switch v-model="rolCreateForm.enable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="onCancel">Cancel</el-button>
        </el-form-item>

      </el-form>

    </div>
    <Footer :activar-bg="true" />
  </div>
</template>

<script>
import { create } from '@/api/rol'
import Footer from '@/components/footer'

export default {
  components: { Footer },

  data() {
    return {
      // id: 0,
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
        // this.id = route.params.id && route.params.id
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {

    onSubmit() {
      const params = { ...this.rolCreateForm }
      params.enable = (params.enable) ? 1 : 0

      create(params).then(response => {
        this.$message(
          {
            showClose: true,
            message: response.message,
            type: response.type
          }
        )
        if (response.type === 'success') {
          this.$router.push({ path: '/rol' })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/rol' })
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
