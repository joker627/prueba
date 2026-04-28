from fastapi import FastAPI
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración de CORS
origins = [
    "http://localhost",  # Para tu entorno de desarrollo local
    "http://localhost:3000",
    "http://127.0.0.1:3000", # Si usas React u otros frameworks con puerto específico
    "https://tudominio.com"  # Cambia por el dominio de tu frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir dominios
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los headers
)

# Datos de ejemplo
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
