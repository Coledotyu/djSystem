<template>
  <div class="login-container">
    <div class="login-container-inner">
      <img src="/static/images/login/OA.png">
      <span style="display: block; font-size: 10px; color: #909DB7; margin: 1rem auto;">欢迎登录后台管理系统！</span>
      <el-form ref="loginForm" :model="loginForm" :rules="rules" class="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="admin"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="123456"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginFormSubmit()" class="login-button">登录</el-button>
        </el-form-item>
      </el-form>
      <span style="color: #909DB7; font-size: 10px;">@ 2019 Leooel All rights reserved.</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["admin"])
  },
  methods: {
    loginFormSubmit() {
      const data = {
        account: this.loginForm.username,
        password: this.loginForm.password
      };
      this.$http
        .post("/api/login", data)
        .then(res => {
          console.log(res.data);
          if (res.data.status === 1001) {
            // 账号不存在
            this.$message({
              message: "该用户不存在！",
              type: "error"
            });
          } else {
            // 登录成功！
            this.admin.adminInfo = res.data.data;
            this.admin.login = true;
            this.$message({
              message: "登录成功！",
              type: "success"
            });
            this.$router.push({
              name: "PartyMemRepCount"
            });
          }
        })
        .catch(error => {
          console.log("登录出错啦！");
        });
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/index";

.login-container {
  @include wh(100%, 100%);
  background-color: #f4f5f5;
  display: flex;

  .login-container-inner {
    width: 30%;
    height: 50%;
    margin: 8rem auto;
  }

  .login-button {
    margin-top: 2rem;
    width: 100%;
  }
}
</style>
