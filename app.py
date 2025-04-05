# from flask import Flask, render_template, jsonify
# import json
# import datetime
# import hashlib

# app = Flask(__name__)

# with open('challenges.json') as f:
#     challenges = json.load(f)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/daily')
# def get_daily_challenge():
#     today = datetime.date.today().isoformat()
#     idx = int(hashlib.sha256(today.encode()).hexdigest(), 16) % len(challenges)
#     return jsonify(challenges[idx])

# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask, jsonify, render_template
import random

app = Flask(__name__)

challenges = {
    "java": [
        "Implement a simple Calculator using Java.",
        "Learn and practice Java Streams.",
        "Write a program to reverse a string using recursion.",
        "Practice Inheritance by creating a Vehicle class hierarchy.",
        "Implement a basic Stack using arrays in Java."
    ],
    "fitness": [
        "Do a 15-minute full-body workout.",
        "Take a 20-minute walk after dinner.",
        "Try a 7-minute HIIT session.",
        "Do 30 squats, 20 push-ups, and 10 burpees.",
        "Stretch for 10 minutes before bed."
    ],
    "weightloss": [
        "Replace one sugary snack with a fruit.",
        "Drink 2 liters of water today.",
        "Avoid junk food for 24 hours.",
        "Try intermittent fasting for 14 hours.",
        "Track your calories using an app."
    ],
    "habits": [
        "Write in a gratitude journal.",
        "Wake up 30 minutes earlier.",
        "Read 10 pages of a book.",
        "Avoid social media for 2 hours.",
        "Plan your day the night before."
    ]
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get-challenge/<category>')
def get_challenge(category):
    if category in challenges:
        challenge = random.choice(challenges[category])
        return jsonify({"challenge": challenge})
    return jsonify({"challenge": "Invalid category selected."})

if __name__ == '__main__':
    app.run(debug=True)
