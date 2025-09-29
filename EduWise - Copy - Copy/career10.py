from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS  # To allow React frontend requests

# Load model, encoder, and selected features
log_reg_model = joblib.load("log_reg_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")
selected_features = joblib.load("selected_features.pkl")

app = Flask(__name__)
CORS(app)  # Allow requests from any origin (React running on localhost:3000)

# Function for prediction
def FunctionGenerateStreamPrediction(InputData):
    df_encoded = pd.get_dummies(InputData)
    df_encoded = df_encoded.reindex(columns=selected_features, fill_value=0)

    prediction = log_reg_model.predict(df_encoded)[0]
    stream = label_encoder.inverse_transform([prediction])[0]
    return {"predicted_stream": stream}

# Root route
@app.route('/')
def home():
    return "✅ API is running. Use /prediction_api with POST (JSON body)."

# Prediction API (POST only for React)
@app.route('/prediction_api', methods=["POST"])
def prediction_api():
    try:
        data = request.get_json(force=True)
        # Build input DataFrame
        SampleInputData = pd.DataFrame([{
            "Interest_in_Maths": data.get("Interest_in_Maths"),
            "Interest_in_Science": data.get("Interest_in_Science"),
            "Interest_in_SocialScience": data.get("Interest_in_SocialScience"),
            "Hobbies": data.get("Hobbies"),
            "Extracurricular_Activities": data.get("Extracurricular_Activities")
        }])

        prediction = FunctionGenerateStreamPrediction(SampleInputData)
        return jsonify(prediction)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, threaded=True, debug=True)
