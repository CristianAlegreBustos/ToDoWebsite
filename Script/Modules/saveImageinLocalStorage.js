export function uploadImg(picture){
    const reader= new FileReader();
    //this reader contain the information of this image.
    reader.addEventListener("load",()=>{
        localStorage.setItem("picture",reader.result);
    });

    reader.readAsDataURL(picture.files[0]);

    location.reload();
}


