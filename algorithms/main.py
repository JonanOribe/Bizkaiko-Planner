import requests

def interact_with_api_over_multipart_zip(section:str,bearer,zipfile):
    API_CONNECTION_STRING = 'http://localhost:8000/api/v1.1'
    headers = {
        "Authorization": "Bearer " + bearer
          }
    response = requests.post(API_CONNECTION_STRING+section, files={'file': zipfile}, headers=headers)
    if response.text != 'true':
        print(response.text)
    elif response.text != 'true' and response.text != True:
        print(response.text)
    return response

if __name__ == "__main__":
     bearer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUZXN0IiwiZXhwIjoxNzI5ODQxNDI2fQ.oI20FoWaD3DWE_NFshBDyTNv9pzgkJQAmPyo1Ko8Rdw'
     zipfile =open('json_files_in_memory.zip','rb')
     section = '/103w08w05-79w28w05w15/strategyData/uploadZipFile/qallocation_algorithm_generated_primitive_portfolios'
     interact_with_api_over_multipart_zip(section,bearer,zipfile)

