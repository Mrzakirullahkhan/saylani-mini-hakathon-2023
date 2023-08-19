import { auth, onAuthStateChanged, doc, getDoc, db, collection, getDocs, signOut, addDoc, query, where, serverTimestamp, deleteDoc,updateDoc} from "../firbaseconfig.js";
const loggedInUser = document.querySelector('#loggedInUser');
const postTitle = document.querySelector('#exampleFormControlInput1');
const textArea = document.querySelector('#exampleFormControlTextarea1')
const publishBtn = document.querySelector('#publish-post');
const postedsection = document.querySelector('.postedSection')

let currentUser;
let postIdGlobal;

onAuthStateChanged(auth, (user) => {
    if (user) {

        const uid = user.uid;
        getUserData(uid)
        currentUser = uid
        createblogData(uid)
    } else {

    }
});

async function getUserData(uid) {
    const docRef = doc(db, "user", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const { emailUser, name } = docSnap.data()
        loggedInUser.textContent = name;
    } else {

        console.log("No such document!");
    }
}


// add data 



async function addDataToFirbase() {
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            postTitle: postTitle.value,
            textArea: textArea.value,
            timestamp: serverTimestamp(),
            author: currentUser
        });
        console.log("Document written with ID: ", docRef.id);
        createblogData(currentUser)
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
publishBtn.addEventListener('click', addDataToFirbase);

async function getAutherData(uid) {
    const docRef = doc(db, "user", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {

        console.log("No such document!");
    }
}


async function createblogData(uid) {

    postedsection.innerHTML = "";
    const sortedQuery = query(collection(db, "blogs"), where("author", "==", uid)); // "desc"
    const querySnapshot = await getDocs(sortedQuery);
    querySnapshot.forEach(async (doc) => {
        let postId = doc.id
        console.log(postId)
        const { author, postTitle, textArea, timestamp } = doc.data()
        console.log(author)

        let myAutherData = getAutherData(author)
        console.log(myAutherData)
        let div = document.createElement('div');
        div.setAttribute('class', "myMaindiv")
        div.style.border = "3px solid rgb(218, 217, 217)";
        div.style.margin = "15px 0px"
        div.style.borderRadius = "10px"
        div.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px"
        div.innerHTML = ` <div class="card mb-3" style="width: 25%; line-height: 10px; border: none;" >
    <div class="row g-0">
      <div class="col-md-4">
        <img src="Admin-Profile-Vector-PNG-Clipart.png" class="img-fluid rounded-start" alt="..." width="80px" style="margin-top: 8px; margin-left: 5px;">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title" id="loggedInUser">${postTitle}</h5>
          <p class="card-text">${myAutherData.name}</p>
          <p class="card-text"><small class="text-body-secondary">${moment(timestamp.toDate()).fromNow()}</small></p>
        </div>
      </div>
    </div>
  </div>
  <p id="paragraph">${textArea}
  </p>
  <div id="myLinks">
    <a href="#" id="delete" onclick="deleteHandler('${postId}')">delete</a>
    <a href="#" id="edit" onclick="editHandler('${postId}')">edit</a>
  </div>`
        postedsection.append(div);


    })


}

  async function deleteHandler(postId){
    try {
        await deleteDoc(doc(db, "blogs", postId));
        alert("Your post has been deleted");
        createblogData(currentUser);
    } catch (error) {
        console.log(error);
    }
 }

 window.editHandler = editHandler;
window.deleteHandler = deleteHandler;



async function editHandler(postId){
    console.log("edit btn working", "==>", postId)
    postIdGlobal = postId
    console.log(postId, 'ksadsad')

    let title = prompt('enter title')
    let blog = prompt('enter blog')

    const washingtonRef = doc(db, "blogs", postIdGlobal);

   
    await updateDoc(washingtonRef, {
        textArea: blog,
        postTitle: title,
        author: currentUser,
        timestamp: serverTimestamp()
    });

    createblogData(currentUser)

    // const blogData = getBlogForEdit(postIdGlobal)
    // blogTextArea.value = blogData.BlogContent;
    // blogTitleInput.value = blogData.BlogTitle;

    // publishBtn.removeEventListener('click', storeBlogAndCreateBlogHandler);
    // publishBtn.addEventListener('click', updatePostHandler)
}