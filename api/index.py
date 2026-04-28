from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

datos = [{"nombre": "Juan"}]

@app.get("/")
def home():
    return {"datos": datos}

# adaptador para Vercel
handler = Mangum(app)
