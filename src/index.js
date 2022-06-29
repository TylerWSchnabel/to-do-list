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
let projectArr = [];
const create = (() => {
    function createProject(){
        console.log("CreateProject running Oo o again~~");
        let projectFormName = document.getElementById("add-project-name");
        let projectFormDescription = document.getElementById("add-project-description");
        let projectList = document.getElementById('project-list');

        let newProject = new Project(projectFormName.value, projectFormDescription.value);
        projectArr.push(newProject);
        console.log(projectArr);
        projectFormName.value='';
        projectFormDescription.value='';
        projectFormContainer.style.display="none";
        display.displayProjects();
        console.log(newProject);
    }

    addProjectBtn.addEventListener("click", createProject);
    //addItemBtn.addEventListener("click", )
    return {createProject}
})()

const display = (() => {
    function displayProjects() {
        projectList.textContent = "";
        for (let i =0; i <projectArr.length; i++){
            let newProjectDiv = document.createElement('div');
            newProjectDiv.setAttribute('class', "project-name");
            newProjectDiv.textContent = projectArr[i].title;
            projectList.appendChild(newProjectDiv);
            console.log('poop');
        }
    }
    return {displayProjects}
})()



const openForm = (() => {
    
    addProjectForm.addEventListener("click", openProjectForm);
    addItemForm.addEventListener("click", openItemForm);
    closeProject.addEventListener('click', closeProjectForm)
    
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

    return {openProjectForm, openItemForm};
})()