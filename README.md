# SmartSeason | Field Monitoring System

SmartSeason is a comprehensive field monitoring system designed to help agricultural teams track crop progress across multiple fields during a growing season. The system provides role-based access for Admins (Coordinators) and Field Agents, ensuring efficient data collection and oversight.

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** database
- **npm** or **yarn**

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the `backend` directory with the following:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/smartseason"
   ACCESS_TOKEN_SECRET="your_secret_key"
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Seed the database with test accounts:
   ```bash
   npx prisma db seed
   ```
6. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Demo Credentials

Access the system using the following accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@test.com` | `admin1234` |
| **Field Agent** | `agent@test.com` | `agent1234` |

---

## 🏗️ Design Decisions

- **Clean System Design:** Utilized a monorepo-style structure with clear separation between the Express backend and React frontend.
- **Modern UI:** Built with React and Vanilla CSS, focusing on high-precision data visualization and clear information hierarchy. The interface uses a "Digital Agronomy" aesthetic—balancing organic growth themes with professional data management.
- **Computed Field Status:** Instead of manually updating status, it is computed dynamically based on the field's lifecycle stage and planting date. This reduces data entry errors and provides real-time insights.
- **Prisma ORM:** Used Prisma for type-safe database access and easy schema management, allowing for rapid iteration on the data model.

---

## 🌾 Field Status Logic (Approach)

The system computes a field's status based on its current stage and the time elapsed since planting:

- **Completed:** Any field that has reached the **Harvested** stage.
- **At Risk:** A field is flagged as "At Risk" if it is in the **Ready** stage but has not been harvested for more than **30 days** since planting. This logic assumes that crops ready for harvest are time-sensitive and require immediate attention to prevent spoilage.
- **Active:** Any field that is currently in progress (Planted, Growing, or Ready) and does not meet the "At Risk" criteria.

---

## 📝 Assumptions

1. **Agent Assignment:** Fields are assigned to a single Field Agent at a time to maintain clear accountability.
2. **Sequential Stages:** While the UI allows stage updates, it is assumed that fields generally move through the stages sequentially (Planted -> Growing -> Ready -> Harvested).
3. **Data Freshness:** The "At Risk" calculation relies on the `plantingDate` being accurately recorded at creation.
