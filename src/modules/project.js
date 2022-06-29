

class Project {
    constructor(title, description){
        this.title = title;
        this.description = description;
        this.todoList = [];
    }

    addItem(item){
        this.todoList.push(item);
    }
}

export default Project