// see data in console 
console.log(countyCSV)
console.log(nationalCSV)

// bonus chart.js plugin for datalabels

Chart.plugins.register(ChartDataLabels);

// reading in csvs, to be replaced with api call to flask app

var stateURL = "../static/data/NCHS_-_U.S._and_State_Trends_on_Teen_Births.csv";
var countyURL = "../static/data/NCHS_-_Teen_Birth_Rates_for_Age_Group_15-19_in_the_United_States_by_County.csv";

var promises = [];

promises.push(d3.csv(stateURL));
promises.push(d3.csv(countyURL));

Promise.all(promises).then(function(csvs) {
    console.log(csvs);

    var states = csvs[0];

    states = states.filter(d=>d["Age Group (Years)"] == "15-19 years");

    // organizing data for states graph: creating an array of objects, one object per state plus the total US. 
    // objects have name, change, bar color. 
    // data note: using name instead of state/county allows the code to borrow illinois from this array for the counties array below

    var stateStarts = states.filter(d =>d.Year == 2003);
    var stateStops = states.filter(d=>d.Year == 2018);

    //https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates

    stateList = [...new Set(states.map(d=>d.State))];

    console.log(stateStarts.filter(d=>d.State == "Illinois"));

    stateChanges = [];

    stateList.forEach(function(state) {
        var start = stateStarts.filter(d=>d.State == state)[0]["State Rate"];
        var stop = stateStops.filter(d=>d.State == state)[0]["State Rate"];
        var change = stop-start;
        if (state == "Total U.S.") {
            var color = "#cc5a26"
        } else {
            var color = "#4DA6A6"
        };
        var newObject = {
            name: state,
            change: change,
            color: color
        };
        stateChanges.push(newObject);
    });

    console.log(stateChanges);

    // sorting the array from highest to lowest -- https://stackoverflow.com/questions/52785769/how-can-i-sort-data-from-highest-to-lowest-in-chart-js

    sortedStateChanges = stateChanges.sort(function(a, b) {
        return b.change - a.change;
      });

    // choosing top and bottom three states and the US total

    var selection = [sortedStateChanges[0], sortedStateChanges[1],sortedStateChanges[2],sortedStateChanges.filter(d=>d.name == "Total U.S.")[0],sortedStateChanges[49],sortedStateChanges[50],sortedStateChanges[51]];

    // set up

    var stateChartData = {
        labels: selection.map(d=>d.name),
        datasets: [
          {
            label: selection.map(d=>d.name),
            data: selection.map(d=>d.change),
            borderColor: selection.map(d=>d.color),
            backgroundColor: selection.map(d=>d.color),
            datalabels: {
                align: function(context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    if (value > -10) {return "start"}
                    else {return "end"}},
                anchor: 'start'
              }
          }
        ]
      };

      // config

      var config = {
        type: 'bar',
        data: stateChartData,
        options: {
          responsive: true,
          plugins: {
            legend: false,
            datalabels: {
                color: function(context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    if (value > -10) {return "black"}
                    else {return "white"}},
                font: {
                  weight: 'bold'
                },
                formatter: function(value, context) {
                    return [context.chart.data.labels[context.dataIndex] + ': ',Math.round(value) + '%'];
                  },
                textAlign: "center"
              }
        },
        title: {
            display: true,
            text: 'States with the highest and lowest change in teen birthrate vs. the US, 2003 - 2018'
          },
          scales: {
            xAxes: [{
                display: false,
                type: "category",
                position: {y: 5},
                grid: {
                    color: "rgba(0, 0, 0, 0)"
                }
            }]
        }
        },
      };

    //render chart

    var ctx = document.getElementById('stateChart');

    var stateChart = new Chart(ctx, config);


    //////////// now doing it for IL Counties

    var counties = csvs[1];

    var ILCounties = counties.filter(d => d.State == "Illinois");

    var countyStarts = ILCounties.filter(d =>d.Year == 2003);
    var countyStops = ILCounties.filter(d=>d.Year == 2018);

    console.log(countyStarts.filter(d=>d.County == "Cook")[0]["Birth Rate"]);


    countyList = [...new Set(ILCounties.map(d=>d.County))];
    console.log(countyList);

    countyChanges = [];

    // creating the array of objects for our county data

    countyList.forEach(function(county) {
        var start = countyStarts.filter(d=>d.County == county)[0]["Birth Rate"];
        var stop = countyStops.filter(d=>d.County == county)[0]["Birth Rate"];
        var change = stop-start;
        var newObject = {
            name: county,
            change: change,
            color: "#4DA6A6"
        };
        countyChanges.push(newObject);
    });

    console.log(countyChanges);

    // sorting

    sortedCountyChanges = countyChanges.sort(function(a, b) {
        return b.change - a.change;
      });

    console.log(sortedCountyChanges);

    // grabbing Illinois from the state data and selecting high and low counties

    var stateBar = sortedStateChanges.filter(d=>d.name == "Illinois")[0]
    stateBar.color = "#cc5a26";

    var selection = [sortedCountyChanges[0], sortedCountyChanges[1],sortedCountyChanges[2],stateBar,sortedCountyChanges[sortedCountyChanges.length - 3],sortedCountyChanges[sortedCountyChanges.length - 2],sortedCountyChanges[sortedCountyChanges.length - 1]];

    console.log(selection);

    //set up

    var countyChartData = {
        labels: selection.map(d=>d.name),
        datasets: [
          {
            label: selection.map(d=>d.name),
            data: selection.map(d=>d.change),
            borderColor: selection.map(d=>d.color),
            backgroundColor: selection.map(d=>d.color),
            datalabels: {
                align: function(context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    if (value > -10) {return "start"}
                    else {return "end"}},
                anchor: 'start'
              }
          },

        ]
      };

      // config

      var config = {
        type: 'bar',
        data: countyChartData,
        options: {
            responsive: true,
            plugins: {
                legend: false,
                datalabels: {
                    color: function(context) {
                        var index = context.dataIndex;
                        var value = context.dataset.data[index];
                        if (value > -5) {return "black"}
                        else {return "white"}},
                    font: {
                      weight: 'bold'
                    },
                    formatter: function(value, context) {
                        return [context.chart.data.labels[context.dataIndex] + ': ',Math.round(value) + '%'];
                      },
                    textAlign: "center"
                  }
            },
            title: {
              display: true,
              text: 'Illinois counties with the highest and lowest change in teen birthrates, 2003 - 2018'
            },
            scales: {
                xAxes: [{
                    display: false,
                    type: "category",
                    position: {y: 5},
                    grid: {
                        color: "rgba(0, 0, 0, 0)"
                    }
                }]
            }
                
                
          }
        };

        //render chart

        var ctx = document.getElementById('countyChart');

        var countyChart = new Chart(ctx, config);
});