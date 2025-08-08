# ForumHive 🐝

ForumHive is a feature-rich full-stack discussion platform built with the MERN stack, designed to encourage community engagement, learning. Users can register, share posts, interact via comments and votes, report activities, and explore posts using powerful filtering and searching features. The platform offers membership upgrades, badges, and an admin panel for managing users, reports, and announcements.

---

## 🚀 Live Site

🔗 [Visit ForumHive](https://forumhive.web.app)

---

## 🎯 Purpose

To create a dynamic, scalable, and user-engaging forum platform that allows:
- Users to share and explore posts by tags.
- Membership and badge system.
- Admin capabilities to manage content, users, and community standards.

---

## 🧩 Key Features

### 🔓 Authentication
- Firebase Authentication (Email/Password & Google Login)
- JWT implementation for secure authorization
- Badges assigned on registration and membership

### 🏠 Home Page
- Responsive Navbar with Login/Profile dropdown
- Banner search by tags (backend functionality)
- Tag section fetched from MongoDB
- Announcement section (conditionally rendered)
- All Posts displayed in reverse chronological order
- Sorting by Popularity (based on upVote - downVote)
- Pagination (5 posts per page)

### 🧾 Post Details Page
- Full post content with upvote/downvote/share buttons
- Comment section (auth protected)
- `react-share` for sharing (e.g., Facebook, WhatsApp)

### 💬 Comments
- Comment input with multiple comments allowed
- Comments tracked by post title
- Report system with feedback & modal view

### 🔐 Membership Page
- Stripe payment integration
- Gold badge assigned upon successful payment
- Non-members limited to 5 posts

### 👤 User Dashboard
- Layout-based dashboard for users
- My Profile: User info + 3 recent posts + badges
- Add Post: Form with validation & tag dropdown (react-select)
- My Posts: List, comment view, and delete functionality

### 🛡️ Admin Dashboard
- Layout-based admin panel
- Admin Profile: Overview with pie chart (post/comment/user stats)
- Manage Users: Server-side search + make admin
- Make Announcement: Adds data to announcement collection
- Reported Comments: Admin reviews with moderation controls

### 📱 Responsive Design
- Fully responsive on mobile, tablet, and desktop
- Clean color contrast and elegant spacing for recruiter-friendly UI

---

## 📦 Client-Side Technologies & Packages

- **React.js** (v19)
- **Vite** (v6)
- **Tailwind CSS** + DaisyUI
- **Firebase** (Auth)
- **JWT (Custom Backend Token)**
- **React Router v7**
- **React Hook Form**
- **React Share**
- **React Select**
- **React Icons**
- **Recharts** (Admin pie chart)
- **SweetAlert2**
- **GSAP & AOS** (Animations)
- **Lottie React**
- **Axios**
- **React Cookie**
- **Date-FNS**
- **React Helmet Async**
- **React Hot Toast**
- **React Responsive Carousel**
- **Material Tailwind React**

---

## 🧩 Server-Side Technologies

- **Node.js**
- **Express.js**
- **MongoDB (Native Driver)**
- **Dotenv**
- **Cors**
- **Stripe (for payment)**
- **JWT**

---

## 🔐 Environment Variables

### 🔒 Client
---
- **VITE_apiKey=**
- **VITE_authDomain=**
- **VITE_projectId=**
- **VITE_storageBucket=**
- **VITE_messagingSenderId=**
- **VITE_appId=**
- **VITE_base_server_url=**
- **VITE_IMGBB_API_KEY=**
- **VITE_STRIPE_KEY=**
---

### 🔒 Server

---
- **MONGODB_URI=**
- **JWT_SECRET=**
- **NODE_ENV=**
- **STRIPE_SECRETE=**
---


All credentials are stored securely using environment variables and `.env` files (not pushed to GitHub).



## 📊 Admin Pie Chart Example

Visualizes:
- Total posts
- Total comments
- Total users

Built using `recharts` under `/admin/profile` route.

---


## 💼 Recruiter Focused Design

- Clear visual hierarchy
- Responsive layout
- Readable font and spacing
- Functional and visually pleasing UI
- Project aims to stand out in real-world portfolios



## 🧑‍💻 Run the Project Locally
#### Follow these steps to set up and run Hobby Hub on your local machine:
1. Clone the repository
   ``` bash
       git clone https://github.com/soponalways/forum-hive-client.git
    ```
2. Navigate to the project directory
   ``` bash
       cd forum-hive-client
   ```
3. Install all dependencies
   ``` bash
       npm install
   ```
4. Create .env file on root folder then add all this credintial
    ```bash
   VITE_apiKey=
   VITE_authDomain=
   VITE_projectId=
   VITE_storageBucket=
   VITE_messagingSenderId=
   VITE_appId=
   VITE_measurementId=
    VITE_base_server_url=https://forum-hive-server.vercel.app
    VITE_IMGBB_API_KEY=
    VITE_STRIPE_KEY=
   ```
5. Start the development server 
   ``` bash
       npm run dev
   ```
6. Open the app in your browser
Visit: http://localhost:5173



---

## 📩 Contact

**Sopon Ahmed**  
Developer of ForumHive  
📧 Email: [sopon.official@outlook.com]  
🌐 Git Hub: [soponalways]

---

> Thank you for checking out ForumHive. Let’s build a better space to learn and grow together. 🐝

