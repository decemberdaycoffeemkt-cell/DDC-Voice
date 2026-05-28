import fetch from "node-fetch"; // wait, node-fetch might not be installed, we can use built-in fetch of node 18+
import dotenv from "dotenv";
dotenv.config();

async function runTest() {
  console.log("Calling local server /api/chat with a coffee query...");
  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "user", content: "สนใจเมล็ดกาแฟ S4 ค่ะ" }
        ],
        gender: "female"
      })
    });
    
    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response JSON:");
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

runTest();
