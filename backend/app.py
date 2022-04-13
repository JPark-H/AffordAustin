from flask import Flask, abort, jsonify, request
import flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, column
from flask_marshmallow import Marshmallow
from marshmallow import fields
from flask_cors import CORS
from api_helper import filter_by_model, Housing, Childcare, Job, try_arg, sort_by_model, search_by_model
from tables import *

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@app.teardown_request
def session_clear(exception=None):
    db.session.remove()
    if exception and db.session.is_active:
        db.session.rollback()

@app.route("/api/<string:model>")
def get_housing(model):
    if (model == 'housing'):
        model_class = Housing
        model_schema = houses_schema
    elif (model == 'childcare'):
        model_class = Childcare
        model_schema = childcares_schema
    elif (model == 'jobs'):
        model_class = Job
        model_schema = jobs_schema
    else:
        print("{}er? I barely know 'er!".format(model))
        return {}
    args = request.args.to_dict()
    if 'page[number]' not in args:
        print('page number not specified. Fetching all instances of ')
        model_pages = model_class.query.all()
        results = model_schema.dump(model_pages)
        return jsonify(results)
    else:
        page_num = int(args['page[number]'].replace('{', '').replace('}', ''))
        if 'page[size]' in args:
            page_size = int(args['page[size]'].replace('{', '').replace('}', ''))
        else:
            print('page size not specified. Defaulting to 9')
            page_size = 9

        base_query = db.session.query(model_class)

        #filter
        base_query = filter_by_model(base_query, args, model)

        #sort TODO ensure properly sorted 7 > 65
        base_query = sort_by_model(base_query, args, model)

        #search
        base_query = search_by_model(base_query, args, model)

        page = base_query.paginate(page=page_num, per_page=page_size)
        dump = model_schema.dump(page.items)

        metadata = {
            "page": page.page,
            "num_responses": len(dump),
            "pages": page.pages,
            "total_count": page.total,
            "prev_page": page.prev_num,
            "next_page": page.next_num,
            "has_next": page.has_next,
            "has_prev": page.has_prev,
        }
        
        return jsonify({'attributes': dump, 'metadata': metadata})
   
    

@app.route("/api/housing/<int:id>")
def get_housing_page(id):
    single_house = Housing.query.get(id)
    return house_schema.jsonify(single_house)

@app.route("/api/childcare/<int:id>")
def get_childcare_page(id):
    single_childcare = Childcare.query.get(id)
    return childcare_schema.jsonify(single_childcare) 

@app.route("/api/jobs/<int:id>")
def get_job_page(id):
    single_job = Job.query.get(id)
    return job_schema.jsonify(single_job)

@app.route("/")
def home():
    return "all my homies hate flask-restless"


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000, debug=True)