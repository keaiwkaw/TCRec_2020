const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scroll-to-top");
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
});

const glide = new Glide(".glide", {
  type: "carousel",
  startAt: 0,
  autoplay: 3500,
});
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

///jq
let id = document.querySelector('#studentid');
let password = document.querySelector('#password');
let submitBtn = document.querySelector('.btn');
id.value = '04193125'
password.value='a123456789'
const req = document.querySelector('#register')
req.addEventListener('click',function(){
  window.location.href = 'http://112.74.82.123/register'
})
submitBtn.addEventListener('click',()=>{
  let xhr = new XMLHttpRequest()
  xhr.open('POST','http://192.168.1.198:8080/LoginServlet')
  if(id.value==""||password.value=="")return alert("检查表单是否完整")
  if(!/^[0-9]{8}$/.test(id.value))return alert("学号格式错误")
  xhr.send(`studentID=${id.value}&password=${password.value}`);
  xhr.onload = function(){
    console.log(xhr.response);
    let res = JSON.parse(xhr.response);
   if(res.Status==200){
     console.log(res);
    window.sessionStorage.setItem('name',res.data.name)
    window.sessionStorage.setItem('flag',res.data.flag)
    window.location.href = 'http://112.74.82.123/progress'
   }else{
     alert("账号或密码错误")
   }
  }
  xhr.onerror = function(){
    alert('服务器错误')
  }
  scroll.animateScroll(document.querySelector("#login-box"));
})