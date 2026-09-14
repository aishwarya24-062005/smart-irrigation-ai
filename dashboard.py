import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
st.set_page_config(
    page_title="Smart Irrigation AI",
    page_icon="🌱",
    layout="wide"
)

# =========================================================
# DARK MODE DESIGN
# =========================================================

st.markdown("""
<style>

.stApp {
    background-color: #0e1117;
    color: white;
}

h1, h2, h3, h4, p, label {
    color: white !important;
}

[data-testid="stMetric"] {
    background-color: #1b1f2a;
    border: 1px solid #30363d;
    padding: 15px;
    border-radius: 12px;
}

[data-testid="stMetricValue"] {
    color: #00e676 !important;
}

[data-testid="stMetricLabel"] {
    color: #ffffff !important;
}

.stDataFrame {
    background-color: #161b22;
}

div.block-container {
    padding-top: 2rem;
}

</style>
""", unsafe_allow_html=True)

# =========================================================
# TITLE
# =========================================================

st.title("🌱 Smart Irrigation AI Dashboard")

st.markdown("---")

# =========================================================
# LOAD DATASET
# =========================================================

file_path = "cleaned_irrigation_data.csv"

try:
    df = pd.read_csv(file_path)
except FileNotFoundError:
    st.error("❌ cleaned_irrigation_data.csv not found.")
    st.info("Place the CSV file in the same folder as app.py.")
    st.stop()

# =========================================================
# DATASET OVERVIEW
# =========================================================

st.header("📋 Dataset Overview")

col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric("Rows", df.shape[0])

with col2:
    st.metric("Columns", df.shape[1])

with col3:
    st.metric("Missing Values", int(df.isnull().sum().sum()))

with col4:
    st.metric("Duplicate Rows", int(df.duplicated().sum()))

# =========================================================
# DATASET PREVIEW
# =========================================================

st.subheader("🔍 Dataset Preview")

st.dataframe(
    df.head(10),
    use_container_width=True
)

# =========================================================
# DATA TYPES
# =========================================================

st.subheader("🧾 Data Types")

dtype_df = pd.DataFrame({
    "Column": df.columns,
    "Data Type": df.dtypes.astype(str).values
})

st.dataframe(
    dtype_df,
    use_container_width=True
)

# =========================================================
# NUMERICAL SUMMARY
# =========================================================

st.subheader("📈 Statistical Summary")

st.dataframe(
    df.describe().T,
    use_container_width=True
)

# =========================================================
# EDA SECTION
# =========================================================

st.markdown("---")
st.header("📊 Exploratory Data Analysis")

# ---------------------------------------------------------
# NUMERICAL COLUMNS
# ---------------------------------------------------------

numeric_columns = df.select_dtypes(
    include=["int64", "float64"]
).columns.tolist()

if len(numeric_columns) > 0:

    st.subheader("📉 Numerical Feature Distribution")

    selected_column = st.selectbox(
        "Select a numerical feature:",
        numeric_columns
    )

    fig, ax = plt.subplots(figsize=(10, 5))

    ax.hist(
        df[selected_column].dropna(),
        bins=30
    )

    ax.set_title(
        f"Distribution of {selected_column}",
        color="white"
    )

    ax.set_xlabel(selected_column, color="white")
    ax.set_ylabel("Frequency", color="white")

    ax.tick_params(colors="white")

    fig.patch.set_facecolor("#0e1117")
    ax.set_facecolor("#161b22")

    st.pyplot(fig)

# =========================================================
# CORRELATION HEATMAP
# =========================================================

if len(numeric_columns) > 1:

    st.subheader("🔥 Correlation Heatmap")

    fig, ax = plt.subplots(
        figsize=(12, 7)
    )

    correlation = df[numeric_columns].corr()

    sns.heatmap(
        correlation,
        annot=True,
        fmt=".2f",
        ax=ax
    )

    ax.set_title(
        "Feature Correlation",
        color="white"
    )

    fig.patch.set_facecolor("#0e1117")

    st.pyplot(fig)

# =========================================================
# CATEGORICAL DATA
# =========================================================

categorical_columns = df.select_dtypes(
    include=["object", "category"]
).columns.tolist()

if len(categorical_columns) > 0:

    st.subheader("📊 Categorical Feature Analysis")

    selected_cat = st.selectbox(
        "Select a categorical feature:",
        categorical_columns
    )

    counts = df[selected_cat].value_counts()

    fig, ax = plt.subplots(figsize=(10, 5))

    counts.plot(
        kind="bar",
        ax=ax
    )

    ax.set_title(
        f"{selected_cat} Distribution",
        color="white"
    )

    ax.set_xlabel(
        selected_cat,
        color="white"
    )

    ax.set_ylabel(
        "Count",
        color="white"
    )

    ax.tick_params(colors="white")

    fig.patch.set_facecolor("#0e1117")
    ax.set_facecolor("#161b22")

    st.pyplot(fig)

# =========================================================
# MACHINE LEARNING
# =========================================================

st.markdown("---")

st.header("🤖 Machine Learning")

# =========================================================
# FIND TARGET COLUMN
# =========================================================

possible_targets = [
    "Irrigation_Need",
    "Irrigation_Needed",
    "Irrigation_Need_Level",
    "Target",
    "target"
]

target_column = None

for col in possible_targets:
    if col in df.columns:
        target_column = col
        break

# If target was not automatically found
if target_column is None:

    st.warning(
        "Target column was not automatically detected."
    )

    target_column = st.selectbox(
        "Select the target column:",
        df.columns
    )

st.success(
    f"🎯 Target Column: {target_column}"
)

# =========================================================
# PREPARE DATA
# =========================================================

X = df.drop(columns=[target_column])
y = df[target_column]

# Remove ID-like columns
id_columns = []

for col in X.columns:

    if X[col].nunique() == len(X):
        id_columns.append(col)

if id_columns:
    X = X.drop(columns=id_columns)

# =========================================================
# ENCODE CATEGORICAL FEATURES
# =========================================================

label_encoders = {}

for col in X.select_dtypes(
    include=["object", "category"]
).columns:

    encoder = LabelEncoder()

    X[col] = encoder.fit_transform(
        X[col].astype(str)
    )

    label_encoders[col] = encoder

# Encode target if categorical

target_encoder = None

if y.dtype == "object" or str(y.dtype) == "category":

    target_encoder = LabelEncoder()

    y = target_encoder.fit_transform(
        y.astype(str)
    )

# =========================================================
# HANDLE MISSING VALUES
# =========================================================

X = X.fillna(X.median(numeric_only=True))

# Any remaining missing values
X = X.fillna(0)

# =========================================================
# TRAIN TEST SPLIT
# =========================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# =========================================================
# RANDOM FOREST MODEL
# =========================================================

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(
    X_train,
    y_train
)

# =========================================================
# PREDICTION
# =========================================================

y_pred = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    y_pred
)

# =========================================================
# MODEL ACCURACY
# =========================================================

st.subheader("🎯 Model Accuracy")

col1, col2, col3 = st.columns(3)

with col1:
    st.metric(
        "Random Forest Accuracy",
        f"{accuracy * 100:.2f}%"
    )

with col2:
    st.metric(
        "Training Samples",
        len(X_train)
    )

with col3:
    st.metric(
        "Testing Samples",
        len(X_test)
    )

# =========================================================
# CONFUSION MATRIX
# =========================================================

st.subheader("📊 Confusion Matrix")

cm = confusion_matrix(
    y_test,
    y_pred
)

fig, ax = plt.subplots(
    figsize=(8, 6)
)

sns.heatmap(
    cm,
    annot=True,
    fmt="d",
    cmap="Blues",
    ax=ax
)

ax.set_title(
    "Irrigation Need - Confusion Matrix"
)

ax.set_xlabel(
    "Predicted"
)

ax.set_ylabel(
    "Actual"
)

st.pyplot(fig)

# =========================================================
# CLASSIFICATION REPORT
# =========================================================

st.subheader("📋 Classification Report")

report = classification_report(
    y_test,
    y_pred,
    output_dict=True
)

report_df = pd.DataFrame(
    report
).transpose()

st.dataframe(
    report_df,
    use_container_width=True
)

# =========================================================
# FEATURE IMPORTANCE
# =========================================================

st.subheader("🌿 Feature Importance")

importance_df = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
})

importance_df = importance_df.sort_values(
    by="Importance",
    ascending=False
)

fig, ax = plt.subplots(
    figsize=(10, 6)
)
ax.barh(
    importance_df["Feature"].head(10)[::-1],
    importance_df["Importance"].head(10)[::-1]
)
ax.set_title(
    "Top 10 Important Features"
)
ax.set_xlabel(
    "Importance"
)
st.pyplot(fig)
# =========================================================
# IRRIGATION PREDICTION
# =========================================================
st.markdown("---")
st.header("💧 Irrigation Prediction")
st.write(
    "Enter the required sensor/environment values "
    "to predict irrigation need."
)
# =========================================================
# PREDICTION INPUT
# =========================================================
input_data = {}
input_columns = X.columns.tolist()
cols = st.columns(2)
for i, col in enumerate(input_columns):
    with cols[i % 2]:
        if col in numeric_columns:
            default_value = float(
                df[col].median()
            ) if col in df.columns else 0.0
            input_data[col] = st.number_input(
                f"{col}",
                value=default_value
            )
        else:
            input_data[col] = st.number_input(
                f"{col}",
                value=0.0
            )
# =========================================================
# PREDICT BUTTON
# =========================================================
if st.button(
    "🌱 Predict Irrigation Need",
    use_container_width=True
):
    input_df = pd.DataFrame(
        [input_data]
    )
    # Apply same encoding
    for col in input_df.columns:
        if col in label_encoders:
            encoder = label_encoders[col]
            value = str(
                input_df.loc[0, col]
            )
            if value in encoder.classes_:
                input_df[col] = encoder.transform(
                    [value]
                )
            else:
                input_df[col] = 0
    prediction = model.predict(
        input_df
    )[0]
    if target_encoder is not None:
        prediction_label = target_encoder.inverse_transform(
            [prediction]
        )[0]
    else:
        prediction_label = prediction
    st.success(
        f"🌱 Predicted Irrigation Need: {prediction_label}"
    )