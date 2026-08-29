import pandas as pd
from sklearn.model_selection import train_test_split

# Load dataset
df = pd.read_csv("cleaned_irrigation_data.csv")

# Show columns
print("Columns in dataset:")
print(df.columns.tolist())

# Show dataset size
print("\nDataset shape:")
print(df.shape)

# Split data
train_data, test_data = train_test_split(
    df,
    test_size=0.20,
    random_state=42
)

# Show results
print("\nTraining data shape:")
print(train_data.shape)

print("\nTesting data shape:")
print(test_data.shape)