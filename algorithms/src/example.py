from src.generics.utils_functions import get_config_file_data

config,config_file = get_config_file_data()
config.read(config_file)
DATA_PATH:str = config._defaults['data_path']

def get_path():
    print(DATA_PATH)

percentaje=200
amount=110
def taxes(amount: int, percentaje: int):
    return ((amount*percentaje)/100)+amount

print(taxes(amount,percentaje))