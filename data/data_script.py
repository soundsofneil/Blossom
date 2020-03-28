#####
# Script which takes a csv file of universities in the USA and scrapes the web for data on that university.
#####

import pandas as pd
import requests

def get_twitter(profiles):
    for p in profiles:
        if p['name'] == 'Twitter':
            return p['link']

    return ""


local_csv_file = '/Users/JasonP/Downloads/3-25-2020---948/uni_data2.csv'
raw_df = pd.read_csv(local_csv_file)

new_data = {
    'institution': [],
    'website': [],
    'desc': [],
    'state':[],
    'city': [],
    'twitter': [],
    'img': [],
    'avg_act_score': [],
    'avg_sat_math_score': [],
    'avg_sat_writing_score': [],
    }

for i, row in raw_df.iterrows():
    params_body = {
        'q': row['institution_name'],
        'api_key': 'd440788cfda64f6a4c59b205977633dc1690df2d56ad9e71eb6280bb546ed2ad'
        }

    params_bodyImg = {
        'q': row['institution_name'],
        'api_key': 'd440788cfda64f6a4c59b205977633dc1690df2d56ad9e71eb6280bb546ed2ad',
        'tbm': 'isch',
        'ijin': 0
        }

    req = requests.get('https://serpapi.com/search', params=params_body).json()

    if 'knowledge_graph' not in req:
        continue


    knowledge_graph = req['knowledge_graph']

    # intermeidate writes to the csv file
    if i in [100, 300, 500, 1000, 1200, 1500, 1600, 2000, 2400, 2500, 3000,3300,3500, 4000, 4200, 4300, 4500, 4600, 4700, 4800, 4900, 5000]:
        new_df = pd.DataFrame(data=new_data)
        new_df.to_csv('./university_data_3.csv')

    # only consider schools with these fields valid
    if 'title' not in knowledge_graph or 'website' not in knowledge_graph or 'description' not in knowledge_graph or 'address' not in knowledge_graph or 'profiles' not in knowledge_graph:
        continue
    print(i)

    institution = knowledge_graph['title']
    website = knowledge_graph['website']
    desc = knowledge_graph['description']
    city = knowledge_graph['address'] # comes in form Boston, MA
    state = city.split()[-1] 
    twitter = get_twitter(knowledge_graph["profiles"])
    avg_act_score = row['act_comp']
    avg_sat_math_score = row['sat_math']
    avg_sat_writing_score = row['sat_writing']
    img =  requests.get('https://serpapi.com/search', params=params_bodyImg).json()['images_results'][0]['original']

    new_data['institution'].append(institution)
    new_data['website'].append(website)
    new_data['desc'].append(desc)
    new_data['city'].append(city)
    new_data['state'].append(state)
    new_data['twitter'].append(twitter)
    new_data['avg_act_score'].append(avg_act_score)
    new_data['avg_sat_math_score'].append(avg_sat_math_score)
    new_data['avg_sat_writing_score'].append(avg_sat_writing_score)
    new_data['img'].append(img)

    print('PROCESSED')


new_df = pd.DataFrame(data=new_data)
new_df.to_csv('./university_data_3.csv')