from http.client import HTTPException
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from src.k_means_cultura import *
from src.k_means_deporte import *
import uvicorn

# Initialize the FastAPI app
app = FastAPI()

# Define a route for clustering
@app.get("/cluster-cultura/")
async def cluster_cultura():
    try:
        try:
            response = generate_cluster_cultura()
        except HTTPException:
            raise HTTPException(status_code=404, detail="Error getting info")
        return response

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.get("/cluster-deporte/")
async def cluster_deporte():
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
