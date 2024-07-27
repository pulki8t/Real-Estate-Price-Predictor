import numpy as np
import pickle
import json


locations = None
data_columns = None
model = None

def load_saved_artificats():
    print("loading saved data and model:")
    global  data_columns
    global locations
    global model

    with open("./columns.json", "r") as f:
        data_columns = json.load(f)['data_columns']
        locations = data_columns[3:]  # first 3 columns are sqft, bath, bhk
    if model is None:
        with open('./bangalore_real_estate_price_predictor.pickle', 'rb') as f:
            model = pickle.load(f)
    print("loading Successful")

def get_location_names():
    return locations

def get_data_columns():
    return data_columns

def get_estimated_price(location,sqft,bhk,bath):
    try:
        loc_index = data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index>=0:
        x[loc_index] = 1

    return round(model.predict([x])[0],2)



if __name__ == '__main__':
    load_saved_artificats()
    print(get_location_names())
    print(get_estimated_price('2nd phase judicial layout', 1500, 4, 5))