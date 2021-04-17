<template>
  <div>
       <header>
      <div class="logo">ThoughtCoding</div>
      <nav>
        <a href="#">首页</a>
        <a href="#team-intro">加入我们</a>
        <a href="#login-box">去报名</a>
      </nav>
      <div class="burger">
        <div class="burger-line1"></div>
        <div class="burger-line2"></div>
        <div class="burger-line3"></div>
      </div>
    </header>
    <div id="home" class="glide">
      <div class="glide__track" data-glide-el="track">
        <div class="glide__slides">
          <!-- 轮播图一 -->
          <div class="glide__slide">
            <div class="slide-caption left">
              <h1>ThoughtCoding</h1>
              <h3>科技点亮世界，智能改变生活</h3>
              <button class="explore-btn">探索更多</button>
            </div>
            <div class="backdrop"></div>
            <img src="/images1/01.webp" />
          </div>
          <div class="glide__slide">
            <div class="slide-caption left">
              <h1>ThoughtCoding</h1>
              <h3>T除所有bug，C位由你Get</h3>
              <button class="explore-btn">探索更多</button>
            </div>
            <div class="backdrop"></div>
            <!-- <video
              src="/videos/working-man.mp4"
              muted
              autoplay
              loop
            ></video> -->
             <img src="/images1/02.webp" />
          </div>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
            <i class="fa fa-angle-left"></i>
          </button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
            <i class="fa fa-angle-right"></i>
          </button>
          <div class="glide__bullets" data-glide-el="controls[nav]">
            <button class="glide__bullet" data-glide-dir="=0" type="button"></button>
            <button class="glide__bullet" data-glide-dir="=1"></button>
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <section id="team-intro" class="team-intro section-bg">
        <h2 class="title1">方向介绍</h2>
        <div class="team-members">
          <div class="team-member">
            <div class="profile-image">
              <img src="/images1/qianrushi.jpg" alt="">
            </div>
            <h4 class="name">嵌入式</h4>
            <p class="position">以计算机技术为基础，学习使用软件操控硬件
              制作具有各种功能的设备</p>
          
          </div>
          <div class="team-member">
            <div class="profile-image">
              <img src="/images1/fontend.jpg" alt="">
            </div>
            <h4 class="name">前端组</h4>
            <p class="position">Web 前端，通常是指网站的前台部分，包括网站的表现层和结构层：Web 页面的结构、Web 的外观视觉表现以及 Web 层面的交互实现。</p>
          
          </div>
          <div class="team-member">
            <div class="profile-image">
              <img src="/images1/houtai.jpg" alt="">
            </div>
            <h4 class="name">后台组</h4>
            <p class="position">后端开发即“服务器端”开发，就是用代码实现业务逻辑。主要涉及到软件系统“后端”的东西——比如用于托管网站和 App 数据的服务器，放置在后端服务器、浏览器、App 之间的中间件。</p>
          </div>
          <div class="team-member">
            <div class="profile-image">
              <img src="/images1/anzhuo.jpg" alt="">
            </div>
            <h4 class="name">安卓</h4>
            <p class="position">Android 是 Google 开发的基于 Linux 平台的开源手机操作系统。它包括操作系统、用户界面和应用程序。</p>
          
          </div>
        </div>
      </section>
      <section id="login-box">
        <div class="card">
          <div class="imgBox">
            <img src="/images1/book.png">
          </div>
          <div class="details">
            <div class="login-form">
              <h2>Login</h2>
           <form action="">
            <div class="item"><input type="number" required id="studentid" v-model="inf.studentID"><label for="" >StudentID</label></div>
            <div class="item"><input type="password" required id="password" v-model="inf.password"> <label for="" >Password</label></div>
            <p>没有账号?<router-link to="/register" tag="a">去注册</router-link></p>
            <button class="btn" @click="submit" type="button">  Submit
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
           </form>
            </div>
          
          </div>
        </div>
      </section>
      
    </div>
    <footer>
      <div class="footer-menus">
        <p class="rights">Copyright &copy; 2020 ThoughtCoding科技小组</p>
      </div>
    </footer>
  </div>
</template>

<script>
// import Glide from './glide.modular.esm.js'
// import anime from './anime.min'
import Glide,{ Controls, Breakpoints } from '../../../public/js/glide.modular.esm.js'
import anime from '../../../public/js/anime.min.js'
import {debounce} from '../../debounce/debounce.js'

export default {
data(){
  return {
    inf:{
      studentID:'',
      password:''
    }
   
  }
},
methods:{
  Submit(){

 
  if(this.inf.studentID==""||this.inf.password=="")return this.$message("检查表单是否完整")
  if(!/^[0-9]{8}$/.test(this.inf.studentID))return this.$message("学号格式错误")
    this.$post('/LoginServlet',this.inf).then(res=>{
       if(res.Status==200){
            window.sessionStorage.setItem('name',res.data.name)
    window.sessionStorage.setItem('flag',res.data.flag)
    this.$router.push('/progress')
      }else{
        this.$message.error("请检查账号密码")
      }
    }
    )
  },

   submit :debounce(function(){
      this.Submit()
    },1000),

},
mounted(){
const submitBtn = document.querySelector('.btn');
const headerEl = document.querySelector("header");
window.addEventListener("scroll", () => {
  // 获取
  let height = headerEl.getBoundingClientRect().height;
  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }

  // if (window.pageYOffset > 1000) {
  //   scrollToTop.style.display = "block";
  // } else {
  //   scrollToTop.style.display = "none";
  // }
});
const glide= new Glide('.glide').mount({ Controls, Breakpoints })
// const glide = new Glide(".glide", {
//   type: "carousel",
//   startAt: 0,
//   autoplay: 3500,
// });
const captionsEL = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"], () => {
  const caption = captionsEL[glide.index];
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "spring(1, 80, 10, 0)",
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10]), 0],
  });
});
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach((el) => {
    el.style.opacity = 0;
  });
});

glide.mount();

// 成功案例 js


// 通用滑动出现动画配置项
const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom",
};
const scroll = new SmoothScroll(
  'nav a[href*="#"] , .scroll-to-top a[href*="#"]',
  {
    header: "header",
    offset: 50,
  }
);

document.addEventListener("scrollStart", () => {
  if(headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
})

const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach((exploreBtnEl) => {
  exploreBtnEl.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#team-intro"));
  });
});

// 折叠按钮事件
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
})




  }
}
</script>

<style scoped>

</style>
