(()=>{var e=function(e){return e[Math.floor(Math.random()*e.length)]},t=[3e3,4e3,5e3,6e3,7e3,8e3],o=[{content:"Successful Operation !",type:"success",autoClose:e(t)},{content:"Something went wrong.",type:"error",autoClose:e(t)},{content:"What a great toaster this is !",type:"info",autoClose:e(t)},{content:"Careful now, that's not allowed.",type:"warn",autoClose:e(t)},{content:"Custom color",type:"customGreen",autoClose:1e4}],n=window.notificationToaster;n.setColors({customGreen:"lightGreen"}),document.addEventListener("keypress",(function(t){"t"==t.key&&n.createToast(e(o))}))})();