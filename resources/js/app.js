// Select all elements
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

// For our chart
const ctx = docement.getElementById("axes_line_chart").getContext("2d");

// App variables
let app_data = [],
    cases_list = [],
    recovered_list = [],
    deaths_list = [],
    dates = [];    

// Get users country code




/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */
/*
fetch(`https://covid19-monitor-pro.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=country`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
			"x-rapidapi-key": "7e269ec140msh8a5df9cfc21b4b4p1c1e3ejsn9aba26afc6e0"
		}
	})
*/