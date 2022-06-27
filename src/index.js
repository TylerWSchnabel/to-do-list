import _ from 'lodash';
import './style.css';
import ListItem from './modules/todoItems';
import Project from './modules/project';


function createProject(){
    console.log("CreateProject running");
    let projectFormName = document.getElementById("add-project-name");
    let projectFormDescription = document.getElementById("add-project-description");
    let projectList = document.getElementById('project-list');

    let newProject = new Project(projectFormName.value, projectFormDescription.value);

    let newProjectDiv = document.createElement('div');
    newProjectDiv.setAttribute('class', "project-name");
    newProjectDiv.textContent = newProject.title;
    projectList.appendChild(newProjectDiv);
    console.log("project added");
}

function print(){
    let projectFormName = document.getElementById("add-project-name");
    console.log (projectFormName);
}
    
let addProjectBtn = document.getElementById("add-project-button");
addProjectBtn.addEventListener("click", createProject);
