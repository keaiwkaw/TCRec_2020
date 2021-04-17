<template>
<div id="content">
  <div id="content-body">
      <img src="/images/logo.jpg" alt="">
      <div id="name">Hello &nbsp;&nbsp;{{name}}!</div>
       <el-steps :active="active" align-center finish-status="success">
        <el-step title="报名成功"></el-step>
        <el-step title="一面通过"></el-step>
        <el-step title="二面通过"></el-step>
        <el-step title="三面通过"></el-step>
        <el-step title="恭喜加入"></el-step>
      </el-steps>
    </div>
</div>
</template>
 
<script>
export default {
    data(){
      return{
        active:1,
        name:''
      }
    },
    methods:{
      getinfo(){
        if(!sessionStorage.getItem('name')){
           this.$router.push('/login');
          return;
        }
        const flag = sessionStorage.getItem('flag');
        const name = sessionStorage.getItem('name');
        this.name = name;
        switch(flag){
          case '0':
            this.active = 1;
            break;
            case '1':
            this.active = 2;
            break;
            case '2':
            this.active = 3;
            break;
            case '3':
            this.active = 5;
            break;
        }
        // let text = document.querySelectorAll('.is-process');
        // console.log(text);
        
        //  text.children[0].style.color = "red"
       
      }
    },
    created(){
      this.getinfo()
    }
}
</script>
 
<style lang="less" scoped>
#content{
   width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
  url(/images/bgimg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  #content-body{
    #name{
      left: 50%;
      transform: translate(-50%);
      position: absolute;
      top: 35%;
      font-weight: 300;
      font-size: 1.5rem;
      color: white;
    }
    max-width: 380px;
    width: 80%;
    height: 90%;
    position: relative;
     img{
        left: 50%;
       transform: translate(-50%);
        position: absolute;
        top: 20%;
        width: 80px;
        height: 80px;
      }
     .el-steps{
       left: 50%;
       transform: translate(-50%);
       position: absolute;
       bottom: 10%;
        width: 100%;
      }
  }
}

</style>