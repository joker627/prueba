from flask import Flask, request, jsonify

app = Flask(__name__)

datos = []

@app.route("/")
def home():
    return jsonify({
        "msg": "ok",
        "datos": datos
    })

@app.route("/add", methods=["POST"])
def add():
    data = request.get_json()
    if data:
        datos.append(data)
    return jsonify(datos)

# requerido para Vercel
handler = app
