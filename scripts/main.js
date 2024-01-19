const signin = document.getElementById("signin");
const signup = document.getElementById("signup");

signup.addEventListener("click", ()=>{
    window.location.pathname = "./pages/signup.html";
})
signin.addEventListener("click", ()=>{
    window.location.pathname = "./pages/login.html";
})
