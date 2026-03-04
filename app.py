import os
import subprocess
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "AI Market Analyzer Backend", "status": "running"})

@app.route('/health')
def health():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    # Start the Node.js backend
    try:
        print("Starting Node.js backend...")
        subprocess.run([sys.executable, "-c", "import subprocess; subprocess.run(['npm', 'install'], check=True)"], shell=True)
        subprocess.run([sys.executable, "-c", "import subprocess; subprocess.run(['npm', 'run', 'build'], check=True)"], shell=True)
        subprocess.run(['node', 'dist/index.js'], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error starting backend: {e}")
        sys.exit(1)
