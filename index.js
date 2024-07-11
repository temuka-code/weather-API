const apiKey="884b0d1e7a1f171bedc1cc783a5b7120";
const apiUrl="http://api.openweathermap.org/geo/1.0/direct?q="; 

const weatherDataUrl="https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,precipitation&"
// current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m

const userLocationArea=document.querySelector(".search input");
const userLocationBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");

async function checkWeather(city){
    const response =await fetch(apiUrl+city+`&appid=${apiKey}`)
    .then((response)=>response.json())
    // var data=await response.json();
    
    .then((data)=>{
        var cityName= (data[0].name);
        console.log(cityName);
        
    fetch(weatherDataUrl+`latitude=${data[0].lat}&longitude=${data[0].lon}`).
        then((res)=>{
            if(!res.ok){
                throw new Error("Invalid Request");
            }
            return res.json();
        }).then((data)=>{
            console.log(data)
            // console.log(data.current.weather_code)
           
            

            function convert(weatherCode){
                console.log(weatherCode);
            }

            document.querySelector(".city").innerHTML= cityName;
            document.querySelector(".temp").innerHTML= Math.round(data.current.temperature_2m)+"°c";
            document.querySelector(".humidity").innerHTML= data.current.relative_humidity_2m+"%";
            document.querySelector(".wind").innerHTML= data.current.wind_speed_10m+"km/h";

            if(data.current.weather_code>=90){
                
                weatherIcon.src="images/snow.png"
                
                // console.log(data.current.weather_code)
            }
            else if(data.current.weather_code>=80){
                weatherIcon.src="images/rain.png"
            }
            else if(data.current.weather_code>=50){
                weatherIcon.src="images/drizzle.png"
            }
            else if(data.current.weather_code>=45){
                weatherIcon.src="images/mist.png"
            }
            else if(data.current.weather_code>=1){
                weatherIcon.src="images/clouds.png"
            }
            

        }).catch((err)=>{
            console.warn(err);
        });
        
        
        // console.log(data);
        // console.log(data[0].lat,data[0].lon);   
    })
}




userLocationBtn.addEventListener("click",()=>{
    checkWeather(userLocationArea.value);
});