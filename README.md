# 💰 Personal Finance Visualizer

A comprehensive and intuitive web application to help you **track your finances**, **visualize spending patterns**, and **manage budgets** effectively.  
Built with **Next.js**, **React**, and **MongoDB**, it offers a responsive, modern, and interactive user experience.

---

## ✨ Features

- **📌 Transaction Management**  
  Add, edit, and delete financial transactions with categorized labels.
  
- **🧮 Budget Planning**  
  Set monthly budgets per category and track usage visually.

- **📊 Data Visualization**  
  Understand your spending habits using interactive charts:
  - Monthly expense trends
  - Category-wise breakdown

- **📉 Budget Tracking**  
  Real-time feedback on budget utilization.

- **📱 Responsive Design**  
  Seamless experience across desktop and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.5** with App Router
- **React 19**
- **Tailwind CSS** for styling
- **Recharts** for dynamic data visualization
- **React Hook Form + Zod** for form handling and validation
- **Radix UI** for accessible UI components

### Backend
- **Next.js API Routes**
- **MongoDB** with **Mongoose ODM**
- Server-side validation and database operations

---

## 🚀 Getting Started

### ✅ Prerequisites
- **Node.js v18+**
- **MongoDB** (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 🧾 Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/personal-finance-visualizer.git
   cd personal-finance-visualizer
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root with your MongoDB connection string:

   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🧭 Project Structure

```
/src
│
├── app             → App Router pages & API routes
├── components      → Reusable UI components by feature
├── lib             → Utility functions & MongoDB connector
├── models          → Mongoose schemas and models
```

---

## 🔍 Key Features Explained

### 📒 Transactions

Track each transaction with:

* Amount
* Date
* Description
* Category (e.g., Food, Transport, Entertainment)

All transactions are listed and visualized through insightful charts.

### 💡 Budgets

Set and monitor monthly budget limits per category.
See visual indicators when spending approaches or exceeds limits.

### 📊 Dashboard

A centralized view of your finances:

* Total monthly expenses
* Recent transactions
* Spending trends over time
* Category-wise spending summary

---

## 🧱 Data Architecture

### MongoDB Collections:

* **Transactions** – Logs of all user transactions
* **Budgets** – Monthly budget limits for each category

### Client-Side Data Handling

To ensure Mongoose compatibility with Next.js:

* Server-only Mongoose models
* API-based data operations
* Typed helpers and validation for client components

---

## ☁️ Deployment

You can deploy this app on **Vercel** or any platform supporting Next.js:

```bash
npm run build
npm run start
```

---

## 📄 License

This project is licensed under the **MIT License**.
Feel free to fork, modify, and use it for your own financial planning!

```

Let me know if you'd like:
- A version with demo screenshots
- GitHub badges
- A logo/banner at the top
```
