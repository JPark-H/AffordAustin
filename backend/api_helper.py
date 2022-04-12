from flask import Flask, abort, jsonify, request
import flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, column
from flask_marshmallow import Marshmallow
from marshmallow import fields

app = Flask(__name__)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://affordaustin:ky7dQwWt4B5ZVhPFnbZ6@affordaustin-db.cj68zosziuyy.us-east-2.rds.amazonaws.com:5432/affordaustin"

db = SQLAlchemy(app)
marsh = Marshmallow(app)

db.Model.metadata.reflect(db.engine)

class Housing(db.Model):
    __table__ = db.Model.metadata.tables['housing_new']

class Childcare(db.Model):
    __table__ = db.Model.metadata.tables['childcare']

class Job(db.Model):
    __table__ = db.Model.metadata.tables['jobs']


def try_arg(name, arg):
    try:
        return arg[name]
    except KeyError:
        return None


def filter_housing(query, args):
    zip_code = try_arg('zip_code', args)
    tenure = try_arg('tenure', args)
    unit_type = try_arg('unit_type', args)
    total_units = try_arg('total_units', args)
    ground_lease = try_arg('ground_lease', args)

    if zip_code:
        query = filter_housing_by(query, "zip_code", zip_code)

    if tenure:
        query = filter_housing_by(query, "tenure", tenure)

    if unit_type:
        query = filter_housing_by(query, "unit_type", unit_type)

    if total_units:
        query = filter_housing_by(query, "total_units", total_units)

    if ground_lease:
        query = filter_housing_by(query, "ground_lease", ground_lease)

    return query

def filter_housing_by(query, filter_type, value):
    if filter_type == "zip_code":
        query = query.filter(Housing.zip_code == value)

    elif filter_type == "tenure":
        query = query.filter(Housing.tenure == value)

    elif filter_type == "unit_type":
        query = query.filter(Housing.unit_type == value)

    elif filter_type == "total_units":
        query = query.filter(Housing.total_units == value)

    elif filter_type == "ground_lease":
        query = query.filter(Housing.ground_lease == value)    

    return query

def filter_childcare(query, args):
    #location/address TBD
    county = try_arg('county', args)
    days_of_operation = try_arg('days_of_operation', args)
    hours_of_operation = try_arg('hours_of_operation', args) #TODO how separate? view data for a single field?
    licensed_to_serve_ages = try_arg('licensed_to_serve_ages', args) #TODO not in db

    if county:
        query = filter_childcare_by(query, "county", county)

    if days_of_operation:
        query = filter_childcare_by(query, "days_of_operation", days_of_operation)

    if hours_of_operation:
        query = filter_childcare_by(query, "hours_of_operation", hours_of_operation)

    if licensed_to_serve_ages:
        query = filter_childcare_by(query, "licensed_to_serve_ages", licensed_to_serve_ages)

    return query

def filter_childcare_by(query, filter_type, value):
    if filter_type == "county":
        query = query.filter(Childcare.county == value)

    elif filter_type == "days_of_operation":
        query = query.filter(Childcare.days_of_operation == value)

    elif filter_type == "hours_of_operation":
        query = query.filter(Childcare.hours_of_operation == value)

    elif filter_type == "licensed_to_serve_ages":
        query = query.filter(Childcare.licensed_to_serve_ages == value)

    return query

def filter_jobs(query, args):
    company_name = try_arg('company_name', args)
    detected_extensions = try_arg('detected_extensions', args) #TODO pretty bunk data here
    rating = try_arg('rating', args)
    reviews = try_arg('reviews', args)
    zip_code = try_arg('zip_code', args)

    if company_name:
        query = filter_jobs_by(query, "company_name", company_name)

    if detected_extensions:
        query = filter_jobs_by(query, "detected_extensions", detected_extensions)

    if rating:
        query = filter_jobs_by(query, "rating", rating)

    if reviews:
        query = filter_jobs_by(query, "reviews", reviews)

    if zip_code:
        query = filter_jobs_by(query, "zip_code", zip_code)

    return query

def filter_jobs_by(query, filter_type, value):
    if filter_type == "company_name":
        query = query.filter(Job.company_name == value)

    elif filter_type == "detected_extensions":
        query = query.filter(Job.detected_extensions == value)

    elif filter_type == "rating":
        query = query.filter(Job.rating == value)

    elif filter_type == "reviews":
        query = query.filter(Job.reviews == value)

    elif filter_type == "zip_code":
        query = query.filter(Job.zip_code == value)    

    return query


def filter_by_model(query, args, model):
    if (model == 'housing'):
        return filter_housing(query, args)
    elif (model == 'childcare'):
        return filter_childcare(query, args)
    elif (model == 'jobs'):
        return filter_jobs(query, args)
    else:
        print("{}er? I barely know 'er!".format(model))
        return {}