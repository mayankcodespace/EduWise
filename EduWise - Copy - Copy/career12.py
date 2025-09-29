from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS  # To allow React requests

# ==============================
# Load trained model + encoders
# ==============================
xgb_model = joblib.load("final_xgb_model.joblib")
mlb = joblib.load("mlb_encoder.joblib")                 # MultiLabelBinarizer
encoder = joblib.load("feature_encoder.joblib")         # OneHotEncoder
selected_features = joblib.load("selected_features.joblib")

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React

# ==============================
# Function for Prediction
# ==============================
def FunctionGeneratePrediction(inp_Stream, inp_CoreSubjects, inp_OptionalSubject,
                               inp_Hobbies, inp_Extracurricular, inp_Career):
    try:
        # Build input dataframe with exact column names used during training
        InputData = pd.DataFrame([{
            "Stream": inp_Stream or "None",
            "Core Subjects": inp_CoreSubjects or "None",
            "Optional Subject": inp_OptionalSubject or "None",
            "Hobbies": inp_Hobbies or "None",
            "Extracurricular Activities": inp_Extracurricular or "None",
            "Preferred Career": inp_Career or "None"
        }])

        # Step 1: Encode categorical features
        X_encoded = encoder.transform(InputData)

        # Step 2: Convert to DataFrame & align with selected features
        X_encoded = pd.DataFrame(X_encoded, columns=encoder.get_feature_names_out())
        for col in selected_features:
            if col not in X_encoded.columns:
                X_encoded[col] = 0
        X_encoded = X_encoded[selected_features]

        # Step 3: Predict probabilities
        y_pred_proba = xgb_model.predict(X_encoded)

        # Step 4: Decode predictions back to course labels
        predicted_courses = mlb.inverse_transform((y_pred_proba > 0.5).astype(int))

        return {"predicted_courses": predicted_courses[0] if predicted_courses else []}

    except Exception as e:
        return {"error": str(e)}

# ==============================
# API Routes
# ==============================
@app.route('/')
def home():
    return "✅ API is running. Use /prediction_api with POST (JSON body)."

@app.route('/prediction_api', methods=["POST"])
def prediction_api():
    try:
        data = request.get_json(force=True)
        Stream = data.get("Stream")
        Core_Subjects = data.get("Core Subjects")
        Optional_Subject = data.get("Optional Subject")
        Hobbies = data.get("Hobbies")
        Extracurricular = data.get("Extracurricular Activities")
        Career = data.get("Preferred Career")

        # Call prediction function
        prediction_from_api = FunctionGeneratePrediction(
            inp_Stream=Stream,
            inp_CoreSubjects=Core_Subjects,
            inp_OptionalSubject=Optional_Subject,
            inp_Hobbies=Hobbies,
            inp_Extracurricular=Extracurricular,
            inp_Career=Career
        )

        return jsonify(prediction_from_api)

    except Exception as e:
        return jsonify({"error": str(e)})

# ==============================
# Run the API
# ==============================
if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8081, threaded=True, debug=True)
