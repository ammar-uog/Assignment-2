const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const connectDB = require("./config/db")
const authRoutes = require("./Routes/authRoute")
const googleRoutes = require("./Routes/googleRoute")
const meetingRoutes = require("./Routes/meetingRoute")
const protect = require("./middleware/authMiddleware")


connectDB()
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
)
// app.options('*', cors());
// Routes
app.use("/api/auth", authRoutes)
app.use("/api/google", googleRoutes)
app.use("/api/meetings", meetingRoutes)

// Example protected route
app.get("/api/me", protect, (req, res) => {
  res.json({ message: "Welcome to protected route", user: req.user })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
