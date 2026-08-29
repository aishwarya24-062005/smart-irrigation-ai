import pandas as pd

# Load cleaned dataset
df = pd.read_csv("cleaned_irrigation_data.csv")

# Target column
target = "Irrigation_Need"

# Separate features (X) and target (y)
X = df.drop(columns=[target])
y = df[target]

# Display selected features
print("FEATURE SELECTION")
print("------------------")

print("\nInput Features (X):")
print(X.columns.tolist())

print("\nTarget (y):")
print(y.name)

print("\nNumber of input features:", X.shape[1])
print("Number of records:", X.shape[0])

print("\nTarget values:")
print(y.value_counts())