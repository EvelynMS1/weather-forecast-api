
//will use the input of user 
//retreving classes and id from html sheet 
const $firstWeatherDay = document.getElementById("mainweather");
const $fiveminiday = document.getElementById("miniWeather");
const city = document.getElementById("cityname");
const cityForm = document.getElementById("cityForm");
const submitBtn = document.getElementById("submitbtn");
const storedcityDiv = document.getElementById("storedCities");
//array value if exists being assigned as valuesArray and if no value in local storage then the array item is retrieved and set as valuesArray
let valuesArray = JSON.parse(localStorage.getItem("valuesArray")) || [];

submitBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the form from submitting
  
  // Get the value of the submit button
   var cityName = city.value; 

  if(cityName){

    const lowerCaseValuesArray = valuesArray.map(item => item.toLowerCase());

    const checkcity =lowerCaseValuesArray.includes(cityName.toLowerCase());  
 
    
    console.log(checkcity);
    if(checkcity === true){
      geocity(cityName);
    }else{
     valuesArray.push(cityName); 
      localStorage.setItem("valuesArray", JSON.stringify(valuesArray)); 
      console.log(`Submit value: ${cityName}`);
      geocity(cityName);
// localStorage.setItem("cityData", JSON.stringify(cityName));
       cityForm.reset();
        
      //   valuesArray.forEach(element => {
      //   const searchedCitiesbtn = document.createElement("button"); 
      //   searchedCitiesbtn.setAttribute('id','citybtn');
      //   searchedCitiesbtn.textContent = element;
      //   storedcityDiv.append(searchedCitiesbtn);
      // });
       const cityButton = document.createElement("button");
       
       cityButton.textContent = cityName;
       cityButton.value = cityName;
       cityButton.addEventListener("click", function(event) {
       geocity(event.target.value);
  });
       cityButton.classList.add('city-button');  // Add a class for styling if needed
       storedcityDiv.append(cityButton);
//for each value of the valuesArray from local storage make btn and append value
   
       
    
    }
// .join(",");;
  } else{
    console.log('no city inserted')
  }
    
});



// const cityName = document.getElementById("cityname").value;
//when submit click event

function geocity(citySpecified){
fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${citySpecified}&limit=1&appid=f879b58236b7e1c5940e21d6ece79cf2`)
//RESPONSE OBJECT converting to json
.then((res)=>res.json())
//json data response readable format
.then((data)=>{
    //statement manipulate data
    console.log(data);
    //data is array dot notation for properties
    const lat = data[0].lat;
    const long = data[0].lon;
    cityweather(lat,long);
})
}


//second function for weather forecast
function cityweather(latitude,longitude){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=f879b58236b7e1c5940e21d6ece79cf2&units=imperial`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
         weatherdisplay(data);
    })
}
function weatherdisplay(data){
  $fiveminiday.innerHTML = '';

    const weatherobj = data;

    //0 be a variable so that it is iteratable bc the following calls will be for each an every array number
    //methods that can be used is for loops only loop through certain numbers of the array 
//for every item in array call function weatherProperties
  //every 7 day items in array//0,6,14,22,30,38 
  const weatherdays = [weatherobj.list[13],weatherobj.list[22],weatherobj.list[30],weatherobj.list[38],weatherobj.list[39]];
  //for loop through weatherdays calling function on each item to generate html page
  for(day of weatherdays){
    //call box creation function 
   weatherProperties(day);
  }
  propertiesOfdata(weatherobj.list[0],data)
  
}
//create 0 object property weather
function weatherProperties(data){

    const listobj = data;
    const date1 = listobj.dt_txt;
    const icon = listobj.weather[0].icon;
    const temperature = listobj.main.temp;
    const humidity = listobj.main.humidity;
    const windspeed = listobj.wind.speed;
    const objvalues = [`Temp: ${temperature} °F`,`Wind: ${windspeed} MPH`,`Humidity: ${humidity} %`];
    //create html elements to add to div
    //newly created div must be styled iinline block 

   const $miniday = document.createElement("div");
   const $datedata = document.createElement("p");
  // $datedata.textContent = `${cityname} ${date1}`;
   $datedata.textContent= date1; 
     
   console.log($datedata);
   $miniday.append($datedata);
   $fiveminiday.append($miniday);
      var $icondata = document.createElement("img");
      $icondata.src = "https://openweathermap.org/img/w/" + icon + ".png";
     $miniday.append($icondata);
     
     $fiveminiday.append($miniday);
    // $minidata.textContent = date1;
    // $minidata.textContent = icon;
    // $minidata.textContent = temperature;    
    // $minidata.textContent = windspeed;
    for (var i = 0; i < objvalues.length; i++) { 
      var $minidata = document.createElement("p");
       $minidata.textContent = objvalues[i];
       $miniday.append($minidata);
       $miniday.classList.add('smalldivs');
       $fiveminiday.append($miniday);
  }
  
  
    

    console.log(windspeed);
    console.log(temperature);
    console.log(humidity);
    console.log(icon);
    console.log(listobj);
    console.log(date1);
}
//add properties to a box
// function boxCreation{
//add to weatherdiv display 
function propertiesOfdata(data,dataforcity){   
  const citydata = dataforcity;
  const cityname = citydata.city.name;
  console.log(cityname); 
     $firstWeatherDay.innerHTML ='';
    const listobj = data;
    const date1 = listobj.dt_txt;
    const icon = listobj.weather[0].icon;
    const temperature = listobj.main.temp;
    const humidity = listobj.main.humidity;
    const windspeed = listobj.wind.speed;
    const objvalues = [`Temp: ${temperature} °F`,`Wind: ${windspeed} MPH`,`Humidity: ${humidity} %`];  
    
    const $miniday = document.createElement("div");
   const $datedata = document.createElement("h3");
  //  $datedata.classList.add("boldcity")
   $datedata.textContent = `${cityname} ${date1}`;
  //  $datedata.textContent = date1;
   $miniday.append($datedata);
   $firstWeatherDay.append($miniday);
      var $icondata = document.createElement("img");
      $icondata.src = "https://openweathermap.org/img/w/" + icon + ".png";
     $miniday.append($icondata);
     
     $firstWeatherDay.append($miniday);
     for (var i = 0; i < objvalues.length; i++) { 
      var $minidata = document.createElement("p");
       $minidata.textContent = objvalues[i];
       $miniday.append($minidata);
       $miniday.classList.add('oneweatherdivs');
       $firstWeatherDay.append($miniday);
  }
}

