
import{displayMenu,closeMenu,displayCompleted,displayAll,displayUncompleted} from './Modules/menu.js';

import { displayPhoneMenu,closePhoneMenu,setPhoneMenu, sendMessage, sendMessageEveryNewDay } from './Modules/addPhone.js';

import{displayTaskMenu,closeTaskMenu} from './Modules/taskmenu.js';

import{Task} from './Modules/task.js';
import { getCookies, saveName } from './Modules/cookies.js';
import { uploadImg } from './Modules/saveImageinLocalStorage.js';
import {getLocation } from './Modules/apiInformation.js';

export let ToDoList=[];
export let index=-1;
export let stored_todolist = JSON.parse(localStorage.getItem("todolist"));
export let categoriesList=[];

displayMenu();
closeMenu();
displayTaskMenu ();
closeTaskMenu();

displayPhoneMenu();
closePhoneMenu();
setPhoneMenu();

let body= document.getElementsByClassName("body")[0];
body.addEventListener("click",saveName);

let submitTask=document.getElementsByClassName("button_addTask")[0];


submitTask.addEventListener("click",createObject);

function createObject(variableName){
    debugger;
    variableName=new Task();
    variableName.setUpTask();
    if (variableName.name !== ""){
        ToDoList.push(variableName);
    }

}

submitTask.addEventListener("click",SaveAndReload);

function SaveAndReload(){
    saveData();
    location.reload();
}

function saveTodoList(){
    localStorage.setItem("todolist", JSON.stringify(ToDoList))
}
function OverrideLocalStorage(){
    localStorage.removeItem('todolist');
    localStorage['todolist']=JSON.stringify(ToDoList);
}


export function saveData(){
    if (document.getElementById("task_name").value!==""||document.getElementById("task_category").value!==""){
        if (ToDoList.length !== 0 && localStorage.length!==0){
            OverrideLocalStorage()
        }else if(ToDoList.length !==0 && localStorage.length==0){
            saveTodoList();
        }
     }
}


export const GetDataforProgressBar=function (storage){
    return Promise.resolve(storage);
}


function displayStorage(){
    GetThelistFromLocalStorage().then(CreateObjectFromLocalStorage(stored_todolist));
}

const GetThelistFromLocalStorage= ()=>{
    return Promise.resolve(JSON.parse(localStorage.getItem("todolist")));
};

function CreateObjectFromLocalStorage(stored_todolist){
    let storageObject;
    if (stored_todolist !==0 || stored_todolist!== null||stored_todolist!==undefined){

        for (const object in stored_todolist) {
            index++; //Give the index. Always before the function
            createObject(stored_todolist[0]);//object is a number
        }
    }
}

let UncompletedButtom= document.getElementsByClassName("item_completed")[0];

UncompletedButtom.addEventListener("click",displayCompleted);

let ShowAllButtom= document.getElementsByClassName("item_allTask")[0];

ShowAllButtom.addEventListener("click",displayAll);

let PendingButtom= document.getElementsByClassName("item_uncompleted")[0];

PendingButtom.addEventListener("click",displayUncompleted);


// Get a reference to the image element

let picture = document.getElementById("profile_picture");

// Take action when the image has loaded
picture.addEventListener("change",()=>{uploadImg(picture)} , false);


let button=document.getElementsByClassName("button_send")[0];
button.addEventListener("click",sendMessage);

window.onload=function(){
    getCookies();
try{
    (localStorage.todolist.length <= 2 ? localStorage.removeItem('todolist'):displayStorage());
}
catch{}

}

document.addEventListener("DOMContentLoaded",()=>{
    const recentImageDataUrl=localStorage.getItem("picture");

    if(recentImageDataUrl){
        document.getElementById("img").src=recentImageDataUrl;
    }

    getLocation();
    sendMessageEveryNewDay();
})