  // setting up years and colors
  
  var years = [];

  for (var i=2003;i<=2018;i++) {
    years.push(i);
  }

  console.log(years);

  var colors = ["#648FFF","#785EF0", "#DC267F", "#FE6100", "#FFB000"];

  // sample data entry to be replaced by api call to flask app
var stateData = {
US: [41.1, 40.5, 39.7, 41.1, 41.5, 40.2, 37.9, 34.2, 31.3, 29.4, 26.6, 24.2, 22.3, 20.3, 18.8, 17.4],
IL: [40.2, 40.1, 38.5, 39.8, 40.2, 38.5, 35.9, 33, 29.5, 27.9, 24.6, 22.8, 21.1, 18.7, 17.4, 15.8],
AL: [51.4, 51, 48.1, 51.8, 52.1, 50.5, 48.3, 43.6, 40.5, 39.2, 34.3, 32, 30.1, 28.4, 27, 25.2],
NH: [18, 18.1, 18, 18.1, 19.3, 19.1, 16.4, 15.7, 13.7, 13.8, 12.6, 11, 10.9, 9.3, 8.4, 8]
};

  // selection pulls chart data (manual selection to be replaced by javascript)
  selection = ["IL", "AL", "NH"];

  var datasets = [{
       label: 'US',
       backgroundColor: 'black',
       borderColor: 'black',
       data: stateData.US,
     }];

  selection.forEach(function(state, index){
    var line = {}
    line.label = state
    line.backgroundColor = colors[index];
    line.borderColor = colors[index];
    line.data = stateData[state];

    datasets.push(line);
  });

// chart set up

var data = {
   labels: years,
   datasets: datasets
};


  // chart config

  const config = {
    type: 'line',
    data,
    options: {}
  };


  // render chart

  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );



// notes

// html: chart will fill its space, have to wrap it in something with a set size
// row + column works to contain it and still be responsive

// data input: currently set up with object of arrays for the US and each state with birthrates for 2003-2018

// animation/interactions: adding datasets similar to this example: https://www.chartjs.org/docs/latest/samples/animations/drop.html

// more on chart.js handling clicking, mouseover, etc: https://www.chartjs.org/docs/latest/configuration/interactions.html

