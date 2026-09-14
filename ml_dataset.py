import pandas as pd
from sklearn.model_selection import train_test_split
df = pd.read_csv("cleaned_irrigation_data.csv")
df["Irrigation_Need"] = df["Irrigation_Need"].map(
    {"High": 0, "Low": 1, "Medium": 2}
)
df = pd.get_dummies(df, drop_first=True).fillna(0)
X = df.drop(columns="Irrigation_Need")
y = df["Irrigation_Need"]
X_train, X_temp, y_train, y_temp = train_test_split(
    X, y, test_size=0.3, random_state=42
)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp, y_temp, test_size=0.5, random_state=42
)
pd.concat([X_train, y_train], axis=1).to_csv("train_ml_dataset.csv", index=False)
pd.concat([X_val, y_val], axis=1).to_csv("validation_ml_dataset.csv", index=False)
pd.concat([X_test, y_test], axis=1).to_csv("test_ml_dataset.csv", index=False)
print("ML datasets created successfully!")