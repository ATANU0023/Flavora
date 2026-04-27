# 🍽️ Flavora - Recipe Finder & Meal Planner

Flavora is a modern, responsive web application that helps you discover delicious recipes using TheMealDB API. Save your favorites, explore categories, and find inspiration for your next meal.

## Visit: https://flavora-nine.vercel.app/

## 🚀 Features

- **Recipe Discovery**: Search by name or ingredient.
- **Favorites System**: Save your favorite recipes to your account.
- **Authentication**: Secure login and signup functionality.
- **Details**: Full cooking instructions, ingredients, and measures for every dish.
- **Responsive Design**: Beautiful UI built with React and Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **API**: [TheMealDB API](https://www.themealdb.com/api.php).

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Flavora.git
   cd Flavora
   ```

2. **Backend Setup**:
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory with:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

3. **Frontend Setup**:
   ```bash
   cd ../client
   npm install
   ```

4. **Run the application**:
   - Start the server: `cd server && npm run dev`
   - Start the client: `cd client && npm run dev`

## 🌐 Deployment

This project is ready to be deployed on **Vercel**. 

1. Link your GitHub repository to Vercel.
2. Add the environment variables from your `server/.env` to the Vercel project settings.
3. Deploy!

## 📄 License

This project is licensed under the MIT License.
