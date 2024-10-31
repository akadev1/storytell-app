import requests
import json
import datetime
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['storytell']
users_collection = db['users']

# Fetch user data
def fetch_user_data():
    users = users_collection.find()
    return users

# Add localization information with real timestamp
def add_localization_info(user):
    user['location'] = {
        'latitude': 37.7749,  # Example latitude
        'longitude': -122.4194,  # Example longitude
        'timestamp': datetime.datetime.now()
    }
    return user

# Update user data in the database
def update_user_data(user):
    users_collection.update_one({'_id': user['_id']}, {'$set': user})

# Main function
def main():
    users = fetch_user_data()
    for user in users:
        user = add_localization_info(user)
        update_user_data(user)

if __name__ == '__main__':
    main()
