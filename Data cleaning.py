import pandas as pd

# Load dataset
df = pd.read_csv("irrigation_prediction.csv")

# Remove duplicate rows
df = df.drop_duplicates()

# Fill missing numerical values with median
num_cols = df.select_dtypes(include="number").columns
df[num_cols] = df[num_cols].fillna(df[num_cols].median())

# Fill missing categorical values with mode
cat_cols = df.select_dtypes(include="object").columns
for col in cat_cols:
    df[col] = df[col].fillna(df[col].mode()[0])

# Remove extra spaces
for col in cat_cols:
    df[col] = df[col].str.strip()

# Save cleaned dataset
df.to_csv("cleaned_irrigation_data.csv", index=False)

print("Data cleaning completed successfully!")