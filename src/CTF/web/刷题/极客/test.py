# import requests


# get_response = requests.get('http://42.192.110.219:32772/?syc=lover')
# print(get_response.status_code)
# print(get_response.text)

# post_data = {'lover': 'syc'}
# post_response = requests.post('http://42.192.110.219:32772', data=post_data)
# print(post_response.status_code) 
# print(post_response.text) 

import requests

get_response = requests.get('http://42.192.110.219:32772')


post_data = {'lover': 'syc'}
post_response = requests.post('http://42.192.110.219:32772', data=post_data)

cookies = {'GiveMe': 'GiveMe'}

flag_data = {'flag': 'GiveMe'}
final_response = requests.get('http://42.192.110.219:32772', cookies=cookies, params=flag_data)

print(final_response.text)