from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

with open('logreg_pipeline.pkl', 'rb') as file:
    model = pickle.load(file)


@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)

        if isinstance(data, list):
            pass
        elif isinstance(data, dict):
            data = [data]
        else:
            print("Data Type: ", type(data))
            print("Data: ", data)
            raise Exception(f"Incompatible Data Type. Object is of type: {type(data)}")

        prediction = model.predict(pd.DataFrame(data))

        return jsonify(prediction.tolist())
    except Exception as e:
        print(f"An error occurredmaking prediction: {e}")
        return e
        
    
    


if __name__ == '__main__':
    app.run(port=5000)