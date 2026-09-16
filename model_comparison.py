import pandas as pd

data = {
    "Model": ["Baseline", "Random Forest", "Gradient Boosting"],
    "Accuracy": [0.580, 0.968, 0.994],
    "Precision": [0.336, 0.969, 0.994],
    "Recall": [0.580, 0.968, 0.994],
    "F1 Score": [0.426, 0.964, 0.994]
}

df = pd.DataFrame(data)

print("\nMODEL COMPARISON")
print(df.to_string(index=False))

print("\nBest Model: Gradient Boosting")
