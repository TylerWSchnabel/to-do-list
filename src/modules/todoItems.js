//import { CleanPlugin } from "webpack";

class ListItem {

    constructor(title, description, dueDate, priority, notes, complete){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.complete = complete;

        const markComplete = () => {
            if (complete === false){
                complete = true;
            } else if (complete === true) {
                complete = false;
            }
        }
    }
}

export default ListItem;