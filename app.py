from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/equipo-seguridad')
def equipo_seguridad():
    return render_template('equipo_seguridad.html')

@app.route('/accesorios')
def accesorios():
    return render_template('accesorios.html')

@app.route('/herramientas')
def herramientas():
    return render_template('herramientas.html')

if __name__ == '__main__':
    app.run(debug=True)