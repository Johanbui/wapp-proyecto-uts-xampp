<template>
  <div class="login-container">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div
        class="title-container"
        style="    position: relative;
    display: grid;
    align-content: center;
    justify-content: center;
    align-items: center;
    justify-items: center;"
      >
        <img :src="logo" style="max-width:250px">
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Ingreso</el-button>



      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;margin-left: 0px;" @click="redirectToUrl">Ingreso Correo institucional</el-button>
      <div v-if="mostrarVentana" class="ventana-flotante">
      <div class="ventana-contenido">
        <h2>Alerta</h2>
        <p>{{ alerta }}</p>
        <button @click="cerrarVentana">Cerrar</button>

      </div>
    </div>

    </el-form>






  </div>

</template>

<script>
import axios from 'axios';
import { validUsername } from '@/utils/validate'
import logo from '@/assets/logoUTS.png'
import Footer from '@/components/footer'
import { setToken} from '@/utils/auth'
import store from '@/store'
import Cookies from 'js-cookie'

export default {
  name: 'Login',
  components: { Footer },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      url: 'http://192.168.10.242/apiproyectouts/public/api/auth/login?login=1',
      logo,
      mostrarVentana: false,
      alerta: "",
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  async mounted() {
    debugger;
    if(this.queryParams?.token ){
      console.log(this.queryParams?.token);
      Cookies.set('vue_admin_template_token', this.queryParams?.token)
      debugger
      location.href="/"

    }

    if(this.queryParams?.alerta ){

      this.alerta = this.queryParams.alerta;
      this.mostrarVentana = true;
      debugger

    }

  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {

    cerrarVentana() {
      this.mostrarVentana = false;
    },

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    redirectToUrl() {
      debugger;
      const url = this.url;
      console.log(url);
    window.location.href =url ;
    },
    handleLogin() {
  this.$refs.loginForm.validate(valid => {
    if (valid) {
      const queryParams = new URLSearchParams();
      queryParams.append('username', this.loginForm.username);
      queryParams.append('password', this.loginForm.password);

      const url = `${this.url}&${queryParams.toString()}`;
      window.location.href = url;

    } else {
      console.log('error submit!!');
      return false;
    }
  });
},
    handleRegister() {
      this.$router.push({ path: '/register' })
    }
  },
  computed:{
    queryParams() {
      const params = new URLSearchParams(window.location.search)
      let queryParam={};
      for (const param of params) {
        queryParam[param[0]] = param[1]
      }
      return queryParam
    }
  }



}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
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
.login-container .el-input{
    width: auto !important;
}
.ventana-flotante {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #43566d;
  border: 1px solid #ccccccd4;
  padding: 20px;
  z-index: 9999;
  box-shadow: 0 0 200px rgba(63, 63, 63, 0.3);
}

.ventana-contenido {
  text-align: center;
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

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
