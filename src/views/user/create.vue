<template>
  <div class="app-container">
    <el-form ref="userEditForm" :model="userEditForm" :rules="userEditRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">User Edit</h3>
      </div>

      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="Name" prop="name">
            <el-input
              ref="name"
              v-model="userEditForm.name"
              placeholder="Name"
              name="name"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="last_name" label="Last Name">
            <el-input
              ref="last_name"
              v-model="userEditForm.last_name"
              placeholder="Last Name"
              name="last_name"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="Gender" prop="gender">
            <el-select v-model="userEditForm.gender" placeholder="please select your gender">
              <el-option label="Male" value="1" />
              <el-option label="Female" value="2" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="enable" label="Enable/Disable">
            <el-switch v-model="userEditForm.enable" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="email" label="E-mail">
            <el-input
              ref="email"
              v-model="userEditForm.email"
              placeholder="Email"
              name="email"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="avatar" label="Avatar">
            <el-input
              ref="avatar"
              v-model="userEditForm.avatar"
              placeholder="avatar"
              name="avatar"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="Pasword" prop="password">
            <el-input
              ref="password"
              v-model="userEditForm.password"
              placeholder="password"
              name="password"
              type="password"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="repassword" label="Re-Password">
            <el-input
              ref="repassword"
              v-model="userEditForm.repassword"
              placeholder="Re-Password"
              name="repassword"
              type="password"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import { create } from '@/api/user'
import { validEmail } from '@/utils/validate'

export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }

    return {
      // id: 0,
      pageLoading: true,
      userEditForm: { },
      userEditRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        name: [{ required: true }],
        last_name: [{ required: true }],
        avatar: [{ required: true }],
        gender: [{ required: true }],
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
      const params = { ...this.userEditForm }
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
