from http.client import HTTPException
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.k_means_cultura import *
from src.k_means_deporte import *
import uvicorn
from typing import List
from typing import Any

# Define the input schema
class DataItem(BaseModel):
    category: str
    sport: str
    organizer: str

class DataArray(BaseModel):
    data: List[DataItem]

# Initialize the FastAPI app
app = FastAPI()

# Define a route for clustering
@app.post("/cluster_cultura/")
async def cluster_cultura(input_data: DataArray):
    records = [item.dict() for item in input_data.data]
    print(records)
    try:
        try:
            response = generate_cluster_cultura()
        except HTTPException:
            raise HTTPException(status_code=404, detail="Error getting info")
        return response

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/cluster_deporte/")
async def cluster_deporte(input_data: DataArray):
    records = [item.dict() for item in input_data.data]
    print(records)
    try:
        try:
            response = generate_cluster_cultura()
        except HTTPException:
            raise HTTPException(status_code=404, detail="Error getting info")
        return response

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
