from database import Database
from sodapy import Socrata
import pandas as pd

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

if __name__ == '__main__':
    db = Database()
    db.connect(DATABASE, USER, PASSWORD, HOST, PORT)

    add_housing(db)
    add_childcare(db)

    print(db.list_tables())
    print(len(db.enter_table('housing').get_data_bulk()))
    print(len(db.enter_table('childcare').get_data_bulk()))

    db.disconnect()