import pandas as pd
from sklearn.model_selection import train_test_split

# Load CSV
df = pd.read_csv("irrigation_prediction.csv")

# Dataset shape
print("Dataset shape:")
print(df.shape)

# Show column names
print("\nColumn names:")
print(df.columns.tolist())

# Separate features and target
X = df.iloc[:, :-1]
y = df.iloc[:, -1]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# Print shapes
print("\nTraining data shape:")
print(X_train.shape)

print("\nTesting data shape:")
print(X_test.shape)

print("\nTraining target shape:")
print(y_train.shape)

print("\nTesting target shape:")
print(y_test.shape)
