import pandas as pd
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

train = pd.read_csv("train_ml_dataset.csv")
test = pd.read_csv("test_ml_dataset.csv")

X_train = train.drop(columns="Irrigation_Need")
y_train = train["Irrigation_Need"]
X_test = test.drop(columns="Irrigation_Need")
y_test = test["Irrigation_Need"]

models = {
    "Baseline": DummyClassifier(strategy="most_frequent"),
    "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
    "Gradient Boosting": GradientBoostingClassifier(random_state=42)
}

for name, model in models.items():
    model.fit(X_train, y_train)
    pred = model.predict(X_test)

    print("\n", name)
    print("Accuracy :", round(accuracy_score(y_test, pred), 3))
    print("Precision:", round(precision_score(y_test, pred, average="weighted", zero_division=0), 3))
    print("Recall   :", round(recall_score(y_test, pred, average="weighted", zero_division=0), 3))
    print("F1 Score :", round(f1_score(y_test, pred, average="weighted", zero_division=0), 3))
