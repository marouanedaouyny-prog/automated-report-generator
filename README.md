# Automated Report Generator

A business intelligence tool that automates the generation and scheduling of custom reports from multiple data sources.

![Automated Report Generator Demo](./demo.png)

## ✨ Features

- **Multi-Source Data:** Connect to databases, APIs, and spreadsheets
- **Scheduled Reports:** Automate daily, weekly, or monthly reports
- **Multiple Formats:** Export to PDF, Excel, CSV, or Google Sheets
- **Custom Templates:** Create branded report templates
- **Email Delivery:** Automatically send reports to stakeholders
- **Express Backend:** RESTful API with error handling and validation
- **Modern Frontend:** Built with Next.js 14, Tailwind CSS, and TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Backend Setup (Node.js)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (optional):
   ```bash
   cp .env.example .env
   ```

4. Run the server:
   ```bash
   npm start
   ```

   The API will be available at `http://localhost:5005`

### Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📡 API Documentation

### GET /api/reports

Get all reports with their generation history.

**Response:**
```json
[
  {
    "id": "REP-9921",
    "name": "Q1 Financial Summary",
    "type": "Financial",
    "status": "Generated",
    "date": "2024-03-15",
    "size": "2.4 MB"
  }
]
```

### POST /api/trigger-report

Trigger generation of a custom report.

**Request:**
- Method: `POST`
- Content-Type: `application/json`
- Body:
  ```json
  {
    "reportName": "Monthly Sales Report",
    "dataSource": "sales_database"
  }
  ```

**Request Schema:**
```typescript
{
  reportName: string;    // Required, report name
  dataSource: string;    // Required, data source identifier
}
```

**Response:**
```json
{
  "success": true,
  "message": "Report generation for 'Monthly Sales Report' initiated.",
  "jobId": "JOB-ABC123XYZ"
}
```

### Example with cURL

```bash
# Get all reports
curl http://localhost:5005/api/reports

# Trigger report generation
curl -X POST http://localhost:5005/api/trigger-report \
  -H "Content-Type: application/json" \
  -d '{
    "reportName": "Monthly Sales Report",
    "dataSource": "sales_database"
  }'
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Node-Cron** - Task scheduling
- **PDFKit** - PDF generation
- **ExcelJS** - Excel file generation
- **dotenv** - Environment variable management

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **Recharts** - Data visualization

## 📁 Project Structure

```
automated-report-generator/
├── backend/
│   ├── server.js         # Express API server
│   ├── package.json      # Node dependencies
│   └── .env.example      # Environment variables template
├── frontend/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable React components
│   └── package.json
├── LICENSE
└── README.md
```

## 🔒 Security Notes

- CORS is restricted to specific origins in production
- Input validation for report parameters
- Error handling middleware prevents information leakage
- 404 handler for undefined routes
- Environment variable validation

## 🎯 Use Cases

- **Business Analytics:** Automated KPI reports
- **Finance:** Monthly financial statements
- **Marketing:** Campaign performance reports
- **Sales:** Pipeline and revenue reports
- **HR:** Employee performance metrics

## 🔄 Future Enhancements

- [ ] Real data source integrations
- [ ] Custom report builder
- [ ] Advanced scheduling options
- [ ] Email delivery system
- [ ] Report sharing and collaboration
- [ ] Data visualization customization
- [ ] API integrations (Google Analytics, Salesforce)
- [ ] Multi-tenant support

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.
