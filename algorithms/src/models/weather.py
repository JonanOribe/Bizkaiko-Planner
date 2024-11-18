from pydantic import BaseModel
from typing import List
from pydantic import BaseModel
from typing import List, Optional

class WeatherDescription(BaseModel):
    id: int
    main: str
    description: str
    icon: str


class Coordinates(BaseModel):
    lon: float
    lat: float


class MainWeather(BaseModel):
    temp: float
    feels_like: float
    temp_min: float
    temp_max: float
    pressure: int
    humidity: int
    sea_level: Optional[int] = None
    grnd_level: Optional[int] = None


class Wind(BaseModel):
    speed: float
    deg: int
    gust: Optional[float] = None


class Clouds(BaseModel):
    all: int


class SysInfo(BaseModel):
    type: Optional[int] = None
    id: Optional[int] = None
    country: str
    sunrise: int
    sunset: int


class CurrentWeather(BaseModel):
    coord: Coordinates
    weather: List[WeatherDescription]
    base: str
    main: MainWeather
    visibility: int
    wind: Wind
    clouds: Clouds
    dt: int
    sys: SysInfo
    timezone: int
    id: int
    name: str
    cod: int


class Preferences(BaseModel):
    sport: bool
    aventures: bool
    culture: bool
    food: bool
    others: bool


class LocationData(BaseModel):
    name: str
    country: str
    latitude: str
    longitude: str
    preferences: Preferences
    temperature: int
    current_weather: CurrentWeather

class DataArray(BaseModel):
    data: List[LocationData]
