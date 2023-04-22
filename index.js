const addChore = document.querySelector(".add-chore")
const taskContainer = document.querySelector(".task-container")
const inputChores = document.getElementById("input-chores")
const cleanData = document.querySelector(".clean-data")
const removeTask = document.querySelector(".remove-task")
let choreData = []

addChore.addEventListener("click", choreSaved)
cleanData.addEventListener("click", clean)
document.addEventListener("keydown", enterKey)


let choresFromLocalStorage = JSON.parse(localStorage.getItem("key"))

if (choresFromLocalStorage) {
    choreData = choresFromLocalStorage
    renderHTML()
}

function enterKey(event){
    if (event.key === "Enter") {
        choreSaved();
      }
}

function choreSaved() {
    let inputFieldValue = inputChores.value
    if (inputFieldValue !== "" &&  !choreData.includes(inputFieldValue)) {
        choreData.push(inputFieldValue)
        inputChores.value = ""
        renderHTML()        
    }
    localStorage.setItem("key", JSON.stringify(choreData))
}

function renderHTML() {
    tasks = ``
    for (let i = 0; i < choreData.length; i++) {
        tasks += `
        <div class ="task-holder">
            <p class="task-text">${choreData[i]}</p>
            <button class="remove-task">✕</button>
        </div>
        `
    } 
    taskContainer.innerHTML = tasks

    let taskContainerHeight = taskContainer.scrollHeight
    let main = document.querySelector(".main")
    main.style.height = taskContainerHeight + 135 + `px`
}

function clean(){
    choreData = []
    taskContainer.innerHTML = ""
    renderHTML()
    let taskContainerHeight = taskContainer.scrollHeight
    let main = document.querySelector(".main")
    main.style.height = taskContainerHeight + 165 + `px`
}


document.addEventListener("click", function(e){
    if (e.target.classList.contains("remove-task")){
        const taskHolder = e.target.parentNode;
        const taskToRemove = taskHolder.querySelector('.task-text').innerText;
        const index = choreData.indexOf(taskToRemove);
        choreData.splice(index, 1);
        renderHTML();
    }
});