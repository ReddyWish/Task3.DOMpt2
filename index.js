let tasks = [
    {
        id: '1138465078061',
        completed: false,
        text: 'Посмотреть новый урок по JavaScript',
    },
    {
        id: '1138465078062',
        completed: false,
        text: 'Выполнить тест после урока',
    },
    {
        id: '1138465078063',
        completed: false,
        text: 'Выполнить ДЗ после урока',
    },
];



let taskList = document.querySelector('.tasks-list')
function createTask (arrId, arrText) {
    let taskItem = document.createElement('div')
    taskList.append(taskItem)
    taskItem.className = 'task-item'
    taskItem.setAttribute('data-task-id', arrId)
    let taskItemMainContainer = document.createElement('div')
    taskItemMainContainer.className = 'task-item__main-container'
    taskItem.prepend(taskItemMainContainer)
    let taskItemMainContent = document.createElement('div')
    taskItemMainContent.className = "task-item__main-content"
    taskItemMainContainer.prepend(taskItemMainContent)
    let checkBoxForm = document.createElement('form')
    checkBoxForm.className = 'checkbox-form'
    taskItemMainContent.prepend(checkBoxForm)
    let inputCheckBox = document.createElement('input')
    inputCheckBox.className = "checkbox-form__checkbox"
    inputCheckBox.type = "checkbox"
    inputCheckBox.id = arrId
    checkBoxForm.prepend(inputCheckBox)
    let label = document.createElement('label')
    label.htmlFor = arrId
    checkBoxForm.append(label)
    let taskText = document.createElement('span')
    taskText.className = "task-item__text"
    taskText.innerText = arrText
    taskItemMainContent.append(taskText)
    let button = document.createElement('button')
    button.className = "task-item__delete-button"
    button.classList.add('default-button')
    button.classList.add('delete-button')
    button.dataset.deleteTaskId = '5'
    button.innerText = 'Удалить'
    taskItemMainContainer.append(button)

}

tasks.forEach(task => {
    const taskItem = createTask(task.id, task.text)

})
console.log(taskList)

const createTaskBlock = document.querySelector('.create-task-block')
let error = document.createElement('span')
error.classList.add('error-message-block')
createTaskBlock.append(error)



createTaskBlock.addEventListener('submit', (event) => {
    event.preventDefault()
    const {target} = event
    const createTaskBlockInput = target.taskName
    let inputValue = createTaskBlockInput.value
    inputValue = inputValue.trim()
    let err = document.querySelector('.error-message-block')
    const existTask = tasks.reduce((acc, item) => {
        acc.push(item.text)
        return acc
    }, []).some(item => item === inputValue)    //проверяем совпадение задач


    if (!inputValue) {
        err.textContent = 'Название задачи не должно быть пустым'

    } else if (existTask) {

        err.textContent = 'Задача с таким названием уже существует.'
    }
    else {

        tasks.push({id: String(Date.now()), completed: false, text: inputValue})
        createTask(tasks.at(-1).id, tasks.at(-1).text)

        err.textContent = ''
    }

})
console.log(tasks)



const body = document.querySelector('body')
const modalWindow = document.createElement('div')
modalWindow.classList.add('modal-overlay')
modalWindow.classList.add('modal-overlay_hidden')
modalWindow.innerHTML = `<div class="delete-modal">
        <h3 class="delete-modal__question">
            Вы действительно хотите удалить эту задачу?
        </h3>
        <div class="delete-modal__buttons">
            <button class="delete-modal__button delete-modal__cancel-button">
                Отмена
            </button>
            <button class="delete-modal__button delete-modal__confirm-button">
                Удалить
            </button>
        </div>
    </div>`
body.prepend(modalWindow)


const deleteModalButtons = modalWindow.querySelector('.delete-modal__buttons')
taskList.addEventListener('click', (event) => {
    const {target} = event
    const button = target.closest('button')
    const taskToDelete = target.closest('[data-task-id]')

    const idOfTask = String(taskToDelete.getAttribute('data-task-id'))
    const deleteButton = deleteModalButtons.querySelector('.delete-modal__confirm-button')
    if (button) {
        modalWindow.classList.toggle('modal-overlay_hidden')
    }
    deleteButton.addEventListener('click', (event) => {
        taskToDelete.remove()
        console.log(idOfTask)
        tasks = tasks.filter(item => item.id !== idOfTask)

    })
})


deleteModalButtons.addEventListener('click', (event) => {
    modalWindow.classList.toggle('modal-overlay_hidden')
})




