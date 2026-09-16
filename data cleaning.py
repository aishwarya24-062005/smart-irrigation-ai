import pandas as pd
df = pd.read_csv("irrigation_prediction.csv")
df = df.drop_duplicates()
num_cols = df.select_dtypes(include="number").columns
df[num_cols] = df[num_cols].fillna(df[num_cols].median())
cat_cols = df.select_dtypes(include="object").columns
for col in cat_cols:
    df[col] = df[col].fillna(df[col].mode()[0])
for col in cat_cols:
    df[col] = df[col].str.strip()
df.to_csv("cleaned_irrigation_data.csv", index=False)
print("Data cleaning completed successfully!")
