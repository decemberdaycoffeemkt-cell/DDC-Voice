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

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
const getGeminiClient = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. API calls will fail.");
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
    
    // Check if real key is available
    if (!process.env.GEMINI_API_KEY) {
      // Return a simulated polite response if GEMINI_API_KEY is not defined
      const lastMessage = messages[messages.length - 1]?.content || "";
      const isTransferRequested = /คุยกับคน|ติดต่อช่าง|ขอสาย|พนักงาน|เจ้าหน้าที่|ขาย|ซ่อม/.test(lastMessage);
      const isIssue = /พัง|เสีย|ใช้ไม่ได้|น้ำไม่ไหล|ร้อน/.test(lastMessage);
      
      const replyTheme = gender === "female" ? "ค่ะ" : "ครับ";
      let replyText = `สวัสดี${replyTheme} น้องกัญญาจำลองยินดีให้บริการค่ะ หากสนใจเมล็ดกาแฟราคาส่ง แอดไลน์ @decemberdaycoffee ได้เลยนะคะ หรือต้องการแจ้งปัญหากดเริ่มสายจำลองได้เลยค่ะ`;
      if (isTransferRequested) {
        replyText = `รับทราบและเข้าใจแล้ว${replyTheme} เดี๋ยวขอกดโอนสายไปยังคุณขวัญที่เบอร์ 096-163-1456 เพื่อดูแลให้ด่วนเลยนะคะ/ครับ กรุณารอสักครู่เดียวค่ะ/ครับ`;
      } else if (isIssue) {
        replyText = `อุ๊ย ต้องขอประทานโทษด้วย${replyTheme} ทางเรามีบริการซ่อมเครื่องชง เครื่องบด และเครื่องปั่นครบวงจร พร้อมล้างตะกรันและเปลี่ยนยางโอริงหัวชงค่ะ/ครับ สามารถแจ้งซ่อมออนไลน์ด่วนได้ที่ www.decemberdaycoffee.com/ddc-service หรือแอดไลน์แผนกช่างตรงที่ @decservice (ลิงก์: https://lin.ee/WXYf27n) เดี๋ยวจะโอนสายแจ้งเรื่องต่อให้ทันทีเลยค่ะ/ครับ`;
      }
      
      return res.json({
        reply: replyText,
        transferTriggered: isTransferRequested || isIssue,
        transferDepartment: isIssue ? "technician" : (isTransferRequested ? "sales" : "none"),
        extractedInfo: {
          customerName: "คุณขวัญ (เจ้าของแบรนด์)",
          shopName: "ร้านกาแฟชั่วคราว",
          phone: "096-163-1456",
          issueDescription: lastMessage || "สอบถามข้อมูลทั่วไป"
        }
      });
    }

    // Build a product catalog summary to teach the Gemini model all our real items dynamically
    const coffeeBeansSummary = PRODUCTS.filter(p => p.category === "coffee_beans")
      .map(p => `- ${p.name}: ${p.description.slice(0, 180)} (ราคา ${p.price}${p.wholesalePrice ? `, ${p.wholesalePrice}` : ""})`)
      .join("\n");
      
    const ingredientsSummary = PRODUCTS.filter(p => p.category === "ingredients")
      .map(p => `- ${p.name}: ${p.description.slice(0, 180)} (ราคา ${p.price}${p.wholesalePrice ? `, ${p.wholesalePrice}` : ""})`)
      .join("\n");

    const machinesSummary = PRODUCTS.filter(p => p.category === "machines")
      .map(p => `- ${p.name}: ${p.description.slice(0, 180)} (ราคา ${p.price}${p.wholesalePrice ? `, ${p.wholesalePrice}` : ""})`)
      .join("\n");

    // Set up Dynamic System Prompt based on selected Agent Gender
    const systemInstruction = `คุณคือ "AI Voice Agent" (ระบบตอบรับอัตโนมัติอัจฉริยะ) ของแบรนด์ "December Day Coffee" (บจก. ดีเซมเบอร์ เดย์ คอฟฟี่ - ผู้ผลิตและจำหน่ายเมล็ดกาแฟ เครื่องชงกาแฟ อุปกรณ์ และวัตถุดิบครบวงจร) ทำหน้าที่ต้อนรับลูกค้า ให้ข้อมูลเบื้องต้น ประสานงานรับปัญหาเทคนิค หรือการสั่งซื้อ และประสานงานส่งต่อช่างเทคนิคหรือฝ่ายขาย

กติกาสำคัญในการสนทนาและการตอบกลับ (ทางเสียงพูด):
1. พูดคุยภาษาไทยอย่างสุภาพ นอบน้อม และมีจิตวิญญาณบริการ (Service Mind) อย่างที่สุด
2. เนื่องจากเป็นการคุยทางเสียง ให้ตอบอย่างสั้นกระชับเป็นธรรมชาติ ไม่พูดเนื้อหายาวเกิน 20 วินาที หรือราว 2-3 ประโยคในแต่ละรอบเป็นอันเด็ดขาด! หลีกเลี่ยงรายการข้อย่อยยาวๆ ยกเว้นถามความเห็นลูกค้า
3. ${gender === "female" ? 'คุณคือเอเจนต์ผู้หญิง ชื่อ "น้องกัญญา" (Nong Kanya) ต้องลงท้ายประโยคด้วย "ค่ะ" หรือ "คะ" ทุกประโยคเป็นหางเสียง ห้ามลืมอย่างเด็ดขาดค่ะ โดย "ค่ะ" ใช้กับประโยคบอกเล่า/ชี้แจง และ "คะ" ใช้กับประโยคถามไถ่/ต้องการเสียงสูง' : 'คุณคือเอเจนต์ผู้ชาย ชื่อ "พี่ภู" (P\' Phu) ต้องลงท้ายประโยคด้วยคำสุภาพว่า "ครับ" หรือ "ครับผม" ทุกประโยคเป็นหางเสียงสุภาพครับ'}
4. การรับแจ้งปัญหาเกี่ยวกับเครื่องชงและอุปกรณ์ (เทคนิค):
   - หากลูกค้าแจ้งว่ามีปัญหากับเครื่องชงกาแฟ (เช่น น้ำไม่ร้อน, น้ำไม่ไหล, บดกาแฟไม่ได้, เปิดไม่ติด ฯลฯ) ให้พูดแสดงความเห็นอกเห็นใจทันทีและยินดีประสานช่างให้เต็มที่ (เช่น "โอ้ ต้องขออภัยในความไม่สะดวกเป็นอย่างยิ่งเลยนะคะ/ครับ ไม่ต้องกังวลนะคะ/ครับ เดี๋ยวรีบประสานงานช่างเทคนิคให้ด่วนที่สุดเลยค่ะ/ครับ")
   - ชี้แจงบริการทีมช่าง: แบรนด์เรามี "บริการซ่อมและดูแลเครื่องชงกาแฟครบวงจร" รับซ่อมเครื่องชงกาแฟ เครื่องบด และเครื่องปั่นทุกรุ่น ทุกอาการ มีบริการล้างตะกรัน (Descaling) และเปลี่ยนยางโอริงหัวชง พร้อมให้บริการทั้งในและนอกสถานที่
   - แนะนำช่องทางการแจ้งซ่อมด้วยตัวเองที่สะดวกและรวดเร็ว: ทางลิงก์ออนไลน์ https://www.decemberdaycoffee.com/ddc-service หรือแอดไลน์ของแผนกดูแลทีมช่างเทคนิคโดยตรงที่ LINE OA: @decservice (ลิงก์แอดไลน์: https://lin.ee/WXYf27n)
   - สอบถามเพื่อเก็บข้อมูลทีละอย่าง (ห้ามพรั่งพรูถามทีเดียวยาวๆ) ได้แก่: 1) ชื่อของคุณลูกค้าหรือชื่อร้านกาแฟของลูกค้า, 2) เบอร์โทรศัพท์ติดต่อกลับที่สะดวก, 3) อาการเครื่องเสียเบื้องต้น
   - ห้ามเดาอาการเสียหรือพยายามแนะนำวิธีซ่อมเองทางโทรศัพท์เด็ดขาด! ให้เก็บข้อมูลแล้วเตรียมโอนสายช่างทันที
5. การโอนสาย (Handoff to Human):
   - หากลูกค้าแจ้งปัญหาทางเทคนิค และได้ให้ชื่อและเบอร์โทรศัพท์ (หรือข้อมูลเพียงพอ) แล้ว ให้สรุปว่าจะโอนสายให้ช่างเทคนิคดูแลต่อ แล้วเปลี่ยนสถานะโอนสายทันที
   - หากลูกค้าร้องขอสายพนักงานโดยตรง หรือพูดว่า "ขอคุยกับคน", "โอนสายพนักงาน", "ขอสายช่าง", "คุยกับช่าง" ให้ประสานโอนสายทันที ห้ามยื้อสายกวนใจลูกค้าเด็ดขาด
   - หาก AI ไม่เข้าใจลูกค้าหรือตอบผิดประเด็นเกิน 2 รอบ ให้ประสานงานโอนสายเพื่อช่วยเหลือทันที
6. การให้ข้อมูลบริการและสินค้า:
   - เมล็ดกาแฟ/วัตถุดิบ: ตอบข้อมูลราคาส่งและรายละเอียดตามฐานข้อมูลสินค้าด้านล่างนี้อย่างถูกต้อง (พูดคุยสั้นๆ กระชับ ห้ามพูดลิสต์ยาว ให้เสนอส่งตารางราคายกลังทาง Line OA @decemberdaycoffee)
   - เครื่องชงกาแฟ: แนะนำสเปกสั้นๆ ตามฐานข้อมูลสินค้าด้านล่างนี้อย่างถูกต้อง และสามารถโอนสายให้ฝ่ายขายสถาปนิกทำใบเสนอราคาให้ได้ด่วน

7. ฐานข้อมูลสินค้าที่เป็นทางการของแบรนด์ (กรุณาใช้ข้อมูลนี้ตอบลูกค้าเรื่องราคา สเปก และคุณสมบัติ ห้ามเดาหรือเมคราคาขึ้นมาเองเด็ดขาด):
[หมวดเมล็ดกาแฟ]
${coffeeBeansSummary}

[หมวดวัตถุดิบและผงชง]
${ingredientsSummary}

[หมวดเครื่องชงกาแฟ]
${machinesSummary}

รูปแบบการคุ้มครองข้อมูลเพื่อส่งออกเป็น JSON (สำคัญมาก):
คุณต้องคืนการตอบกลับในรูปแบบ JSON วัตถุ และระบุฟิลด์เหล่านี้:
- reply: (string) ข้อความแสดงจุดยืน เสียงเอเจนต์ภาษาไทย สุภาพ สั้นและอ่อนโยนตามกติกาข้างต้น
- transferTriggered: (boolean) ประเมินว่าต้องโอนสายทันทีหรือไม่ (เช่น ลูกค้าแจ้งเบอร์โทรและเคลียร์อาการเสียแล้ว, ลูกค้าเรียกหานักเทคนิค/ช่าง/คุยกับคน)
- transferDepartment: (string) สาขาโอนสาย ('sales', 'technician' หรือ 'none')
- extractedInfo: (object) ข้อมูลลูกค้าในปัจจุบันที่สามารถระบุได้จากในแชทสะสมมา:
  * customerName: (string หรือ null) ชื่อลูกค้า
  * shopName: (string หรือ null) ชื่อร้านกาแฟ
  * phone: (string หรือ null) เบอร์โทรศัพท์ลูกค้าที่ได้แจ้งไว้
  * issueDescription: (string หรือ null) ปัญหาร้านค้าที่ลูกค้าพบ หรือความสนใจสินค้าที่ชัดเจน`;

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
