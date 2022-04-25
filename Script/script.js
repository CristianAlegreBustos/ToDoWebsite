import{progressBar} from '../script/modules/progressBar.js';

import{displayMenu,closeMenu,displayCompleted,displayAll,displayUncompleted} from '../script/modules/menu.js';

import{displayTaskMenu,closeTaskMenu} from '../script/modules/taskmenu.js';

import{Task} from '../script/modules/task.js';

export let ToDoList=[];
export let index=-1;
export let stored_todolist = JSON.parse(localStorage.getItem("todolist"));

progressBar();

displayMenu();

closeMenu();

displayTaskMenu();
closeTaskMenu();

let submitTask=document.getElementsByClassName("button_addTask")[0];

submitTask.addEventListener("click",createObject);

function createObject(variableName){
    variableName=new Task();
    variableName.setUpTask();
    if (variableName.name !== ""){
        ToDoList.push(variableName);
        variableName.displayTask();
    }else{
      //  console.log("No se guardo por que name esta vacia");
    }
}

submitTask.addEventListener("click",saveData);

export function saveData(){
    if (ToDoList.length !== 0 && localStorage.length!==0){
        localStorage.clear();
        localStorage['todolist']=JSON.stringify(ToDoList);
    }else if(ToDoList.length !==0 && localStorage.length==0){
        localStorage.setItem("todolist", JSON.stringify(ToDoList));
    }else{
       // console.log("No se guardo por que esta vacia");
    }

    console.log(localStorage);

}


function displayStorage(){

    let storageObject;
    let stored_todolist = JSON.parse(localStorage.getItem("todolist"));
    console.log("Display Storage:"+stored_todolist);
    if (stored_todolist !==0 || stored_todolist!== null||stored_todolist!==undefined){

    for (const object in stored_todolist) {
        index++; //Give the index. Always before the function
        createObject(storageObject);//object is a number

    }
}
}

let UncompletedButtom= document.getElementsByClassName("item_completed")[0];

UncompletedButtom.addEventListener("click",displayCompleted);

let ShowAllButtom= document.getElementsByClassName("item_allTask")[0];

ShowAllButtom.addEventListener("click",displayAll);

let PendingButtom= document.getElementsByClassName("item_uncompleted")[0];

PendingButtom.addEventListener("click",displayUncompleted);

window.onload=function(){
try{
    if (localStorage.todolist.length <= 2){
        localStorage.clear();
    }
    }catch{}

    displayStorage();
}
