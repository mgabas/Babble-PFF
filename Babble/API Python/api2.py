from flask import Flask, jsonify, request
import requests
from flask_cors import CORS, cross_origin
import pandas as pd
import pickle
import spacy
import time
import re

nlp = spacy.load('en_core_web_sm')

def cleanText(data):
    lemma_text = []
    for text in data:
        nlp_text = nlp(text)
        buffer = []
        for token in nlp_text:
            lemma_token = token.lemma_
            buffer.append(lemma_token)
        lemma_text.append(buffer)
    filtered_text = []
    for text in lemma_text:
        buffer = []
        for token in text:
            term = nlp.vocab[token]
            if term.is_stop == False:
                buffer.append(token)
        filtered_text.append(buffer)
    refiltered_text = []
    for text in filtered_text:
        buffer = []
        for token in text:
            if re.sub(r"[^a-zA-ZÀ-ÿ]+", ' ', token) != ' ':
                buffer.append(re.sub(r"[^a-zA-ZÀ-ÿ]+", '', token))
        refiltered_text.append(buffer)
    my_stopwords = ['PRON', 'Twitter', 'RT']
    second_filter = []
    for text in refiltered_text:
        for token in text:
            if token not in my_stopwords and token.find('http') == -1 and len(token) > 2:
                second_filter.append(token)
    return second_filter

sentence = "I love you"

sent = []
string = str(cleanText([sentence])).strip('[]')   
sent.append(re.sub("'", '', string))

with open('model.pickle', 'rb') as handle:
    model = pickle.load(handle)

ypred = model.predict(sent)

if ypred[0] == 0:
    pred = "negatif"
elif ypred[0] == 4:
    pred = "positif"


dicto = { "sentence": sentence, "sentiment": pred}

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/sentiment", methods = ['GET', 'POST'])
def sentiment():

    if request.method == 'GET':
        res = jsonify(dicto)
        res.status_code = 200
        print(res)
        header = res.headers
        header['Access-Control-Allow-Origin'] = '*'
        return res

    if request.method == 'POST':
        data = request.json
        print(data)
        return data





if __name__ == '__main__':
    app.run(debug=True)