
const express = require("express");
const client = require('./utility/pgManager.js')
//require("./redis.js")
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors({
  origin:'http://localhost:3000'
}))

app.get("/", (req, res) => {
    res.send("Backend Running");
});

const investorRoutes = require("./routes/investorRoutes");
app.use("/api/investors", investorRoutes);
const profileRoutes = require("./routes/profileRoutes")
app.use("/api/profile",profileRoutes);

app.listen(4000, () => {
    console.log("Server running on port 4000");
});