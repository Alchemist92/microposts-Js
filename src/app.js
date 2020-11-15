// const greeting = 'Hello World';
// console.log(greeting);

import {http} from './http'
import { ui} from './ui'

// get posts on dom load
document.addEventListener('DOMContentLoaded', getposts)

// listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost)
// listen for delete
document.querySelector('#posts').addEventListener('click', deletePost)
// listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit)
// listen for cancel edit
document.querySelector('.card-form').addEventListener('click', cancelEdit)

// funtion get post
function getposts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showposts(data))
  .catch(err => console.log(err));

}
// funtion add post
function submitPost(){
  const title = document.querySelector("#title").value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;


  const data = {
    title,
    body
  }

  if(title === "" && body === ""){
    ui.showAlert("please add Fields", 'alert alert-danger')
  }else{
    if(id === ""){
        // create post
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('post added', 'alert alert-success');
        ui.clearFields();
        getposts()
      })
      .catch(err => console.log(err))

    }else{
      // update post
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('post updated', 'alert alert-success');
        ui.changeFormState('add');
        getposts()
      })
      .catch(err => console.log(err))
      
    }

    
  }
}

// function delete
function deletePost(e){
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')){
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post removed', 'alert alert-success');
        getposts();
      })
      .catch(err => console.log(err))
    }
  }

  e.preventDefault();
}
// enable eit funtion
function enableEdit(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    
    const data = {
      id,
      title,
      body
    }

    // fill form with data
    ui.fillForm(data);
  }
  e.preventDefault()
}

// cancel edit state function
function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add');
  }
  e.preventDefault();
}