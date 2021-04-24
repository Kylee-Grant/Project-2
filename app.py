# Based off of model from activity 10.3.10
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import sqlite3

from flask import Flask, render_template, redirect, jsonify, json, request

#################################################
# Database Setup: 
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

# Route to render index.html template using data from Mongo
@app.route("/line_chart")
def line_chart():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all state names"""
    # Query all passengers
    results = session.query(National).all()

    session.close()

    # Convert list of tuples into normal list
    #all = list(np.ravel(results))

    return render_template("line_chart.html", data=results)


@app.route("/api/v1.0/passengers")
def passengers():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_passengers = []
    for name, age, sex in results:
        passenger_dict = {}
        passenger_dict["name"] = name
        passenger_dict["age"] = age
        passenger_dict["sex"] = sex
        all_passengers.append(passenger_dict)

    return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)



if __name__ == "__main__":
    app.run(debug=True)