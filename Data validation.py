import pandas as pd
import numpy as np

# Import CSV file
df = pd.read_csv("irrigation_prediction.csv")

print("========== DATA VALIDATION ==========\n")

# 1. Check dataset shape
print("1. Dataset Shape:")
print(df.shape)

# 2. Check column names
print("\n2. Column Names:")
print(df.columns.tolist())

# 3. Check data types
print("\n3. Data Types:")
print(df.dtypes)

# 4. Check missing values
print("\n4. Missing Values:")
print(df.isnull().sum())

# 5. Check duplicate records
print("\n5. Duplicate Records:")
print(df.duplicated().sum())

# 6. Check numerical columns
print("\n6. Numerical Columns:")
print(df.select_dtypes(include=np.number).columns.tolist())

# 7. Check categorical columns
print("\n7. Categorical Columns:")
print(df.select_dtypes(include="object").columns.tolist())

# 8. Check numerical data for negative values
print("\n8. Negative Values:")
numeric_df = df.select_dtypes(include=np.number)
print((numeric_df < 0).sum())

# 9. Check unique values of categorical columns
print("\n9. Unique Categorical Values:")
for col in df.select_dtypes(include="object").columns:
    print(f"\n{col}:")
    print(df[col].unique())

# 10. Statistical validation
print("\n10. Statistical Summary:")
print(df.describe())

print("\n========== DATA VALIDATION COMPLETED ==========")