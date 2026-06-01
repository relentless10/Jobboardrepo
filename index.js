require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(require("cors")());

const jobsRouter = require("./routes/jobs");
app.use("/jobs", jobsRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
