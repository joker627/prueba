from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

datos = [{"nombre": "Juan"}]

@app.get("/")
def home():
    return {
        "ok": True,
        "datos": datos
    }

@app.get("/add")
def add():
    datos.append({"nombre": "nuevo"})
    return {"datos": datos}

#  obligatorio en Vercel
handler = Mangum(app)
