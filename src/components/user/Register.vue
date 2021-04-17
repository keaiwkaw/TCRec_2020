<template>
  <div id="register-box">
    <div id="form-box">
      <div class="register-header">欢迎报名Thought Coding</div>
      <el-form
        ref="userRegisterFromRef"
        :model="registerFrom"
        :rules="registerRules"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="registerFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studentID">
          <el-input v-model="registerFrom.studentID"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerFrom.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="number">
          <el-input v-model="registerFrom.number"></el-input>
        </el-form-item>
        <el-form-item  label=" 验证" prop="newcode">
             <div class="vericode">
            <el-input
              v-model="registerFrom.newcode"
            ></el-input>
            <el-button id="code-btn" @click="getCode($event,this)" :disabled="showbtn">{{getCodeText}}</el-button>
             </div>
        </el-form-item>
        <el-form-item prop="team">
          <el-select v-model="registerFrom.team" placeholder="请选择方向">
            <el-option label="嵌入式" value="嵌入式"></el-option>
            <el-option label="前端组" value="前端组"></el-option>
            <el-option label="后台组" value="后台组"></el-option>
            <el-option label="安卓组" value="安卓组"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">立即报名</el-button>
        </el-form-item>
       <el-form-item><span>密码为教务处密码</span><br><span>教务处初始密码为身份证号后6位</span></el-form-item>
          
        
      </el-form>
    </div>
    
  </div>
</template>

<script>
import {debounce} from '../../debounce/debounce.js'
export default {
  
  data() {
  let checkMobile = (rule, value, cb) => {
      const regMobile = /^1[3456789]\d{9}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    };
    return {
      loading:false,
      registerFrom: {
        name: "",
        studentID: "",
        password: "",
        number: "",
        team: "",
        newcode:"",
      },
      getCodeText:'获取验证码',
      showbtn:false,
      registerRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        studentID: [
         { required: true, message: '请输入学号', trigger: 'blur' },
         { min: 8, max: 8, message: '长度在为8个字符', trigger: 'blur' }
        ],
        password: [
           { required: true, message: '请输入密码', trigger: 'blur' },
        ],
         newcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
         { min: 6, max: 6, message: '长度在为6个字符', trigger: 'blur' }
        ],
        number: [
           { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
     
        team: [
            { required: true, message: '请选择团队', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    onRegisterSubmit() {
    //  console.log(this.$refs.userRegisterFromRef);
      this.$refs.userRegisterFromRef.validate((vaild) => {
        // console.log(vaild);
        if (!vaild) {
          // console.log(123);
          this.$message("请检查表单是否完整");
        } else {
          this.loading =true
          this.$post(`/LogonServlet`, this.registerFrom).
            then((res) => {
              // console.log(res.Status);
              // console.log(res.Logon_msg);
              if (res.Status == 200) {
                 this.$message.success('注册成功');
                 window.sessionStorage.setItem('name',this.registerFrom.name)
                 window.sessionStorage.setItem('flag','0')
                 this.loading =false;
                this.$router.push("/progress");
              }else{
                this.$message.error(`${res.Logon_msg}`);
              }
           
            })
        }
      });
    },
 submit:debounce(function(){this.onRegisterSubmit()},1000),
    getCode(){
        if(!/^1[0-9]{10}$/.test(this.registerFrom.number)){
          this.$message.error('请先输入手机号！')
        }else{
        this.showbtn=true
              this.getCodeText = 60;
              let Timer = setInterval(()=>{
                this.getCodeText--
                if( this.getCodeText==0){
                clearInterval(Timer)
                this.getCodeText = "获取验证码";
                this.showbtn=false

              }
              },1000)
              this.$post(`/CodeServlet?number=${this.registerFrom.number}`).then(r=>{
                this.$message.success("获取验证码成功")
              })
        }  
    }
  },
};
</script>

<style lang="less" scoped>
#register-box {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(/images/bgimg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #form-box {
    // flex: 1;
    // height: 70px;
    width: 80%;
    max-width: 480px;
    // max-height: 780px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .register-header {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-size: 1.3em;
      border-bottom: 1px solid;
      margin-bottom: 10px;
    }
    .el-form {
      margin-top: 20px;
      // flex: 1;
      width: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .el-form-item {
        width: 100%;
        padding: 0;
        .vericode {
          // width: 100%;
          display: flex;
          // justify-content: start;
          // align-items: center;
          // overflow: hidden;
        }
        .el-input {
          width: 80%;
        }
        .el-select {
          width: 100%;
        }
      }
    }
  }

.code-box{
  // width: 30%;
  overflow: hidden;
  // display: flex;
  justify-content: start;
  #code-btn{
  // flex: 1;
  // width: 10%;
  display: flex;
  justify-content: center;
  // margin-right: 5%;
  width: 90px;
}
}
}
</style>
