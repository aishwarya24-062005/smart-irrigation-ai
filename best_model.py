import pandas as pd
import joblib
from sklearn.ensemble import GradientBoostingClassifier
train = pd.read_csv("train_ml_dataset.csv")
X = train.drop(columns="Irrigation_Need")
y = train["Irrigation_Need"]
model = GradientBoostingClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    random_state=42
)
model.fit(X, y)
joblib.dump(model, "best_irrigation_model.pkl")
print("Best model saved successfully!")