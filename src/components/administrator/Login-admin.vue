<template>
  <div id="admin-loginbox">
    <div id="form-box">
      <img src="/images/logo.jpg" alt="" />
      <el-form
        ref="adminloginFrom"
        :model="adminloginFrom"
        :rules="adminloginRules"
      >
        <el-form-item label="管理员ID" prop="name">
          <el-input v-model="adminloginFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="adminloginFrom.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLoginSubmit">立即查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminloginRules: {
        name: [{ required: true, message: "请输入管理员ID", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      adminloginFrom: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    onLoginSubmit() {
      this.$refs.adminloginFrom.validate((valid) => {
        if (!valid) {
          this.$message("请检查表单是否填写整");
        } else {
          this.$post("/ManagerLoginServlet", this.adminloginFrom)
            .then((res) => {
              // console.log(res);
              if (res.Status == 200) {
                sessionStorage.setItem('admin','1')
                this.$router.push("/backstage");
              }
            })
            .catch((err) => {
              this.$message.error("未知错误,登录失败哦！");
            });
        }
      });
      //  this.$router.push("/backstage");
    },
  },
};
</script>

<style lang="less" scoped>
#admin-loginbox {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(/images/bgimg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  #form-box {
    max-width: 380px;
    width: 80%;
    height: 60%;
    // opacity: 0.7;
    background-color: #fff;
    position: relative;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      top: -55px;
      left: 50%;
      transform: translate(-50%);
    }
    .el-form {
      width: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
