import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

st.set_page_config(page_title="Smart Irrigation EDA", layout="wide")

# Black theme
st.markdown("""
<style>
.stApp{background-color:#000;color:white}
h1,h2,h3,p,label{color:white}
</style>
""", unsafe_allow_html=True)

st.title("🌱 Smart Irrigation - EDA Dashboard")

df = pd.read_csv("cleaned_irrigation_data.csv")

# Summary
st.header("📊 EDA Summary")
a,b,c,d = st.columns(4)
a.metric("Records",len(df))
b.metric("Features",len(df.columns))
c.metric("Missing",df.isnull().sum().sum())
d.metric("Duplicates",df.duplicated().sum())

# Preview
st.header("📋 Dataset Preview")
st.dataframe(df.head())

# Numerical
st.header("📈 Numerical Analysis")
num = df.select_dtypes("number").columns
x = st.selectbox("Select Feature",num
