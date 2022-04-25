import { stored_todolist } from "../scriptNew.js";


function displayMenu(){
    let menu=document.getElementsByClassName("hidden_menu")[0];
    menu.className="main_menu";
    let fillbar=document.querySelectorAll(".fill_bar");
    fillbar.forEach((element)=>{element.style.zIndex=0;}
    )
    let menuButtom=document.getElementsByClassName("menu")[0];
    let addButton=document.getElementsByClassName("button_AddTask")[0];
    menuButtom.addEventListener('click',displayMenu);
    menuButtom.addEventListener('touchened',displayMenu);
   menuButtom.addEventListener('click',setMenuHeight);
    menuButtom.addEventListener('touchened',setMenuHeight);
    window.addEventListener('resize', setMenuHeight);

    menuButtom.addEventListener('click',()=>{
        addButton.style.visibility="hidden";
    });

}

function closeMenu(){
    debugger;
    let menu=document.getElementsByClassName("main_menu")[0];
    menu.className="hidden_menu";
    let addButton=document.getElementsByClassName("button_AddTask")[0];
    addButton.style.visibility="visible";
    let closeTag=document.getElementsByClassName("close_tag")[0];
closeTag.addEventListener('click',closeMenu);
closeTag.addEventListener('touchened',closeMenu);
let fillbar=document.querySelectorAll(".fill_bar");
fillbar.forEach((element)=>{element.style.zIndex=1  ;}

)

}

function setMenuHeight(){
    let Content=document.getElementsByClassName("content")[0];
    let HeightContent=Content.offsetHeight;
    let WidthContent=Content.offsetWidth;
    debugger;
    if(WidthContent>680 ){
        try{
            let mainMenu=document.getElementsByClassName("main_menu")[0];
            mainMenu.style.height=`${HeightContent}px`;
        }catch(error){
            let hiddenMenu=document.getElementsByClassName("hidden_menu")[0];
            hiddenMenu.style.height=`${HeightContent}px`;
        }
    }else{
        try{
            let mainMenu=document.getElementsByClassName("main_menu")[0];
            mainMenu.style.height=`${HeightContent+120}px`;
        }catch(error){
            let hiddenMenu=document.getElementsByClassName("hidden_menu")[0];
            hiddenMenu.style.height=`${HeightContent+120}px`;
        }
    }

}


function displayCompleted(){
    //display task completed item
    for (let item of stored_todolist){
        if(item.state=="Uncompleted"){
            document.getElementById(item.id).style.display="none";
        }else{
            document.getElementById(item.id).style.display="flex";
        }
    }

    //display task completed title
    let title=document.getElementsByClassName("todo_title");
    for (let item of title){
        if (item===title[1]){
            item.className="todo_title";
        }else{
            item.className="todo_title hidde";
        }

    }

    let mainMenu=document.getElementsByClassName("main_menu")[0];
    mainMenu.className="hidden_menu";
    document.getElementsByClassName("button_AddTask")[0].style.visibility="visible";
}

function displayAll(){

    for (let item of stored_todolist){
            document.getElementById(item.id).style.display="flex";
    }

    // To Do list title
    let title=document.getElementsByClassName("todo_title");
    for (let item of title){
        if (item===title[0]){
            item.className="todo_title";
        }else{
            item.className="todo_title hidde";
        }

    }

    let mainMenu=document.getElementsByClassName("main_menu")[0];
    mainMenu.className="hidden_menu";
    document.getElementsByClassName("button_AddTask")[0].style.visibility="visible";
}


function displayUncompleted(){
    for (let item of stored_todolist){
        if(item.state=="Completed"){
            document.getElementById(item.id).style.display="none";
        }else{
            document.getElementById(item.id).style.display="flex";
        }
    }

    //display task uncompleted
    let title=document.getElementsByClassName("todo_title");
    for (let item of title){
        if (item===title[2]){
            item.className="todo_title";
        }else{
            item.className="todo_title hidde";
        }

    }

    let mainMenu=document.getElementsByClassName("main_menu")[0];
    mainMenu.className="hidden_menu";
    document.getElementsByClassName("button_AddTask")[0].style.visibility="visible";
}

export {
    displayMenu,
    closeMenu,
    setMenuHeight,
    displayCompleted,
    displayAll,
    displayUncompleted
}