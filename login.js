const loginEmail = document.querySelector("#loginEmail")
const loginPassward = document.querySelector("#loginpassward")
const loginBtn = document.querySelector("#loginBtn");


// loginBtn.addEventListener("click",()=>{
//     console.log(loginEmail.value)
//     console.log(loginPassward.value)
    
// })
import { auth, signInWithEmailAndPassword } from "../firbaseconfig.js";


  function loginUserHandler(){
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassward.value)
  .then((userCredential) => {

    const user = userCredential.user;
    window.location.href='../dashboard/dashboard.html';
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
});
}
loginBtn.addEventListener('click', loginUserHandler)