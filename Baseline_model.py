import pandas as pd
from sklearn.dummy import DummyClassifier
from sklearn.metrics import accuracy_score

train = pd.read_csv("train_ml_dataset.csv")
test = pd.read_csv("test_ml_dataset.csv")

X_train = train.drop(columns="Irrigation_Need")
y_train = train["Irrigation_Need"]

X_test = test.drop(columns="Irrigation_Need")
y_test = test["Irrigation_Need"]

model = DummyClassifier(strategy="most_frequent")
model.fit(X_train, y_train)

accuracy = accuracy_score(y_test, model.predict(X_test))

print("Baseline Accuracy:", round(accuracy * 100, 2), "%")
