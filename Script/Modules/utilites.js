import { index, stored_todolist } from "../scriptNew.js";

// similar to isset in php
function isset(...variables){
    for(const arg of variables){
        if (arg !==undefined && arg!== null&& arg!==""){
            return arg;
        }
    }

}

function issetParam(object,...variables){
    for(const arg of variables){
        if (arg !==undefined && arg!== null&& arg!==""){
            return arg;
        }else{
            return stored_todolist[index][object];
        }
    }

}
function issetCategory(object,...variables){
    for(const arg of variables){
        if (arg !==undefined && arg!== null&& arg!==""){
            return arg;
        }else{
            return stored_todolist[index].categoryObject[object];
        }
    }

}

function countArray(list,object){
    let count=0;
    list.forEach(element => {
        if (element === object) {
          count += 1;
        }
      });
    return count;
}

export{
    isset,
    issetParam,
    issetCategory,
    countArray
}