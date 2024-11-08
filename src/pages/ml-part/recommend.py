import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt
import seaborn as sns
import json

# Read the processed CSV file
csv_path = 'C:\\Users\\91951\\Desktop\\SEM 5\\projs\\AI_AWS\\jim-ai\\src\\pages\\ml-part\\data-set\\processed_megaGymDataset.csv'
df_csv = pd.read_csv(csv_path)

# Filter the DataFrame for each body part
legs_ratings = df_csv[df_csv['BodyPart'] == 'legs']['Rating'].dropna().values
chest_ratings = df_csv[df_csv['BodyPart'] == 'chest']['Rating'].dropna().values
arms_ratings = df_csv[df_csv['BodyPart'] == 'arms']['Rating'].dropna().values
back_ratings = df_csv[df_csv['BodyPart'] == 'back']['Rating'].dropna().values
abs_ratings = df_csv[df_csv['BodyPart'] == 'abs']['Rating'].dropna().values
shoulders_ratings = df_csv[df_csv['BodyPart'] == 'shoulders']['Rating'].dropna().values

# Check if any ratings arrays are empty and handle accordingly
if len(legs_ratings) == 0:
    legs_ratings = [5]  # Default value if no ratings are available
if len(chest_ratings) == 0:
    chest_ratings = [5]  # Default value if no ratings are available
if len(arms_ratings) == 0:
    arms_ratings = [5]  # Default value if no ratings are available
if len(back_ratings) == 0:
    back_ratings = [5]  # Default value if no ratings are available
if len(abs_ratings) == 0:
    abs_ratings = [5]  # Default value if no ratings are available
if len(shoulders_ratings) == 0:
    shoulders_ratings = [5]  # Default value if no ratings are available

# Generate sample data
np.random.seed(0)
num_samples = 100

# Sample data columns
data = {
    "Height": np.random.randint(150, 200, num_samples),
    "Weight": np.random.randint(50, 100, num_samples),
    "BMI": np.random.uniform(18.5, 30, num_samples),
    "Days_Since_Leg": np.random.randint(0, 7, num_samples),
    "Days_Since_Chest": np.random.randint(0, 7, num_samples),
    "Days_Since_Arms": np.random.randint(0, 7, num_samples),
    "Days_Since_Back": np.random.randint(0, 7, num_samples),
    "Days_Since_Abs": np.random.randint(0, 7, num_samples),
    "Days_Since_Shoulders": np.random.randint(0, 7, num_samples),
    "Leg_Intensity": np.random.choice(legs_ratings, num_samples),
    "Chest_Intensity": np.random.choice(chest_ratings, num_samples),
    "Arm_Intensity": np.random.choice(arms_ratings, num_samples),
    "Back_Intensity": np.random.choice(back_ratings, num_samples),
    "Abs_Intensity": np.random.choice(abs_ratings, num_samples),
    "Shoulders_Intensity": np.random.choice(shoulders_ratings, num_samples),
    "Body_Type_mesomorph": np.random.randint(0, 2, num_samples),
    "Body_Type_endomorph": np.random.randint(0, 2, num_samples),
}

# Target recovery scores
data["Recovery_Leg"] = data["Days_Since_Leg"] * 2 - data["Leg_Intensity"]
data["Recovery_Chest"] = data["Days_Since_Chest"] * 1.3 - data["Chest_Intensity"]
data["Recovery_Arms"] = data["Days_Since_Arms"] * 1.2 - data["Arm_Intensity"]
data["Recovery_Back"] = data["Days_Since_Back"] * 1.4 - data["Back_Intensity"]
data["Recovery_Abs"] = data["Days_Since_Abs"] * 1.1 - data["Abs_Intensity"]
data["Recovery_Shoulders"] = data["Days_Since_Shoulders"] * 1.2 - data["Shoulders_Intensity"]

# Convert data into a DataFrame
df = pd.DataFrame(data)

# Split data into features (X) and targets (Y)
X = df.drop(columns=["Recovery_Leg", "Recovery_Chest", "Recovery_Arms", "Recovery_Back", "Recovery_Abs", "Recovery_Shoulders"])
Y = df[["Recovery_Leg", "Recovery_Chest", "Recovery_Arms", "Recovery_Back", "Recovery_Abs", "Recovery_Shoulders"]]

# Train/test split
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=0)

# Standardize the data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train the multi-regression model
model = LinearRegression()
model.fit(X_train_scaled, Y_train)

# Predict and evaluate the model
Y_pred = model.predict(X_test_scaled)
mse = mean_squared_error(Y_test, Y_pred)
r2 = r2_score(Y_test, Y_pred)

print(f"Mean Squared Error: {mse:.2f}")
print(f"R^2 Score: {r2:.2f}")

# Read today's data from JSON file
json_path = 'C:\\Users\\91951\\Desktop\\SEM 5\\projs\\AI_AWS\\jim-ai\\src\\pages\\jason\\me.json'
with open(json_path, 'r') as file:
    today = json.load(file)

# Convert today's data to a DataFrame and align columns
today_df = pd.DataFrame([today])
today_df = today_df.reindex(columns=X_train.columns, fill_value=0)  # Ensure columns and order match X_train

# Transform today's data with the scaler
today_scaled = scaler.transform(today_df)

# Predict recovery scores for today
recovery_scores_today = model.predict(today_scaled)
recovery_scores_today = pd.DataFrame(recovery_scores_today, columns=["Recovery_Leg", "Recovery_Chest", "Recovery_Arms", "Recovery_Back", "Recovery_Abs", "Recovery_Shoulders"])

# Display recovery scores
print("Predicted Recovery Scores for Today:")
print(recovery_scores_today)

# Define muscle group combinations for workout splits
splits = {
    "Pull Day": ["Recovery_Back", "Recovery_Arms"],
    "Push Day": ["Recovery_Chest", "Recovery_Arms", "Recovery_Shoulders"],
    "Leg Day": ["Recovery_Leg"],
    "Abs/Core Day": ["Recovery_Abs"],
    "Upper Body Day": ["Recovery_Chest", "Recovery_Back", "Recovery_Arms", "Recovery_Shoulders"],
    "Lower Body Day": ["Recovery_Leg", "Recovery_Abs"],
    "Full Body Day": ["Recovery_Leg", "Recovery_Chest", "Recovery_Back", "Recovery_Arms", "Recovery_Abs", "Recovery_Shoulders"],
    "Back day": ["Recovery_Back"],
    "Chest day": ["Recovery_Chest"],
    "Arm day": ["Recovery_Arms"],
    "Shoulder day": ["Recovery_Shoulders"],
}

# Identify muscle groups with high recovery scores
threshold = -0.5  # Adjust the threshold based on recovery score preference
well_recovered = recovery_scores_today.columns[recovery_scores_today.iloc[0] > threshold].tolist()
print("Well Recovered Muscle Groups:", well_recovered)

# Determine the recommended workout split
recommended_split = "Rest Day"  # Default recommendation if no groups are well recovered
for split, muscles in splits.items():
    if all(muscle in well_recovered for muscle in muscles):
        recommended_split = split
        break

print(f"Recommended Workout for Today: {recommended_split}")

# Recommend 5 workouts from the selected split
recommended_workouts = []
if recommended_split != "Rest Day":
    for muscle in splits[recommended_split]:
        if muscle == "Recovery_Leg":
            body_part = "legs"
            intensity_key = "Leg_Intensity"
        elif muscle == "Recovery_Chest":
            body_part = "chest"
            intensity_key = "Chest_Intensity"
        elif muscle == "Recovery_Arms":
            body_part = "arms"
            intensity_key = "Arm_Intensity"
        elif muscle == "Recovery_Back":
            body_part = "back"
            intensity_key = "Back_Intensity"
        elif muscle == "Recovery_Abs":
            body_part = "abs"
            intensity_key = "Abs_Intensity"
        elif muscle == "Recovery_Shoulders":
            body_part = "shoulders"
            intensity_key = "Shoulders_Intensity"
        
        workouts = df_csv[df_csv['BodyPart'] == body_part].sort_values(by='Rating', ascending=False)
        
        # Select workouts that can neutralize the current intensity value
        current_intensity = today[intensity_key]
        neutralizing_workouts = workouts[workouts['Rating'] <= current_intensity]
        if len(neutralizing_workouts) < 5:
            neutralizing_workouts = workouts.head(5)
        recommended_workouts.extend(neutralizing_workouts.sample(min(5, len(neutralizing_workouts)))['Title'].tolist())
    recommended_workouts = recommended_workouts[:5]  # Limit to 5 workouts
    print("Recommended Workouts:")
    for workout in recommended_workouts:
        print(workout)
else:
    print("No workouts recommended for today. Take a rest day.")

# Save the recommended workout and chosen split to a JSON file
output_data = {
    "recommended_split": recommended_split,
    "recommended_workouts": recommended_workouts
}

output_path = 'C:\\Users\\91951\\Desktop\\SEM 5\\projs\\AI_AWS\\jim-ai\\src\\pages\\jason\\data\\recom.json'
with open(output_path, 'w') as outfile:
    json.dump(output_data, outfile, indent=4)

print(f"Recommended workout and chosen split saved to {output_path}")

# Example 1: Scatter Plot of Actual vs. Predicted Recovery Scores
plt.figure(figsize=(10, 6))
for i, col in enumerate(Y.columns):
    plt.subplot(2, 3, i + 1)
    plt.scatter(Y_test[col], Y_pred[:, i], alpha=0.5)
    plt.plot([Y_test[col].min(), Y_test[col].max()], [Y_test[col].min(), Y_test[col].max()], 'r--')
    plt.xlabel('Actual')
    plt.ylabel('Predicted')
    plt.title(f'Actual vs. Predicted {col}')
plt.tight_layout()
plt.show()

# Example 2: Residual Plot
plt.figure(figsize=(10, 6))
for i, col in enumerate(Y.columns):
    plt.subplot(2, 3, i + 1)
    residuals = Y_test[col] - Y_pred[:, i]
    sns.histplot(residuals, kde=True)
    plt.xlabel('Residuals')
    plt.title(f'Residuals for {col}')
plt.tight_layout()
plt.show()

# Example 3: Feature Importance Plot
feature_importance = np.abs(model.coef_).mean(axis=0)
feature_names = X.columns

plt.figure(figsize=(10, 6))
sns.barplot(x=feature_importance, y=feature_names)
plt.xlabel('Feature Importance')
plt.title('Feature Importance for Predicting Recovery Scores')
plt.show()