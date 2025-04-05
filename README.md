# The-Daily-Challenge-Bot

# 🧠 Daily Challenge Bot

A lightweight and customizable Flask web app that gives you a new challenge every day across various categories like **Java programming**, **Fitness**, **Weight Loss**, and **Habits**. Designed for self-improvement, motivation, and routine building.

---

## 🌟 Features

- 🔁 Get random daily challenges across multiple categories
- 🌐 Simple web interface using Flask and HTML
- 📦 Lightweight and easy to deploy
- ⚡ API support for category-based challenge generation
- 🔄 Easily expandable with your own challenge sets

---

## 📸 Demo

![Daily Challenge Bot Screenshot](screenshot.png) <!-- Add your screenshot file here -->

---

## 📂 Project Structure

daily-challenge-bot/ │ ├── static/ # Static assets (CSS, JS) ├── templates/ │ └── index.html # Frontend template ├── app.py # Main Flask app ├── challenges.json (optional) # For JSON-based static version (disabled in this code) ├── requirements.txt # Python dependencies └── README.md # This file

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/daily-challenge-bot.git
cd daily-challenge-bot
2. Create and activate a virtual environment (recommended)
bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
3. Install dependencies
bash
Copy
Edit
pip install -r requirements.txt
4. Run the application
bash
Copy
Edit
python app.py
5. Open in your browser
Visit http://127.0.0.1:5000

🔗 API Endpoint
Get a challenge by category
sql
Copy
Edit
GET /get-challenge/<category>
Parameters:
<category> — one of: java, fitness, weightloss, habits

Response:
json
Copy
Edit
{
  "challenge": "Write in a gratitude journal."
}
Example:
bash
Copy
Edit
curl http://127.0.0.1:5000/get-challenge/fitness
🧩 Categories Supported
Category	Description
java	Java coding and programming tasks
fitness	Physical exercise and workouts
weightloss	Nutrition and weight management tips
habits	Positive habit-forming actions
📌 Future Improvements
🗓️ Integrate daily auto-refresh challenge logic (based on date)

🔐 Add user accounts and streak tracking

💾 Store challenges in a database

📱 Build a mobile version or Progressive Web App (PWA)

🎯 Add gamification (badges, points)

🛠️ Tech Stack
Backend: Python, Flask

Frontend: HTML (Jinja templating)

Data: Python dictionaries (easy to update)

📜 License
This project is licensed under the MIT License. See LICENSE for more information.

🙌 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

