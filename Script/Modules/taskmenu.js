function displayTaskMenu (){
    let taskMenu=document.getElementsByClassName("hidden_Taskmenu")[0];
    taskMenu.className="Add_Task";
    let menuButtom=document.getElementsByClassName("button_AddTask")[0];
    menuButtom.addEventListener('click',displayTaskMenu);
    menuButtom.addEventListener('touchened',displayTaskMenu);
    menuButtom.addEventListener('click',setTaskMenu);
    menuButtom.addEventListener('touchened',setTaskMenu);
    window.addEventListener('resize',setTaskMenu);
}

function closeTaskMenu(){
    let menu=document.getElementsByClassName("Add_Task")[0];
    menu.className="hidden_Taskmenu";

    let closeTag=document.getElementsByClassName("close_tag addmenu")[0];
    closeTag.addEventListener('click',closeTaskMenu);
    closeTag.addEventListener('touchened',closeTaskMenu);

}

function setTaskMenu(){
    let Content=document.getElementsByClassName("content")[0];
    let widthContent=Content.offsetWidth;
    try{
        let taskMenu=document.getElementsByClassName("Add_Task")[0];
        taskMenu.style.width=`${widthContent}px`;
    }catch(error){

    }
}

export{
    displayTaskMenu,
    closeTaskMenu,
    //setTaskMenu
}