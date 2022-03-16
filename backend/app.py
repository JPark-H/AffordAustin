from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://affordaustin:ky7dQwWt4B5ZVhPFnbZ6@affordaustin-db.cj68zosziuyy.us-east-2.rds.amazonaws.com:5432/postgres"


db = SQLAlchemy(app)
marsh = Marshmallow(app)

class Houses(db.model):
    address = db.Column(db.String)
    price = db.Column(db.Integer)
    zip_code = db.Column(db.Integer)
    unit_type = db.Column(db.String)
    num_units = db.Column(db.Integer)

class HousesSchema(marsh.Schema):
    class Meta:
        fields = ('address', 'price', 'zip_code', 'unit_type', 'num_units')

house_schema = HousesSchema()
houses_schema = HousesSchema(many=True)

@app.route("/")
def home():
    return 'hello from app.py'

@app.route("/Housing")
def get_housing():
    housing_pages = Houses.query.all()
    results = houses_schema.dump(housing_pages)
    return jsonify(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
