<template>
  <div>

    <div class="app-container">
      <el-form
        ref="userCreateForm"
        :model="userCreateForm"
        :rules="userEditRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">User Create</h3>
        </div>

        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="Name" prop="name">
              <el-input
                ref="name"
                v-model="userCreateForm.name"
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
                v-model="userCreateForm.last_name"
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
              <el-select
                v-model="userCreateForm.gender"
                placeholder="please select your gender"
              >
                <el-option label="Male" value="1" />
                <el-option label="Female" value="2" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="enable" label="Enable/Disable">
              <el-switch v-model="userCreateForm.enable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="Rol" prop="rol">
              <el-select
                v-model="userCreateForm.rol_id"
                placeholder="please select your Rol"
              >
                <el-option
                  v-for="rol in roles"
                  :key="rol.id"
                  :label="rol.name"
                  :value="rol.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Coordinacion" prop="coordinacion">
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
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="24">
            <el-form-item prop="email" label="E-mail">
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
          </el-col>
        </el-row>

        <el-row :gutter="30">
    <el-col :span="24">
      <el-form-item prop="avatar" label="Avatar">
        <!-- Cambiar de el-input a el-upload para admitir la carga de imágenes -->
        <el-upload
          class="upload-demo"
          action="http://192.168.10.242/apiproyectouts/public/api/files/push"
          :on-preview="handlePreview"
          :on-remove="handleRemoveAvatar"
          :file-list="fileList"
          :before-upload="beforeUploadAvatar"
          :on-success="handleSuccessAvatar"
          :limit="1"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            Suelta tu avatar aquí o <em>haz clic para cargar</em>
          </div>
          <div slot="tip" class="el-upload__tip">
            Solo archivos jpg/png con un tamaño menor de 500kb
          </div>
        </el-upload>
      </el-form-item>
    </el-col>
  </el-row>

        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="Pasword" prop="password">
              <el-input
                ref="password"
                v-model="userCreateForm.password"
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
                v-model="userCreateForm.repassword"
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
    <Footer :activar-bg="true" />
  </div>
</template>

<script>
import { create } from '@/api/user'
import { getAll } from '@/api/rol'
import { validEmail } from '@/utils/validate'
import { getListaOne } from '@/api/lista'
import Footer from '@/components/footer'

export default {
  components: { Footer },
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
        fileList: [],
        name: '',
        last_name: '',
        gender: '1',
        enable: true,
        email: '',
        avatar: '',
        password: '',
        repassword: '',
        rol_id: '',
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
  watch: {
    $route: {
      handler: function(route) {
        // this.id = route.params.id && route.params.id
      },
      immediate: true
    }
  },
  async created() {
    await this.getRoles()
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
    getRoles() {
      this.listLoading = true
      const params = {
        limit: this.numberItems,
        page: this.currentPage
      }
      getAll(params).then((response) => {
        this.roles = response.data.map(function(x) {
          x.enable = x.enable === 1
          return x
        })
        this.listLoading = false
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
          this.$router.push({ path: '/user' })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/user' })
    },
    handleRemoveAvatar(file, fileList) {
      console.log('handleRemoveAvatar', file, fileList);
    },

    handlePreview(file) {
      console.log('handlePreview', file);
    },

    beforeUploadAvatar(file) {
      console.log('beforeUploadAvatar', file);
    },

    handleSuccessAvatar(res, file) {
  console.log('handleSuccessAvatar', res.file);
  // Puedes manejar la respuesta del servidor después de cargar la imagen del avatar
  // Asigna la ID de la imagen al campo avatar si es necesario
  const avatarId = res.file.id;

  // Construye la URL completa del avatar y asígnala al campo avatar
  this.userCreateForm.avatar = `http://192.168.10.242/apiproyectouts/public/api/files/${avatarId}`;
},
  }
}
</script>
<style scoped>
img.row_avatar {
  width: 35px;
  border-radius: 50%;
}
</style>
