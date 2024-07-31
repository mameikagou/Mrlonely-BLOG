import requests

cookies = {'user': 'adm;n'}
response = requests.get('https://a5d61af2-bbaf-4039-9643-3850dc9f38b6.challenge.ctf.show/login', cookies=cookies)

print(response.text)
