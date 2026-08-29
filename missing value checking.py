import pandas as pd
import numpy as np

# Load CSV file
df = pd.read_csv("irrigation_prediction.csv")

# 1. View dataset
print("First 5 rows:")
print(df.head())

print("\nDataset Shape:")
print(df.shape)

# 2. Check column information
print("\nDataset Information:")
df.info()

# 3. Check missing values
print("\nMissing Values:")
print(df.isnull().sum())

# 4. Check duplicate rows
print("\nNumber of Duplicate Rows:")
print(df.duplicated().sum())

# 5. Remove duplicate rows
df = df.drop_duplicates()

# 6. Handle missing values
# Numerical columns → median
numerical_columns = df.select_dtypes(include=np.number).columns

for col in numerical_columns:
    df[col] = df[col].fillna(df[col].median())

# Categorical columns → mode
categorical_columns = df.select_dtypes(include="object").columns

for col in categorical_columns:
    df[col] = df[col].fillna(df[col].mode()[0])

# 7. Check missing values again
print("\nMissing Values After Cleaning:")
print(df.isnull().sum())

# 8. Check unique values in categorical columns
print("\nCategorical Column Values:")
for col in categorical_columns:
    print(f"\n{col}:")
    print(df[col].unique())

# 9. Check numerical statistics
print("\nStatistical Summary:")
print(df.describe())

# 10. Save cleaned dataset
df.to_csv("cleaned_irrigation_prediction.csv", index=False)

print("\nData cleaning completed successfully!")
print("Cleaned Dataset Shape:", df.shape)
df.to_csv("cleaned_irrigation_data.csv", index=False)

print("Cleaned dataset saved successfully!")