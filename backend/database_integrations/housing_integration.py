import psycopg2
import pandas as pd
from sodapy import Socrata

# DATABASE = 'affordaustin'
# USER = 'affordaustin'
# PASSWORD = 'ky7dQwWt4B5ZVhPFnbZ6'
# HOST = 'affordaustin-db.cj68zosziuyy.us-east-2.rds.amazonaws.com'
# PORT = '5432'

URL = 'data.texas.gov'
ENDPOINT = 'x5p7-qyuv'


# db = psycopg2.connect(
#     database = DATABASE,
#     user = USER,
#     password = PASSWORD,
#     host = HOST,
#     port = PORT
# )

"""
CREATE TABLE housing (

)
"""





client = Socrata(URL, None)

results = client.get(ENDPOINT, limit=10)
results = pd.DataFrame.from_records(results)
