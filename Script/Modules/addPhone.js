import { stored_todolist } from "../scriptNew.js";

function displayPhoneMenu (){
    let phoneMenu=document.getElementsByClassName("hidden_cellphone")[0];
    phoneMenu.className="cellphone_wrapper";
    let menuButtom=document.getElementById("wsp_logo");
    menuButtom.addEventListener('click',displayPhoneMenu);
    menuButtom.addEventListener('click',setPhoneMenu);
    window.addEventListener('resize',setPhoneMenu);
}

function displayNumber() {
    let input=document.getElementsByClassName("input_phone")[0].value=localStorage.getItem("phone_number");
}

function setPhoneMenu(){
    let Content=document.getElementsByClassName("content")[0];
    let widthContent=Content.offsetWidth;
    displayNumber();
    try{
        let taskMenu=document.getElementsByClassName("cellphone_wrapper")[0];
        taskMenu.style.width=`${widthContent}px`;
    }catch(error){

    }
}

function closePhoneMenu(){
    debugger;
    let menu=document.getElementsByClassName("cellphone_wrapper")[0];
    menu.className="hidden_cellphone";
    let closeTag=document.getElementsByClassName("close_tag addmenu")[1];
    closeTag.addEventListener('click',closePhoneMenu);
}

function sendMessage(){
    debugger;
    let message;
    let yourNumber=document.getElementsByClassName("input_phone")[0].value;

localStorage.setItem("phone_number",yourNumber);

let actualTime=Math.floor(new Date().getTime()/1000.0);

localStorage.setItem("last_time",actualTime);

yourNumber=localStorage.getItem("phone_number");


    if (yourNumber!==""){

    if (stored_todolist===null){
        message="there is no task in the list";
    }else{
        message = "You have pending tasks to do:\n";
        stored_todolist.forEach(element => {
            if (element.state=="Uncompleted"){
                message+= element.name;
                message+=" in the Category of ";
                message+=element.category;
                message+="\n";
            }
        });

    }


    sendWSP(message);

//https://web.whatsapp.com/send?phone=%3425423179
//document.getElementsByClassName('_4sWnG')[0].click();
}

function sendWSP(message){
    let url='https://web.whatsapp.com/send?phone=';
    url+=yourNumber;
    url+='&text=';
    url+=encodeURIComponent(message)

    window.open(url,'Sent Alert');
    }
}

function sendMessageEveryNewDay(){
    let lastTime=localStorage.getItem("last_time");
    let actualTime=Math.floor(new Date().getTime()/1000.0);
    let time=(actualTime-lastTime)/60;

    if (time>1440){
        sendMessage();
    }else{
        console.log('No han pasado 24 hr, solo '+time +" minutes.")
    }
}

export{
    displayPhoneMenu,
    closePhoneMenu,
    setPhoneMenu,
    sendMessage,
    sendMessageEveryNewDay
}