from http.client import HTTPException
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from src.models.weather import DataArray
from src.k_means_cultura import *
from src.k_means_deporte import *
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/cluster_cultura/")
async def cluster_cultura(input_data: DataArray):
    records = [item.dict() for item in input_data.data]
    local_storage = json.loads(records[0]['localStorage'])
    try:
        try:
            response = json.loads(generate_cluster_cultura(records[0],local_storage))
            if records[0]['preferences']['sport'] == True:
                response_sport = json.loads(generate_cluster_deporte(records[0],local_storage))
                response = response+response_sport
        except HTTPException:
            raise HTTPException(status_code=404, detail="Error getting info")
        return response

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8006)
