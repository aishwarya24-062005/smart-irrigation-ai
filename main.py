import pandas as pd

# Load CSV file
df =pd.read_csv("cleaned_irrigation_data.csv")

# Step 5: Feature Selection
print("Column Names:")
print(df.columns.tolist())

print("\nData Types:")
print(df.dtypes)

print("\nFirst 5 Rows:")
print(df.head())