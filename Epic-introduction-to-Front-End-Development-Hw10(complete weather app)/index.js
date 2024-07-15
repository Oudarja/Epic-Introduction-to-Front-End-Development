// Here responseSuccess is a function which takes as parameter type and return a function which 
//which accepts response and that function return based on type some time url some time data
/*

The function responseSuccess takes a parameter type and returns another function that takes response as a parameter.
*/
const responseSuccess=(type)=>(response)=>
   {

    if(response.ok)
    {
      switch(type)
      {
         case 'url':
          return response.url;
          default:
          return response.json();
      };
    }
    else
    {
      throw error();
    }
}



const getWeather=()=>{

/*
Algorithm:
1) Get the input element from the dom
2) Take the user input value
3) Perform validation [Check wether user input value is  not empty]
4) Get the user data from the api
5)Handle error
6) Display the data

*/
const UserInput=document.getElementById('user-input');

const errorMessageElement=document.getElementById('error-message'); 
const weatherIconElement=document.getElementById('weather-icon');

const weatherTempElement=document.getElementById('weather-temp');

const weatherCityElement=document.getElementById('weather-city');

const weatherDescriptionElement=document.getElementById('weather-description');

const weatherHumadityIcon=document.getElementById('weather-humidity-icon');
const weatherWindIcon=document.getElementById('weather-wind-icon');


const weatherHumadityText=document.getElementById('weather-humidity-text');
const weatherWindText=document.getElementById('weather-wind-text');



const reset=()=>{

    //all the attributes should be reset
   errorMessageElement.textContent='';
   weatherIconElement.setAttribute('src','')
   weatherIconElement.setAttribute('alt','');
   weatherCityElement.innerText='';
   weatherTempElement.innerHTML='';
   weatherDescriptionElement.innerText='';

   weatherHumadityIcon.setAttribute('src','');
   weatherHumadityIcon.setAttribute('alt','');

   weatherWindIcon.setAttribute('src','');
   weatherWindIcon.setAttribute('alt','');

   weatherHumadityText.textContent='';
   weatherWindText.textContent='';


}


const displayWeather=(data)=>
{
   // Initially temp is in farenheight so 273.15 is subtracted
   const temparature=Math.round(data.main.temp-273.15);
   weatherTempElement.innerHTML=`${temparature}&deg;C`;
   weatherCityElement.innerText=data.name;
   weatherDescriptionElement.innerText=data.weather[0].description;

   weatherHumadityIcon.setAttribute('src','humidity.png');
   weatherHumadityIcon.setAttribute('alt','humidity-icon');
   weatherHumadityText.textContent=`${data.main.humidity}%`;

   weatherWindIcon.setAttribute('src','wind.png');
   weatherWindIcon.setAttribute('alt','wind-icon');
   weatherWindText.textContent=`${Math.round(data.wind.speed)}m/s`;
}


//before showing any result it must be reset.
reset();

// console.log(UserInput.value);
// http://api.openweathermap.org/data/2.5/weather?q=${UserInput.value}&appid=${API key}

if(!UserInput.value){
   
   errorMessageElement.textContent="Search field is empty!!!";
   return;
}

const ApiKey='c9e1d01223df60a70c654340d166498c';

const errorMessage="Something went wrong try again!!!";

// fetch() is a built-in JavaScript function used to make network requests
//  (typically HTTP requests) to APIs or other resources.
// fetch() sends a GET request to the URL constructed with the user's input
// Once the request is completed, this chain processes the response. 
// response.json() is a method that parses the response as JSON. 
// The JSON data returned typically contains the weather information for the requested location.
// Handling responses from network requests in JavaScript is typically asynchronous due to the 
// time it takes to fetch data over the network.
// By returning response.json() within .then(), you're chaining promises. 

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${UserInput.value}&appid=${ApiKey}`)
.then(responseSuccess('json'))
.then((data)=>{
 
    iconcode=data.weather[0].icon;
    displayWeather(data);
   //  console.log(data);
   //   https://openweathermap.org/img/wn/10d@2x.png
    return fetch(`https://openweathermap.org/img/wn/${iconcode}@2x.png`);
})
.then(responseSuccess('url'))
.then((iconUrl)=>{
   weatherIconElement.setAttribute('src',iconUrl);
   weatherIconElement.setAttribute('alt','weather icon');
})
.catch((e)=>{
   errorMessageElement.textContent=errorMessage;
   console.error(e);
});

// fetch->promise1->Json->promise2= chain of promises

// promises 3 states:

/*
1)pending
2)fullfill(success)
3)error
*/

}