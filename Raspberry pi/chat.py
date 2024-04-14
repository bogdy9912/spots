import whisper,requests,pyttsx3,sys

path = sys.argv[1]

#Speech To Text
model = whisper.load_model("tiny.en")
result = model.transcribe(path, language="en", fp16=False, verbose=False)
print(result["text"])

#Posting
url = "https://klbmtkyzzkl4zwcwydjkh3thfi0kawbo.lambda-url.us-east-1.on.aws/GptCaller/askChatGPT"
headers = {"Content-Type": "text/plain; charset=utf-8"}
payload = result["text"]

x = requests.post(url, headers = headers, data = payload)

print(x.text)
print(x.status_code)

#Text To Speech
engine = pyttsx3.init()

""" RATE"""
rate = engine.getProperty('rate')
engine.setProperty('rate', rate - 50)

"""VOICE"""
voices = engine.getProperty('voices')       #getting details of current voice
engine.setProperty('voice', "female") 

engine.say(x.text)
engine.runAndWait()
engine.stop()
