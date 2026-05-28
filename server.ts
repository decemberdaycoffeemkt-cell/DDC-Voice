import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "./src/data";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Resilient API Key helper checking multiple name variations
const getApiKey = (): string | undefined => {
  return process.env.GEMINI_API_KEY || 
         process.env.GEMINI_API || 
         process.env.API_KEY || 
         process.env.gemini_api_key || 
         process.env.GeminiApiKey;
};

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
const getGeminiClient = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY or alternative environment variable is not set. API calls will fail.");
    }
    ai = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_FOR_LINT",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
};

// API: Handle AI Voice Agent Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, gender } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const client = getGeminiClient();
    const apiKey = getApiKey();
    
    // Check if real key is available
    if (!apiKey) {
      // Return an intelligent, polite simulated response if GEMINI_API_KEY is not defined
      const lastMessage = messages[messages.length - 1]?.content || "";
      const hasPhone = /0\d{1,2}-?\d{3}-?\d{4}|0\d{8,9}/.test(lastMessage);
      const wantsStaff = /คุยกับคน|ขอสาย|พนักงาน|เจ้าหน้าที่|คุยกับมนุษย์|โอนสาย|สายตรง|ต่อสาย/.test(lastMessage);
      const isIssue = /พัง|เสีย|ใช้ไม่ได้|น้ำไม่ไหล|ร้อน|รั่ว|ชำรุด|ขัดข้อง/.test(lastMessage);
      const isCoffeeQuery = /เมล็ดกาแฟ|ราคาส่ง|ราคา|เมล็ด|กาแฟ|โปรโมชั่น|ส่วนลด|ค้าส่ง|วัตถุดิบ|ผงชง/.test(lastMessage);
      
      const replyTheme = "ค่ะ";
      const agentName = "น้องธันวา";
      
      let replyText = `สวัสดีค่ะ น้องธันวา ยินดีให้บริการค่ะ หากต้องการสอบถามเมล็ดกาแฟ สเปกเครื่องชง หรือแจ้งเครื่องขัดข้อง แจ้งเรื่องได้เลยนะคะ`;
      let shouldTransfer = false;
      let targetDept = "none";
      
      if (wantsStaff) {
        replyText = `รับทราบและเข้าใจแล้วค่ะ เดี๋ยวตัวน้องธันวาขอกดโอนสายไปยังคุณขวัญที่เบอร์ 096-163-1456 เพื่อดูแลให้ด่วนเลยนะคะ กรุณารอสักครู่เดียวค่ะ`;
        shouldTransfer = true;
        targetDept = "sales";
      } else if (isIssue) {
        if (hasPhone) {
          replyText = `ได้รับเบอร์ติดต่อและอาการเรียบร้อยค่ะ เดี๋ยวรีบโอนสายส่งต่อทีมช่างเทคนิคให้ติดต่อกลับด่วนที่สุดเลยนะคะ กรุณารอสักครู่ค่ะ`;
          shouldTransfer = true;
          targetDept = "technician";
        } else {
          replyText = `อุ๊ย ต้องขอประทานโทษด้วยนะคะ ทางเรามีบริการซ่อมเครื่องชง เครื่องบด และเครื่องปั่นครบวงจร พร้อมล้างตะกรันและเปลี่ยนยางโอริงหัวชงค่ะ สามารถแอดไลน์ช่างด่วนที่ @decservice (https://lin.ee/WXYf27n) หรือแชร์เบอร์โทรติดต่อกลับและชื่อร้านไว้ที่นี่ เดี๋ยวน้องธันวาประสานงานช่างให้ทันทีเลยค่ะ`;
        }
      } else if (isCoffeeQuery) {
        if (hasPhone) {
          replyText = `ได้รับเบอร์ติดต่อเรียบร้อยค่ะ เดี๋ยวจะรีบประสานงานฝ่ายขายติดต่อกลับไปแนะนำเรตราคาส่งยกลังและจัดทำใบเสนอราคาให้ด่วนเลยนะคะ กรุณารอสักครู่ค่ะ`;
          shouldTransfer = true;
          targetDept = "sales";
        } else {
          replyText = `เรามีเมล็ดกาแฟราคาส่งยอดนิยม เช่น S5 Premium Dark สำหรับกาแฟนมรสเข้มข้น และ Colombia Peach Candy หอมหวานพีชฟุ้งๆ ค่ะ รบกวนแอดไลน์ขอตารางราคายกลังที่ Line OA: @decemberdaycoffee (https://lin.ee/Qqn7rkn) หรือจะให้ฝ่ายขายติดต่อกลับ แจ้งชื่อและเบอร์โทรไว้ได้เลยนะคะ`;
        }
      } else if (/สวัสดี|ดีครับ|ดีค่ะ|ฮัลโหล/.test(lastMessage)) {
        replyText = `สวัสดีค่ะ! น้องธันวา ยินดีต้อนรับสู่ December Day Coffee ค่ะ วันนี้สนใจเมล็ดกาแฟคั่ว หรือต้องการแจ้งเรื่องดูแลเครื่องชงกาแฟดีคะ?`;
      }
      
      return res.json({
        reply: replyText,
        transferTriggered: shouldTransfer,
        transferDepartment: targetDept,
        extractedInfo: {
          customerName: hasPhone ? "ลูกค้าสนใจบริการ" : null,
          shopName: lastMessage.includes("ร้าน") ? "ร้านกาแฟลูกค้า" : null,
          phone: hasPhone ? (lastMessage.match(/0\d{1,2}-?\d{3}-?\d{4}|0\d{8,9}/)?.[0] || null) : null,
          issueDescription: lastMessage || "สอบถามข้อมูลทั่วไป"
        }
      });
    }

    // Curated dynamic lists to keep the prompt compact, blazing fast (<1s response), and highly accurate
    const selectedBeanIds = ["s5-premium-dark", "s3-premium-blend", "milky-lover", "colombia-blueberry", "colombia-peach"];
    const coffeeBeansSummary = PRODUCTS.filter(p => p.category === "coffee_beans" && selectedBeanIds.includes(p.id))
      .map(p => `- ${p.name}: ${p.description.split(" (จุดเด่น")[0]} (ราคา ${p.price})`)
      .join("\n");
      
    const selectedIngredIds = ["t1-thai-tea-premium", "g1-green-tea-premium", "jasmine-green-tea", "cocoa-premium"];
    const ingredientsSummary = PRODUCTS.filter(p => p.category === "ingredients" && selectedIngredIds.includes(p.id))
      .map(p => `- ${p.name}: ${p.description.split(" (จุดเด่น")[0]} (ราคา ${p.price})`)
      .join("\n");

    const selectedMachineIds = ["product-003", "product-004", "product-006"]; // WPM KD-270 SN, ROMOLA CANVAS, IZENSSO 1-3089
    const machinesSummary = PRODUCTS.filter(p => p.category === "machines" && selectedMachineIds.includes(p.id))
      .map(p => `- ${p.name}: ${p.description.split(". เหมาะสำหรับ")[0]} (ราคา ${p.price})`)
      .join("\n");

    // Set up Dynamic System Prompt for strictly Nong Thanwa (Female Agent)
    const systemInstruction = `คุณคือ "AI Voice Agent" (ระบบตอบรับอัตโนมัติอัจฉริยะ) ของแบรนด์ "December Day Coffee" (บจก. ดีเซมเบอร์ เดย์ คอฟฟี่ - ผู้ผลิตและจำหน่ายเมล็ดกาแฟ เครื่องชงกาแฟ อุปกรณ์ และวัตถุดิบครบวงจร) ทำหน้าที่ต้อนรับลูกค้า ให้ข้อมูลเบื้องต้น ประสานงานรับปัญหาเทคนิค หรือการสั่งซื้อ และประสานงานส่งต่อช่างเทคนิคหรือฝ่ายขาย

กติกาสำคัญในการสนทนาและการตอบกลับ (ทางเสียงพูด):
1. พูดคุยภาษาไทยอย่างสุภาพ นอบน้อม และมีจิตวิญญาณบริการ (Service Mind) อย่างที่สุด
2. เนื่องจากเป็นการคุยทางเสียง ให้ตอบอย่างสั้นกระชับเป็นธรรมชาติ ไม่พูดเนื้อหายาวเกิน 20 วินาที หรือราว 2-3 ประโยคในแต่ละรอบเป็นอันเด็ดขาด! หลีกเลี่ยงรายการข้อย่อยยาวๆ ยกเว้นถามความเห็นลูกค้า
3. คุณคือเอเจนต์ผู้หญิง ชื่อ "น้องธันวา" (Nong Thanwa) ต้องลงท้ายประโยคด้วย "ค่ะ" หรือ "คะ" ทุกประโยคเป็นหางเสียง ห้ามลืมอย่างเด็ดขาดค่ะ โดย "ค่ะ" ใช้กับประโยคบอกเล่า/ชี้แจง และ "คะ" ใช้กับประโยคถามไถ่/ต้องการเสียงสูง

4. การคัดแยกความต้องการลูกค้าอย่างเด็ดขาด (Strict Intent Classification - สำคัญที่สุดเพื่อป้องกันบอทตอบหลอน):
   - หากลูกค้าต้องการ **"ซ่อม/แจ้งปัญหากับเครื่องชงกาแฟ เครื่องบด หรือเครื่องปั่น"** (เช่น เครื่องเปิดไม่ติด, เครื่องไม่ร้อน, เครื่องสตรีมนมใช้งานไม่ได้, เครื่องขัดข้อง, ล้างตะกรัน, เปลี่ยนยางโอริงหัวชง):
     * นี่คืองานช่างเทคนิค! คุณต้องพูดจาแสดงความเห็นใจ ขออภัยในความไม่สะดวกอย่างสูงสุด และถามเก็บเบอร์โทรศัพท์ติดต่อกลับเพื่อประสานช่างทันที
     * **กฎเหล็กข้อห้าม:** **ห้ามนำเสนอเมล็ดกาแฟ คั่วกลาง ราคาส่งยกลัง หรือผงชงใดๆ ให้กับลูกค้ากลุ่มแจ้งซ่อมนี้โดยเด็ดขาด!** ให้คุยเรื่องบริการซ่อมและถามเบอร์ติดต่อกลับหรือให้แอดไลน์ @decservice เท่านั้น!
   - หากลูกค้าต้องการ **"สอบถามเรตราคาเมล็ดกาแฟ/วัตถุดิบ/ผงชง/ซื้อเครื่องชงใหม่"**:
     * นี่คืองานฝ่ายขาย! คุณสามารถแนะนำเมล็ดกาแฟคั่วหรือผงชงเด่นๆ ด้านล่างได้อย่างสั้นๆ กระชับ และแนะนำช่องทาง Line OA หลัก @decemberdaycoffee

5. กฎเหล็กในการโอนสาย (Handoff Rules - สำคัญมาก):
   - ห้ามตั้งค่า transferTriggered: true เป็นอันเด็ดขาด หากลูกค้าเพียงแค่ถามคำถามทั่วไป เช่น "มีเมล็ดกาแฟแบบไหนบ้าง", "ราคาเท่าไหร่", "ขอทราบข้อมูลสินค้า", "เครื่องสตีมนมพังแก้ยังไงดี"
   - ให้ตอบคำถามและให้ข้อมูลลูกค้าอย่างสุภาพก่อนเสมอ โดยอิงจากข้อมูลด้านล่าง
   - คุณจะเปิดสัญญาณโอนสาย (transferTriggered: true) ได้เฉพาะใน 3 สถานการณ์นี้เท่านั้น:
     1) ลูกค้าร้องขอสายพนักงานโดยตรง เช่น "ขอคุยกับคน", "โอนสายพนักงาน", "ขอสายช่าง", "ขอคุยกับคุณขวัญ"
     2) ลูกค้าแจ้งปัญหาเครื่องเสียทางเทคนิค และได้แจ้งเบอร์โทรศัพท์ติดต่อกลับที่สะดวกแล้ว
     3) ลูกค้าสนใจสั่งซื้อปริมาณมาก/ขอใบเสนอราคาส่งยกลัง และได้แจ้งเบอร์โทรศัพท์ติดต่อกลับที่สะดวกแล้ว
   - หากลูกค้าแจ้งปัญหาเครื่องเสียแต่ยังไม่ให้เบอร์โทร ให้พูดแสดงความเห็นใจและถามเบอร์โทรก่อน: "เรื่องเครื่องมีปัญหายินดีประสานงานให้เลยค่ะ ขอทราบชื่อและเบอร์โทรติดต่อกลับที่สะดวกเพื่อส่งเรื่องให้ช่างเทคนิคติดต่อกลับด่วนได้ไหมคะ?" เมื่อได้เบอร์แล้วจึงค่อยเซ็ตโอนสายในรอบถัดไป

6. ข้อมูลสินค้าและบริการที่เป็นทางการของแบรนด์:
   - บริการทีมช่างซ่อม: แบรนด์เรามี "บริการซ่อมและดูแลเครื่องชงกาแฟครบวงจร" ซ่อมเครื่องชง เครื่องบด เครื่องปั่นทุกรุ่น ทุกอาการ ล้างตะกรัน (Descaling) และเปลี่ยนยางโอริงหัวชง บริการทั้งในและนอกสถานที่ แนะนำแอดไลน์ช่างเทคนิคด่วนที่ Line OA: @decservice (ลิงก์: https://lin.ee/WXYf27n) หรือแจ้งออนไลน์ที่ www.decemberdaycoffee.com/ddc-service
   - เมล็ดกาแฟ/วัตถุดิบ: แนะนำตัวเด่นๆ 2-3 ตัวจากด้านล่าง (พูดสั้นๆ กระชับ ห้ามท่องลิสต์ยาว) และแนะนำว่าสั่งซื้อเมล็ดกาแฟผ่านเว็บไซต์หลักได้ที่ https://www.decemberdaycoffee.com/category/2475/coffee-beans#SECTION_PAGE หรือแอดไลน์ขอตารางราคายกลังที่ Line OA: @decemberdaycoffee (ลิงก์: https://lin.ee/Qqn7rkn)
   - เครื่องชงกาแฟ: แนะนำเครื่องชงกาแฟ 1-2 รุ่นด้านล่าง และเสนอให้ฝ่ายขายจัดทำใบเสนอราคาให้

6. รายการสินค้าเด่นของแบรนด์ (SHOWCASE PRODUCTS):
[หมวดเมล็ดกาแฟยอดนิยม]
${coffeeBeansSummary}
(หมายเหตุ: เรามีเมล็ดกาแฟอีกกว่า 100 รายการ สามารถแอดไลน์ @decemberdaycoffee เพื่อรับแคตตาล็อกตัวเต็มได้ค่ะ/ครับ)

[หมวดผงชงและวัตถุดิบยอดนิยม]
${ingredientsSummary}

[หมวดเครื่องชงกาแฟแนะนำ]
${machinesSummary}

รูปแบบการคุ้มครองข้อมูลเพื่อส่งออกเป็น JSON (สำคัญมาก):
คุณต้องคืนการตอบกลับในรูปแบบ JSON วัตถุ และระบุฟิลด์เหล่านี้:
- reply: (string) ข้อความเสียงตอบกลับภาษาไทย สั้น กระชับ อ่อนน้อมตามกติกาข้างต้น
- transferTriggered: (boolean) เป็น true เมื่อเข้าเงื่อนไขโอนสาย 3 ข้อข้างต้นเท่านั้น นอกนั้นต้องเป็น false
- transferDepartment: (string) ส่วนงานโอนสาย ('sales', 'technician' หรือ 'none')
- extractedInfo: (object) ข้อมูลลูกค้าที่จับใจความได้:
  * customerName: (string หรือ null) ชื่อลูกค้า
  * shopName: (string หรือ null) ชื่อร้านกาแฟ
  * phone: (string หรือ null) เบอร์โทรศัพท์ลูกค้าที่ได้แจ้งไว้
  * issueDescription: (string หรือ null) สรุปปัญหาร้านค้าหรือสิ่งที่ลูกค้าสนใจ`;

    // Map frontend formats to Gemini Chats API
    // We will build a structured array for Gemini contents parameter.
    // It's convenient to send the conversation history directly using systemInstruction.
    
    // Convert conversational format: { role: 'user' | 'assistant', content: string }
    // to format expected by GenerateContent: { role: 'user' | 'model', parts: [{ text: string }] }
    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: msg.content }]
    }));

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { 
              type: Type.STRING, 
              description: "The verbal polite response from the agent. Must terminate gracefully in Thai politeness particles based on gender." 
            },
            transferTriggered: { 
              type: Type.BOOLEAN, 
              description: "Whether the AI should trigger a transfer right now to human agent" 
            },
            transferDepartment: { 
              type: Type.STRING, 
              description: "The department choice: 'sales', 'technician', or 'none'" 
            },
            extractedInfo: {
              type: Type.OBJECT,
              properties: {
                customerName: { type: Type.STRING, description: "Extracted caller/customer name" },
                shopName: { type: Type.STRING, description: "Extracted coffee shop name" },
                phone: { type: Type.STRING, description: "Extracted contact phone number" },
                issueDescription: { type: Type.STRING, description: "Extracted problem, technical breakdown symptoms, or sales inquiry details" }
              }
            }
          },
          required: ["reply", "transferTriggered", "transferDepartment", "extractedInfo"]
        }
      }
    });

    const bodyText = response.text;
    if (!bodyText) {
      throw new Error("Empty response from Gemini");
    }

    try {
      const parsed = JSON.parse(bodyText.trim());
      res.json(parsed);
    } catch (parseErr) {
      console.error("Gemini output parsing failed, response: ", bodyText);
      res.status(500).json({ error: "Failed to parse system JSON", output: bodyText });
    }

  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// API: Text-to-Speech using ElevenLabs (with Voice ID: gARvXPexe5VF3cKZBian)
app.post("/api/tts", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "text is required" });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      console.warn("ElevenLabs API Key not configured. Falling back to native TTS.");
      return res.status(500).json({ error: "ElevenLabs API key is not configured" });
    }

    const voiceId = "gARvXPexe5VF3cKZBian";
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
        "accept": "audio/mpeg"
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API returned error:", response.status, errorText);
      return res.status(response.status).json({ error: `ElevenLabs error: ${errorText}` });
    }

    res.setHeader("Content-Type", "audio/mpeg");
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.send(buffer);
  } catch (error: any) {
    console.error("Error in /api/tts:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Serve frontend build (Vite inside Express)
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite HMR middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
