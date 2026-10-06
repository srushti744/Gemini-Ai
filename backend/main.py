from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

model = genai.GenerativeModel('gemini-3.8-flash')


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

class Student(BaseModel):
    id:int
    name:str


class prompt(BaseModel):
   text:str


@app.get('/home')
def home():
    return { 'message': 'FastAPI server is running'}

@app.post("/upload-data")
def upload_data(student:student):
    print(student.id)
    print(student.name)

@app.post('/send-prompt')
def send_prompt(prompt:prompt):
    response = model.generate_content(prompt.text)
    return{
        'response':response.text
    }

   