from flask import Flask, request, jsonify

app = Flask(__name__)

# Datos ya cargados directamente
datos = [
    {"nombre": "Juan", "edad": 25},
    {"nombre": "Ana", "edad": 30}
]

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
    return jsonify({
        "datos": datos
    })

# requerido para Vercel
handler = app
