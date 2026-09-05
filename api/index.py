from flask import Flask, request, send_file
from rembg import remove
from PIL import Image
import io

app = Flask(__name__)

@app.route('/api/remove-bg', methods=['POST'])
def remove_background():
    try:
        if 'image' not in request.files:
            return {"error": "No image provided"}, 400
        
        file = request.files['image']
        img = Image.open(file.stream)
        
        # Remove background
        output = remove(img)
        
        # Save output to bytes
        img_byte_arr = io.BytesIO()
        output.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        
        return send_file(img_byte_arr, mimetype='image/png')
    
    except Exception as e:
        return {"error": str(e)}, 500

# Vercel requires the app instance to be exposed
if __name__ == '__main__':
    app.run(debug=True)