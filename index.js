document.addEventListener("mousemove", (event)=>{
  const cursorDefaultInner = document.querySelector(".cursor_default_inner")

  cursorDefaultInner.style.top = event.clientY +"px"
  cursorDefaultInner.style.left = event.clientX +"px"

  const cursorEffect = document.querySelector(".cursor_trace_inner")
  
  cursorEffect.style.top = event.clientY + "px"
  cursorEffect.style.left = event.clientX  +"px"
})

const cursor = document.querySelector(".cursor")

document.addEventListener("mousedown", ()=>{
  cursor.classList.add("cursor_active")
})

document.addEventListener("mouseup", ()=>{
  cursor.classList.remove("cursor_active")
})

function createRipple (event){
 let ripple = document.createElement("span")
 ripple.classList.add("ripple")

 cursor.appendChild(ripple)

 ripple.style.top = (event.clientY -ripple.clientHeight / 2) + "px";
 ripple.style.left = (event.clientX -ripple.clientWidth / 2) + "px";
 ripple.addEventListener("animationend", ()=>{
  cursor.removeChild(ripple)
 })
}

document.addEventListener("click", (event)=>{
  createRipple(event)
})

let intervalId = null
let scale = 1


const preloaderHide = 18
const preloaderBtn = document.querySelector(".preloader_btn")

function setPreloaderStyle(scale){
  preloaderBtn.style.transform = `scale(${scale})`
  document.querySelector(".preloader_btn_hold").style.opacity = 1 - (scale - 1) / preloaderHide
}

preloaderBtn.addEventListener("mousedown", ()=>{
  intervalId = setInterval(()=>{ 
    scale += 10.175

    setPreloaderStyle(scale)
  
   if (scale > 19){
    const header = document.querySelector(".header")
    document.querySelector(".preloader").classList.add("hidden_area")

    header.classList.remove("hidden_area")
    header.classList.add("shown_area")
    clearInterval(intervalId)
   }
   
  }, 10)
})

preloaderBtn.addEventListener("mouseup",()=>{
  clearInterval(intervalId)
  intervalId = setInterval(() => {
     scale -= 0.075
    setPreloaderStyle(scale)
    if( scale <= 1 ){ 
     clearInterval(intervalId)
}
   
  }, 10);
})


const listStyleChangeStartY = 450
const listStyleChangeEndY = 980

const listItem = document.querySelectorAll(".item")

const division = (listStyleChangeEndY - listStyleChangeStartY) / listItem.length

window.addEventListener("scroll", ()=>{
if(document.getElementById("on")) document.getElementById("on").removeAttribute("id")

  if(window.scrollY > listStyleChangeStartY && window.scrollY < listStyleChangeEndY)
  {
   const targetItem =  Math.round( (window.scrollY - listStyleChangeStartY) / division )
   if(listItem[targetItem])
    listItem[targetItem].id = "on"
  } 
  
})

const observer = new IntersectionObserver((entries)=> {
entries.forEach((entry) => {
  if (entry.isIntersecting){
    entry.target.classList.add("poster_image_state_visible")
  }
})
}, {threshold:0.2})
document.querySelectorAll(".poster_image_wrapper").forEach((poster) =>{
  observer.observe(poster)
})

const posterParallax = document.querySelector(".poster_parallax")

posterParallax.addEventListener("mousemove",
(e) => {
  const xRelativeToPosterParallex = e.clientX / posterParallax.clientWidth
  const yRelativeToPosterParallex = e.clientY / posterParallax.clientHeight

  document.querySelector("#poster_image_wrapper2").style.transform = `translate(${xRelativeToPosterParallex * -40}px, ${yRelativeToPosterParallex * -40}px)`
  document.querySelector("#poster_image_wrapper3").style.transform = `translate(${xRelativeToPosterParallex * 40}px, ${yRelativeToPosterParallex * 40}px) `
})



const observerFlower = new IntersectionObserver((entries)=> {
  entries.forEach((entry) => {
    if (entry.isIntersecting){
      entry.target.classList.add("flower_content_state_visible")
    }
  })
  }, {threshold:0.2})
  document.querySelectorAll("#flower_content").forEach((poster) =>{
    observerFlower.observe(poster)
  })