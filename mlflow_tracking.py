import mlflow
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import accuracy_score
import pandas as pd


# Load dataset
train = pd.read_csv("train_ml_dataset.csv")
test = pd.read_csv("test_ml_dataset.csv")

X_train = train.drop(columns="Irrigation_Need")
y_train = train["Irrigation_Need"]

X_test = test.drop(columns="Irrigation_Need")
y_test = test["Irrigation_Need"]


# Start MLflow experiment
mlflow.set_experiment("Smart_Irrigation_Model_Training")

with mlflow.start_run():

    # Model parameters
    n_estimators = 100
    learning_rate = 0.1
    max_depth = 3

    # Train model
    model = GradientBoostingClassifier(
        n_estimators=n_estimators,
        learning_rate=learning_rate,
        max_depth=max_depth,
        random_state=42
    )

    model.fit(X_train, y_train)

    # Prediction
    prediction = model.predict(X_test)

    # Accuracy
    accuracy = accuracy_score(y_test, prediction)

    # Log parameters
    mlflow.log_param("model", "Gradient Boosting")
    mlflow.log_param("n_estimators", n_estimators)
    mlflow.log_param("learning_rate", learning_rate)
    mlflow.log_param("max_depth", max_depth)

    # Log metric
    mlflow.log_metric("accuracy", accuracy)

    print("MLflow Experiment Completed!")
    print("Model: Gradient Boosting")
    print("Accuracy:", round(accuracy * 100, 2), "%")
    print("Run ID:", mlflow.active_run().info.run_id)