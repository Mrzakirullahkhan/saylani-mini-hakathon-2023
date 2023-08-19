import { auth, onAuthStateChanged, doc, getDoc, db, collection, getDocs, EmailAuthProvider, reauthenticateWithCredential, updatePassword, signOut } from "../firbaseconfig.js";

const loggedInUser = document.querySelector('#loggedInUser');
const userName = document.querySelector('#userName')
const oldpaswrd = document.querySelector('#oldpassward');
const newPasward = document.querySelector('#newpassward');
const editImg = document.querySelector('#imgEdit')
const updateBtn = document.querySelector('#passward-update');
let userEmail;
onAuthStateChanged(auth, (user) => {
    if (user) {

        const uid = user.uid;
        getUserData(uid)
    } else {

    }
});

async function getUserData(uid) {
    const docRef = doc(db, "user", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const { emailUser, name } = docSnap.data()
        userName.textContent = name;
        userEmail = emailUser
        loggedInUser.textContent = name;
    } else {

        console.log("No such document!");
    }
}


// ye code hai 

updateBtn.addEventListener('click', changePassword)

async function changePassword() {
    const oldPasswordValue = oldpaswrd.value; // Get the value of the old password input
    const newPasswordValue = newPasward.value; // Get the value of the new password input

    try {
        // Reauthenticate the user with their old password
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, oldPasswordValue);
        await reauthenticateWithCredential(user, credential);

        // If reauthentication is successful, update the password
        await updatePassword(user, newPasswordValue);
        alert("Password updated successfully.");
        console.log("Password updated successfully.");
        // swal("sucess", "Password updated successfully", "sucess")
        // location.reload()
    } catch (error) {
        console.error("Error changing password:", error);
    }
}
