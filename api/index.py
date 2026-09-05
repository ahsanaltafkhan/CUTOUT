from flask import Flask, request, send_file
import requests
import io
import os

app = Flask(__name__)

# This pulls the API key from Vercel's Environment Variables
API_KEY = os.environ.get('REMOVE_BG_API_KEY', 'your_fallback_api_key_here')

@app.route('/api/remove-bg', methods=['POST'])
def remove_background():
    try:
        if 'image' not in request.files:
            return {"error": "No image provided"}, 400
        
        file = request.files['image']
        
        # Send the file to Remove.bg API
        response = requests.post(
            'https://api.remove.bg/v1.0/removebg',
            files={'image_file': (file.filename, file.read(), file.content_type)},
            data={'size': 'auto'},
            headers={'X-Api-Key': API_KEY},
        )
        
        if response.status_code == requests.codes.ok:
            img_byte_arr = io.BytesIO(response.content)
            return send_file(img_byte_arr, mimetype='image/png')
        else:
            return {"error": f"API Error: {response.text}"}, response.status_code
    
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True)