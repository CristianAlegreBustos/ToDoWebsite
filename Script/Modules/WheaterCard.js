import{City,Weather}from  "./apiInformation.js";

const card = document.querySelector(".card");
const content = document.querySelector(".contentCard");
const cardImage = document.querySelector(".card-image img");

const updateUI = (City,Weather=undefined,weatherText=Weather.WeatherText,weatherTemp=Weather.Temperature.Metric.Value,weatherDayTime=Weather.IsDayTime) => {
  const cityDets = City;

  //updating details
  content.innerHTML = `
    <h5 class="font-c">${(cityDets.EnglishName==undefined?City:cityDets.EnglishName)}</h5>
    <span class="font-c">${weatherText}</span>
    <h3 class="font-c">${weatherTemp} &degC</h3>
  `;

  //updating image
  let imgSrc = null;
  if (weatherDayTime==="true"||weatherDayTime==true) {
    imgSrc = "images/Day.png";
  } else {
    imgSrc = "images/Night.png";
  }

  cardImage.setAttribute("src", imgSrc);

  //remove hide class
  if (card.classList.contains("hide")) {
    card.classList.remove("hide");
  }
};

export{
    updateUI
}