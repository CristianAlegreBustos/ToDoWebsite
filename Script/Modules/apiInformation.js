import { updateUI } from "./WheaterCard.js";

let City;
let Weather;
const apikey  = 'TRJKev4fcwegH8ub0S1KZw7cJ6Vmdptn';

function getLocation(){
    navigator.geolocation.getCurrentPosition(success,reject);
}


function success(pos){
    debugger;
    const locResp=pos.coords;
   let cookies = document.cookie.split("; ");
    let lastTime=(cookies[6]===undefined ? 0:parseInt(cookies[6].split("=")[1]));
    let actualTime=Math.floor(new Date().getTime()/1000.0);
    let time=(actualTime-lastTime)/60;
    //Verify if is the same location to avoid the Fetch request.

    if (cookies[0]===`Longitude=${locResp.longitude}` && cookies[1]===`Latitude=${locResp.latitude}` && time<15){
        let City;
        let weatherText;
        let weatherTemp;
        let weatherDayTime;
    // assign the data store in the cookies to the variables

    for (let crumb of cookies){
        const [key,value] = crumb.split("=");
        switch (key) {
            case "City":
                City=value;
                break;
            case "weatherText":
                weatherText=value;
                break;
            case "weatherTemp":
                weatherTemp=value;
            break;
            case "weatherDayTime":
                weatherDayTime=value;
            break;
            default:
                break;
        }
    }
    //Use the variables for the function
    updateUI(City,undefined,weatherText,weatherTemp,weatherDayTime);
}else{
    getData(locResp);
}
}
    function reject() {
        console.log("there is an error");
    }

    function getData(location){
        const baseurl=`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${location.latitude},${location.longitude}`;

    fetch (baseurl).then(
        //this fetch get the location id from the latitude and longitude
        response=>{
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        }).then(data=>{

            getWeather(data.Key,data,location);
        })

        .catch((error) => console.log(error))


    let getWeather = async (id,City,location) => {
        const baseUrl = `https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${apikey}`;

        return fetch(baseUrl).then(response=>{
            //this fetch get wheater from the location Id
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data=>{
            Weather=data[0];
            //save Information in Data
        document.cookie = `Longitude=${location.longitude}`;
        document.cookie = `Latitude=${location.latitude}`;
        document.cookie = `City=${City.EnglishName}`;
        document.cookie = `weatherText=${data[0].WeatherText}`;
        document.cookie = `weatherTemp=${data[0].Temperature.Metric.Value}`;
        document.cookie = `weatherDayTime=${data[0].IsDayTime}`;
        document.cookie = `lasTime=${data[0].EpochTime}`;
            //display wheater card
            return updateUI(City,data[0]);
        })

        .catch((error) => console.log(error))


    }
}


export{
    getLocation,
    City,
    Weather
}
