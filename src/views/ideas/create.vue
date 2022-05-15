<template>
  <div class="app-container">
    <el-form
      ref="ideaCreateForm"
      :model="ideaCreateForm"
      :rules="ideaRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Idea Create</h3>
      </div>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="titulo" label="Título">
            <el-input
              ref="titulo"
              v-model="ideaCreateForm.titulo"
              placeholder="Título"
              name="titulo"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="modalidad" label="Modalidad">
            <el-select v-model="ideaCreateForm.modalidad" placeholder="Modalidad">
              <el-option
                v-for="item in modalidades"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item prop="max_estudiantes" label="Max Estudiantes">
            <el-input
              ref="max_estudiantes"
              v-model="ideaCreateForm.max_estudiantes"
              placeholder="Max Estudiantes"
              name="max_estudiantes"
              type="number"
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
import { create } from '@/api/idea'

export default {
  data() {
    return {
      pageLoading: true,
      ideaCreateForm: {
        titulo: '',
        max_estudiantes: 0,
        modalidad: ''
      },
      modalidades: [],
      ideaRules: {
        titulo: [{ required: true }],
        max_estudiantes: [{ required: true }]
      }
    }
  },

  created() {},

  methods: {
    onSubmit() {
      const params = { ...this.ideaCreateForm }

      create(params).then((response) => {
        this.$message({
          showClose: true,
          message: response.message,
          type: response.type
        })
        if (response.type === 'success') {
          this.$router.push({ path: '/idea' })
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/idea' })
    }
  }
}
</script>
