from database import Database
from sodapy import Socrata
import pandas as pd
import requests
import numpy as np
from numpy.random import default_rng
from images import images
from maps import maps

DATABASE = "affordaustin"
USER = "affordaustin"
PASSWORD = "ky7dQwWt4B5ZVhPFnbZ6"
HOST = "affordaustin-db.cj68zosziuyy.us-east-2.rds.amazonaws.com"
PORT = "5432"


def retrieve_data(endpoint, limit=1000):
    client = Socrata("data.texas.gov", None)
    data = client.get(endpoint, limit=limit)
    print(data)
    data = pd.DataFrame.from_records(data)
    return data


def add_housing(db):
    data = retrieve_data("x5p7-qyuv", limit=3_000)
    table = db.create_table("housing", data.keys())
    table.add_data_bulk(data)


def add_childcare(db):
    DROP_LABEL = ":@computed_region_fd5q_j34z"
    COUNTIES = ["BASTROP", "CALDWELL", "HAYS", "TRAVIS", "WILLIAMSON"]

    data = retrieve_data("bc5r-88dy", limit=16_000)

    data = data.drop(DROP_LABEL, axis=1)
    data = data.loc[data["county"].isin(COUNTIES)]

    table = db.create_table("childcare", data.keys())
    table.add_data_bulk(data)


def add_jobs(db):
    data = pd.read_pickle("l.pkl")
    table = db.create_table("jobs", data.keys())
    table.add_data_bulk(data)


def collect_misc_attributes(job_listings):
    job_listings["salary_link"] = "none"
    job_listings["rating_link"] = "none"
    job_listings["apply_link"] = "none"
    job_listings["apply_title"] = "none"
    job_listings["salary_source"] = "none"
    job_listings["rating_source"] = "none"
    job_listings["salary_from"] = -1
    job_listings["salary_to"] = -1
    job_listings["salary_currency"] = "none"
    job_listings["salary_periodicity"] = "none"
    job_listings["based_on"] = "none"
    job_listings["rating"] = -1
    job_listings["reviews"] = -1

    for i in range(210, 223):
        job_id = job_listings.iloc[i]["job_id"]
        response = requests.get(
            "https://serpapi.com/search.json?engine=google_jobs_listing&q={}&api_key={}".format(
                job_id, api_key
            )
        ).json()
        for k in response.keys():
            if k == "ratings":
                job_listings.at[i, "rating"] = response["ratings"][0]["rating"]
                job_listings.at[i, "reviews"] = response["ratings"][0]["reviews"]
                job_listings.at[i, "rating_link"] = response["ratings"][0]["link"]
                job_listings.at[i, "rating_source"] = response["ratings"][0]["source"]
            elif k == "apply_options":
                job_listings.at[i, "apply_link"] = response["apply_options"][0]["link"]
                job_listings.at[i, "apply_title"] = response["apply_options"][0][
                    "title"
                ]
            elif k == "salary":
                job_listings.at[i, "salary_link"] = response["salaries"][0]["link"]
                job_listings.at[i, "salary_source"] = response["salaries"][0]["source"]
                job_listings.at[i, "salary_from"] = response["salaries"][0][
                    "salary_from"
                ]
                job_listings.at[i, "salary_to"] = response["salaries"][0]["salary_to"]
                job_listings.at[i, "salary_currency"] = response["salaries"][0][
                    "salary_currency"
                ]
                job_listings.at[i, "salary_periodicity"] = response["salaries"][0][
                    "salary_periodicity"
                ]
                job_listings.at[i, "based_on"] = response["salaries"][0]["based_on"]


def collect_job_listings():
    job_title = "bartender"
    job_listings = pd.DataFrame()

    # ADDED:
    # data analyst, accountant, medical receptionist, content strategist, executive assistant
    # HR assistant, job, bartender

    for zip_code in uules_2:
        uule = uules_2[zip_code]
        response = requests.get(
            "https://serpapi.com/search.json?engine=google_jobs&q={}&hl=en&api_key={}{}&lrad=16".format(
                job_title, api_key, uule
            )
        )
        jobs = [
            j
            for j in response.json()["jobs_results"]
            if j["description"] not in pd.unique(job_listings["description"])
        ]
        jobs_results = pd.DataFrame.from_records(jobs)
        # jobs_results = pd.DataFrame.from_records(response.json()['jobs_results'])
        jobs_results["zip_code"] = zip_code
        job_listings = pd.concat([job_listings, jobs_results])

def collect_images_and_maps():
    data = pd.read_pickle('l.pkl')
    j = 169
    data.at[j, '_image'] = 'data:image/png;base64,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'
    data.at[j, '_map'] = maps('First Service Corporation')
    data.to_pickle('l.pkl')
    data.to_csv('l.csv')
    for i in range(2, 203):
        if data.iloc[i]['_image'] == 'none':
            print(i, data.iloc[i]['company_name'])
            data.at[i, '_image'] = images(data.iloc[i]['company_name'])
            data.at[i, '_map'] = maps(data.iloc[i]['company_name'])
            data.to_pickle('l.pkl')
            data.to_csv('l.csv')

uules_1 = {
    # Central Austin
    78703: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcwMw==&cr=countryUS",
    78705: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcwNQ==&cr=countryUS",
    78751: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc1MQ==&cr=countryUS",
    78756: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc1Ng==&cr=countryUS",
    78757: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc1Nw==&cr=countryUS",
    # Downtown
    78701: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcwMQ==&cr=countryUS",
    # South Central
    78704: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcwNA==&cr=countryUS",
    # East Austin
    78702: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcwMg==&cr=countryUS",
    78722: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcyMg==&cr=countryUS",
    # Southeast
    78741: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc0MQ==&cr=countryUS",
    78744: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc0NA==&cr=countryUS",
    78747: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc0Nw==&cr=countryUS",
    # South Austin
    78745: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc0NQ==&cr=countryUS",
    78748: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc0OA==&cr=countryUS",
}

uules_2 = {
    # Southwest Austin
    78735: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODczNQ==&cr=countryUS",
    78736: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODczNg==&cr=countryUS",
    78738: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODczOA==&cr=countryUS",
    78739: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODczOQ==&cr=countryUS",
    # Westlake Hills
    78733: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODczMw==&cr=countryUS",
    78746: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc0Ng==&cr=countryUS",
    # Northwest Austin
    78731: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODczMQ==&cr=countryUS",
    78727: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcyNw==&cr=countryUS",
    78750: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc1MA==&cr=countryUS",
    78759: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc1OQ==&cr=countryUS",
    # Northeast Austin
    78721: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcyMQ==&cr=countryUS",
    78723: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcyMw==&cr=countryUS",
    78724: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcyNA==&cr=countryUS",
}

api_key = "e44d953313148da076ace99377f26f931448ba14c070febfbe39dd5a07a60730"

if __name__ == "__main__":
    db = Database()
    db.connect(DATABASE, USER, PASSWORD, HOST, PORT)
    add_housing(db)
    add_childcare(db)
    add_jobs(db)

    print(db.list_tables())
    print(len(db.enter_table("jobs").get_data_bulk()))
    print(len(db.enter_table("housing").get_data_bulk()))
    print(len(db.enter_table("childcare").get_data_bulk()))

    db.disconnect()
