// bonus chart.js plugin for datalabels

Chart.plugins.register(ChartDataLabels);

// see data in console 
console.log(USData)
console.log(stateData)

// // Example of how to filter for a specific state 
// var stateSpecifc = stateData.filter((d) => d.state == "Alabama");
// console.log(stateSpecifc)

// // Example of how to filter to return only specific key values, here only returning the rates for US
// var USRates = USData.map(function(d) { return d.rate;});

// background set up
var years = [];

for (var i=2003;i<=2018;i++) {
  years.push(i);
}

var colors = ["#648FFF","#785EF0", "#DC267F", "#FE6100", "#FFB000"]; // to update with colors from actual site

var stateList = [...new Set(stateData.map(d=>d.state))];

stateLineData = {}

stateList.forEach(function(state) {
  var allYears = stateData.filter((d) => d.state == state);
  var sortedYears = allYears.sort(function(a, b) {
    return a.year - b.year;
  });
  var dataArray = sortedYears.map(d=>d.rate);
  stateLineData[state] = dataArray;
});

console.log(stateLineData);

// function to create a new dataset for the chart
var colorIndex = 0

function makeLine (state) {
  var line = {}
  line.label = state;
  line.backgroundColor = "rgba(0, 0, 0, 0)";
  line.borderColor = colors[colorIndex%5];
  line.pointBackgroundColor = colors[colorIndex%5];
  line.data = stateLineData[state];
  var datalabels = {}
  datalabels.color = colors[colorIndex%5];
  datalabels.borderColor = colors[colorIndex%5];
  datalabels.backgroundColor = "white"
  line.datalabels = datalabels;
  colorIndex++;
  return line;
}

// sample data entry to be replaced by api call to flask app
var US = USData.map(d=>d.rate);

// var stateData = {
// IL: [40.2, 40.1, 38.5, 39.8, 40.2, 38.5, 35.9, 33, 29.5, 27.9, 24.6, 22.8, 21.1, 18.7, 17.4, 15.8],
// AL: [51.4, 51, 48.1, 51.8, 52.1, 50.5, 48.3, 43.6, 40.5, 39.2, 34.3, 32, 30.1, 28.4, 27, 25.2],
// NH: [18, 18.1, 18, 18.1, 19.3, 19.1, 16.4, 15.7, 13.7, 13.8, 12.6, 11, 10.9, 9.3, 8.4, 8]
// };

// chart set up with just US totals

var datasets = [{
  label: 'US',
  backgroundColor: "rgba(0, 0, 0, 0)",
  borderColor: "#A8A4A4",
  pointBackgroundColor: "#A8A4A4",
  data: US,
  datalabels: {
    color: "#A8A4A4",
    borderColor: "#A8A4A4",
    backgroundColor: "white"
  }
}];

var data = {
   labels: years,
   datasets: datasets
};

// chart config

const config = {
  type: 'line',
  data: data,
  options: {          
    plugins: {
    legend: false,
    datalabels: {
        // color: function(context) {
        //     var colorIndex = context.dataIndex-1;
        //     return dataset.backgroundColor},
        font: {
          weight: 'bold'
        },
        formatter: function(value, context) {
            return [context.dataset.label];
          },
        textAlign: "center",
        display: function(context) {
          var index = context.dataIndex;
          if (index == 3) {return true;}
          else {return false;}
        },
        align: "top",
        anchor: "center",
        clip: false,
        borderWidth: 2,
        borderRadius: 4,

      }
},
    animations: {
      y: {
        easing: 'easeInOutElastic',
        from: (ctx) => {
          if (ctx.type === 'data') {
            if (ctx.mode === 'default' && !ctx.dropped) {
              ctx.dropped = true;
              return 0;
              }
            }
          }
        },
      show: {
        easing: 'easeInOutElastic',
        from: (ctx) => {
          if (ctx.type === 'data') {
            if (ctx.mode === 'default' && !ctx.dropped) {
              ctx.dropped = true;
              return 0;
              }
            }
          }
        }
      },
    },
  };

  // chart actions

  // const actions = [
  //   {
  //     name: 'Add',
  //     handler(chart) {
  //       const data = chart.data;
  //       const dsColor = Utils.namedColor(chart.data.datasets.length);
  //       const newDataset = {
  //         label: selection,
  //         backgroundColor: Utils.transparentize(dsColor, 0.5),
  //         borderColor: dsColor,
  //         data: stateData[selection],
  //       };
  //       chart.data.datasets.push(newDataset);
  //       chart.update();
  //     }
  //   },
  // ];


// render chart

  var ctx = document.getElementById('myChart');

  var myChart = new Chart(ctx, config);



d3.select("#add_state").on("click", function(){
  var selection = d3.select("#state_input").property("value");
  console.log(selection);
  newLine = makeLine(selection, 2);
  myChart.data.datasets.push(newLine);
  myChart.update();
});


d3.select("#clear").on("click", function() {
  console.log("clicked button");
  myChart.data.datasets = [{
    label: 'US',
    backgroundColor: 'black',
    borderColor: 'black',
    data: US,
  }];
  myChart.update();
});


// notes  

// html: chart will fill its space, have to wrap it in something with a set size
// row + column works to contain it and still be responsive

// data input: currently set up with object of arrays for each state with birthrates for 2003-2018

// to do: 
// title, axis, data labels
// hook up with flask and actual site
// error handling
// colors, animations, styling etc.
// maybe: you can really mess with your chart if you want to! add county data? color code based on contraception access, other data sets?


// animation/interactions: adding datasets similar to this example: https://www.chartjs.org/docs/latest/samples/animations/drop.html

// more on chart.js handling clicking, mouseover, etc: https://www.chartjs.org/docs/latest/configuration/interactions.html



