

class Item {

    constructor(title, description, priority, dueDate, complete){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = complete;
        this.complete = false;

        const markComplete = () => {
            if (complete === false){
                complete = true;
            } else if (complete === true) {
                complete = false;
            }
        }
    }
}

export default Item;