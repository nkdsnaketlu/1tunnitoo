console.log("fail ühendatud");
class Entry {
    constructor(title, description, date, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.done = false;
    }
}

function formatDate(date) {
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
}

class Todo {
    constructor(){
        this.entries = JSON.parse(localStorage.getItem("entries")) || [];
        this.render();
        document.querySelector("#addButton").addEventListener("click", () => {this.addEntry()});
        document.querySelector("#sortDate").addEventListener("click", () => {this.sort()});
    }

    addEntry() {
        console.log("vajutasin nuppu");
        const priorityValue = document.querySelector("#priority").value;
        const titleValue = document.querySelector("#title").value;
        const descriptionValue = document.querySelector("#description").value;
        const dateValue = document.querySelector("#date").value;
        
       
       if (!titleValue || !dateValue) { 
           alert("Pealkiri ja kuupäev on kohustuslikud!"); 
           return; 
        }
        //console.log(this.entries);
        //console.log(this.entries[1].date[0]);
        
        this.entries.push(new Entry(titleValue, descriptionValue, formatDate(dateValue), priorityValue));
        this.save();
    }

    sort() {
        this.entries.sort((a, b) => { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            const [dayA, monthA, yearA] = a.date.split('.');
            const [dayB, monthB, yearB] = b.date.split('.');
            const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
            const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
            return dateA - dateB;
        });
        this.save();
    }

    render() {
        let tasklist = document.querySelector("#taskList");
        tasklist.innerHTML = "";
    
        const ul = document.createElement("ul");
        const doneUl = document.createElement("ul");
        ul.className = "todo-list";
        doneUl.className = "todo-list";
        const taskHeading = document.createElement('h2');
        const doneHeading = document.createElement('h2');
        taskHeading.innerText = "Todo";
        doneHeading.innerText = "Done tasks";

        this.entries.forEach((entryValue, entryIndex) => {
            const li = document.createElement("li");
            const div = document.createElement("div");
            const buttonDiv = document.createElement("div");
            buttonDiv.className = "button-container";
            const deleteButton = document.createElement("button");
            const doneButton = document.createElement("button");
            const editButton = document.createElement("button");
            doneButton.innerText = "✔";
            doneButton.className = "done";
            deleteButton.innerText = "☠";
            deleteButton.className = "delete";
            editButton.innerText = "edit";
            editButton.className = "edit";

            deleteButton.addEventListener("click", () => {
                this.entries.splice(entryIndex, 1);
                this.save();
                
            });
            
            editButton.addEventListener('click', () => {
                document.getElementById('title').value = this.entries[entryIndex].title;
                document.getElementById('description').value = this.entries[entryIndex].description;
                document.getElementById('date').value = this.entries[entryIndex].date;
                document.getElementById('priority').value = this.entries[entryIndex].priority;
                this.entries.splice(entryIndex, 1);
                this.save();
            });

            doneButton.addEventListener("click", () => {
                if(this.entries[entryIndex].done){
                    this.entries[entryIndex].done = false;
                } else{
                    this.entries[entryIndex].done = true;
                }
                
                this.save();
            });



            //div.className = "task";
            div.className = `task ${entryValue.priority}-priority`;
            console.log(div.className);

            div.innerHTML = `<div>${entryValue.title} </div><div>${entryValue.description} </div><div>${entryValue.date}</div>`;
            /*div.innerHTML = ` <div class="${entryValue.priority}-priority"><div>${entryValue.title} </div><div>${entryValue.description} </div><div>${entryValue.date}</div></div>`;*/
            
            if(this.entries[entryIndex].done){
                doneButton.classList.add("done-task");
                doneUl.appendChild(li);
            } else{
                ul.appendChild(li);
            }


            li.appendChild(div);
            li.appendChild(buttonDiv);
            buttonDiv.appendChild(deleteButton);
            buttonDiv.appendChild(doneButton);
            buttonDiv.appendChild(editButton);
        });

        tasklist.appendChild(taskHeading);
        tasklist.appendChild(ul);
        tasklist.appendChild(doneHeading);
        tasklist.appendChild(doneUl);
        
    }

    save() {
        localStorage.setItem("entries", JSON.stringify(this.entries));
        this.render();
    }
}

const todo = new Todo();