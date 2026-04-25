# SmartSeason | Field Monitoring System

SmartSeason is a comprehensive field monitoring system designed to help agricultural teams track crop progress across multiple fields during a growing season. The system provides role-based access for Admins (Coordinators) and Field Agents, ensuring efficient data collection and oversight.

## 🚀 Live Demo

- **Frontend:** [https://smart-season-field-monitoring-syste-alpha-coral.vercel.app](https://smart-season-field-monitoring-syste-alpha-coral.vercel.app)
- **Backend API:** [https://smartseason-field-monitoring-system-oced.onrender.com](https://smartseason-field-monitoring-system-oced.onrender.com)

---

## 🔑 Demo Credentials

Use the following accounts to explore the system's role-based features:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@test.com` | `admin1234` |
| **Field Agent** | `agent@test.com` | `agent1234` |

---

## 🏗️ Design Decisions

- **Clean System Design:** Utilized a monorepo-style structure with clear separation between the Express backend and React frontend.
- **Modern UI:** Built with React and Vanilla CSS, focusing on high-precision data visualization. The interface uses a "Digital Agronomy" aesthetic—balancing organic growth themes with professional data management.
- **Computed Field Status:** Instead of manual status updates, the system computes status dynamically based on lifecycle stage and timing, reducing manual overhead and error.
- **Prisma ORM:** Used Prisma for type-safe database access and automated migrations, allowing for reliable data handling across local and cloud environments.

---

## 🌾 Field Status Logic (Approach)

The system computes a field's status based on its current stage and the time elapsed since planting:

- **Completed:** Any field that has reached the **Harvested** stage.
- **At Risk:** A field is flagged as "At Risk" if it is in the **Ready** stage but has not been harvested for more than **30 days** since planting. This logic assumes that crops ready for harvest are time-sensitive and require immediate attention to prevent spoilage.
- **Active:** Any field that is currently in progress (Planted, Growing, or Ready) and does not meet the "At Risk" criteria.

---

## 🛠️ Local Setup Instructions

### Backend Setup
1. Navigate to the `backend` directory and install dependencies:
   ```bash
   npm install
   ```
2. Configure your `.env` (use `.env.example` as a template).
3. Run database migrations and seed the data:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory and install dependencies:
   ```bash
   npm install
   ```
2. Configure your `.env` (pointing `VITE_API_URL` to your backend).
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📝 Assumptions

1. **One Agent per Field:** Fields are assigned to a single agent to maintain clear accountability.
2. **Sequential Progress:** It is assumed crops move forward through stages (Planted -> Growing -> Ready -> Harvested).
3. **Data Integrity:** The "At Risk" logic assumes the `plantingDate` is correctly logged at the start of the field lifecycle.
