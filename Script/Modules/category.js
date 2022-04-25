import { ToDoList, stored_todolist, categoriesList } from "../scriptNew.js";
import { countArray } from "./utilites.js";

class Category{
    constructor(category,tasks,taskCompleted,taskUncompleted){
        this.category=category;
        categoriesList.push(this.category);
        this.tasks=tasks;
        this.taskCompleted=taskCompleted;
        this.taskUnCompleted=taskUncompleted;
        if (countArray(categoriesList,this.category)<2){
            this.getTaskNumberCompleted();
            this.display();
            this.displayProgressBar();
        }

    }
    getTaskNumberCompleted(){
        if (stored_todolist==null ){
            this.tasks= getTotalTask(ToDoList,this.tasks,this.category);
            this.taskCompleted=getTaskNumberCompleted(ToDoList,this.taskCompleted,this.category);

        }else{
            this.tasks= getTotalTask(stored_todolist,this.tasks,this.category);

            this.taskCompleted=getTaskNumberCompleted(stored_todolist,this.taskCompleted,this.category);
        }

        this.taskUnCompleted = this.tasks - this.taskCompleted;
        function getTotalTask(list,tasks,category){
            tasks=0;
                for (const i in list){
                    if (list[i].categoryObject.category==category){
                        tasks ++;
                    }
                }


            return tasks;
        }

        function getTaskNumberCompleted(list,taskCompleted,category){
            taskCompleted=0;
        for (const i in list){
          if(list[i].state=="Completed" && list[i].categoryObject.category===category){
                taskCompleted++;
            }
            }
            return taskCompleted;
        }

    }
    display(){
        let object=this;
        let categoriesWrapper=document.getElementsByClassName("categories")[0];
        let categoryWrapper=document.createElement("div");

        categoryWrapper.className=`category ${this.category}`;
        categoriesWrapper.appendChild(categoryWrapper);
        let categoryCounter=document.createElement("p");
        categoryCounter.className="category_counter";
        categoryWrapper.appendChild(categoryCounter);
        let counterText=document.createTextNode(`${this.tasks} tasks`);
        categoryCounter.appendChild(counterText);
        let categoryTitle=document.createElement("h3");
        categoryTitle.className="category_title";
        categoryWrapper.appendChild(categoryTitle);

        categoryTitle.addEventListener("click",function(){object.displayList(object.category);
        });

        let title = document.createTextNode(this.category);
        categoryTitle.appendChild(title);
        let progressBar=document.createElement("div");
        progressBar.className="progress_bar";
        progressBar.id=`${this.category}_ProgressBar`;
        categoryWrapper.appendChild(progressBar);
        let fillBar=document.createElement("div");
        fillBar.className="fill_bar";
        fillBar.id=`${this.category}_fillBar`;
        categoryWrapper.appendChild(fillBar);
    }
    displayProgressBar(){
        let frameFill=document.getElementById(`${this.category}_fillBar`);
        if (this.tasks===0||this.taskCompleted===0 ){
            frameFill.style.width = 0;
          }else{
            frameFill.style.width = ((this.taskCompleted/this.tasks) * 100)-5 + "%";
          }
    }
   displayList(category){
    let titleH3=document.getElementsByClassName("todo_title");
    for (let item of titleH3) {
            item.className="todo_title hidde";
    }

//hide the current title (h3) of the TO DO LIST, LIST UNCOMPLETED and LIST COMPLETED

    let todo_div=document.getElementsByClassName("todo")[0];
    let h3_Category_Title=document.createElement("h3");
    h3_Category_Title.className="todo_title";
    todo_div.appendChild(h3_Category_Title);
    let text_Category_Title=document.createTextNode(`${category} To Do List`);
    h3_Category_Title.appendChild(text_Category_Title);

    for (let item of stored_todolist){
        if(item.categoryObject.category!==category){
            document.getElementById(item.id).style.display="none";
        }else{
            document.getElementById(item.id).style.display="flex";
        }
    }
    }

}

export{
    Category
}