import _ from 'lodash';
import './style.css';
import { compareAsc, format } from 'date-fns'
import Item from './modules/items';
import Project from './modules/project';


let projectFormContainer = document.getElementById('project-form');
let projectFormName = document.getElementById("add-project-name");
let projectFormDescription = document.getElementById("add-project-description");
let projectList = document.getElementById('project-list');
let addProjectForm = document.getElementById("add-project");
let itemFormContainer = document.getElementById('item-form');
let addItemForm = document.getElementById("add-item");
let closeProject = document.getElementById('close-project-form');
let addProjectBtn = document.getElementById("add-project-button");
let addItemBtn = document.getElementById("add-item-button");

let addItemName = document.getElementById('add-item-name');
let addItemDescription = document.getElementById('add-item-description');
let addItemPriority = document.getElementById('add-item-priority');
let addItemDate = document.getElementById('add-item-date');

let projectName = document.getElementById('project-name');
let projectDescription = document.getElementById('project-description');
let itemList = document.getElementById('item-list');
let closeItem = document.getElementById('close-item-form');

let itemInfoContainer = document.getElementById('itemInfoContainer');
let itemInfoTitle = document.getElementById('item-info-title');
let itemInfoDecription = document.getElementById('item-info-description');
let itemInforPriority = document.getElementById('item-info-priority');
let itemInfoDate = document.getElementById('item-info-date');
let editInfo = document.getElementById('edit-info');
let closeInfo = document.getElementById('close-info');
let items = document.getElementById('item-list');

let editForm = document.getElementById('edit-form');
let editName = document.getElementById('edit-item-name');
let editDescription = document.getElementById('edit-item-description');
let editPriority = document.getElementById('edit-item-priority');
let editDate = document.getElementById('edit-item-date');
let editButton = document.getElementById('edit-item-button');
let closeEdit = document.getElementById('close-edit-form');

let projectArr = [];
if(!localStorage.getItem('array')) {
    projectArr = [];
    
  } else {
    projectArr = JSON.parse(localStorage.array);
  }

const create = (() => {
    function createProject(){
        
        let newProject = new Project(projectFormName.value, projectFormDescription.value);
        projectArr.push(newProject);
        projectFormName.value='';
        projectFormDescription.value='';
        projectFormContainer.style.display="none";
        display.displayProjectList();
        localStorage.array = JSON.stringify(projectArr);
        
    }
    

    function createItem(){
        let newItem = new Item(addItemName.value, addItemDescription.value, addItemPriority.value, addItemDate.value);
        projectArr[index].todoList.push(newItem);
        addItemName.value='';
        addItemDescription.value='';
        addItemDate.value = "";
        addItemPriority.value = "low";
        itemFormContainer.style.display="none";
        localStorage.array = JSON.stringify(projectArr);
        display.displayProject(index);
    }

    
    

    addProjectBtn.addEventListener("click", createProject);
    addItemBtn.addEventListener("click", createItem);
    
})()

let index = '';
let editIndex = '';

const display = (() => {
    function displayProjectList() {
        projectList.textContent = "";
        for (let i =0; i <projectArr.length; i++){
            let newProjectDiv = document.createElement('div');
            newProjectDiv.setAttribute('class', "project-name");
            newProjectDiv.setAttribute('id', i);
            newProjectDiv.addEventListener('click', setPos);
            newProjectDiv.textContent = projectArr[i].title;
            
            let projectDel = document.createElement("button");
            projectDel.setAttribute('class', 'todoBtn');
            projectDel.textContent = "Delete";
            projectDel.addEventListener('click', function(){
                projectArr.splice(i, 1);
                if (index === ''){
                    displayAllItems();
                } else{
                    display.displayProject(projectIndex);
                };
                displayProjectList();
                localStorage.array = JSON.stringify(projectArr);
            });
            newProjectDiv.appendChild(projectDel);
            projectList.appendChild(newProjectDiv);
        }
    }

   
    function setPos(){
        index = this.id;
        displayProject(index);
    }

    function displayProject(arrIndex) {
        let pos = projectArr[arrIndex];
        projectName.textContent = pos.title;
        projectDescription.textContent = pos.description;
        
        items.textContent = "";
        for (let i=0; i<pos.todoList.length; i++){
            displayItem(index, i);
        }
        addItemForm.style.display="block";
        editInfo.style.display="block";
    }
    function displayItem(projectIndex, itemIndex){
        let pos = projectArr[projectIndex];
        let todoContainer = document.createElement('div');
        todoContainer.setAttribute('class', 'todoContainer');
        let todoItem = document.createElement('p');
        todoItem.innerText = pos.todoList[itemIndex].title + " - " + pos.todoList[itemIndex].dueDate;
        let todoComp = document.createElement('input');
        todoComp.type = "checkbox";
        todoComp.setAttribute('class', "todoComp")
        if (pos.todoList[itemIndex].complete === true){
            todoComp.checked = true;
        } else if (pos.todoList[itemIndex].complete === false){
            todoComp.checked = false;
        }
        todoComp.addEventListener('change', function(){
            if (this.checked){
                pos.todoList[itemIndex].complete = true;
                todoItem.style.textDecoration = "line-through";
                localStorage.array = JSON.stringify(projectArr);
            } else {
                pos.todoList[itemIndex].complete = false;
                todoItem.style.textDecoration = "none";
                localStorage.array = JSON.stringify(projectArr);
            }
        })
        if (pos.todoList[itemIndex].complete === true){
            todoItem.style.textDecoration = "line-through";
        }   else if (pos.todoList[itemIndex].complete === false){
            todoItem.style.textDecoration = "none";
        }
        let todoDel = document.createElement("button");
        todoDel.setAttribute('class', 'todoBtn');
        todoDel.textContent = "Delete";
        todoDel.addEventListener('click', function(){
            pos.todoList.splice(itemIndex, 1);
            if (index === ''){
                displayAllItems();
            } else{
                display.displayProject(projectIndex);
            };
            localStorage.array = JSON.stringify(projectArr);
        });
        let todoInfo = document.createElement('button');
        todoInfo.textContent = "Info";
        todoInfo.addEventListener('click', function(){
            displayInfo();
        });
        todoInfo.setAttribute('class', 'todoBtn');
        function itemColor(){
            if (pos.todoList[itemIndex].priority === "low"){
                todoContainer.style.backgroundColor = "rgb(203, 252, 163)"
            } else if (pos.todoList[itemIndex].priority === "medium"){
                todoContainer.style.backgroundColor = "rgb(252, 240, 163)";
            } else if(pos.todoList[itemIndex].priority === "high"){
                todoContainer.style.backgroundColor = "rgb(252, 163, 163)"
            };
        }
        itemColor();
        function displayInfo(){
            let newItem = ''
            itemInfoContainer.style.display="block";
            itemInfoTitle.textContent = pos.todoList[itemIndex].title;
            itemInfoDecription.textContent = pos.todoList[itemIndex].description;
            itemInforPriority.textContent = pos.todoList[itemIndex].priority;
            itemInfoDate.textContent = pos.todoList[itemIndex].dueDate;
            newItem = pos.todoList[itemIndex];
            editInfo.addEventListener('click', function(){
                displayEditForm(newItem);
                editIndex = itemIndex    
            });
            

        }

        function displayEditForm(item){
            itemInfoContainer.style.display = "none";
            editForm.style.display = "block";
            editName.value = item.title;
            editDescription.value = item.description;
            editPriority.value = item.priority;
            editDate.value = item.dueDate;   
        }
        
        todoContainer.appendChild(todoComp);
        todoContainer.appendChild(todoItem);
        todoContainer.appendChild(todoDel);
        todoContainer.appendChild(todoInfo);
        items.appendChild(todoContainer);
        
    }

    function displayAllItems(){
        projectName.textContent="All To-dos";
        projectDescription.textContent="All To-do items"
        items.textContent = "";
        for (let i=0; i < projectArr.length; i++){
            for (let j=0; j<projectArr[i].todoList.length; j++){
                displayItem(i, j);
            }
        }
        editInfo.style.display="none"
        index=''
        addItemForm.style.display = "none"
    }
    
    editButton.addEventListener('click',function(){
        alter.editItem(editIndex);
        localStorage.array = JSON.stringify(projectArr);
        displayProject(index);
    })
    function closeEditForm(){
        editForm.style.display = "none";
        editName.value = '';
        editDescription.value = '';
        editPriority.value = '';
        editDate.value = '';

    }
    closeEdit.addEventListener('click', closeEditForm);
    document.getElementById('alltodos').addEventListener('click', displayAllItems);
    displayProjectList();
    displayAllItems();
    return {displayProjectList, displayProject}
})()



const openForm = (() => {
    
    addProjectForm.addEventListener("click", openProjectForm);
    addItemForm.addEventListener("click", openItemForm);
    closeProject.addEventListener('click', closeProjectForm)
    closeItem.addEventListener('click', closeItemForm)
    
    function openProjectForm(){
        projectFormContainer.style.display = "block";
    }
    function closeProjectForm(){
        projectFormName.value='';
        projectFormDescription.value='';
        projectFormContainer.style.display="none";
    }
    
    function openItemForm(){
        itemFormContainer.style.display = "block";
    }
    function closeItemForm(){
        addItemName.value='';
        addItemDescription.value='';
        addItemDate.value = "";
        addItemPriority.value = "low";
        itemFormContainer.style.display="none";
    }
    function closeInfoContainer(){
        itemInfoContainer.style.display = "none";
    }
    closeInfo.addEventListener('click', closeInfoContainer);
    return {openProjectForm, openItemForm, closeInfoContainer};
})()

const alter = (() => {
    function delItem(){
        for (let i=0; i<projectArr[0].todoList.length; i++){
            if (projectArr[0].todoList[i].title === projectArr[index].todoList[todoIndex]){
                projectArr[0].todoList.splice(todoIndex, 1);
            }
        }
        projectArr[index].todoList.splice(todoIndex, 1);
        display.displayProject(index);
    }

    function editItem(i){
        projectArr[index].todoList[i].title = editName.value;
        projectArr[index].todoList[i].description = editDescription.value;
        projectArr[index].todoList[i].priority = editPriority.value;
        projectArr[index].todoList[i].dueDate = editDate.value;
        editForm.style.display = "none";
        editName.value = '';
        editDescription.value = '';
        editPriority.value = '';
        editDate.value = '';
    }


    return {delItem, editItem}
})()
