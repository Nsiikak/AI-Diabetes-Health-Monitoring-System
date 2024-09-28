# 🌟 AI-Driven Diabetes Health Monitoring System 🌍💉

## Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 About the Project

### 🌟Revolutionizing Diabetes Care & Global Healthcare with Artificial Intelligence 

This project harnesses cutting-edge **AI technologies** to tackle **SDG 3: Good Health and Well-being**, with a special focus on **diabetes management**. By employing **AI-powered tools** for **disease detection**, **accurate diagnosis**, and **treatment optimization**, we're driving transformative healthcare solutions. Starting our journey in **Nigeria**, we aspire to create healthcare systems that are more **predictive**, **personalized**, and **accessible**—especially for underserved communities. Together, we're revolutionizing healthcare and improving lives across the globe! 🌐💉✨

---

## 🛠️ Tech Stack

This innovative system is powered by:

- **Backend**: [NestJS](https://nestjs.com/) - A powerful and flexible framework for scalable server-side applications ⚙️.
- **Frontend**: [React](https://reactjs.org/) - A modern and dynamic library for building fast, interactive user interfaces 🎨.
- **Database**: [MySQL](https://www.mysql.org/) - A robust and reliable relational database for managing secure health data 📊.
- **AI Integration**: [Firebase](https://firebase.google.com/) - Harnessing the power of **AI** for medical chatbots and intelligent health suggestions 🔮.
- **Machine Learning Models**: Python-based ML models trained for diabetes risk prediction and treatment optimization.

---

## ✨ Features

This system is packed with incredible features to improve healthcare:

- 🔍 **AI-powered Diabetes Detection**: Advanced AI models provide real-time health insights and early detection capabilities.
- 📊 **Predictive Risk Assessment**: Machine learning models forecast diabetes-related risks, helping patients stay proactive.
- 🤖 **AI Chatbot**: Get instant, personalized health advice via an AI-powered medical chatbot. It's like having a doctor in your pocket!
- ⚕️ **Optimized Treatment Plans**: AI tailors medication and lifestyle recommendations to each patient's unique needs.
- 🌐 **Comprehensive Health Monitoring**: Track various health metrics, ensuring total well-being beyond diabetes management.

---

## 🏁 Getting Started

Ready to dive in? Follow these steps to set up the project and start changing the future of healthcare! 🚀

### 🔧 Prerequisites

Ensure you have these tools installed:

- [Node.js](https://nodejs.org/en/) (v14.x or higher) 
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.org/)
- A [Firebase](https://firebase.google.com/) account for AI-powered features
- [Python](https://www.python.org/) with relevant ML libraries for model training and integration 

### 📥 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Nsiikak/AI-Diabetes-Health-Monitoring-System.git
   cd AI-Diabetes-Health-Monitoring-System
   ```

2. **Install Backend Dependencies**:
   Navigate to the `backend` folder and install the required packages.

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   Navigate to the `frontend` folder and install the required packages.

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set Up the Database**:

   - Ensure MySQL (or your preferred SQL database) is installed and running 🖥️.
   - Create a new database for the project and update the database configuration in the `backend` folder.

   Example `.env` configuration:

   ```bash
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=yourusername
   DB_PASSWORD=yourpassword
   DB_NAME=health_monitoring
   ```

5. **Set Up Firebase**:

   - Go to [Firebase](https://firebase.google.com/) and create a new project.
   - Add your Firebase configuration details to the `.env` file:

   ```bash
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

6. **Set Up the ML Models**:

   - Navigate to the `ml-models` folder.
   - Ensure you have Python and required libraries (e.g., `scikit-learn`, `TensorFlow`, `Pandas`, etc.) installed.
   - Train the ML models (diabetes risk prediction, treatment optimization, etc.) using the provided datasets or any custom data.

---

## 🚀 Running Locally

Get the project up and running locally in just a few steps:

### Backend (NestJS) 🏗️

1. **Start the NestJS server**:

   ```bash
   cd backend
   npm run start:dev
   ```

2. The backend should now be running on `http://localhost:3000` ⚡.

### Frontend (React) 💻

1. **Start the React client**:

   ```bash
   cd frontend
   npm start
   ```

2. The frontend should now be running on `http://localhost:5000` 🚀.

### Machine Learning Models 🧠

1. **Run the ML models**:

   Navigate to the `ml-models` folder and run the necessary scripts for prediction:

   ```bash
   cd ../ml-models
   python predict.py
   ```

   The trained ML models will analyze user inputs and provide health predictions.

### Access the Application 🌐

- **Frontend**: Open `http://localhost:5000` in your browser to access the user-friendly, interactive interface.
- **Backend API**: The API is available at `http://localhost:3000/api`.

---

## 🗂️ Project Structure

```
AI-Diabetes-Health-Monitoring-System/
│
├── backend/            # NestJS backend code 🏗️
│   ├── src/            # Source files for backend
│   └── ...             # Other backend-specific folders and files
│
├── frontend/           # React frontend code 💻
│   ├── src/            # Source files for frontend
│   └── ...             # Other frontend-specific folders and files
│
├── ml-models/          # Python ML models for diabetes prediction 🧠
│   ├── datasets/       # Datasets used for model training
│   ├── models/         # Trained model files
│   └── src/            # ML code for training and prediction
│
├── README.md           # Project documentation 📚
└── .gitignore          # Git ignore file
```

---

## 🤝 Contributing

We welcome contributions from the community! 🙌 Here’s how you can help:

1. Fork the repository 🍴.
2. Create a new branch (`git checkout -b feature/your-feature`) 🌿.
3. Commit your changes (`git commit -m 'Add some feature'`) 💾.
4. Push to the branch (`git push origin feature/your-feature`) 🚀.
5. Open a pull request, and let’s collaborate! 🛠️

---

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more details 📜.

---

### 🎉 Thank you for checking out the **AI-Driven Diabetes Health Monitoring System**! Together, we can make a real difference in healthcare using **AI** and technology 🌍❤️.
