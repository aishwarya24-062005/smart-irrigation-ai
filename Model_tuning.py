import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import GridSearchCV
train = pd.read_csv("train_ml_dataset.csv")
X = train.drop(columns="Irrigation_Need")
y = train["Irrigation_Need"]
model = GradientBoostingClassifier(random_state=42)
params = {
    "n_estimators": [50, 100],
    "learning_rate": [0.1],
    "max_depth": [2, 3]
}
grid = GridSearchCV(model, params, cv=2, scoring="accuracy")
grid.fit(X, y)
print("Best Parameters:", grid.best_params_)
print("Best Accuracy:", round(grid.best_score_ * 100, 2), "%")
