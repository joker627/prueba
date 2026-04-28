from fastapi import FastAPI

app = FastAPI()

datos = [{"nombre": "Juan"}]

@app.get("/")
def home():
    return {"datos": datos}
