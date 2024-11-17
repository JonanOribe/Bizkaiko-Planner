import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.cluster import KMeans

# Load the dataset
file_path = 'algorithms\\data\\agenda-cultural-bizkaia-2023.csv'  # Update with your dataset path
data = pd.read_csv(file_path)

# Select relevant columns for clustering
relevant_columns = ['UDALERRIA/MUNICIPIO', 'EKITALDI MOTA/TIPO EVENTO', 'EKITALDIAREN KATEGORIA/CATEGORIA EVENTO']
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

# Save or display the clustered data
print(data_subset.head())

# To interpret clusters, map back labels if necessary
for column, le in label_encoders.items():
    print(f"Mapping for {column}:")
    print(dict(zip(le.classes_, le.transform(le.classes_))))
