from flask import Flask,request,jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Hello world'

@app.route('/response',methods = ['POST','GET'])
def response():
    try:
        data = request.get_json()
        prompt = data.get('prompt')
        print(prompt)
        return jsonify({'success':True,'response':prompt}),200
    except Exception as e:
        return jsonify({'success':False,'response':'Error'}),400


if __name__ == '__main__':
    app.run()