

export function saveName(){
    let user_name =document.getElementById("user_name").value;
    if (user_name!==0){
        setCookies(user_name);
    }

}

function setCookies(user_name){
    document.cookie = `username=${user_name}`
}

export function getCookies(){
    let user_name =document.getElementById("user_name");
    let profile_name=document.getElementsByClassName("profile_name")[0];
    const cookies = document.cookie.split("; ");
    for (let crumb of cookies){
        const [key,value] = crumb.split("=");

        if (value!==undefined && key=="username"){
            user_name.value=value;
            let profile_name_Text=document.createTextNode(value);
            profile_name.appendChild(profile_name_Text);
        }

    }

}