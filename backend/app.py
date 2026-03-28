from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

DB_FILE = os.path.join(os.path.dirname(__file__), 'applications.db')

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS applicants_v2 (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            university TEXT NOT NULL,
            regNumber TEXT NOT NULL,
            github TEXT,
            linkedin TEXT,
            reason TEXT NOT NULL,
            applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Initialize DB on startup
init_db()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "API is healthy and listening."})

@app.route('/api/apply', methods=['POST'])
def submit_application():
    data = request.json
    
    required_fields = ['fullName', 'email', 'phone', 'university', 'regNumber', 'reason']
    if not all(field in data and data.get(field) for field in required_fields):
        return jsonify({"error": "Please fill out all required fields."}), 400

    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('''
            INSERT INTO applicants_v2 (fullName, email, phone, university, regNumber, github, linkedin, reason)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['fullName'],
            data['email'],
            data['phone'],
            data['university'],
            data['regNumber'],
            data.get('github', ''),
            data.get('linkedin', ''),
            data['reason']
        ))
        conn.commit()
        application_id = c.lastrowid
        conn.close()
        
        return jsonify({
            "message": "Application received successfully!",
            "applicationId": application_id
        }), 201
    except Exception as e:
        print(f"Database error: {e}")
        return jsonify({"error": "Failed to submit application. Please try again."}), 500

@app.route('/api/export', methods=['GET'])
def export_applicants():
    import csv
    import io
    from flask import Response
    
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('SELECT id, fullName, email, phone, university, regNumber, github, linkedin, reason, applied_at FROM applicants_v2')
        rows = c.fetchall()
        column_names = [description[0] for description in c.description]
        conn.close()
        
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(column_names)
        writer.writerows(rows)
        
        return Response(
            output.getvalue(),
            mimetype="text/csv",
            headers={"Content-disposition": "attachment; filename=applicants.csv"}
        )
    except Exception as e:
        print(f"Export error: {e}")
        return jsonify({"error": "Failed to export data."}), 500

if __name__ == '__main__':
    print("Starting CodeBhumi Application Server on http://localhost:5000")
    app.run(port=5000, debug=True)
