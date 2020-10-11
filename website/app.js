/* Global Variables */
const url = 'http://api.openweathermap.org/data/2.5/weather'
const key = '0e2bfcffb23c577eab895a7342c65426'

const zip  = document.getElementById('zip')
const feelings  = document.getElementById('feelings')
const btn  = document.getElementById('generate')
const date  = document.getElementById('date')
const temp  = document.getElementById('temp')
const content  = document.getElementById('content')



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();




// event handler and chaining the promises
function action (){
const content = feelings.value;
  getData()
  .then(function (fetchedData) {
    postData('/add' ,{date: newDate , temp: fetchedData.main.temp , content : content})
    updateUI()
  })

}

// fetching the data from openweathermap
const getData = async () => {
const zipValue= `?zip=${zip.value}`
const keyValue= `&appid=${key}&units=metric`

const fetchData = await fetch(url +zipValue + keyValue  )

    const fetchedData = await fetchData.json()
return fetchedData


}

// sending the data we got earlier to '/add' route
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });

 
}
  // fetching the endpoint  data from '/all' route and updating the ui with it
  const updateUI = async () => {
    const request = await fetch('/all');
    try {
      const projectData = await request.json()
      
      date.innerText = projectData.date;
      temp.innerHTML =` ${projectData.temp.toString().slice(0 , 2)}   &#8451;` ;
      content.innerHTML = `You are feeling ${projectData.content} today`;
    }
    catch (error) {
      console.log("error", error);
    }
  };
  //adding the event listener
  btn.addEventListener( 'click' , action)
