const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const BARER_AUTH_TOKEN = process.env.BARER_AUTH_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/${TELEGRAM_BOT_TOKEN}/sendMessage`;
const dataFilePath = path.join(__dirname, "reviewMessagesEnabled.json");

app.post("/sendNotification", async (req, res) => {
  try {
    if (!req.headers["authorization"]?.includes(BARER_AUTH_TOKEN)) return;
    const payload = req.body;
    if (!payload) return;
    console.log("Incoming event:");
    console.info(JSON.stringify(payload));
    const formattedRepoName = payload.repo_name?.split("/")[1]?.replace("-", "_")?.replace(".", "");
    const prId = `#PR${payload.pr_number}_${formattedRepoName}`;
    const message = getMessage(payload, formattedRepoName, prId);
    if (!message) return res.status(500).send("No matching events");

    if (payload.event_name === "pull_request" && payload.action === "review_requested") {
      const isEnabled = isReviewMessageEnabled(prId);
      if (!isEnabled) return res.status(200).send("Nothing sent, because we skip this event");
    }
    if (payload.event_name === "pull_request_review" && payload.review_state === "changes_requested")
      setReviewMessageEnabled(prId); // setting review message enabled because changes was requested

    console.log("message to sent: ", message);
    try {
      const response = await axios.post(TELEGRAM_API_URL, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      });

      res.status(200).json({ message: "Notification sent successfully to Telegram!" });
    } catch (error) {
      console.error("Error sending notification to Telegram:", error);
      res.status(500).json({ message: "Failed to send notification to Telegram" });
    }
  } catch (error) {
    console.error(error);
    console.log("Failed to process request");
    res.status(500).json({ message: "Failed to process request" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function getMessage(params, formattedRepoName, prId) {
  const gitLink = `Check it: <b><a href='${params.pr_url}'>Here</a></b>`;
  const contributors = `<b>Reviewers:</b> ${params.reviewer_logins}\n<b>Assignee:</b> ${params.assignee_logins}`;
  const reviewer = `<b>Reviewer:</b> ${params.review_user_login}`;

  if (params.event_name === "pull_request" && params.action === "opened")
    return `<b>🆕🟢 ${prId}</b>\n<i>${params.pr_title}</i>\n${contributors}\n${gitLink}`;
  if (params.event_name === "pull_request_review" && params.review_state === "changes_requested")
    return `<b>⚠️ ${prId}</b>\n<i>${params.pr_title}</i>\n<b>Changes requested</b>\n${reviewer}\n${gitLink}`;
  if (params.event_name === "pull_request" && params.action === "review_requested")
    return `<b>🔄👀 ${prId}</b>\n<i>${params.pr_title}</i>\n<b>Review re-requested</b>\n${contributors}\n${gitLink}`;
  if (params.event_name === "pull_request_review" && params.review_state === "approved")
    return `<b>✅ ${prId}</b>\n<i>${params.pr_title}</i>\n<b>Approved</b>\n${reviewer}\nCongratulations! 🎉\n${gitLink}`;
}

function setReviewMessageEnabled(prId) {
  const data = readData();
  data[prId] = true;
  writeData(data);
}

function isReviewMessageEnabled(prId) {
  const data = readData();
  return !!data[prId];
}

function readData() {
  if (!fs.existsSync(dataFilePath)) {
    return {};
  }

  const jsonData = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(jsonData);
}

function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
}

// Signal handling for graceful shutdown
process.on('SIGINT', function () {
  console.log('Received SIGINT. Shutting down gracefully.');
  server.close(function () {
      console.log('Closed out remaining connections.');
      process.exit();
  });
  
  // If still not shutting down after a certain time, force shutdown
  setTimeout(function () {
     console.error("Could not close connections in time, forcefully shutting down");
     process.exit(1);
  }, 10000);  // 10 seconds
});

process.on('SIGTERM', function () {
  console.log('Received SIGTERM. Shutting down gracefully.');
  app.close(function () {
      console.log('Closed out remaining connections.');
      process.exit();
  });

  setTimeout(function () {
      console.error("Could not close connections in time, forcefully shutting down");
      process.exit(1);
  }, 10000);
});
