import{ToDoList,stored_todolist,index,saveData,GetDataforProgressBar, categoriesList} from '../scriptNew.js';
import { issetParam,issetCategory, countArray } from './utilites.js';
import { Category } from './category.js';

class Task{
constructor(name,category,state,id,categoryObject){
    this.name=name;
    this.state=state;
    this.id=id;
    this.categoryObject=categoryObject;
}

setUpTask(){
    let inputName=document.getElementsByClassName("task_name")[0];
    let inputCategory=document.getElementsByClassName("task_category")[0];
    this.name = issetParam("name" ,inputName.value);
        if (inputCategory.value.length==0){
            this.id=stored_todolist[index].id;
        }else{
            this.id=issetParam("id",Date.now());
        }
        debugger;
   this.category=((inputCategory.value.length>0)?inputCategory.value:stored_todolist[index].categoryObject.category);
    try{
   if (stored_todolist!==null & stored_todolist[index].id !==this.id ){
       this.state="Uncompleted";
   }else{
    this.state=((stored_todolist===null)?"Uncompleted":stored_todolist[index].state);
   }
    }
    catch{this.state=((stored_todolist===null)?"Uncompleted":stored_todolist[index].state);}


    this.displayTask();
    this.categoryObject=new Category(issetCategory("category",inputCategory.value));

}

completeTask(id){
    let object=this;
    //stop
    let WrapperId=this.id;
    let Wrapper=document.getElementById(id);
    function changeState(ToDoList){
        for (const element in ToDoList) {
            if (ToDoList[element].id==id){
                ToDoList[element].state="Completed";
            }
           if (ToDoList[element].state=="Completed" && Wrapper.className!=="task_completed"){
           object.changeStyle(id);
           }
        }

    }

    if (ToDoList.length!=0 ){
        changeState(ToDoList);
        GetDataforProgressBar(saveData()).then() }
    else{
        changeState(stored_todolist);
        GetDataforProgressBar(localStorage.setItem("todolist", JSON.stringify(stored_todolist))).then()
    }
}
displayTask(){
    let object=this;
    let todo_div=document.getElementsByClassName("todo")[0];
    let taskdiv=document.createElement("div");
    taskdiv.className="taskwrap";
    taskdiv.id=`${this.id}task`
    todo_div.appendChild(taskdiv);
    let TaskWrapper=document.createElement("div");
    TaskWrapper.className="task_todo";
    TaskWrapper.id=this.id;
    TaskWrapper.addEventListener("click",function (){
        object.completeTask(object.id);
    });
    taskdiv.appendChild(TaskWrapper);
    let radioButtom= document.createElement("input");
    radioButtom.className="task_checked";
    radioButtom.type="radio";
    TaskWrapper.appendChild(radioButtom);
    let paragraph_Description=document.createElement("p");
    paragraph_Description.className="task_description";
    let nodeText=document.createTextNode(this.name);
    paragraph_Description.appendChild(nodeText);
    TaskWrapper.appendChild(paragraph_Description);
    if (this.state=="Completed"){
        this.changeStyle(object.id);
    }
}

changeStyle(id){
    let task_Wrapper=document.getElementById(id);
    task_Wrapper.className="task_completed";
    task_Wrapper.addEventListener("mouseover",()=>task_Wrapper.id="otherClass");
    task_Wrapper.addEventListener("mouseleave",()=>task_Wrapper.id=id);
    let taskdiv=document.getElementById(`${id}task`);
    try{
        taskdiv.style.display="flex";
    }catch{}
    let Delete=document.createElement("i");
    Delete.className="delete";
    Delete.addEventListener("click",function(){
        task_Wrapper.parentElement.removeChild(task_Wrapper);
        delAndUpdate(stored_todolist,task_Wrapper.id);
        if(ToDoList!==0 ||ToDoList !==undefined){
            delAndUpdate(ToDoList,task_Wrapper.id);
        }

    });

    try{
        taskdiv.appendChild(Delete);
    }
    catch{}

}
}//here finish the class


function delAndUpdate(list,WrapperId){
    for (const object in list) {
        if (list[object].id==WrapperId){
            list.splice(object,1)}
        GetDataforProgressBar(localStorage.setItem("todolist", JSON.stringify(list))).then();
    }
    location.reload();
}

export{
    Task
}
