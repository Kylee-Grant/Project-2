# Based off of model from activity 10.3.10
import numpy as np

#import sqlite3
#import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, render_template, redirect, jsonify, json, request

#################################################
# Database Setup (examples: https://pythonbasics.org/flask-sqlite/, https://flask.palletsprojects.com/en/1.1.x/patterns/sqlite3/)
# This approach is based off of model from activity 10.3.10.
#################################################
engine = create_engine("sqlite:///static/data/birthdata.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the tables
County = Base.classes.county
National = Base.classes.national

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

# Route to render templates, using data from SQLite when needed 
@app.route("/")
def index():
    # Not created yet 
    return render_template("index.html")

@app.route("/line_chart")
def line_chart():
    session = Session(engine)

    # Query all 
    # Update to group by state
    resultsUS = session.query(National.year, National.us_birth_rate).order_by(National.year.asc()).distinct()
    resultsState = session.query(National.state, National.year, National.state_rate).order_by(National.year.asc()).all()
    # Use of distinct: https://stackoverflow.com/questions/48102501/remove-duplicates-from-sqlalchemy-query-using-set

    USData = []
    for r in resultsUS: 
        USData.append({"rate": r[1], "year": r[0]})
    
    stateData = []
    for r in resultsState:
        stateData.append({"rate": r[2], "state": r[0], "year": r[1]})
    
    session.close()

    # Convert list of tuples into normal list
    #data = list(np.ravel(results))
    return render_template("line_chart.html", USData=USData, stateData=stateData)

@app.route("/geomap")
def geomap():
    
    return render_template("geomap.html")

@app.route("/group_bar")
def group_bar():
    
    return render_template("group_bar.html")

# Comment this out when not in development
if __name__ == '__main__':
   app.run(debug=True)
