class Ui{
  constructor(){
    this.post= document.querySelector('#posts');
    this.fieldInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  showposts(posts){
    let output = '';
    posts.forEach(function(post){
      output = output + 
      `<div class="card mb-3">
        <div class= "card-body">
          <h4 class= "card-title">${post.title}</h4>
          <p class= "card-text">${post.body}</p>
          <a  href = "#" class= "edit card-link" data-id = "${post.id}">
            <i class= "fa fa-pencil"></i>
          </a>
          <a  href = "#" class= "delete card-link" data-id = "${post.id}">
            <i class= "fa fa-remove"></i>
          </a>
          
        </div>
      </div>`
    })
    this.post.innerHTML = output;
  }

  showAlert(msg, className){
    this.clearAlert();
    // create div
    const div = document.createElement('div');
    div.className= className;
    // create text
    div.appendChild(document.createTextNode(msg));
    // call parent
    const container= document.querySelector('.postContainer');
    // get sibling
    const posts = document.querySelector('#posts');
    // insert alert div
    container.insertBefore(div, posts);

    // timeout
    setTimeout(()=> {
      this.clearAlert()
    }, 3000)

  }

  clearAlert(){
    const currentAlert = document.querySelector('.alert');
    if(currentAlert){
      currentAlert.remove();
    }

  }

  clearFields(){
    this.fieldInput.value = "";
    this.bodyInput.value = "";

  }

  // fill form to edit
  fillForm(data){
    this.fieldInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    // change form state
    this.changeFormState('edit');
  }

  // clear id input funtion
  clearIdInput(){
    this.idInput.value= "";
  }

  // change form state funtion
  changeFormState(type){
    if(type=== 'edit'){
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = "post-submit btm btn-warning btn-block"

      // create cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-dark btn-block'
      // add text
      button.appendChild(document.createTextNode('Cancel Edit'));
      // get parent
      const cardForm = document.querySelector('.card-form');
      // get sibling to insert before
      const formEnd = document.querySelector('.form-end');
      // insert
      cardForm.insertBefore(button, formEnd);


    }else{
      this.postSubmit.textContent= "Post It"
      this.postSubmit.className = "post-submit btm btn-primary btn-block"
      // remove cancel button if there
      if(document.querySelector('.post-cancel')){
        document.querySelector('.post-cancel').remove();
      }
      // clear id from hidden field
      this.clearIdInput();
      // clear text fields
      this.clearFields();
    }

  }
}
export const ui = new Ui();