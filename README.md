# **Task Management System**

A full-stack task management application built for the Full-Stack Developer Technical Assessment.

Users can create an account, log in, manage their own tasks, update their profile, and reset their password when needed.

## **Technologies Used**

### **Frontend**

* React
* TypeScript
* Vite
* React Router
* Axios
* React Hook Form
* Zod
* Tailwind CSS

### **Backend**

* Node.js
* Express.js
* TypeScript
* JWT
* bcryptjs
* Zod
* Nodemailer

### **Database**

* PostgreSQL
* Prisma ORM

## **Prerequisites**

Make sure the following are installed:

* Node.js 20+
* npm
* PostgreSQL
* Git

## **Installation**

### **1. Clone the repository**

```bash
git clone https://github.com/LianneTakumi/website.git
cd website/task-management-system
```

### **2. Install frontend dependencies**

```bash
cd client
npm install
```

### **3. Install backend dependencies**

Open another terminal, or go back to the project root:

```bash
cd server
npm install
```

## **Environment Variables**

Create a `.env` file inside the `server` folder:

```text
server/.env
```

Add the following:

```env
DATABASE_URL="postgresql://POSTGRES_USER:POSTGRES_PASSWORD@localhost:5432/task_management"
JWT_SECRET="your-jwt-secret"
CLIENT_URL="http://localhost:5173"

SMTP_HOST="your-smtp-host"
SMTP_PORT=587
SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"
```

| Variable       | Description                                         |
| -------------- | --------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string                        |
| `JWT_SECRET`   | Secret used to sign JWTs                            |
| `CLIENT_URL`   | Frontend URL used by the backend CORS configuration |
| `SMTP_HOST`    | SMTP server used for password-reset emails          |
| `SMTP_PORT`    | SMTP server port                                    |
| `SMTP_USER`    | SMTP username                                       |
| `SMTP_PASS`    | SMTP password                                       |

Do not commit your `.env` file or any passwords, database credentials, API keys, or other secrets.

A `.env.example` file is included as a reference.

## **PostgreSQL Setup**

Create a PostgreSQL database named:

```text
task_management
```

Using `psql`:

```sql
CREATE DATABASE task_management;
```

Make sure PostgreSQL is running before starting the backend.

## **Prisma Setup**

From the `server` folder, run:

```bash
npx prisma generate
```

Then apply the existing migrations:

```bash
npx prisma migrate deploy
```

The Prisma schema can be found at:

```text
server/prisma/schema.prisma
```

## **Run the Backend**

From the `server` folder:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

## **Run the Frontend**

From the `client` folder:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

Both the frontend and backend need to be running at the same time.

## **Demo Credentials**

A dedicated test account is available for testing:

```text
Email: test2@example.com
Username: testuser2
Password: NewTestPassword123!
```

These credentials are intended only for testing the assessment application.

## **Forgot Password / Reset Password**

The password reset flow uses an SMTP testing service.

### **1. Open the application**

```text
http://localhost:5173
```

### **2. Select "Forgot Password"**

Enter the email address of the test account.

The response is intentionally generic and does not indicate whether the email is registered.

### **3. Check the email testing service**

Open the password-reset email and use the reset link provided.

### **4. Set a new password**

Enter the new password and confirm it.

The reset token is securely generated, expires after a limited period, and can only be used once.

### **5. Verify the reset**

After resetting the password:

* The old password should no longer work.
* The new password should work.
* Trying to use the same reset link again should be rejected.

## **Application Features**

* User registration and login
* JWT authentication
* Protected routes
* Logout
* Forgot/reset password
* Profile viewing and updating
* Create, view, update, and delete tasks
* Search tasks
* Filter tasks by status and priority
* Dashboard task statistics
* Backend-enforced task ownership
* PostgreSQL database with Prisma ORM

## **Security**

* Passwords are hashed with bcrypt and are never stored as plain text.
* JWT authentication is required for protected API endpoints.
* Task ownership is checked by the backend.
* Password-reset tokens are generated securely and stored as hashes.
* Password-reset tokens expire and are invalidated after use.
* Environment variables and other sensitive credentials are excluded from Git.
