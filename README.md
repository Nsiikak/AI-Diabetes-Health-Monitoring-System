# AI-Driven Diabetes Health Monitoring System 🌍💡

**Revolutionizing Diabetes Care and Global Healthcare with Artificial Intelligence**

This project leverages **AI technologies** to address **SDG 3: Good Health and Well-being**, with a special focus on **diabetes management**. We use AI-powered tools for **disease detection**, **diagnosis**, and **treatment optimization**. Starting in Nigeria, we aim to make healthcare more predictive, personalized, and accessible for underserved communities.

### 🚀 Key Features:
- **Smart Diabetes Detection**: AI models for real-time health insights and early detection of diabetes.
- **Predictive Healthcare Models**: Machine learning algorithms to forecast diabetes-related risks and provide proactive healthcare suggestions.
- **AI-Powered Medical Chatbot**: A chatbot offering personalized health advice based on user inputs, enhancing access to healthcare information.
- **Optimized Treatment Plans**: AI tools to recommend medication and lifestyle changes, improving diabetes management.
- **Comprehensive Health Monitoring**: Monitors various health metrics, offering a holistic approach to healthcare beyond diabetes.

### ⚙️ Tech Stack:
- **Frontend**: React for building a dynamic and responsive user interface.
- **Backend**: NestJS for scalable server-side logic, integrating Firebase and machine learning models for AI-driven functionalities.
- **Database**: SQL for managing user health data and historical records, ensuring robust and secure storage.
- **AI Integration**: Firebase for Retrieval-Augmented Generation (RAG) to power the medical chatbot and provide health suggestions based on inputs.

---

### 🛠️ How to Set Up the Project

#### Prerequisites:
- Node.js (v14 or later)
- npm (for package management)
- SQL database (MySQL)
- Firebase account (for chatbot and AI-related features)

#### Clone the Repository:
```bash
git clone https://github.com/YourUsername/AI-Diabetes-Health-Monitoring-System.git
```

#### Install Dependencies:
```bash
cd AI-Diabetes-Health-Monitoring-System
npm install
```

#### Set Up Environment Variables:
1. Create a `.env` file in the root directory.
2. Add the following variables:
    ```bash
    DATABASE_URL=your_sql_database_url
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_PROJECT_ID=your_firebase_project_id
    ```

#### Database Setup:
- Ensure your SQL database is running.
- Run migrations (if applicable) to set up tables for health metrics, users, and medical data.

#### Running the Frontend (React):
```bash
cd frontend
npm start
```

#### Running the Backend (NestJS):
```bash
cd backend
npm run start:dev
```

### 🎯 Vision:
Starting with addressing **diabetes care** in **Nigeria**, the project aims to provide better healthcare for communities with limited access. Built with scalability in mind, it has the potential to deliver innovative AI-driven healthcare solutions worldwide.
