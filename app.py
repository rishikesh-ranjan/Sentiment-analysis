from flask import Flask, jsonify,render_template, request 
from flask_cors import CORS
import pickle

# Load the Logistic Regression model and CountVectorizer object from disk
cv = pickle.load(open('cv.pkl','rb')) ##loading cv
classifier_lr = pickle.load(open('sentiment.pkl','rb')) ##loading model

app = Flask(__name__) ## defining flask name
app.config['CORS_HEADERS'] = 'Content-Type' 
app.config['SESSION_COOKIE_DOMAIN'] = False
app.config['Access-Control-Allow-Credentials'] = True

cors = CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/') ## home route
def home():
    # return render_template('home.html') ##at home route returning home.html to show
    return jsonify(message= "running"),200

@app.route('/predict',methods=['POST']) ## on post request /predict 
def predict():
    if request.method=='POST':     
        content = request.form['text']  ## requesting the content of the text field
        data = [content] ## converting text into a list
        vect = cv.transform(data).toarray() ## transforming the list of sentence into vecotor form
        pred = classifier_lr.predict(vect) ## predicting the class(0 = negative, 1 = neutral, 2 = positive)
        # return render_template('result.html',prediction=pred) ## returning result.html with prediction var value as class value(0,1)
        return jsonify(prediction = int(pred[0])), 200
        
if __name__ == "__main__":
    app.run(debug=True)     ## running the flask app as debug==True