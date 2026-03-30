const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock Reports Database
let reportsHistory = [
  { id: "REP-9921", name: "Q1 Financial Summary", type: "Financial", status: "Generated", date: "2024-03-15", size: "2.4 MB" },
  { id: "REP-9922", name: "User Growth Analysis", type: "Marketing", status: "Scheduled", date: "2024-03-25", size: "N/A" },
  { id: "REP-9923", name: "Infrastructure Audit", type: "Technical", status: "Generated", date: "2024-03-10", size: "1.8 MB" },
  { id: "REP-9924", name: "Quarterly Sales Report", type: "Sales", status: "Pending", date: "2024-04-01", size: "N/A" },
  { id: "REP-9925", name: "Marketing Campaign Performance", type: "Marketing", status: "Scheduled", date: "2024-04-05", size: "N/A" },
];

// Endpoint to get all reports
app.get('/api/reports', (req, res) => {
  res.json(reportsHistory);
});

// Endpoint to trigger report generation
app.post('/api/trigger-report', (req, res) => {
  const { reportName, dataSource } = req.body;

  if (!reportName || !dataSource) {
    return res.status(400).json({ error: "Missing required fields: reportName and dataSource" });
  }

  // Simulate report generation process
  const jobId = "JOB-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const newReport = {
    id: jobId,
    name: reportName,
    type: "Custom", // Assuming custom for triggered reports
    status: "Queued",
    date: new Date().toISOString().split('T')[0],
    size: "N/A"
  };
  reportsHistory.push(newReport);

  // Simulate a delay for report generation
  setTimeout(() => {
    const reportIndex = reportsHistory.findIndex(r => r.id === jobId);
    if (reportIndex !== -1) {
      reportsHistory[reportIndex].status = "Generated";
      reportsHistory[reportIndex].size = (Math.random() * 3 + 1).toFixed(1) + " MB"; // Simulate size
      console.log(`Report ${jobId} (${reportName}) generated successfully.`);
    }
  }, 5000); // Simulate 5 seconds generation time

  res.status(202).json({ 
    success: true, 
    message: `Report generation for '${reportName}' initiated. You will be notified upon completion. Job ID: ${jobId}`,
    jobId: jobId
  });
});

const PORT = 5005;
app.listen(PORT, () => console.log(`Report Gen API on port ${PORT}`));
