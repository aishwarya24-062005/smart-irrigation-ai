import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

train = pd.read_csv("train_ml_dataset.csv")
test = pd.read_csv("test_ml_dataset.csv")

X_train = train.drop(columns="Irrigation_Need")
y_train = train["Irrigation_Need"]

X_test = test.drop(columns="Irrigation_Need")
y_test = test["Irrigation_Need"]

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

pred = model.predict(X_test)
accuracy = accuracy_score(y_test, pred)

print("Random Forest Accuracy:", round(accuracy * 100, 2), "%")