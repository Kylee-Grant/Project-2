# Project-2
Team members: Tori Arriola, Yifei Cao, Kylee Grant, Leah Handel, Catie Lutz, Rana Saber

# Project Requirements
1. Your visualization must include a Python Flask–powered API, HTML/CSS, JavaScript, and at least one database (SQL, MongoDB, SQLite, etc.).
2. Your project should fall into one of the below four tracks:
A custom “creative” D3.js project (i.e., a nonstandard graph or chart)
A combination of web scraping and Leaflet or Plotly
A dashboard page with multiple charts that update from the same data
A “thick” server that performs multiple manipulations on data in a database prior to visualization (must be approved)
3. Your project should include at least one JS library that we did not cover.
4. Your project must be powered by a data set with at least 100 records.
5. Your project must include some level of user-driven interaction (e.g., menus, dropdowns, textboxes).
6. Your final visualization should ideally include at least three views.


# Inspiration and Guiding Questions
Our team was inspired to understand to a greater extent the occurance of teen pregnancy across the United States. After reviewing our data, we had two guiding questions: 
1. What is the current trend of teen births in the U.S.? 
2. What correlations exist between the rate of teen births and other factors, such as age and location? 


# Dataset Overview
We utilized two datasets from the National Center for Health Statistics, which is part of the Centers for Disease Control and Prevention. 

[Teen Birth Rates for Age Group 15-19 in the United States by County](https://catalog.data.gov/dataset/nchs-teen-birth-rates-for-age-group-15-19-in-the-united-states-by-county)
This dataset details estimated birth rates, expressed per 1,000 females aged 15–19, for 3,137 U.S. counties. This data spans 2003 to 2018 and largely is sourced from the National Vital Statistics System birth data files. For further information, please see the documentation at the link above. 

[U.S. and State Trends on Teen Births](https://catalog.data.gov/dataset/nchs-u-s-and-state-trends-on-teen-births)
This dataset assembles all final birth data for females aged 15–19, 15–17, and 18–19 for the United States and each of the 50 states, expressed per 1,000 females in each age range. This data spans 1990–2018 and is based on 100% of birth certificates filed in 50 states. 

[US Census: Cartographic Boundary Files (GeoJSON)](https://eric.clst.org/tech/usgeojson/)
For this project, we referenced the work of Eric Celeste, who has taken the United States Census Cartographic Boundary Files and converted them to GeoJSON using the MyGeoData vector converter. In specific, we utilized the U.S. state boundaries in our choropleth map—more on this later. 


# Data Cleaning and Storage
CSVs: 
Cut data to 2003–2018
Revised data types

GeoJSON/JSON: 
Merged JSON of the birth data with GeoJSON state boundaries.
FIPS codes were used to merge


# Deployment
https://project-2-dwp.herokuapp.com/
The cleaned data was stored in a SQLite database.
The Flask application used SQLAlchemy to query the SQLite and serve the data.
Data from the Flask app was prepared with Jinja, and the JavaScript used that data for the visualizations. 
We deployed our website with Heroku and connected our GitHub repository.


# Final Visualizations 
Chart.js (new library) 
Leaflet.js
Plotly 

