# 🎯 Trivia Game

A modern, responsive trivia game built with React and Tailwind CSS, powered by the Open Trivia Database (OpenTDB) API.

## ✨ Features

- **Customizable Quiz Settings**: Choose your preferred quiz configuration
  - Number of questions (1-50)
  - Difficulty levels (Any, Easy, Medium, Hard)
  - Categories (Any, General Knowledge, Sports, History, Science, and more)
  - Question types (Any, Multiple Choice, True/False) 

- **Interactive Quiz Experience**: Clean, user-friendly interface for answering questions
- **Detailed Results**: Review your performance with color-coded answer feedback
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Progress Tracking**: Visual progress bar during quiz

## 🚀 Demo

[Live Demo](https://gustavoomart.github.io/trivia-react-js)

## 🛠️ Technologies Used

- **React** - Frontend framework
- **JavaScript** - Programming language
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **OpenTDB API** - Trivia questions database
- **Vite** - Build tool

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/gustavoomart/trivia-react-js.git
cd trivia-react-js
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` or informed port

## 🎮 How to Play

1. **Start Page**: Configure your quiz settings
   - Select the number of questions
   - Choose difficulty level
   - Pick a category
   - Select question type
   - Click "Start Quiz"

2. **Quiz Page**: Answer each question by clicking on your chosen option
   - Progress bar shows your current position
   - Questions are presented one at a time

3. **Results Page**: Review your performance
   - See your final score and accuracy percentage
   - Review each question with color-coded answers:
     - 🟢 Green: Correct answer
     - 🔴 Red: Your incorrect choice
     - 🟢 Dark Green: Correct answer you chose

## 🏗️ Project Structure

```
.
└── src/
    ├── assets/
    │   └── react.svg               # react logo
    ├── hooks/                      
    │   └── useQuizGameManager.js   # manage game match
    ├── pages/                      
    │   ├── StartPage.jsx           # config page
    │   ├── QuizPage.jsx            # game match page
    │   └── ResultPage.jsx          # show match result
    ├── services/                   
    │   └── triviaApi.js            # handle OpenTDB requests
    └── styles/                     
        ├── loader.css              # loader effect
        └── circular-progress.css   # circular indicator
```

## 🌐 API Reference

This project uses the [Open Trivia Database API](https://opentdb.com/api_config.php):

- **Base URL**: `https://opentdb.com/api.php`
- **Categories**: Fetched from `https://opentdb.com/api_category.php`
- **Question Types**: Multiple Choice, True/False
- **Difficulties**: Easy, Medium, Hard

## 🎨 Features in Detail

### Quiz Configuration
- **Amount**: 1-50 questions
- **Difficulty**: Any, Easy, Medium, Hard
- **Categories**: 24+ categories including:
  - General Knowledge
  - Entertainment (Books, Film, Music, TV)
  - Science & Nature
  - Sports
  - Geography
  - History
  - And many more!

### Question Types
- **Multiple Choice**: 4 options per question
- **True/False**: Simple boolean questions with ✔/☓ symbols
- **Mixed**: Combination of both types

### Results Analysis
- Accuracy percentage calculation
- Question-by-question review
- Visual feedback with color coding
- Option to restart or try new settings

## 📱 Responsive Design

The game is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen orientations

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the trivia questions API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) team for the amazing framework

## 📧 Contact


[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gustavo-martins-camargo/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gustavoomart)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gustavomartinsv@gmail.com)