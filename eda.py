import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

st.title("🌱 Smart Irrigation - EDA Dashboard")

df = pd.read_csv("cleaned_irrigation_data.csv")

st.header("Dataset Overview")

st.write("Rows:", df.shape[0])
st.write("Columns:", df.shape[1])

st.subheader("Dataset Preview")
st.dataframe(df.fillna(""))

st.subheader("Dataset Preview")
st.write(df.dtypes)

st.subheader("Missing Values")
st.write(df.isnull().sum())

st.subheader("Statistical Summary")
st.write(df.describe())

st.subheader("Correlation Heatmap")

fig, ax = plt.subplots(figsize=(10, 6))
sns.heatmap(
    df.select_dtypes(include="number").corr(),
    annot=True,
    cmap="coolwarm",
    ax=ax
)
st.pyplot(fig)

st.success("EDA completed successfully!")