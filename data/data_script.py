#####
# Script which takes a csv file of universities in the USA and scrapes the web for data on that university.
#####

import pandas as pd
import requests
import math
from rand import randint

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

def add_rank():
    df_rank = pd.read_csv('university_rank.csv')
    df3 = pd.read_csv('university_data3.csv')
    for i, row in df_rank.iterrows():
        if df3.loc[df3['institution'] == row['name']].empty:
            continue 

        df3.loc[df3['institution'] == row['name'], 'rank'] = row['rank']

# load data into mongo
def load_data():
    region_list = ['US West','US Central','US South','US East']
    df3 = pd.read_csv('university_data3.csv')

    for i, row in df3.iterrows():

        # some grades are NaN, just set to 0
        if math.isnan(row['avg_act_score']):
            gradeRequirement = 0
        else:
            # act is out of 35
            gradeRequirement = row['avg_act_score'] / 35

        name = row['institution']
        location = row['city']
        description = row['desc']
        imageUri = row['img']
        # couldnt get region data, so we mock it
        region = region_list[randint(0,3)]
        country = 'USA'
        applyWebsite = row['website']
        website = row['website']
        twitter = row['twitter']

        if gradeRequirement != 0:
            # couldnt get different program grade requirements, so we +- 10% for each program
            programs = [
                {"program":"Computer Science", "gradeRequirement": gradeRequirement, "website": website},
                {"program":"Business", "gradeRequirement": gradeRequirement + randint(-5,5), "website": website},
                {"program":"Statistics", "gradeRequirement": gradeRequirement + randint(-5,5), "website": website},
                {"program":"Life Sciences", "gradeRequirement": gradeRequirement + randint(-5,5), "website": website},
                {"program":"English", "gradeRequirement": gradeRequirement + randint(-5,5), "website": website}
                ]
        else:
            programs = [
                {"program":"Computer Science", "gradeRequirement": gradeRequirement, "website": website},
                {"program":"Business", "gradeRequirement": gradeRequirement, "website": website},
                {"program":"Statistics", "gradeRequirement": gradeRequirement, "website": website},
                {"program":"Life Sciences", "gradeRequirement": gradeRequirement, "website": website},
                {"program":"English", "gradeRequirement": gradeRequirement, "website": website}
                ]


        # we only have top 200 ranks, if school is over 200, mock the data
        if row['rank'] == "200+":
            rank = randint(250, 2000)
        else:
            rank = int(row['rank'])

        body = {
            "name": name,
            "description": description,
            "ranking": rank,
            "region": region,
            "programs": programs,
            "location": location,
            "country": country,
            "applyWebsite": website,
            "website": website,
            "twitter": twitter,
            "imageUri": imageUri
        }
        headers = {"Content-Type": "application/json"}
        print(requests.post('http://localhost:5000/api/uni', headers=headers, data=json.dumps(body))


