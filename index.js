const express = require("express");
const checklistRules = require("./checklistRules");
const fetchData = require("./utils/fetchData");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

// Endpoint to evaluate checklist
app.get("/evaluate", async (req, res) => {
  try {
    const reqData = "67339ae56d5231c1a2c63636";
    const data = await fetchData(
      `http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/${reqData}`
    );

    const results = checklistRules.map((rule) => {
      const passed = rule.check(data);
      return { rule: rule.name, passed };
    });
    res.status(200);
    res.json({ results }); // sending results to the frontend
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch or evaluate data" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
