from flask import Flask, abort, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, column
from flask_marshmallow import Marshmallow
from flask_restless import APIManager

import os, sys

app = Flask(__name__)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql+psycopg2://affordaustin:ky7dQwWt4B5ZVhPFnbZ6@affordaustin-db.cj68zosziuyy.us-east-2.rds.amazonaws.com:5432/affordaustin'

db = SQLAlchemy(app)
marsh = Marshmallow(app)

db.Model.metadata.reflect(db.engine)

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

class Housing(db.Model):
    __table__ = db.Model.metadata.tables['housing']

class Childcare(db.Model):
    __table__ = db.Model.metadata.tables['childcare']
    
# 
# class ChildcareSchema(marsh.Schema):
#     class Meta:
#         fields = ('operation_id', 'operation_type', 'operation_number', 'operation_name')

#         '''
#         all fields: ('operation_id', 'operation_type', 'operation_number', 'operation_name',
#        'programs_provided', 'location_address', 'mailing_address',
#        'phone_number', 'county', 'administrator_director_name',
#        'type_of_issuance', 'issuance_date', 'conditions_on_permit',
#        'accepts_child_care_subsidies', 'hours_of_operation',
#        'days_of_operation', 'total_capacity', 'open_foster_homes',
#        'open_branch_offices', 'licensed_to_serve_ages', 'corrective_action',
#        'adverse_action', 'temporarily_closed', 'deficiency_high',
#        'deficiency_medium_high', 'deficiency_medium', 'deficiency_medium_low',
#        'deficiency_low', 'total_inspections', 'total_assessments',
#        'total_reports', 'total_self_reports', 'location_address_geo',
#        'email_address', 'website_address')
#         '''

class Job(db.Model):
    __table__ = db.Model.metadata.tables['jobs']
    
manager = APIManager(app, session=db.session)

#search bar doesn't allow for upper-case Housing
manager.create_api(Housing, primary_key='id', collection_name='housing', page_size=21)
manager.create_api(Childcare, primary_key="id", collection_name="childcare", page_size=21)
manager.create_api(Job, primary_key="id", collection_name="jobs", page_size=21)

@app.route("/")
def home():
    return 'Sally sells sea shells by the sea shore'

if __name__ == "__main__":
    app.debug= True
    app.run(host="0.0.0.0", port=5000, debug=True)
