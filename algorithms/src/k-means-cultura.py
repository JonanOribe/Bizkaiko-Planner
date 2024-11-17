import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Load the dataset
file_path = '..\\data\\agenda-cultural-bizkaia-2023.csv'  # Update with your dataset path
data = pd.read_csv(file_path)

# Select relevant columns for clustering
relevant_columns = ['EKITALDI MOTA/TIPO EVENTO', 'EKITALDIAREN KATEGORIA/CATEGORIA EVENTO']
data_subset = data[relevant_columns].dropna()

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
plt.figure(figsize=(10, 6))
for cluster in range(kmeans.n_clusters):
    cluster_data = data_subset[data_subset['Cluster'] == cluster]
    plt.scatter(cluster_data['PCA1'], cluster_data['PCA2'], label=f'Cluster {cluster}')

# Add cluster centers
cluster_centers = pca.transform(kmeans.cluster_centers_)
plt.scatter(cluster_centers[:, 0], cluster_centers[:, 1], color='black', marker='X', s=200, label='Centroids')

plt.title('K-Means Clustering Visualization')
plt.xlabel('PCA1')
plt.ylabel('PCA2')
plt.legend()
plt.grid(True)
plt.show()

# Show elements inside each cluster
print("Elements inside each cluster:")
for cluster in range(kmeans.n_clusters):
    cluster_elements = data_with_clusters[data_with_clusters['Cluster'] == cluster]
    print(f"\nCluster {cluster}:\n")
    print(cluster_elements[relevant_columns].to_string(index=False))