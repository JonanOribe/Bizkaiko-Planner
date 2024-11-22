import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import os
import json

current_directory = os.getcwd()
translate = {
    'culture': ['antzerkia','dantza','ikus-entzunezko-emanaldia'],
    'others':['erakusketa','hitzaldia','bertsolaritza','aurkezpena','haur-jarduera','ikastaroa','lehiaketa'],
    'music':['kontzertua'],
    'adventures':['bestelakoa'],
    'sport':['kirola'],
    'food':['jatetxea']
}

def filter_location(location):
    if location=='Bilbao':
        location='Bilbo'
    return location

def generate_cluster_cultura(records,local_storage):
    try:
        good_ratings = list(set([val['EKITALDI MOTA/TIPO EVENTO'] for val in local_storage if val['rating']>=1]))
        filtered_preferences = {key: value for key, value in records['preferences'].items() if value}
        flat_list = []
        for elem in filtered_preferences.items():
            if elem[1] == True:
                flat_list.extend(translate[elem[0]])
        flat_list.extend(translate['others'])
        file_path = 'algorithms\\data\\agenda-cultural-bizkaia-2023.csv'  # Update with your dataset path
        data = pd.read_csv(file_path)
        selected_place:str = filter_location(records['name'])
        data = data[data['UDALERRIA/MUNICIPIO'].str.contains(selected_place)]
        filtered_data = data[data['EKITALDI MOTA/TIPO EVENTO'].isin(flat_list)]

        # Select relevant columns for clustering
        relevant_columns = ['EKITALDI MOTA/TIPO EVENTO', 'EKITALDIAREN KATEGORIA/CATEGORIA EVENTO']
        data_subset = filtered_data[relevant_columns].dropna()

        # Encode categorical data
        label_encoders = {}
        for column in relevant_columns:
            le = LabelEncoder()
            data_subset[column] = le.fit_transform(data_subset[column])
            label_encoders[column] = le

        # Scale the data
        scaler = StandardScaler()
        data_scaled = scaler.fit_transform(data_subset)

        # Apply K-Means clustering
        kmeans = KMeans(n_clusters=5, random_state=42)  # Adjust the number of clusters
        data_subset['Cluster'] = kmeans.fit_predict(data_scaled)

        # Add original data back to the dataset for reference
        data_with_clusters = data.copy()
        data_with_clusters['Cluster'] = -1  # Default cluster
        data_with_clusters.loc[data_subset.index, 'Cluster'] = data_subset['Cluster']

        # Dimensionality reduction for visualization (using PCA)
        pca = PCA(n_components=2)
        reduced_data = pca.fit_transform(data_scaled)
        data_subset['PCA1'] = reduced_data[:, 0]
        data_subset['PCA2'] = reduced_data[:, 1]

        # Plot the clusters
        #plt.figure(figsize=(10, 6))
        for cluster in range(kmeans.n_clusters):
            cluster_data = data_subset[data_subset['Cluster'] == cluster]
            #plt.scatter(cluster_data['PCA1'], cluster_data['PCA2'], label=f'Cluster {cluster}')

        # Add cluster centers
        cluster_centers = pca.transform(kmeans.cluster_centers_)
        #plt.scatter(cluster_centers[:, 0], cluster_centers[:, 1], color='black', marker='X', s=200, label='Centroids')
        #
        #plt.title('K-Means Clustering Visualization')
        #plt.xlabel('PCA1')
        #plt.ylabel('PCA2')
        #plt.legend()
        #plt.grid(True)
        #plt.show()

        # Show elements inside each cluster
        print("Elements inside each cluster:")
        for cluster in range(kmeans.n_clusters):
            cluster_elements = data_with_clusters[data_with_clusters['Cluster'] == cluster]
            print(f"\nCluster {cluster}:\n")
            print(cluster_elements[relevant_columns].to_string(index=False))

        # Save the clustered data to a CSV file (optional)
        #output_path = 'clustered_data_output_cultura.csv'  # Replace with your desired output path
        #data_with_clusters.to_json(output_path, index=False)
        if len(good_ratings)>0:
            # Create a sorting key: 1 if the row contains any of the words, 0 otherwise
            data_with_clusters['SortKey'] = data_with_clusters['EKITALDI MOTA/TIPO EVENTO'].str.contains('|'.join(good_ratings), case=False, na=False).astype(int)
            # Sort by the SortKey in descending order (rows with prioritized words on top)
            data_with_clusters = data_with_clusters.sort_values(by="SortKey", ascending=False).drop(columns="SortKey")
        json_dump = json.dumps(json.loads(data_with_clusters.to_json(orient="records")))
        return json_dump
    except Exception as e:
        return '[{}]'
