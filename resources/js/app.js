// Select all elements
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

// For our chart
const ctx = document.getElementById("axes_line_chart").getContext("2d");

// App variables
let app_data = [],
    cases_list = [],
    recovered_list = [],
    deaths_list = [],
    deaths = [],
    formatedDates = [];

// Get users country code
// geoplugin_countryCode() fetches country code from the plugin
// Basically it will fetch the country code in which you are present
let country_code = geoplugin_countryCode();
let user_country;

// We will loop through our country list to check the country-
// -code fetched by plugin matches with the country code present-
// -in our country list. If its present then we will assign-
// -user_country as country_name

country_list.forEach( (country)=> {
	if( country.code == country_code){
		user_country = country.name;
	}
});



/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */
// Inside fetch() function is the URL that fetches the information based on-
// -country name that is provided. ${user_country} is country name provided
function fetchData(user_country){
	country_name_element.innerHTML = "Loading...";
	cases_list=[], recovered_list=[], deaths_list=[], dates=[], formatedDates=[];
    fetch(`https://covid19-monitor-pro.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=${user_country}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
			"x-rapidapi-key": "7e269ec140msh8a5df9cfc21b4b4p1c1e3ejsn9aba26afc6e0"
		}
	})
	// We get json response
	.then( (response) => {
		return response.json();
	})
	// We convert json response to javascript object
	.then( (data) => {
		// Object.keys(data) access all dates from the data object
		dates = Object.keys(data);
		
		// Now we will loop with the help of dates array and use-
		// -it as a index to access other relevant information
		dates.forEach( (date) => {
			// fetches data at the given date
			let DATA = data[date];
 
            formatedDates.push(formatDate(date));
			// Stores fetched data in app_data array
			app_data.push(DATA);

			// Access total cases with DATA.total_cases and-
			// -append in cases_list array
			// Same thing we will follow for recovered & deaths list
			cases_list.push(parseInt(DATA.total_cases.replace(/,/g,"")));
			recovered_list.push(parseInt(DATA.total_recovered.replace(/,/g,"")));
			deaths_list.push(parseInt(DATA.total_deaths.replace(/,/g,"")));
		})
	})
	.then( () => {
		updateUI();
	})
	.catch( error => {
		alert(error);
	})
}

fetchData(user_country);

// Update UI function
function updateUI(){
	updateStats();
	// axesLinearChart();
}

function updateStats(){
	let last_entry = app_data[app_data.length - 1];
	let before_last_entry = app_data[app_data.length - 2];
    
    // Display country name
	country_name_element.innerHTML = last_entry.country_name;

	// Display total case of the country
	total_cases_element.innerHTML = last_entry.total_cases || 0;
    new_cases_element.innerHTML = `+${last_entry.new_cases} || 0`;
    
	recovered_element.innerHTML = last_entry.total_recovered || 0;
	new_recovered_element.innerHTML = `+${parseInt(last_entry.total_recovered.replace(/,/g, "")) - parseInt(before_last_entry.total_recovered.replace(/,/g, ""))}`;

    deaths_element.innerHTML = last_entry.total_deaths;
    new_deaths_element.innerHTML = `+${last_entry.new_deaths || 0}`;
}

// UPDATE CHART
let my_chart;
function axesLinearChart() {
  if (my_chart) {
    my_chart.destroy();
  }

  my_chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Cases",
          data: cases_list,
          fill: false,
          borderColor: "#FFF",
          backgroundColor: "#FFF",
          borderWidth: 1,
        },
        {
          label: "Recovered",
          data: recovered_list,
          fill: false,
          borderColor: "#009688",
          backgroundColor: "#009688",
          borderWidth: 1,
        },
        {
          label: "Deaths",
          data: deaths_list,
          fill: false,
          borderColor: "#f44336",
          backgroundColor: "#f44336",
          borderWidth: 1,
        },
      ],
      labels: formatedDates,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

// FORMAT DATES
const monthsNames = ["Jan","Feb","Mar","Apr","May","Jun","Aug","Sep","Oct","Nov","Dec"];

function formatDate(dateString){
	let date = new Date(dateString);

	return `${date.getDate()} ${monthsNames[date.getMonth() - 1]}`;
}