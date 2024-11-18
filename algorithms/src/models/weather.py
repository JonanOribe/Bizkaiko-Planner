from pydantic import BaseModel
from typing import List
from pydantic import BaseModel
from typing import List, Optional

class WeatherDescription(BaseModel):
    id: Optional[int]
    main: Optional[str]
    description: Optional[str]
    icon: Optional[str]


class Coordinates(BaseModel):
    lon: Optional[float]
    lat: Optional[float]


class MainWeather(BaseModel):
    temp: Optional[float]
    feels_like: Optional[float]
    temp_min: Optional[float]
    temp_max: Optional[float]
    pressure: Optional[int]
    humidity: Optional[int]
    sea_level: Optional[int] = None
    grnd_level: Optional[int] = None


class Wind(BaseModel):
    speed: Optional[float]
    deg: Optional[int]
    gust: Optional[float] = None


class Clouds(BaseModel):
    all: Optional[int]


class SysInfo(BaseModel):
    type: Optional[int] = None
    id: Optional[int] = None
    country: Optional[str]
    sunrise: Optional[int]
    sunset: Optional[int]


class CurrentWeather(BaseModel):
    coord: Optional[Coordinates]
    weather: Optional[List[WeatherDescription]]
    base: Optional[str]
    main: Optional[MainWeather]
    visibility: Optional[int]
    wind: Optional[Wind]
    clouds: Optional[Clouds]
    dt: Optional[int]
    sys: Optional[SysInfo]
    timezone: Optional[int]
    id: Optional[int]
    name: Optional[str]
    cod: Optional[int]


class Preferences(BaseModel):
    sport: Optional[bool]
    adventures: Optional[bool]
    culture: Optional[bool]
    food: Optional[bool]
    others: Optional[bool]


class LocationData(BaseModel):
    name: Optional[str]
    country: Optional[str]
    latitude: Optional[str]
    longitude: Optional[str]
    preferences: Optional[Preferences]
    temperature: Optional[int]
    current_weather: Optional[CurrentWeather]

class DataArray(BaseModel):
    data: List[LocationData]
