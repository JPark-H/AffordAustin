from database import Database
from sodapy import Socrata
import pandas as pd
import requests
import numpy as np
from numpy.random import default_rng


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
    data = pd.read_pickle("new_listings.pkl")
    print(len(data))
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
