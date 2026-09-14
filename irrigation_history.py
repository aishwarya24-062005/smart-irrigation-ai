def history_adjustment(irrigation_need, previous_irrigation_mm):

    if previous_irrigation_mm >= 20:
        return "Reduce Irrigation - Previous Irrigation Was High"

    if previous_irrigation_mm <= 5:
        return irrigation_need

    return irrigation_need


# Test
result = history_adjustment("Medium", 3)

print("History-based Decision:", result)