from flask import Flask, abort, jsonify, request
import flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, column, or_
from flask_marshmallow import Marshmallow
from marshmallow import fields
from tables import *

def try_arg(name, arg):
    try:
        return arg[name]
    except KeyError:
        return None
#https://gitlab.com/shamirakabir/liveatx/-/tree/main used as a reference for 
# filtering/searching/sorting :)
## -------------filtering----------------------------------##
def filter_housing(query, args):
    zip_code = try_arg('zip_code', args)
    tenure = try_arg('tenure', args)
    unit_type = try_arg('unit_type', args)
    total_affordable_units = try_arg('total_affordable_units', args)
    ground_lease = try_arg('ground_lease', args)

    if zip_code:
        query = filter_housing_by(query, "zip_code", zip_code)

    if tenure:
        query = filter_housing_by(query, "tenure", tenure)

    if unit_type:
        query = filter_housing_by(query, "unit_type", unit_type)

    if total_affordable_units:
        query = filter_housing_by(query, "total_affordable_units", total_affordable_units)

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

    elif filter_type == "total_affordable_units":
        value = value.split("-")

        if (len(value) > 1):
            query = query.filter(Housing.total_affordable_units >= value[0])
            query = query.filter(Housing.total_affordable_units < value[1])
        else:
            query = query.filter(Housing.total_affordable_units >= value[0])

    elif filter_type == "ground_lease":
        query = query.filter(Housing.ground_lease == value)    

    return query

def filter_childcare(query, args):
    #location/address TBD
    county = try_arg('county', args)
    start_hours_val = try_arg('start_hours_val', args) 
    end_hours_val = try_arg('end_hours_val', args) 

    licensed_to_serve_ages = try_arg('licensed_to_serve_ages', args) #TODO not in db

    if county:
        query = filter_childcare_by(query, "county", county)

    if start_hours_val:
        query = filter_childcare_by(query, "start_hours_val", start_hours_val)

    if end_hours_val:
        query = filter_childcare_by(query, "end_hours_val", end_hours_val)

    if licensed_to_serve_ages:
        query = filter_childcare_by(query, "licensed_to_serve_ages", licensed_to_serve_ages)

    return query

def filter_childcare_by(query, filter_type, value):
    if filter_type == "county":
        query = query.filter(Childcare.county == value)

    elif filter_type == "start_hours_val":
        query = query.filter(Childcare.start_hours_val == value)

    elif filter_type == "end_hours_val":
        query = query.filter(Childcare.end_hours_val == value)

    elif filter_type == "licensed_to_serve_ages": 
        query = query.filter(Childcare.licensed_to_serve_ages.overlap([value.capitalize()]))

    return query

def filter_jobs(query, args):
    company_name = try_arg('company_name', args)
    schedule_type = try_arg('schedule_type', args) #TODO pretty bunk data here
    rating = try_arg('rating', args)
    reviews = try_arg('reviews', args)
    zip_code = try_arg('zip_code', args)

    if company_name:
        query = filter_jobs_by(query, "company_name", company_name)

    if schedule_type:
        query = filter_jobs_by(query, "schedule_type", schedule_type)

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

    elif filter_type == "schedule_type":
        query = query.filter(Job.detected_extensions.ilike("%{}%".format(value)))

    elif filter_type == "rating":
        query = query.filter(Job.rating != -1)
        value = value.split("-")

        if (len(value) > 1):
            query = query.filter(Job.rating >= value[0])
            query = query.filter(Job.rating < value[1])
        else:
            query = query.filter(Job.rating >= value[0])

    elif filter_type == "reviews":
        value = value.split("-")

        if (len(value) > 1):
            query = query.filter(Job.reviews >= value[0])
            query = query.filter(Job.reviews < value[1])
        else:
            query = query.filter(Job.reviews >= value[0])

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

## -------------sorting----------------------------------##
def sort_housing(query, sort_param):
    if len(sort_param) > 1:
        return sort_housing_by(query, sort_param[1], True)
    else:
        return sort_housing_by(query, sort_param[0], False)

def sort_housing_by(query, sort_param, descending):
    col = None

    if sort_param == 'total_affordable_units':
        col = Housing.total_affordable_units
    
    elif sort_param == 'unit_type':
        col = Housing.unit_type

    elif sort_param == 'zip_code':
        col = Housing.zip_code

    else:
        print("no matching sortable value found")
        return query 

    if descending:
        return query.order_by(col.desc())
    else:
        return query.order_by(col)



def sort_childcare(query, sort_param):
    if len(sort_param) > 1:
        return sort_childcare_by(query, sort_param[1], True)
    else:
        return sort_childcare_by(query, sort_param[0], False)

def sort_childcare_by(query, sort_param, descending):
    col = None

    if sort_param == 'hours_of_operation':
        col = Childcare.hours_of_operation
    
    # elif sort_param == 'hours_of_operation': #TODO, start vs end time
    #     col = Childcare.hours_of_operation

    elif sort_param == 'licensed_to_serve_ages':
        col = Childcare.licensed_to_serve_ages

    else:
        print("no matching sortable value found")
        return query 

    if descending:
        return query.order_by(col.desc())
    else:
        return query.order_by(col)



def sort_jobs(query, sort_param):
    if len(sort_param) > 1:
        return sort_jobs_by(query, sort_param[1], True)
    else:
        return sort_jobs_by(query, sort_param[0], False)

def sort_jobs_by(query, sort_param, descending):
    col = None

    if sort_param == 'rating':
        col = Job.rating
    
    elif sort_param == 'reviews':
        col = Job.reviews

    elif sort_param == 'zip_code':
        col = Job.zip_code

    else:
        print("no matching sortable value found")
        return query 

    if descending:
        return query.order_by(col.desc())
    else:
        return query.order_by(col)

def sort_by_model(query, args, model):
    sort_param = try_arg('sort', args)

    if not sort_param:
        return query

    sort_param = sort_param.split("-")


    if (model == 'housing'):
        return sort_housing(query, sort_param)
    elif (model == 'childcare'):
        return sort_childcare(query, sort_param)
    elif (model == 'jobs'):
        return sort_jobs(query, sort_param)
    else:
        print("{}er? I barely know 'er!".format(model))
        return {}


## -------------searching----------------------------------##

def search_housing(query, search):
    search_terms = search.strip().split()
    searches = []

    for term in search_terms:
        formatting = "%{}%".format(term.lower())

        searches.append(Housing.project_name.ilike(formatting))
        searches.append(Housing.property_management_company.ilike(formatting))
        searches.append(Housing.status.ilike(formatting))
        searches.append(Housing.developer.ilike(formatting))
        searches.append(Housing.unit_type.ilike(formatting))
        searches.append(Housing.address.ilike(formatting))
        searches.append(Housing.tenure.ilike(formatting)) 

    query = query.filter(or_(*tuple(searches)))
    return query

def search_childcare(query, search):
    search_terms = search.strip().split()
    searches = []

    for term in search_terms:
        formatting = "%{}%".format(term.lower())

        searches.append(Childcare.operation_name.ilike(formatting))
        searches.append(Childcare.administrator_director_name.ilike(formatting))
        searches.append(Childcare.operation_type.ilike(formatting)) 
        searches.append(Childcare.type_of_issuance.ilike(formatting)) 
        searches.append(Childcare.location_address.ilike(formatting))


    query = query.filter(or_(*tuple(searches)))
    return query

def search_jobs(query, search):
    search_terms = search.strip().split()
    searches = []

    for term in search_terms:
        formatting = "%{}%".format(term.lower())

        searches.append(Job.title.ilike(formatting))
        searches.append(Job.company_name.ilike(formatting))
        searches.append(Job.extensions.ilike(formatting)) 
        searches.append(Job.description.ilike(formatting)) 

    query = query.filter(or_(*tuple(searches)))
    return query


def search_by_model(query, args, model):
    search = try_arg('search', args)
    if not search:
        return query
    
    if (model == 'housing'):
        return search_housing(query, search)
    elif (model == 'childcare'):
        return search_childcare(query, search)
    elif (model == 'jobs'):
        return search_jobs(query, search)
    else:
        print("{}er? I barely know 'er!".format(model))
        return {}


