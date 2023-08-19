import { app, auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../firbaseconfig.js";

const signupEmail = document.getElementById('signupEmail');
const signuppaswrd = document.getElementById('signuPasward');
const registureBtn = document.getElementById('registureBtn');
const userName = document.getElementById('myname');

registureBtn.addEventListener("click", signupUserHandler)

function signupUserHandler() {

  if(userName.value.length < 3  ){
    alert("user name must be altleast characters")
  }
  if(signuppaswrd.value.length < 8){
    alert("passward must be atleast 8 digits")
  }
  else{

    createUserWithEmailAndPassword(auth, signupEmail.value, signuppaswrd.value)
    .then(async(userCredential) => {

      const user = userCredential.user;
      console.log(user)
      if(user){
        // data will save 
        await setDoc(doc(db, "user", user.uid), {
          name: userName.value,
          emailUser: signupEmail.value,
          
        });
        alert("account is created")
        window.location.href = '../loginfolder/login.html';
      }
     
     

     
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode)

    });

  }




}

//  async function saveData(uid){
// try {
//   const responce= await setDoc(doc(db, "user", uid), {
//     name: userName.value,
//     UserEmail: signupEmail.value
//   });
// } catch (error) {
//   console.log("error hai bhai "+ error)
// }

  
//  }