from flask import Flask, abort, jsonify, request
import flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, column
from flask_marshmallow import Marshmallow

import os, sys

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://affordaustin:ky7dQwWt4B5ZVhPFnbZ6@affordaustin-db.cj68zosziuyy.us-east-2.rds.amazonaws.com:5432/affordaustin"

db = SQLAlchemy(app)
marsh = Marshmallow(app)

db.Model.metadata.reflect(db.engine)

# do we need this :o
# @app.after_request
# def add_cors_headers(response):
#     response.headers["Access-Control-Allow-Origin"] = "*"
#     response.headers["Access-Control-Allow-Credentials"] = "true"
#     return response


class Housing(db.Model):
    __table__ = db.Model.metadata.tables['housing']

class HousingSchema(marsh.Schema):
    class Meta:
        fields = ('_image', '_map', 'project_name', 'tenure', 'unit_type',
         'total_units', 'ground_lease', 'zip_code', 'property_management_company',
          'status', 'property_manager_phone_number', 'address', 'developer',
           'affordability_expiration_year', 'housing.units_30_mfi', 'housing.units_40_mfi',
            'housing.units_50_mfi', 'housing.units_60_mfi', 'housing.units_65_mfi',
             'housing.units_80_mfi', 'housing.units_100_mfi')

class Childcare(db.Model):
    __table__ = db.Model.metadata.tables['childcare']

class ChildcareSchema(marsh.Schema):
    class Meta:
        fields = ('Location_address', 'county', 'days_of_operation', 'hours_of_operation',
         'licensed_to_serv_ages', '_image', 'operation_name', '_map', 'mailing_address',
          'accepts_child_care_subsidies', 'programs_provided', 'phone_number', 'email_address',
           'website_address', 'operation_type', 'administrator_director_name', 'total_capacity',
            'total_inspections', 'total_reports', 'total_self_reports', 'total_assessments',
             'issuance_date', 'type_of_issuance')


class Job(db.Model):
    __table__ = db.Model.metadata.tables['jobs']

class JobSchema(marsh.Schema):
    class Meta:
        fields = ('_map', '_image', 'detected_extensions', 'extensions',
         'title', 'company_name', 'reviews', 'rating', 'description', 
         'apply_link', 'via', 'rating_link')


house_schema = HousingSchema()
houses_schema = HousingSchema(many=True)

childcare_schema = ChildcareSchema()
childcares_schema = ChildcareSchema(many=True)

job_schema = JobSchema()
jobs_schema = JobSchema(many=True)


@app.route("/api/<string:model>")
def get_housing(model):
    args = request.args
    # print(args['page'])
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
