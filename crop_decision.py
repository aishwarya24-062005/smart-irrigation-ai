def crop_adjustment(irrigation_need, crop_type, growth_stage):

    if growth_stage.lower() == "flowering":
        if irrigation_need == "Low":
            return "Moderate Irrigation Required"

    if growth_stage.lower() == "fruiting":
        if irrigation_need != "High":
            return "Moderate Irrigation Required"

    return irrigation_need


# Test
result = crop_adjustment("Low", "Rice", "Flowering")

print("Crop-based Decision:", result)
