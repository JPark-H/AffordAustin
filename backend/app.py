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

class Housing(db.Model):
    __table__ = db.Model.metadata.tables['housing']
    
class HousingSchema(marsh.Schema):
    class Meta:
        fields = ('address', 'price', 'zip_code', 'unit_type', 'parcel_id')

        '''
        all fields: ('austin_housing_inventory_id', 'project_id', 'project_name', 'owner',
       'developer', 'address', 'zip_code', 'parcel_id', 'council_district',
       'total_units', 'total_affordable_units', 'total_accessible_units',
       'total_permanent_support', 'unit_type', 'tenure', 'program', 'status',
       'affordability_start_date', 'affordability_start_year',
       'affordability_expiration_date', 'affordability_expiration_year',
       'affordability_period', 'fee_in_lieu_status', 'units_30_mfi',
       'units_40_mfi', 'units_50_mfi', 'units_60_mfi', 'units_65_mfi',
       'units_80_mfi', 'units_100_mfi', 'market_rate_units',
       'rental_housing_development', 'ownership_housing_development',
       'private_activity_bonds', 'affordability_unlocked',
       'partnership_austin_housing_fin', 'community_land_trust',
       'downtown_density_bonus', 'down_payment_assistance',
       'east_riverside_corridor_partn', 'ground_lease',
       'master_development_agreements', 'municipal_utility_district',
       'micro_unit_density_bonus', 'north_burnet_gateway_bonus',
       'planned_unit_development_agree', 'planned_unit_development_bonus',
       'rainey_density_bonus', 'smart_development', 'smart_greenfield',
       'transit_oriented_development', 'university_neighborhood_overla',
       'community_development_block_gr', 'vertical_mixed_use', 'voluntary',
       'general_obligation_bond_2006', 'general_obligation_bond_2013',
       'hud_home_grant', 'housing_trust_fund', 'cip_fund', 'city_amount',
       'low_income_housing_tax_credit', 'longitude', 'latitude', 'location',
       'property_management_company', 'property_manager_phone_number',
       'calculated_fee_in_lieu')
        '''

class Childcare(db.Model):
    __table__ = db.Model.metadata.tables['childcare']
    
class ChildcareSchema(marsh.Schema):
    class Meta:
        fields = ('operation_id', 'operation_type', 'operation_number', 'operation_name')

        '''
        all fields: ('operation_id', 'operation_type', 'operation_number', 'operation_name',
       'programs_provided', 'location_address', 'mailing_address',
       'phone_number', 'county', 'administrator_director_name',
       'type_of_issuance', 'issuance_date', 'conditions_on_permit',
       'accepts_child_care_subsidies', 'hours_of_operation',
       'days_of_operation', 'total_capacity', 'open_foster_homes',
       'open_branch_offices', 'licensed_to_serve_ages', 'corrective_action',
       'adverse_action', 'temporarily_closed', 'deficiency_high',
       'deficiency_medium_high', 'deficiency_medium', 'deficiency_medium_low',
       'deficiency_low', 'total_inspections', 'total_assessments',
       'total_reports', 'total_self_reports', 'location_address_geo',
       'email_address', 'website_address')
        '''

# class Job(db.Model):
#     __table__ = db.Model.metadata.tables['Jobs']
    
# class JobSchema(marsh.Schema):
#     class Meta:
#         fields = ('operation_id', 'operation_type', 'operation_number', 'operation_name')

#         '''
#         all fields: (TBD)
#         '''

house_schema = HousingSchema()
houses_schema = HousingSchema(many=True)

childcare_schema = ChildcareSchema()
childcares_schema = ChildcareSchema(many=True)

# job_schema = JobSchema()
# jobs_schema = JobSchema(many=True)

manager = APIManager(app, session=db.session)

#search bar doesn't allow for upper-case Housing
manager.create_api(Housing, page_size=5)
manager.create_api(Childcare, primary_key="id", collection_name="childcare")
# manager.create_api(Job, primary_key="id", collection_name="jobs")

# @app.route("/api/<string:model>")
# def api_models(model):
#     args = request.args
#     print(" asdf ::" + args)
#     return jsonify(args)

# @app.route("/api/housing/<int:id>")
# def getids(id):
#     args = request.args
#     print(args)
#     return args


@app.route("/")
def home():
    return 'we can fix it!'

# @app.route("/Housing")
# def get_housing():
#     housing_pages = Housing.query.limit(5).all()
#     results = houses_schema.dump(housing_pages)
#     return jsonify(results)

# @app.route("/ChildCare")
# def get_childcare():
#     childcare_pages = Childcare.query.all()
#     results = childcares_schema.dump(childcare_pages)
#     return jsonify(results)

# @app.route("/Jobs")
# def get_jobs():
#     jobs_pages = Job.query.all()
#     results = jobs_schema.dump(jobs_pages)
#     return jsonify(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
