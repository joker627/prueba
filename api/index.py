from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

datos = [
    {"id": 1, "nombre": "Juan", "edad": 25, "pais": "Colombia"},
    {"id": 2, "nombre": "Ana", "edad": 30, "pais": "México"},
    {"id": 3, "nombre": "Carlos", "edad": 22, "pais": "España"},
    {"id": 4, "nombre": "María", "edad": 28, "pais": "Argentina"},
    {"id": 5, "nombre": "Luis", "edad": 35, "pais": "Perú"},
    {"id": 6, "nombre": "Sofía", "edad": 27, "pais": "Chile"},
    {"id": 7, "nombre": "Pedro", "edad": 40, "pais": "Brasil"},
    {"id": 8, "nombre": "Lucía", "edad": 19, "pais": "Uruguay"}
]

@app.get("/")
def home():
    return {"datos": datos}


# handler para serverless
handler = Mangum(app)
