<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">财务系统登录</h2>
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="登陆账户"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="登录密码"
            prefix-icon="el-icon-lock"
            show-password
          />
        </el-form-item>
        <el-button
          type="primary"
          @click="handleLogin"
          class="login-btn"
          :loading="loading"
        >
          登录系统
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const loginForm = ref()
const loading = ref(false)

const form = ref({
  username: '',
  password: ''
})

const validateUsername = (_: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('请输入账户'))
  } else if (value !== 'admin') {
    callback(new Error('账户不存在'))
  } else {
    callback()
  }
}

const validatePassword = (_: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('请输入密码'))
  } else if (value !== '123456') {
    callback(new Error('密码错误'))
  } else {
    callback()
  }
}

const rules = {
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
}

const handleLogin = () => {
  loginForm.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        localStorage.setItem('isLogin', 'true')
        router.push('/dashboard')
        ElMessage.success('登录成功')
        loading.value = false
      }, 1000)
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}

.login-card {
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 95%;
  }
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>