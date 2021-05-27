const addBtn = document.getElementById('add');

const updateLocalStorage = () =>{
    const textAreaData = document.querySelectorAll('textarea');  //Array of textareas orderwise of notes
    //console.log(textAreaData);
    const notes = [];

    //each pad is a textarea element
    textAreaData.forEach((Pad) => notes.push(Pad.value));
    //console.log(notes);  all data added to the array

    localStorage.setItem('notes', JSON.stringify(notes)); //2nd argument need to be a string

}


const add_newNote = (text="") =>{
   const note =  document.createElement('div');
   note.classList.add('note');
   //console.log(note);  --- it will giv the div tag

   const htmlData = `
   <div class="operate">
   <button class="edit"> <i class="fas fa-edit"></i></button>
   <button class="delete"><i class="fas fa-trash-alt"></i></button>
   </div>
   <div class="main ${text ? "": "hidden"}"></div>
   <textarea class="${text ? "hidden": ""}"></textarea>
   `;

   note.insertAdjacentHTML('afterbegin', htmlData);

   //functioning of icons and text area
   const editBtn = note.querySelector('.edit');
   const delBtn = note.querySelector('.delete');
   const mainDiv = note.querySelector('.main');
   const textArea = note.querySelector('textarea');

   //deleting note
   delBtn.addEventListener('click',()=> {
       note.remove();
       updateLocalStorage();
    })

   //edit note
   textArea.value = text; //what i write in the note 
   mainDiv.innerHTML = text;  //it should store as text and be visible at main


   editBtn.addEventListener('click',()=> {
       mainDiv.classList.toggle('hidden');   //toggles-- removing class if its present adding if absent
       textArea.classList.toggle('hidden');
   });

   textArea.addEventListener('change', (event)=>{
       //console.log(event); // target is text area
       const display = event.target.value;
       mainDiv.innerHTML = display; 

       updateLocalStorage();
   });
    
 //adding it to the main document
   document.body.appendChild(note);

}

//getting data from local storage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((note)=> add_newNote(note));
}

addBtn.addEventListener('click', ()=> add_newNote());
