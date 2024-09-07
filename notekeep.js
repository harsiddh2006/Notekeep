const addButton = document.querySelector('#add');

const updetLSData = () => {
    const textareaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textareaData);

    textareaData.forEach((note) => {
        return notes.push(note.value);
    })
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    // div add
    const note = document.createElement('div');
    // class add
    note.classList.add('note');
    const htmlData = `
        <div class="operation" >
                <button class="edit"> <i class="fas fa-edit"></i> </button>
                <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
        </div >

    <div class="main ${text ? "" : "hidden"} " ></div >
    <textarea class="${text ? " hidden" : ""}" ></textarea > `;

    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note);

    // getting the references
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');


    // deleting the note
    deleteButton.addEventListener('click', () => {
        note.remove();
        updetLSData();

    })

    // toggle using edit button 
    textarea.value = text;
    mainDiv.innerHTML = text;


    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('keyup', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;
        updetLSData();
    })

    document.body.appendChild(note);
    // it appeds a node as the last child of anode
}

// getting data back from localStorage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){ notes.forEach((note) => addNewNote(note)) };

addButton.addEventListener('click', () => addNewNote());

