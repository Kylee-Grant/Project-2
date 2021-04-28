// see data in console 
console.log(birthRate1517);
console.log(birthRate1819);

// Example of how to filter to return only the birth rates for a specific age range variable
// You can switch out .rate for whatever key you would want to select 
// //var rates1517 = birthRate1517.map(function(d) { return d.rate;});

var years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]

var usBirthRate1 = [88.6, 94, 93.6, 91.1, 90.2, 87.7, 84.7, 82.1, 80.9, 79.1, 78.1, 75.5, 72.2, 69.6, 68.7, 68.4, 71.2, 71.7, 68.2, 64, 58.2, 54.1, 51.4, 47.3, 43.8, 40.7, 37.5, 35.1, 32.3]
var usBirthRate2 = [37.5, 38.6, 37.6, 37.5, 37.2, 35.5, 33.3, 31.4, 29.9, 28.2, 26.9, 24.5, 23.1, 22.2, 21.8, 21.1, 21.6, 21.7, 21.1, 19.6, 17.3, 15.4, 14.1, 12.3, 10.9, 9.9, 8.8, 7.9, 7.2]
var trace1 = {
  x: years,
  y: usBirthRate1,
  name: 'Ages 18-19',
  type: 'bar'
};
console.log(trace1);

var trace2 = {
  x: years,
  y:usBirthRate2,
  name: 'Ages 15-17',
  type: 'bar'
};


var data = [trace1, trace2];

var layout = {barmode: 'group', title: 'US Teen Birth Rate by Age Group', yaxis: {title: "Birth Rate"}, xaxis: {title:"Years"}};
Plotly.newPlot('plot', data, layout);

