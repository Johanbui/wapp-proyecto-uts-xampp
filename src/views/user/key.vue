<template>
  <div class="app-container">
    <el-form ref="userEditForm" :model="changePasswordForm" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">User Edit</h3>
      </div>

      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="Password" prop="password">
            <el-input
              ref="password"
              v-model="changePasswordForm.password"
              placeholder="password"
              name="password"
              type="password"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="repassword" label="Re-password">
            <el-input
              ref="repassword"
              v-model="changePasswordForm.repassword"
              placeholder="Re-Password"
              name="repassword"
              type="password"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="newpassword" label="New Password">
            <el-input
              ref="newpassword"
              v-model="changePasswordForm.newpassword"
              placeholder="New Password"
              name="newpassword"
              type="password"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Change Password</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import { changePassword } from '@/api/user'

export default {
  data() {
    return {
      id: 0,
      pageLoading: true,
      changePasswordForm: {
        password: '',
        repassword: '',
        newpassword: ''
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
  },
  methods: {
    onSubmit() {
      const params = {
        id: this.id,
        password: this.changePasswordForm.password,
        repassword: this.changePasswordForm.repassword,
        newpassword: this.changePasswordForm.newpassword
      }

      if (this.changePasswordForm.password.toLowerCase() !== this.changePasswordForm.repassword.toLowerCase()) {
        this.$message(
          {
            showClose: true,
            message: 'Password and re-password are not the same',
            type: 'warning'
          }
        )
        return
      }

      changePassword(params).then(response => {
        this.$message(
          {
            showClose: true,
            message: response.message,
            type: response.type
          }
        )
        if (response.type === 'success') {
          this.$router.push({ path: '/user/index' })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/user/index' })
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
