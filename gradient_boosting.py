import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import accuracy_score

train = pd.read_csv("train_ml_dataset.csv")
test = pd.read_csv("test_ml_dataset.csv")

X_train = train.drop(columns="Irrigation_Need")
y_train = train["Irrigation_Need"]
X_test = test.drop(columns="Irrigation_Need")
y_test = test["Irrigation_Need"]

model = GradientBoostingClassifier(random_state=42)
model.fit(X_train, y_train)

pred = model.predict(X_test)

print("Gradient Boosting Accuracy:",
      round(accuracy_score(y_test, pred) * 100, 2), "%")