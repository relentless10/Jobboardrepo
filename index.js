require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(require("cors")({
origin: "https://euphonious-selkie-ba2993.netlify.app"
}));

const jobsRouter = require("./routes/jobs");
app.use("/jobs", jobsRouter);

app.listen(process.env.PORT || 3000, () => console.log("Server running"));
