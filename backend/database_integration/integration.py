from database import Database
from sodapy import Socrata
import pandas as pd
import requests
import numpy as np
from numpy.random import default_rng
from maps import maps
from images import images


DATABASE = 'affordaustin'
USER = 'affordaustin'
PASSWORD = 'ky7dQwWt4B5ZVhPFnbZ6'
HOST = 'affordaustin-db.cj68zosziuyy.us-east-2.rds.amazonaws.com'
PORT = '5432'

def retrieve_data(endpoint, limit=1000):
    client = Socrata('data.texas.gov', None)
    data = client.get(endpoint, limit=limit)
    data = pd.DataFrame.from_records(data)
    return data

def add_housing(db, limit=3_000):
    data = retrieve_data('x5p7-qyuv', limit=limit)

    data = data.loc[data['address'] != 'Undisclosed']

    data['_map'] = data['address'].apply(lambda x: maps(x, include_location=False))
    data['_image'] = data['address'].apply(lambda x: images(x, include_location=False))

    table = db.create_table('housing', data.keys())
    table.add_data_bulk(data)

def add_childcare(db, limit=16_000):
    DROP_LABEL = ':@computed_region_fd5q_j34z'
    COUNTIES = ['BASTROP', 'CALDWELL', 'HAYS', 'TRAVIS', 'WILLIAMSON']

    data = retrieve_data('bc5r-88dy', limit=limit)

    data = data.drop(DROP_LABEL, axis=1)
    data = data.loc[data['county'].isin(COUNTIES)]

    data['_map'] = data['location_address'].apply(lambda x: maps(x, include_location=False))
    data['_image'] = data['location_address'].apply(lambda x: images(x, include_location=False))

    table = db.create_table('childcare', data.keys())
    table.add_data_bulk(data)

def add_jobs(db):
    data = pd.read_pickle("l.pkl")
    table = db.create_table("jobs", data.keys())
    table.add_data_bulk(data)

def collect_misc_attributes(job_listings):
    job_listings['salary_link'] = "none"
    job_listings['rating_link'] = "none"
    job_listings['apply_link'] = "none"
    job_listings['apply_title'] = "none"
    job_listings['salary_source'] = "none"
    job_listings['rating_source'] = "none"
    job_listings['salary_from'] = -1
    job_listings['salary_to'] = -1
    job_listings['salary_currency'] = "none"
    job_listings['salary_periodicity'] = "none"
    job_listings['based_on'] = "none"
    job_listings['rating'] = -1
    job_listings['reviews'] = -1

    for i in range(210, 223):
            job_id = job_listings.iloc[i]['job_id']
            response = requests.get("https://serpapi.com/search.json?engine=google_jobs_listing&q={}&api_key={}".format(job_id, api_key)).json()
            for k in response.keys():
                if k == 'ratings':
                    job_listings.at[i, 'rating'] = response['ratings'][0]['rating']
                    job_listings.at[i, 'reviews'] = response['ratings'][0]['reviews']
                    job_listings.at[i, 'rating_link'] = response['ratings'][0]['link']
                    job_listings.at[i, 'rating_source'] = response['ratings'][0]['source']
                elif k == 'apply_options':
                    job_listings.at[i, 'apply_link'] = response['apply_options'][0]['link']
                    job_listings.at[i, 'apply_title'] = response['apply_options'][0]['title']
                elif k == 'salary':
                    job_listings.at[i, 'salary_link'] = response['salaries'][0]['link']
                    job_listings.at[i, 'salary_source'] = response['salaries'][0]['source']
                    job_listings.at[i, 'salary_from'] = response['salaries'][0]['salary_from']
                    job_listings.at[i, 'salary_to'] = response['salaries'][0]['salary_to']
                    job_listings.at[i, 'salary_currency'] = response['salaries'][0]['salary_currency']
                    job_listings.at[i, 'salary_periodicity'] = response['salaries'][0]['salary_periodicity']
                    job_listings.at[i, 'based_on'] = response['salaries'][0]['based_on']

def collect_job_listings():
    job_title = "bartender"
    job_listings = pd.DataFrame()

    # ADDED: 
    # data analyst, accountant, medical receptionist, content strategist, executive assistant
    # HR assistant, job, bartender

    for zip_code in uules_2:
        uule = uules_2[zip_code]
        response = requests.get("https://serpapi.com/search.json?engine=google_jobs&q={}&hl=en&api_key={}{}&lrad=16".format(job_title, api_key, uule))
        jobs = [j for j in response.json()['jobs_results'] if j['description'] not in pd.unique(job_listings['description'])]
        jobs_results = pd.DataFrame.from_records(jobs)
        # jobs_results = pd.DataFrame.from_records(response.json()['jobs_results'])
        jobs_results['zip_code'] = zip_code
        job_listings = pd.concat([job_listings, jobs_results])

def collect_images_and_maps():
    data = pd.read_pickle('l.pkl')
    j = 169
    data.at[j, '_image'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWwAAACKCAMAAAC5K4CgAAAAw1BMVEX///8DmdK8vcBYWFoAd6RUVFZOTlBSUlQAl9G5ur1cXF4AlNBOst3y8vJ6envj5OVISEpxcXKampsAcqGqqquUlJXX19f39/dEREdhYWOFhYa1tbbGxsbr6+t1rcehoaJppcHc3NzMzM1koL5tbW+MjI2BgYM8qdnp9vvZ7venp6c9PUB2dni33vBuvOEeoNXk8/qd0erG5fOJyOZkuN/X4+idsbw3h6t6pLkYgKqgtL6IqrtMkLCzu8ESiriPyudbnr/93hFkAAAL20lEQVR4nO2ce2OiPBbGEUqidBB0UMTLujLgdKxz7ezc9p3tfv9PtckJl4CoIEG375znn2qqIfw4PDk5pNU0FAp1TM701iP4g+QMlvatx/DHyBnog82tB/GniMHWMbivJA5bx+C+jgRsDO6rKIGNwX0NZbBZcPu3HszfXTlsDO7OJcNG5+5YBdhMGNwdqgwbnbtDlWGjc3eoQ9gY3J2pAjbD7dx6WH9PVcLWByEGdweqhq0PdAxu9ToCG527Cx2Fjc6tXidgo3Or1inY6NyKdRI2BrdanYGtD9C51ekcbAxuhToPG51bmWrAxuBWpVqwMbjVqB5sDG4lqgsbg1uBasPG4G6vBrAxuNuqCWwM7pZqBpvpX7ce8QtWM9jLb9//Uatbm6v9XWCvHGfVuhepP5DCDpupEezfb16/LsL2YqahrHk8Zu0Bk7FoN7SVtw0MQo1RvGzXUa65FQTWXlVvjdUE9o+713cl2CY1y6IBazdMwyDNYPvTwl+c2DElrBMmk5Kg5XVLNaSsO0NNX5dopdfE/e+fr+/uyrAt41ARa+c/6bj+KKbryJ1NpAZ9RuU+SaDETYb88lkqerpU0zq0f33nqDuDHbMolj/vuWlQEwHdNFWknbeHXSO4f/91l6gKNnFlzfjJuDPXfZxUH65KMS1cnJAAYDL3lvo4AvBmpOBMR2xYs0BBR210Jri5WR+HTRb2Shaf7bMXNVWCPeIRSOaJdYQWvB20P0+74bC6kX0iuIVZn4Cttz8+wM7uhA2PZRpnv3VMVaH9f6LNEdrfvkuo28HO824nXIaFGW/C04R5+s7jLkKlDZ4L3uBK39iEy42SxazvOIf9rMKBrqb7Y7KXFbh//VVAXRv2YOetJ5DKLTxvx17YC5Y0R3AHr8aWSwhxg7Ggt5yMxxG35WDONGSfWfNJMZDO1mH5cWCm9J2JwTpwyTDMfr/zPI937Q2jKBRvd/n3fXjPOl7uxGgSbcYBn2WiXeHCh0MYnjvv9I+fnbKX/H5zV2JdF/aeUOqCyUaEurE2tVi6YVoc9oKmSR2lO/6JtZu28DR9tklgW7K3yiu/NUk/7m6TNpYo0kdb25nENImn2Y+U0lk+LP5rwtPrCTuUu077jNNMh4iBiNaha6bdx11Gtx8WaP/4WUZdGzbPsUQ7n+uijVifcH6xSDQoNJChlqDNM+owcY1jE+KQ5B+mgUgIddZGphP4DWUwt6x3M18p8tHwZm0szcOrQDouSS2s2Bp1OplKwf2tAjWD/c/C5+vBNkQ6ziN7DXZMtuMh8CcTiGwzDXUWkAy2A8keXVSdKlwsk93n8H1T5HEctpFg4jCXcJTUHGzenctNaCzNwwEcNE3kiWj1IxMaDQOa6VAB0xNKgvvX9yrUl8IGkEEQ2Ss4hTG/PVcj/pqstHA9iQPw7AlTzBHtRdy71j7eLUJ5CltCohKFK3s6h/iHOE1vDmYIhslb4EKma3y4UeCqcNimyHLgqpuWF4Y7kVmCQ4/hKnF7t+EDrqI6wTHxJc7v8rx4CrYxmseTTMLnDmCba8f3fVitZDlcQE3TFVeqmI0kixqwGwpTYRbkPPLSpHAHOPjxdklQRwNH5NFAdZR8Z58VasbZYWxgHUC3dtYptJKk7gXXqPNCyvTHwbx4Ejab2GimRxj/AewkkxiQLLT4tL/dDkXoxEXY2s6VfZxFrCUuypS3Z3nKMKUoYEuZOXyOCkNfGeIO0hLYW/4Ksks3KQFM+ZvIF3zzdJ9fA5JlPN3o/cfez2Osq2HLcqtgp8EiTqtivVyGrS1cWuyXQBLB/YKm6YS4T/g8KGDL/UKwihyDG7ogLGAP02FlU6hvzWYzYifDzjI+jzYr8DTXu7f3vd7H/1wMe1YZ2ennVzCrjfRpqYh3AJsl0xafvEwzu4o8O4lMeY4QE6mdwCZy2dvL/QrGIn6XwRbRfmDIvD+STcu67Hkd6NOH+34P1AC2ZCIsm6iAbeb395aCKzAfjuZe/kTzELbG15mL8TYKzLSubWs+vIr2I9B+BM1OAlteYWowE0OQAtckaQfYPJ7hDiPlVcsKLp6VCd614nlCD8/9+16q6uCugE0XjixoL8KmXn4+JAtVk7pBGoyVsIV8Z7mlSSD6SeU1kZgVNwnsWeFrPNUGD5B9OIMdltf/oE1xphB36iUga+jzxzSsjwd3VepX8dSqCFtODjeBa+an4iaX4QRsLoDJfNefHdKgTiVsSLUtrejDGWw9S2RkVcA2zRrgmuvL2/teSRXBfRnswieWsTVzuR0b+a18BrYWiTvaF2vEQvmcx2cFbBuu5ZTdSkY+dRZtxC0/j9iUbISri+r3p1fFqD4W3Apgc62mS28O4SoIF2AvHjnEQthNqIjTAGzLt2VplbC1WEwWfKbM8pcM9qbSs+HGIXVwtdHDUyXqiuBWBBsEximS5gJsmKeKCe42eZ4Vl0wp0boCtrBluDwkrRdmsG2YbLIccjOdTjfp6XT8cIGZdTXqw+BuCXscx/O8wsYTOQtmqUm22ki/bcplCd8Sng2zXW43Pp+QORtYopSnMuHzVHKRHLZ4Gpm22yw5clmyA8PIB7tKu1coZtZHwroiuFvCHhGWg2RWydfR4oSLFWxR9csvCkCCtFjk6Wmgzkmy3terYEOfhSKJBFuXC4siKffFwhNecNl8n8ZMaVH7iFkfC+6WsHk5I6tZLPOlHeCl45XYR+VDRY5skxMN95D68dATfmM5+Zcgr6+E7aS5xSyLznwFqYlMBgYG3xbZIb/8dOtn52CoTEYePpxHXQjulrBF1S9YOs5U35LcmjdZmvHIw3Aqit6uu48nI1ek5iI+VwLfZOqEczdjVAk7q4HlhW0JNpQPDRJ5u4CkGWQyDpPswnAQUMNoutHopD73Tpi1rH4G+02hg8YTpC7O0XVFPTotGItYhl/BtwYkTXPTWrebrEsEJErEJTAtiMJq2Ekn0oQ6lqaG9CmGqMGktVRR6qOEiJ/qtqq9/1grrAvB3Ra2tpDXNCT1Ry1MmxM0IZUeyPCzz0JMz9eg2UYpyDwOcjY7WWLmSeRYTnrifAljutkaVx6fO1Q1Pb6rYdaHwV2CzffnPFbAZvc+AUPQIv5KTtY2W5fXl0wWnPIWvjDgzZTOkjbbsxL/YFOquZafrO/h0Q7fLeUlHMNHwtKJg1HE8OQ2L8xokxkhs+y9biUduZE0DW5GaauhYKcKqKZZHwR3CTZsxql4LMoTV1HZg1fFAFnp4+12O1mU/hnVdDHZTnbSdvuNNwxYgA935Yxgs94HZhTn/6TD5wc5zBvsBZd0GId/TFo3hpPICkbr0jf5cYPhWFkl+7k5aq4D2Kizen9qEXM6uBF2M1VUnBrQ/u+th/+S9PD1MgcB9e9fvbv1CbwgHa041UL98cutx/+CVHsRU6X73vOtx/+CdK7idCasPzzc+gRejt61MesemnUTfei3Muv3tx7/C9Ln+1Zm/fnW439B+tKk4nQQ1n006/pqWnEqokazbqCHlmaNmXV9PbfKrPto1vX1vtfKrJ9uPf4XpJZm/RXNurY+XfB4QEL9Fs26vp76mFlfSe3M+h7Nur5aVpy+frr1CbwcfWr3eADNur4enlosYnpYcWqi8l8PNAzrJ/y/fbXVruJ0/xUrTrXFFjEXk2YOgmZdX8f/eqBWVKNZN1CrZ7n9/jOadW012pB6GNZo1vX1rs0eJ2bWWHGqrUs2pEpRjWZdX367xwO48aaBWpo1PsttoK9o1tfTq4vDGs26sS6GjY8HmutC2GjWl+gy2Ljx5iJdABs33lyq5rDRrC9WU9j9/hOa9aVqCBs33rRRE9ho1i1VH3YfzbqtasNmZo2PB1qqJmzceKNCtWDjxhs1qgP7vocVJyU6Dxt3SSrTOdho1gp1GjaatVKdhI1mrVYnYKNZq9ZR2LjxRr2OwUaz7kDVsPFZbieqgt2/x12SnegQNpp1ZyrDxn+i0KGKsHHjTacqwMZdkt1Kgo0bb7pWDht3SXauBDaa9TUkYOOz3KuIw0azvpIYbMysr6VXuPHmenqFZn09YcUJhUJdrv8B/2n7iGilpVYAAAAASUVORK5CYII='
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
from database import Database
from sodapy import Socrata
import pandas as pd
import requests
import numpy as np
from numpy.random import default_rng
from images import images
from maps import maps

DATABASE = 'affordaustin'
USER = 'affordaustin'
PASSWORD = 'ky7dQwWt4B5ZVhPFnbZ6'
HOST = 'affordaustin-db.cj68zosziuyy.us-east-2.rds.amazonaws.com'
PORT = '5432'

def retrieve_data(endpoint, limit=1000):
    client = Socrata('data.texas.gov', None)
    data = client.get(endpoint, limit=limit)
    print(data)
    data = pd.DataFrame.from_records(data)
    return data

def add_housing(db):
    data = retrieve_data('x5p7-qyuv', limit=3_000)
    table = db.create_table('housing', data.keys())
    table.add_data_bulk(data)

def add_childcare(db):
    DROP_LABEL = ':@computed_region_fd5q_j34z'
    COUNTIES = ['BASTROP', 'CALDWELL', 'HAYS', 'TRAVIS', 'WILLIAMSON']

    data = retrieve_data('bc5r-88dy', limit=16_000)

    data = data.drop(DROP_LABEL, axis=1)
    data = data.loc[data['county'].isin(COUNTIES)]

    table = db.create_table('childcare', data.keys())
    table.add_data_bulk(data)

def add_jobs(db):
    data = pd.read_pickle("l.pkl")
    table = db.create_table("jobs", data.keys())
    table.add_data_bulk(data)

def collect_misc_attributes(job_listings):
    job_listings['salary_link'] = "none"
    job_listings['rating_link'] = "none"
    job_listings['apply_link'] = "none"
    job_listings['apply_title'] = "none"
    job_listings['salary_source'] = "none"
    job_listings['rating_source'] = "none"
    job_listings['salary_from'] = -1
    job_listings['salary_to'] = -1
    job_listings['salary_currency'] = "none"
    job_listings['salary_periodicity'] = "none"
    job_listings['based_on'] = "none"
    job_listings['rating'] = -1
    job_listings['reviews'] = -1

    for i in range(210, 223):
            job_id = job_listings.iloc[i]['job_id']
            response = requests.get("https://serpapi.com/search.json?engine=google_jobs_listing&q={}&api_key={}".format(job_id, api_key)).json()
            for k in response.keys():
                if k == 'ratings':
                    job_listings.at[i, 'rating'] = response['ratings'][0]['rating']
                    job_listings.at[i, 'reviews'] = response['ratings'][0]['reviews']
                    job_listings.at[i, 'rating_link'] = response['ratings'][0]['link']
                    job_listings.at[i, 'rating_source'] = response['ratings'][0]['source']
                elif k == 'apply_options':
                    job_listings.at[i, 'apply_link'] = response['apply_options'][0]['link']
                    job_listings.at[i, 'apply_title'] = response['apply_options'][0]['title']
                elif k == 'salary':
                    job_listings.at[i, 'salary_link'] = response['salaries'][0]['link']
                    job_listings.at[i, 'salary_source'] = response['salaries'][0]['source']
                    job_listings.at[i, 'salary_from'] = response['salaries'][0]['salary_from']
                    job_listings.at[i, 'salary_to'] = response['salaries'][0]['salary_to']
                    job_listings.at[i, 'salary_currency'] = response['salaries'][0]['salary_currency']
                    job_listings.at[i, 'salary_periodicity'] = response['salaries'][0]['salary_periodicity']
                    job_listings.at[i, 'based_on'] = response['salaries'][0]['based_on']

def collect_job_listings():
    job_title = "bartender"
    job_listings = pd.DataFrame()

    # ADDED: 
    # data analyst, accountant, medical receptionist, content strategist, executive assistant
    # HR assistant, job, bartender

    for zip_code in uules_2:
        uule = uules_2[zip_code]
        response = requests.get("https://serpapi.com/search.json?engine=google_jobs&q={}&hl=en&api_key={}{}&lrad=16".format(job_title, api_key, uule))
        jobs = [j for j in response.json()['jobs_results'] if j['description'] not in pd.unique(job_listings['description'])]
        jobs_results = pd.DataFrame.from_records(jobs)
        # jobs_results = pd.DataFrame.from_records(response.json()['jobs_results'])
        jobs_results['zip_code'] = zip_code
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
    78724: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcyNA==&cr=countryUS"
}

api_key = "e44d953313148da076ace99377f26f931448ba14c070febfbe39dd5a07a60730"

#-----
def append_housing(db, limit=3_000):
    data = retrieve_data('x5p7-qyuv', limit=limit)

    data = data.loc[data['address'] != 'Undisclosed']

    data = data.iloc[140:160]

    data['_map'] = data['address'].apply(lambda x: maps(x, include_location=False))
    data['_image'] = data['address'].apply(lambda x: images(x, include_location=False))

    table = db.enter_table('housing')
    table.add_data_bulk(data)

def append_childcare(db, limit=16_000):
    DROP_LABEL = ':@computed_region_fd5q_j34z'
    COUNTIES = ['BASTROP', 'CALDWELL', 'HAYS', 'TRAVIS', 'WILLIAMSON']

    data = retrieve_data('bc5r-88dy', limit=limit)

    data = data.drop(DROP_LABEL, axis=1)
    data = data.loc[data['county'].isin(COUNTIES)]

    data = data.iloc[120:160]

    data['_map'] = data['location_address'].apply(lambda x: maps(x, include_location=False))
    data['_image'] = data['location_address'].apply(lambda x: images(x, include_location=False))

    table = db.enter_table('childcare')
    table.add_data_bulk(data)
#-----


if __name__ == '__main__':
    db = Database()
    db.connect(DATABASE, USER, PASSWORD, HOST, PORT)
    # add_housing(db)
    # add_childcare(db)
    # add_jobs(db)

    housing = db.enter_table('housing')
    housing.change_attribute(13, '_image', 'https://photos.zillowstatic.com/fp/ed75ce2daed1a7789b51f686075cd499-cc_ft_1536.jpg')
    housing.change_attribute(8, '_image', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=H5aXgjzDcLmjLL-szWXxcA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=116.80512&pitch=0&thumbfov=100')
    housing.change_attribute(88, '_image', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=CuTie_GchUIknaTabNS46g&cb_client=search.gws-prod.gps&w=408&h=240&yaw=137.47609&pitch=0&thumbfov=100')
    housing.change_attribute(143, '_image', 'https://lh5.googleusercontent.com/p/AF1QipMzT-28dTr7_iJVsWjetf7j4TjgIb-NmyEmH28w=w408-h305-k-no')

    childcare = db.enter_table('childcare')
    childcare.change_attribute(5, '_image', 'https://www.google.com/maps/place/301+Fawnfield+Dr,+Cedar+Park,+TX+78613/@30.5288543,-97.8371281,3a,75y,344.48h,90t/data=!3m6!1e1!3m4!1sCu1mooiLHK8BCLIPlWt-kA!2e0!7i13312!8i6656!4m5!3m4!1s0x865b2c51995b48cd:0xdb84eab142215bf7!8m2!3d30.529075!4d-97.8371991#')
    childcare.change_attribute(7, '_image', 'https://www.google.com/maps/place/3500+Susquehanna+Ln,+Austin,+TX+78723/@30.3138242,-97.665752,3a,75y,64.54h,90t/data=!3m6!1e1!3m4!1swrvVuVuiYGUa9D36dEftWA!2e0!7i13312!8i6656!4m5!3m4!1s0x8644c9d00794d25b:0xbe0f3f6d6a3cc2!8m2!3d30.3139846!4d-97.6653658#')
    childcare.change_attribute(11, '_image', 'https://www.google.com/maps/uv?pb=!1s0x8644db43ad618089:0x8e74169e29338b5!3m1!7e115!4shttps://lh5.googleusercontent.com/p/AF1QipOK1846SkoIJSR1OaGSL8kak_-Vk7NrvV6jM3CM%3Dw266-h200-k-no!5sRay+Elementary+School+-+Google+Search!15zQ2dJZ0FRPT0&imagekey=!1e10!2sAF1QipOK1846SkoIJSR1OaGSL8kak_-Vk7NrvV6jM3CM&hl=en&sa=X&ved=2ahUKEwiPkdXq0uz2AhWekmoFHbxEBrQQoip6BAgqEAM')
    childcare.change_attribute(26, '_image', 'https://www.google.com/maps/place/4802+MORELAND+DR++GEORGETOWN+TX-+78633+5245/@30.6890541,-97.7267703,3a,75y,240.79h,90t/data=!3m4!1e1!3m2!1sglP8T9kZrVrs6YHxZ0eZEw!2e0!4m2!3m1!1s0x86452a69d8990b2d:0x67a6b941a5bca4fc?sa=X&ved=2ahUKEwif7_yY0-z2AhUGmWoFHUbmCZ0QxB16BAgQEAI#')
    childcare.change_attribute(30, '_image', 'https://www.google.com/maps/uv?pb=!1s0x8644cbb5c4b220f5%3A0xf39adf624323d5d5!3m1!7e115!4s%2Fmaps%2Fplace%2FTwin%2BOaks%2BMontessori%2F%4030.3507298%2C-97.7215628%2C3a%2C75y%2C314.91h%2C90t%2Fdata%3D*213m4*211e1*213m2*211sYa1wgr9BNcwvbg6jUcVP9g*212e0*214m2*213m1*211s0x8644cbb5c4b220f5%3A0xf39adf624323d5d5%3Fsa%3DX!5sTwin%20Oaks%20Montessori%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e2!2sYa1wgr9BNcwvbg6jUcVP9g&hl=en&sa=X&ved=2ahUKEwiF9v2k0-z2AhVWmmoFHZg0DSMQpx96BAgdEAg#')
    childcare.change_attribute(62, '_image', 'https://www.google.com/maps/place/201+W+BAGDAD+AVE+ROUND+ROCK+TX-+78664+5803/@30.5072722,-97.6797102,3a,75y,148.06h,90t/data=!3m4!1e1!3m2!1s0D05BegGU8PMPeLMHsYLBg!2e0!4m2!3m1!1s0x8644d1eb1935d0af:0x66627b9a43e87938?sa=X&ved=2ahUKEwixkrax0-z2AhXqmmoFHYowCsEQxB16BAgMEAI#')
    childcare.change_attribute(82, '_image', 'https://www.google.com/maps/place/9415+W+HIGHWAY+29+LIBERTY+HILL+TX-+78642+6914/@30.6442272,-97.8451073,3a,75y,188.4h,90t/data=!3m4!1e1!3m2!1s9OVRobE2czV4uCQEK5peyA!2e0!4m2!3m1!1s0x865b2be23f85b07b:0xb0e86756732104ef?sa=X&ved=2ahUKEwitp4G_0-z2AhW3kWoFHfpxAgkQxB16BAgPEAI#')
    childcare.change_attribute(87, '_image', 'https://www.google.com/maps/place/1720+S+BAGDAD+RD+LEANDER+TX-+78641+3341/@30.553251,-97.8573673,3a,75y,48.65h,90t/data=!3m4!1e1!3m2!1sgrmb7cGU6ZFfEbqGb5UJ3Q!2e0!4m2!3m1!1s0x865b2c119630a745:0x9e3579b1bc8dd15f?sa=X&ved=2ahUKEwi94pPM0-z2AhU8j2oFHRJ6DesQxB16BAgPEAI#')
    childcare.change_attribute(108, '_image', 'https://www.google.com/maps/uv?pb=!1s0x8644cfaba28edfd3%3A0xda5275812956b6e3!3m1!7e115!4s%2Fmaps%2Fplace%2FMy%2BBig%2BBrain%2BLearning%2BAcademy%2F%4030.4418251%2C-97.6535609%2C3a%2C75y%2C292.96h%2C90t%2Fdata%3D*213m4*211e1*213m2*211sUAYPcCItILD-vAzQHtYg-g*212e0*214m2*213m1*211s0x8644cfaba28edfd3%3A0xda5275812956b6e3%3Fsa%3DX!5sMy%20Big%20Brain%20Learning%20Academy%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e2!2sUAYPcCItILD-vAzQHtYg-g&hl=en&sa=X&ved=2ahUKEwjXjfPb0-z2AhUXlmoFHSNSDAMQpx96BAgwEAg#')
    childcare.change_attribute(114, '_image', 'https://www.google.com/maps/uv?pb=!1s0x8644d70fd03520ad:0x4e11758ba80dca8f!3m1!7e115!4shttps://lh5.googleusercontent.com/p/AF1QipOrwx_v_Au6A_uBDJVHKwjSubN_94deZ-mjylDG%3Dw215-h200-k-no!5sJames+Mitchell+Elementary+School+-+Google+Search!15zQ2dJZ0FRPT0&imagekey=!1e10!2sAF1QipOrwx_v_Au6A_uBDJVHKwjSubN_94deZ-mjylDG&hl=en&sa=X&ved=2ahUKEwi9pvPq0-z2AhVCnWoFHU5HD-cQoip6BAgvEAM#')
    childcare.change_attribute(119, '_image', 'https://www.google.com/maps/place/989+Old+McDade+Rd,+Elgin,+TX+78621/@30.3387627,-97.3532231,3a,75y,223.05h,90t/data=!3m6!1e1!3m4!1sUp7qXCTQMsc6mww8Inh-BQ!2e0!7i3328!8i1664!4m5!3m4!1s0x8644eb5f3335c8cd:0x20744b9f0c7fd48f!8m2!3d30.3385315!4d-97.3534704#')

    jobs = db.enter_table('jobs')
    jobs.change_attribute(3, '_image', 'https://media.glassdoor.com/sqll/1945982/mediavine-squarelogo-1556160091082.png')
    jobs.change_attribute(6, '_image', 'http://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OAgf?ver=6a31')
    jobs.change_attribute(10, '_image', 'data:image/png;base64,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')
    jobs.change_attribute(12, '_image', 'https://thumbs.dreamstime.com/b/not-available-stamp-seal-watermark-distress-style-designed-rectangle-circles-stars-black-vector-rubber-print-title-138796185.jpg')
    jobs.change_attribute(28, '_image', 'https://www.sciplay.com/sciplay.png')
    jobs.change_attribute(36, '_image', 'https://images.squarespace-cdn.com/content/v1/5655e100e4b0f60cdb972032/1448469224255-JW5YRA7XYKPTERY0VBRX/Local+Staffing+Logo.jpg')
    jobs.change_attribute(54, '_image', 'https://www.careerstaff.com/wp-content/uploads/2021/10/share.jpg')
    jobs.change_attribute(61, '_image', 'https://pediatricassociates.com/wp-content/uploads/2016/08/Pediatric_Associates_logo-trademark-1@2x.png')
    jobs.change_attribute(63, '_image', 'https://www.nealjohnsonmd.com/views/images/logo.png')
    jobs.change_attribute(203, '_image', 'https://www.medixteam.com/wp-content/uploads/2020/10/medix-logo.png')

    print(db.list_tables())
    print(len(db.enter_table('jobs').get_data_bulk()))
    print(len(db.enter_table('housing').get_data_bulk()))
    print(len(db.enter_table('childcare').get_data_bulk()))

    db.disconnect()