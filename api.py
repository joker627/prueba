from flask import Flask, request, jsonify

app = Flask(__name__)

# Datos en memoria
datos = []

# Ruta root (test)
@app.route("/", methods=["GET"])
def test():
    return jsonify({
        "mensaje": "API funcionando",
        "datos": datos
    })

# Agregar datos (simple)
@app.route("/add", methods=["POST"])
def add():
    data = request.get_json()

    if data:
        datos.append(data)  # guarda cualquier JSON

    return jsonify({
        "datos": datos
    })

# Ver datos
@app.route("/datos", methods=["GET"])
def get_datos():
    return jsonify(datos)

if __name__ == "__main__":
    app.run(debug=True)