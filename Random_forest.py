import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix


# ==========================================
# 1. Load cleaned dataset
# ==========================================

df = pd.read_csv("cleaned_irrigation_data.csv")

print("Dataset loaded successfully!")
print("Dataset shape:", df.shape)


# ==========================================
# 2. Target column
# ==========================================

target = "Irrigation_Need"

X = df.drop(columns=[target])
y = df[target]


# ==========================================
# 3. Identify categorical and numerical columns
# ==========================================

categorical_columns = X.select_dtypes(
    include=["object"]
).columns.tolist()

numerical_columns = X.select_dtypes(
    exclude=["object"]
).columns.tolist()

print("\nCategorical columns:")
print(categorical_columns)

print("\nNumerical columns:")
print(numerical_columns)


# ==========================================
# 4. Train-test split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


# ==========================================
# 5. Preprocessing
# ==========================================

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(
                handle_unknown="ignore",
                sparse_output=False
            ),
            categorical_columns
        ),
        (
            "numerical",
            "passthrough",
            numerical_columns
        )
    ]
)


# ==========================================
# 6. Transform data
# ==========================================

X_train_encoded = preprocessor.fit_transform(X_train)
X_test_encoded = preprocessor.transform(X_test)

print("\nEncoded training shape:")
print(X_train_encoded.shape)

print("\nEncoded testing shape:")
print(X_test_encoded.shape)


# ==========================================
# 7. Create Random Forest model
# ==========================================

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)


# ==========================================
# 8. Train model
# ==========================================

model.fit(X_train_encoded, y_train)

print("\nModel training completed!")


# ==========================================
# 9. Save model and preprocessor
# ==========================================

joblib.dump(model, "irrigation_model.pkl")
joblib.dump(preprocessor, "irrigation_preprocessor.pkl")

print("\nModel saved successfully!")
print("Created: irrigation_model.pkl")
print("Created: irrigation_preprocessor.pkl")


# ==========================================
# 10. Make predictions
# ==========================================

y_pred = model.predict(X_test_encoded)


# ==========================================
# 11. Evaluate model
# ==========================================

accuracy = accuracy_score(y_test, y_pred)

print("\n================================")
print("MODEL EVALUATION")
print("================================")

print("\nAccuracy:", accuracy)

print(
    "Accuracy Percentage:",
    round(accuracy * 100, 2),
    "%"
)

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
