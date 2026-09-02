# ============================================================
# WEEK 2 - FIELD & CROP REGISTRATION
# ============================================================
import streamlit as st
st.header("🌾 Field & Crop Registration")

with st.form("field_registration_form"):

    farmer_name = st.text_input(
        "👨‍🌾 Farmer Name"
    )

    field_location = st.text_input(
        "📍 Field Location"
    )

    col1, col2 = st.columns(2)

    with col1:
        latitude = st.number_input(
            "Latitude",
            format="%.6f"
        )

    with col2:
        longitude = st.number_input(
            "Longitude",
            format="%.6f"
        )

    field_size = st.number_input(
        "📐 Field Size (acres)",
        min_value=0.0,
        step=0.1
    )

    crop_type = st.selectbox(
        "🌱 Crop Type",
        [
            "Rice",
            "Wheat",
            "Maize",
            "Cotton",
            "Sugarcane",
            "Tomato",
            "Other"
        ]
    )

    growth_stage = st.selectbox(
        "🌿 Crop Growth Stage",
        [
            "Seedling",
            "Vegetative",
            "Flowering",
            "Fruiting",
            "Maturity"
        ]
    )

    sensor_id = st.text_input(
        "📡 Sensor ID"
    )

    submit = st.form_submit_button(
        "Register Field"
    )

    if submit:

        if not farmer_name:
            st.error("Please enter the farmer name.")

        elif not field_location:
            st.error("Please enter the field location.")

        elif field_size <= 0:
            st.error("Field size must be greater than 0.")

        elif not sensor_id:
            st.error("Please enter the sensor ID.")

        else:

            st.success(
                "✅ Field registered successfully!"
            )

            st.write("### Registration Details")

            st.write(
                "Farmer Name:",
                farmer_name
            )

            st.write(
                "Field Location:",
                field_location
            )

            st.write(
                "Latitude:",
                latitude
            )

            st.write(
                "Longitude:",
                longitude
            )

            st.write(
                "Field Size:",
                field_size,
                "acres"
            )

            st.write(
                "Crop Type:",
                crop_type
            )

            st.write(
                "Growth Stage:",
                growth_stage
            )

            st.write(
                "Sensor ID:",
                sensor_id
            )