<template>
  <div class="login-container">
    <el-form
      ref="userCreateForm"
      :model="userCreateForm"
      :rules="userEditRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Register</h3>
      </div>

      <el-form-item prop="name">
        <el-input
          ref="name"
          v-model="userCreateForm.name"
          placeholder="Nombre"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="last_name">
        <el-input
          ref="last_name"
          v-model="userCreateForm.last_name"
          placeholder="Apellidos"
          name="last_name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="gender">
        <el-select
          v-model="userCreateForm.gender"
          placeholder="Porfavor seleccion su genero"
        >
          <el-option label="Masculino" value="1" />
          <el-option label="Femenino" value="2" />
        </el-select>
      </el-form-item>

      <el-form-item prop="coordinacion">
        <el-select
          v-model="userCreateForm.id_coordinacion"
          placeholder="Por favor seleccione coordinación"
        >
          <template v-for="coordinacion in coordinaciones">
            <el-option
              :key="coordinacion.id"
              :label="coordinacion.nombre"
              :value="coordinacion.id"
            />
          </template>
        </el-select>
      </el-form-item>

      <el-form-item prop="email">
        <el-input
          ref="email"
          v-model="userCreateForm.email"
          placeholder="Email"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="avatar">
        <el-input
          ref="avatar"
          v-model="userCreateForm.avatar"
          placeholder="Url Imagen"
          name="avatar"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="userCreateForm.password"
          placeholder="Contraseña"
          name="password"
          type="password"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="repassword">
        <el-input
          ref="repassword"
          v-model="userCreateForm.repassword"
          placeholder="Repetir Contraseña"
          name="repassword"
          type="password"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="onCancel">Cancel</el-button>

    </el-form>
  </div>
</template>

<script>
import { create } from '@/api/user'
import { validEmail } from '@/utils/validate'
import { getListaOne } from '@/api/lista'
export default {
  name: 'Register',
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
      roles: [],
      userCreateForm: {
        name: '',
        last_name: '',
        gender: '1',
        enable: false,
        email: '',
        avatar: '',
        password: '',
        repassword: '',
        rol_id: 4,
        id_coordinacion: ''
      },
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

  watch: {},
  async created() {
    await this.fetchDataListas()
  },
  methods: {
    fetchDataListas() {
      this.pageLoading = getListaOne('COORD').then((response) => {
        response.data.enable = response.data.enable === 1
        // this.user = response.data
        this.pageLoading = false
        this.coordinaciones = [...response.data]
      })
    },

    onSubmit() {
      const params = { ...this.userCreateForm }
      params.enable = params.enable ? 1 : 0

      create(params).then((response) => {
        this.$message({
          showClose: true,
          message: response.message,
          type: response.type
        })
        if (response.type === 'success') {
          this.$router.push({ path: '/login' })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss">
.login-container .el-select>.el-input{
  width: 100% !important;
}
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-select>.el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

</style>
