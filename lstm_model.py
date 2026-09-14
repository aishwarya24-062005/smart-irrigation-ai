import pandas as pd

df = pd.read_csv("cleaned_irrigation_data.csv")

print("Columns in dataset:")
print(df.columns.tolist())

print("\nDate/Time columns:")
for col in df.columns:
    if "date" in col.lower() or "time" in col.lower():
        print(col)