# Lead Management CRM Dashboard

A full-stack CRM application built with **Spring Boot** and **React** to manage sales leads. Features server-side pagination, dynamic search/filtering, and real-time analytics.

### Live Demo

* **Frontend (App):** https://lead-crm.faizarfi.dev/
* **Backend (API):** https://api-leadcrm.faizarfi.dev/

### Demo Credentials

To access the dashboard, use the following Basic Auth credentials:

* **Username:** `admin`
* **Password:** `password123`

---

## Tech Stack

**Backend:**

* **Java 17** + **Spring Boot 3**
* **MongoDB Atlas** (Database)
* **Spring Data MongoDB** (Advanced `Criteria` queries)
* **Spring Security** (Basic Authentication)

**Frontend:**

* **React** + **Vite**
* **Tailwind CSS** (Custom theme)
* **Axios** (API integration with Interceptors)

---

## Features

* **Automated Data Seeding:** Automatically populates the database with **500 dummy leads** on first startup.
* **Advanced Search & Filter:** Server-side filtering by Name, Email, and Status using MongoDB Regex.
* **Pagination & Sorting:** Efficient server-side pagination to handle large datasets.
* **Analytics Dashboard:** Real-time metrics for Total Leads, Conversion Rates, and Status distribution.
* **Secure Authentication:** Basic Auth implemented on both Frontend (Axios interceptors) and Backend (Spring Security).
* **Mobile Responsive:** Fully responsive UI built with Tailwind CSS.

---

## Environment Variables

To run this project, you need to set up the following environment variables.

### Backend (`application.properties`)

| Variable | Description | Example |
| --- | --- | --- |
| `MONGO_URI` | Connection string for MongoDB Atlas | `mongodb+srv://user:pass@cluster.mongodb.net/leads_db` |

### Frontend (`.env`)

| Variable | Description | Example |
| --- | --- | --- |
| `VITE_API_URL` | The URL of the deployed Backend API | `https://your-backend.onrender.com/api` |

---

## Setup & Installation

### 1. Backend Setup (Spring Boot)

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/[repo-name].git
cd backend

```


2. Configure MongoDB:
* Create a `.env` file or export the variable: `export MONGO_URI=...`
* Or update `src/main/resources/application.properties` for local testing.


3. Run the application:
```bash
mvn spring-boot:run

```


4. **Data Seeding:**
* On the first run, the `DataSeeder.java` class will check if the database is empty.
* If empty, it will generate **500 random leads** automatically.



### 2. Frontend Setup (React)

1. Navigate to the frontend folder:
```bash
cd frontend

```


2. Install dependencies:
```bash
npm install

```


3. Run locally:
```bash
npm run dev

```


* *Note:* The local setup uses `vite.config.js` proxy to forward requests to the backend.



---

## API Endpoints

| Method | Endpoint | Description | Query Params |
| --- | --- | --- | --- |
| `GET` | `/api/leads` | Fetch paginated leads | `page`, `size`, `search`, `status`, `sort` |
| `POST` | `/api/leads` | Create a new lead | N/A |
| `GET` | `/api/leads/metrics` | Get analytics stats | N/A |

---

## Project Structure

```text
├── backend
│   ├── src/main/java/dev/faizarfi/dashboard
│   │   ├── config/       # Security & CORS Config
│   │   ├── controller/   # REST API Controllers
│   │   ├── model/        # MongoDB Document Classes
│   │   ├── repository/   # Custom Criteria Queries
│   │   └── service/      # Business Logic
│   └── pom.xml
│
└── frontend
    ├── src
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Login & Dashboard Views
    │   ├── services/     # API & Auth logic
    │   └── App.jsx
    └── vite.config.js    # Proxy configuration

```
