import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Coffee, Phone, PhoneCall, ShieldCheck, Cpu, 
  HelpCircle, Sparkles, BookOpen, Volume2, HardDrive, CheckCircle2
} from "lucide-react";
import { ChatMessage, ExtractedSupportInfo, SupportTicket, CallState } from "./types";
import { HISTORIC_TICKETS } from "./data";
import PhoneCallSimulator from "./components/PhoneCallSimulator";
import CRMSupportDashboard from "./components/CRMSupportDashboard";
import ProductCatalogue from "./components/ProductCatalogue";

const simulateLocalResponse = (inputText: string, gender: "female" | "male") => {
  const lastMessage = inputText.trim();
  const isTransferRequested = /คุยกับคน|ติดต่อช่าง|ขอสาย|พนักงาน|เจ้าหน้าที่|ขาย|ซ่อม|บอส|ผู้จัดการ/.test(lastMessage);
  const isIssue = /พัง|เสีย|ใช้ไม่ได้|น้ำไม่ไหล|ร้อน|รั่ว|ชำรุด|ขัดข้อง|ซ่อม/.test(lastMessage);
  const isCoffeeQuery = /เมล็ดกาแฟ|ราคาส่ง|ราคา|เมล็ด|กาแฟ|โปรโมชั่น|ส่วนลด|ค้าส่ง/.test(lastMessage);
  
  const replyTheme = gender === "female" ? "ค่ะ" : "ครับ";
  const agentName = gender === "female" ? "น้องกัญญา" : "พี่ภู";
  
  let replyText = `สวัสดี${replyTheme} ${agentName} ยินดีให้บริการค่ะ สำหรับการสั่งซื้อเมล็ดกาแฟ เครื่องชงกาแฟ หรือต้องการแจ้งปัญหาเทคนิค แจ้งข้อมูลเพิ่มเติมได้เลยนะคะ`;
  let transferTriggered = false;
  let transferDepartment = "none";
  
  if (isTransferRequested) {
    replyText = gender === "female"
      ? `รับทราบและเข้าใจแล้วค่ะ เดี๋ยวเหลือน้องกัญญาขอกดโอนสายไปยังคุณขวัญที่เบอร์ 096-163-1456 เพื่อดูแลให้ด่วนเลยนะคะ กรุณารอสักครู่เดียวค่ะ`
      : `รับทราบและเข้าใจแล้วครับ เดี๋ยวพี่ภูขอกดโอนสายไปยังคุณขวัญที่เบอร์ 096-163-1456 เพื่อดูแลให้ด่วนเลยครับ กรุณารอสักครู่เดียวครับ`;
    transferTriggered = true;
    transferDepartment = "sales";
  } else if (isIssue) {
    replyText = gender === "female"
      ? `อุ๊ย ต้องขอประทานโทษด้วยนะคะที่พบปัญหาขัดข้องของเครื่องชงกาแฟ ไม่ต้องกังวลนะคะ เดี๋ยวน้องกัญญาจะรีบกดโอนสายไปยังแผนกช่างเทคนิคผ่านคุณขวัญ เบอร์ 096-163-1456 ช่วยเหลือด่วนทันทีค่ะ`
      : `อุ๊ย ต้องขอประทานโทษด้วยครับที่พบปัญหาขัดข้องของเครื่องชงกาแฟ ไม่ต้องกังวลนะครับ เดี๋ยวพี่ภูจะรีบกดโอนสายไปยังแผนกช่างเทคนิคผ่านคุณขวัญ เบอร์ 096-163-1456 ช่วยเหลือด่วนทันทีครับ`;
    transferTriggered = true;
    transferDepartment = "technician";
  } else if (isCoffeeQuery) {
    replyText = gender === "female"
      ? `สำหรับราคาเมล็ดกาแฟค้าส่งของ December Day Coffee เรามีโปรโมชั่นพิเศษสำหรับร้านพาร์ทเนอร์ค่ะ แอดไลน์ขอตารางราคาได้ที่ @decemberdaycoffee หรือโทร 096-163-1456 ได้เลยค่ะ`
      : `สำหรับราคาเมล็ดกาแฟค้าส่งของ December Day Coffee เรามีโปรโมชั่นพิเศษสำหรับร้านพาร์ทเนอร์ครับ แอดไลน์ขอตารางราคาได้ที่ @decemberdaycoffee หรือโทร 096-163-1456 ได้เลยครับ`;
  } else if (/สวัสดี|ดีครับ|ดีค่ะ|ฮัลโหล/.test(lastMessage)) {
    replyText = gender === "female"
      ? `สวัสดีค่ะ! น้องกัญญาจาก December Day Coffee ยินดีต้อนรับค่ะ ช่องทาง Line OA หลักคือ @decemberdaycoffee หรือเบอร์ติดต่อ 096-163-1456 ค่ะ วันนี้สนใจเมล็ดกาแฟหรือเรื่องเครื่องชงดีคะ?`
      : `สวัสดีครับ! พี่ภูจาก December Day Coffee ยินดีต้อนรับครับ ช่องทาง Line OA หลักคือ @decemberdaycoffee หรือเบอร์ติดต่อ 096-163-1456 ครับ วันนี้สนใจเมล็ดกาแฟหรือเรื่องเครื่องชงดีครับ?`;
  } else {
    replyText = gender === "female"
      ? `รับทราบข้อมูลและประสานงานให้เลยค่ะ สามารถแอดไลน์ @decemberdaycoffee หรือติดต่อตรงคุณขวัญ 096-163-1456 หรือต้องการให้น้องกัญญาโอนสายหาผู้เชี่ยวชาญเลยดีคะ?`
      : `รับทราบข้อมูลและประสานงานให้เลยครับ สามารถแอดไลน์ @decemberdaycoffee หรือติดต่อตรงคุณขวัญ 096-163-1456 หรือต้องการให้พี่ภูโอนสายหาผู้เชี่ยวชาญเลยดีครับ?`;
  }
  
  // Extract info from message using regex
  const phoneMatch = lastMessage.match(/0\d{1,2}-?\d{3}-?\d{4}|0\d{8,9}/);
  const nameMatch = lastMessage.match(/ชื่อ\s*([ก-๙a-zA-Z\s]+)|ผม\s*([ก-๙a-zA-Z\s]+)\s*ครับ|ฉัน\s*([ก-๙a-zA-Z\s]+)\s*ค่ะ/);
  
  const phone = phoneMatch ? phoneMatch[0] : null;
  const customerName = nameMatch ? (nameMatch[1] || nameMatch[2] || nameMatch[3]).trim() : null;
  
  return {
    reply: replyText,
    transferTriggered,
    transferDepartment,
    extractedInfo: {
      customerName: customerName || (phone ? "ลูกค้าสนใจ" : null),
      shopName: lastMessage.includes("ร้าน") ? lastMessage.match(/ร้าน\s*([ก-๙a-zA-Z\s]+)/)?.[1]?.trim() || "ร้านกาแฟของลูกค้า" : null,
      phone: phone,
      issueDescription: lastMessage
    }
  };
};

export default function App() {
  const [tickets, setTickets] = useState<SupportTicket[]>(HISTORIC_TICKETS);
  const [gender, setGender] = useState<"female" | "male">("female");
  const [callState, setCallState] = useState<CallState>("idle");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [extractedInfo, setExtractedInfo] = useState<ExtractedSupportInfo>({
    customerName: null,
    shopName: null,
    phone: null,
    issueDescription: null
  });
  const [currentlyTransferringTo, setCurrentlyTransferringTo] = useState<"sales" | "technician" | "none">("none");
  const [isWidgetMode] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("widget") === "true";
    }
    return false;
  });

  // Handle Transfer completed
  const handleTransferTriggered = (dept: "sales" | "technician", notes: string) => {
    setCurrentlyTransferringTo(dept);
    
    // Register a new support ticket in the database live
    const newId = `T-${Math.floor(Math.random() * 8999) + 1000}`;
    const assignedAgent = dept === "technician" ? "ช่างวิรัช (หัวหน้าทีมซ่อมบำรุง)" : "คุณกฤตภัทร (สถาปนิกฝ่ายขาย)";
    const statusType = dept === "technician" ? "transferred_technical" : "transferred_sales";

    const newTicket: SupportTicket = {
      id: newId,
      customerName: extractedInfo.customerName || "คุณผู้แจ้งหน้างาน",
      shopName: extractedInfo.shopName || "ร้านจำหน่ายกาแฟย่อย",
      phone: extractedInfo.phone || "08x-xxx-xxxx",
      issueDescription: extractedInfo.issueDescription || notes || "ประสานงานเรื่องรับบริการด่วน",
      callDuration: "ประมาณ 1-2 นาที",
      gender: gender,
      status: statusType as any,
      assignedTo: assignedAgent,
      timestamp: new Date(),
      chatHistory: [...chatHistory]
    };

    setTickets(prev => [newTicket, ...prev]);
  };

  // Log ticket on normal hangup if details are present but not transferred
  const handleCallStateChange = (newState: CallState) => {
    // If wrapping up call and we have at least phone or name with no transfer triggered, log it as completed!
    if (newState === "ended" && callState === "connected" && currentlyTransferringTo === "none") {
      const hasSomeInfo = extractedInfo.customerName || extractedInfo.phone || extractedInfo.issueDescription;
      if (hasSomeInfo) {
        const newId = `T-${Math.floor(Math.random() * 8999) + 1000}`;
        const autoTicket: SupportTicket = {
          id: newId,
          customerName: extractedInfo.customerName || "ลูกค้าทั่วไป (ไม่ระบุชื่อ)",
          shopName: extractedInfo.shopName || "ไม่ทราบชื่อร้าน",
          phone: extractedInfo.phone || "ไม่ได้ระบุเบอร์",
          issueDescription: extractedInfo.issueDescription || "สอบถามราคาและข้อมูลทั่วไปของเมล็ดกาแฟ",
          callDuration: "ประมาณ 1 นาที",
          gender: gender,
          status: "completed",
          assignedTo: "เสร็จสิ้นด้วยระบบ AI เจนน้องกัญญา/พี่ภู",
          timestamp: new Date(),
          chatHistory: [...chatHistory]
        };
        setTickets(prev => [autoTicket, ...prev]);
      }
    }

    if (newState === "idle") {
      setCurrentlyTransferringTo("none");
    }

    setCallState(newState);
  };

  const handleFillPresetQuestion = (text: string) => {
    // We pass text directly to trigger in PhoneCallSimulator by altering state,
    // For excellent UX, we can inject a mock message on connected screen
    const userMsg: ChatMessage = {
      id: `user-preset-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMsg]);
    
    // Call AI in background
    triggerAIChatAPI([...chatHistory, userMsg]);
  };

  const triggerAIChatAPI = async (messagesToSend: ChatMessage[]) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesToSend.map(m => ({ role: m.role, content: m.content })),
          gender: gender
        })
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }
      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-preset-${Date.now()}`,
        role: "assistant",
        content: data.reply || "ยินดีต้อนรับค่ะ",
        timestamp: new Date()
      };

      setChatHistory(prev => [...prev, aiMsg]);
      
      // Update TTS if enabled
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const cleanText = data.reply.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, "");
        const s = new SpeechSynthesisUtterance(cleanText);
        s.lang = "th-TH";
        window.speechSynthesis.speak(s);
      }

      if (data.extractedInfo) {
        setExtractedInfo(prev => ({
          customerName: data.extractedInfo.customerName || prev.customerName,
          shopName: data.extractedInfo.shopName || prev.shopName,
          phone: data.extractedInfo.phone || prev.phone,
          issueDescription: data.extractedInfo.issueDescription || prev.issueDescription
        }));
      }

      if (data.transferTriggered) {
        setCallState("transferring");
        setTimeout(() => {
          setCallState("transferred");
          const dept = data.transferDepartment === "sales" ? "sales" : "technician";
          const notes = data.extractedInfo?.issueDescription || "ความต้องการทั่วไปหรือขอสายส่วนงาน";
          handleTransferTriggered(dept, notes);
        }, 3000);
      }
    } catch (e) {
      console.warn("API error in App.tsx, falling back to local client simulator:", e);
      const lastUserMsg = messagesToSend[messagesToSend.length - 1]?.content || "";
      const data = simulateLocalResponse(lastUserMsg, gender);

      const aiMsg: ChatMessage = {
        id: `ai-preset-${Date.now()}`,
        role: "assistant",
        content: data.reply || "ยินดีต้อนรับค่ะ",
        timestamp: new Date()
      };

      setChatHistory(prev => [...prev, aiMsg]);
      
      // Update TTS if enabled
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const cleanText = data.reply.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, "");
        const s = new SpeechSynthesisUtterance(cleanText);
        s.lang = "th-TH";
        window.speechSynthesis.speak(s);
      }

      if (data.extractedInfo) {
        setExtractedInfo(prev => ({
          customerName: data.extractedInfo.customerName || prev.customerName,
          shopName: data.extractedInfo.shopName || prev.shopName,
          phone: data.extractedInfo.phone || prev.phone,
          issueDescription: data.extractedInfo.issueDescription || prev.issueDescription
        }));
      }

      if (data.transferTriggered) {
        setCallState("transferring");
        setTimeout(() => {
          setCallState("transferred");
          const dept = data.transferDepartment === "sales" ? "sales" : "technician";
          const notes = data.extractedInfo?.issueDescription || "ความต้องการทั่วไปหรือขอสายส่วนงาน";
          handleTransferTriggered(dept, notes);
        }, 3000);
      }
    }
  };

  if (isWidgetMode) {
    return (
      <div className="h-screen w-screen bg-white overflow-hidden">
        <PhoneCallSimulator
          gender={gender}
          setGender={setGender}
          callState={callState}
          setCallState={handleCallStateChange}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          extractedInfo={extractedInfo}
          setExtractedInfo={setExtractedInfo}
          onTransferTriggered={handleTransferTriggered}
          activeTab="call"
          setActiveTab={() => {}}
          isWidget={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBF9] text-zinc-800 font-sans antialiased pb-12 selection:bg-brand-green-light selection:text-brand-green-dark scroll-smooth">
      
      {/* Top Premium Navigation Bar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-zinc-100/80 sticky top-0 z-40 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-brand-green hover:bg-brand-green-dark text-white p-2.5 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-green/10 transition-transform hover:scale-105">
              <Coffee size={24} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight font-sans uppercase text-zinc-900 flex items-center gap-2">
                December Day <span className="text-brand-green text-xs font-bold font-mono tracking-widest bg-brand-green-light px-2 py-0.5 rounded-md">Voice AI</span>
              </h1>
              <p className="text-[10px] font-bold text-zinc-400 font-mono tracking-wider">
                AUTOMATED CALL INTELLIGENCE SYSTEM
              </p>
            </div>
          </div>

          {/* Quick links and specs */}
          <div className="flex items-center gap-3 text-xs font-semibold flex-wrap justify-center">
            <a href="#playground" className="text-[#0e7b4b] hover:text-brand-green-dark px-3 py-1.5 transition-colors font-sans">
              ทดลองใช้งานจริง
            </a>
            <a href="#features" className="text-zinc-650 hover:text-zinc-900 px-3 py-1.5 transition-colors font-sans">
              จุดเด่น
            </a>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e7f6ef] text-[#0e7b4b] border border-[#0e7b4b]/10 font-sans shadow-xs">
              <ShieldCheck size={14} />
              <span>คุ้มครองระดับสูงสุด</span>
            </span>
          </div>
        </div>
      </header>

      {/* Modern Minimalist Hero Banner Section */}
      <section className="bg-white relative overflow-hidden border-b border-zinc-150/40">
        {/* Abstract light green radial backgrounds for minimalist decoration */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-green-light/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-brand-green-light/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Left (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green-light text-brand-green border border-brand-green/20 text-xs font-bold leading-relaxed">
              <Sparkles size={12} className="animate-pulse" />
              <span>เอเจนต์รับสายอัจฉริยะสำหรับลูกค้ากลุ่มธุรกิจเครื่องดื่มและร้านค้า</span>
            </div>

            <h1 className="text-4xl sm:text-5.5xl font-black font-sans leading-[1.12] tracking-tight text-zinc-900">
              ยกระดับบริการลูกค้า 24 ชม.<br />
              ด้วยเอเจนต์สายด่วนเสียง<br />
              <span className="text-brand-green relative inline-block">
                "น้องกัญญา & พี่ภู"
                <span className="absolute bottom-1.5 left-0 w-full h-[6px] bg-brand-green-accent/30 -z-10 rounded" />
              </span>
            </h1>

            <p className="text-base text-zinc-650 max-w-xl leading-relaxed">
              สละภาระจำเจของการรับสายโทรศัพท์ในสาขาย่อย ด้วยโมเดลภาษาประมวลผลคำด่วนภาษาไทย คุยโต้ตอบด้วยน้ำเสียงแสนละมุน ถูกหลักการบริการ รับประกันความพึงพอใจ คัดกรองอาการเสียเครื่องชงกาแฟ หรือเสนอราคาค้าส่งเมล็ดกาแฟแบบเรียลไทม์ พร้อมเชื่อมต่อส่งต่อข้อมูลตรงเข้า CRM หน้างานทันที
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#playground"
                className="bg-brand-green hover:bg-brand-green-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-brand-green/20 text-sm"
              >
                <PhoneCall size={18} className="animate-pulse" />
                <span>จำลองโทรพูดคุยสดตอนนี้</span>
              </a>
              <a
                href="#how-it-works"
                className="bg-[#FAFBF9] hover:bg-zinc-50 border border-zinc-200 text-zinc-700 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.99] text-sm"
              >
                <span>วิธีการทำคุณประโยชน์</span>
                <span className="text-xs text-brand-green">▼</span>
              </a>
            </div>

            {/* Micro metrics underneath */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-100 max-w-lg text-left">
              <div>
                <span className="block text-2xl font-black text-brand-green font-sans">0 วินาที</span>
                <span className="text-xs text-zinc-500 font-medium">เวลารอสายสูงสุด</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-brand-green font-sans">24 / 7</span>
                <span className="text-xs text-zinc-500 font-medium">แสตนด์บายต้อนรับ</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-brand-green font-sans">100%</span>
                <span className="text-xs text-zinc-500 font-medium">บันทึก CRM ทันที</span>
              </div>
            </div>
          </div>

          {/* Hero Graphics Right (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-brand-green-light/30 rounded-full blur-3xl -z-10 transform scale-95" />
            <div className="border border-zinc-200/60 bg-white rounded-[40px] p-6 shadow-2xl relative w-full max-w-md">
              <div className="absolute -top-3 -right-3 bg-brand-green text-white p-2 rounded-2xl shadow-md rotate-12 flex items-center gap-1 text-[10px] font-bold">
                <Sparkles size={11} className="animate-spin" />
                <span>VOICE LIVE</span>
              </div>

              {/* Mock Caller Preview Display Card */}
              <div className="bg-[#FAFBF9] rounded-3xl p-5 border border-zinc-120 flex flex-col items-center">
                <div className="flex gap-1.5 justify-center mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0e7b4b] animate-ping" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2dc489] animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2dc489] animate-pulse" />
                </div>
                
                <div className="w-20 h-20 rounded-full bg-brand-green-light flex items-center justify-center mb-3">
                  <Phone className="text-brand-green stroke-[2.5]" size={32} />
                </div>
                <h3 className="font-extrabold text-zinc-900 text-sm">น้องกัญญา (AI Dispatcher)</h3>
                <span className="text-[10px] text-brand-green font-bold font-mono tracking-wider">กำลังโต้ตอบกับร้านคุณผู้ร่วมค้า</span>

                {/* Animated Speech waves mock */}
                <div className="flex items-center gap-1.5 justify-center h-8 mt-4 w-full">
                  {[12, 28, 16, 32, 20, 36, 12, 24, 8, 16, 28].map((h, i) => (
                    <span 
                      key={i} 
                      style={{ height: `${h}px` }}
                      className="w-1 bg-brand-green rounded-full animate-pulse opacity-85" 
                    />
                  ))}
                </div>

                {/* Simulated message dialog */}
                <div className="bg-white rounded-2xl p-3 border border-zinc-100 text-xs text-zinc-650 leading-relaxed mt-4 w-full text-center shadow-xs">
                  "สวัสดีค่ะ ร้านกาแฟกล้วยไข่โบราณใช่ไหมคะ? น้องกัญญายินดีจดข้อมูลอาการเครื่องชงน้ำหยดเพื่อสลับสายหาช่างซ่อมบำรุงในจังหวัดทันทีค่ะ"
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Interactive Demo Playground (Anchored #playground) */}
      <section id="playground" className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 scroll-mt-20">
        
        {/* Playground header info */}
        <div className="text-center mb-10 max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase text-brand-green tracking-widest font-mono block">
            — LIVE INTERACTIVE DEMO PLAYGROUND
          </span>
          <h2 className="text-2.5xl sm:text-3.5xl font-extrabold text-zinc-900 font-sans tracking-tight">
            พื้นที่ทดลองโทรศัพท์และบันทึกประวัติลูกค้าระยะประชิด
          </h2>
          <p className="text-sm text-zinc-500">
            เปิดเสียงลำโพง แตะปุ่ม "เริ่มการสายจำลอง" จากนั้นแตะกดเปิดไมโครโฟนเพื่อพูดคุยภาษาไทยสด ๆ หรือพิมพ์ข้อความจำลองส่งไปยังสาย AI เพื่อสังเกตการณ์จับคู่ข้อมูล CRM สดหน้าจอ
          </p>
        </div>

        {/* Playboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Phone Simulator (lg: span 5) */}
          <div className="lg:col-span-12 xl:col-span-5">
            <PhoneCallSimulator
              gender={gender}
              setGender={setGender}
              callState={callState}
              setCallState={handleCallStateChange}
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              extractedInfo={extractedInfo}
              setExtractedInfo={setExtractedInfo}
              onTransferTriggered={handleTransferTriggered}
              activeTab="call"
              setActiveTab={() => {}}
            />
          </div>

          {/* Column 2: Dashboard Support Ticketing & Catalogues (lg: span 7) */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-8">
            
            <CRMSupportDashboard
              tickets={tickets}
              setTickets={setTickets}
              extractedInfo={extractedInfo}
              callState={callState}
              gender={gender}
              currentlyTransferringTo={currentlyTransferringTo}
            />

            <ProductCatalogue
              onSuggestQuestion={handleFillPresetQuestion}
              callState={callState}
            />

          </div>

        </div>

      </section>

      {/* Bulletproof Features Section (Anchored #features) */}
      <section id="features" className="bg-white py-16 mt-20 border-y border-zinc-150/45 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase text-brand-green tracking-widest block mb-2 font-mono">
              ★ เกรดความสามารถระบบการคุ้มครอง (Premium Guardrails)
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 font-sans tracking-tight">
              ทำไมร้านกาแฟแบรนด์พรีเมียมตัวจริงถึงใว้วางใจระบบ AI ของเรา
            </h3>
            <p className="text-sm text-zinc-500 mt-2">
              ก้าวข้ามขีดจำกัด AI ทั่วไป ด้วยการตั้งค่าคุณสมบัติความปลอดภัยและสุภาพสูงสุด ป้องกันปัญหาภาพลักษณ์ร้านเสียหาย
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-[#FAFBF9] rounded-3xl p-6 border border-zinc-200/50 space-y-3 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-brand-green-light flex items-center justify-center text-brand-green">
                <ShieldCheck size={24} className="stroke-[2.5]" />
              </div>
              <h4 className="text-base font-bold text-zinc-900 leading-tight">
                นโยบาย Zero Disease Handoff
              </h4>
              <p className="text-xs leading-relaxed text-zinc-550">
                ระบบถูกฝึกฝนเข้มงวด "ห้ามวินิจฉัยโรคเองเด็ดขาด" สำหรับความขัดข้องทางเทคนิค เพื่อป้องปัดความเสียหายต่อคนหน้างาน โดยจะจดจำข้อมูลแล้วโอนต่อผู้เชี่ยวชาญมนุษย์ทันที
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#FAFBF9] rounded-3xl p-6 border border-zinc-200/50 space-y-3 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-brand-green-light flex items-center justify-center text-brand-green">
                <Cpu size={24} className="stroke-[2.5]" />
              </div>
              <h4 className="text-base font-bold text-[#0e7b4b] leading-tight">
                ความเที่ยงตรงด้านบริบทไทย 99.4%
              </h4>
              <p className="text-xs leading-relaxed text-zinc-550">
                เข้าใจคำพูดยอดนิยมของบาริสต้าและเจ้าของร้านกาแฟ เช่น "ผงโกโก้ดัทช์", "วาล์วสตรีมรั่ว", "ส่งเมล็ดกาแฟด่วนแบบปางขอน" เข้าใจชัดเจนเพื่อคัดกรองจัดกลุ่มข้อมูลลัพธ์ลง CRM
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#FAFBF9] rounded-3xl p-6 border border-zinc-200/50 space-y-3 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-brand-green-light flex items-center justify-center text-brand-green">
                <Sparkles size={24} className="stroke-[2.5]" />
              </div>
              <h4 className="text-base font-bold text-zinc-900 leading-tight">
                บุคลิก แสนสุภาพ สรรพนามน่ารัก
              </h4>
              <p className="text-xs leading-relaxed text-zinc-550">
                หมดโอกาสสายหลุดหรืออารมณ์เสีย "น้องกัญญา" ส่งความชดชื่น "ค่ะ/นะคะ" และ "พี่ภู" ให้ความมั่นคงหนักแน่น "ครับผม/ยินดีรับใช้ครับ" ต้อนรับลูกค้าเสมือนมีเจ้าหน้าที่อาวุโสรับสาย
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* How it works simple section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
        <div className="bg-brand-green-dark rounded-[36px] p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <Coffee size={350} />
          </div>

          <div className="max-w-2xl relative z-10 space-y-6">
            <span className="text-[11px] font-bold text-brand-green-accent font-mono tracking-widest uppercase block">
              ★ วิธีการร่วมงานและต่อยอดระบบอัตโนมัติ
            </span>

            <h3 className="text-3xl font-black font-sans leading-tight">
              เปลี่ยนสายโทรศัพท์ยุ่งเหยิงให้เป็นรายงานประสานงานที่เรียบร้อย สู่ธุรกิจคุณ
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-brand-green-accent/20 flex items-center justify-center text-brand-green-accent font-bold text-sm shrink-0 mt-0.5">1</div>
                <div>
                  <h5 className="font-bold text-sm">ลูกค้าเริ่มโทรเข้ามาที่เบอร์ร้านด่วนของคุณ</h5>
                  <p className="text-xs text-brand-green-light opacity-85 leading-relaxed mt-1">
                    ระบบชุมสายเมนสวิตช์จะจับคู่ส่งต่อสตรีมเสียงไปยังโมเดลถอดใจความด่วน และสังเคราะห์เสียงพูดตอบโต้ภายใน 1 วินาที
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-brand-green-accent/20 flex items-center justify-center text-brand-green-accent font-bold text-sm shrink-0 mt-0.5">2</div>
                <div>
                  <h5 className="font-bold text-sm">คัดกรองแยกหมวดความประสงค์</h5>
                  <p className="text-xs text-brand-green-light opacity-85 leading-relaxed mt-1">
                    หากเป็นเรื่องด่วนเกี่ยวกับเครื่องชงพัง แฟลชความขัดข้อง จะทำการบันทึกใบงานส่งเข้าฐานข้อมูล แล้วกดส่งปุ่มจำลองโอนสายส่งต่อไปให้มนุษย์ดูแลทันทีโดยไร้รอยต่อ
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#2dc489]/20 flex items-center justify-center text-[#2dc489] font-bold text-sm shrink-0 mt-0.5">3</div>
                <div>
                  <h5 className="font-bold text-sm">จัดส่งตัวอย่างวัตถุดิบและสร้างยอดขายเมล็ดกาแฟ</h5>
                  <p className="text-xs text-brand-green-light opacity-85 leading-relaxed mt-1">
                    ลูกค้าสามารถเอ่ยความสนใจแคตตาล็อกสินค้า ระบบระบุรายการราคาเพื่อเพิ่มเรตส่งผู้ค้า เพื่อให้ทางร้านสามารถส่งเอกสารตามไปปิดดีลได้สะดวกที่สุด
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Landing Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-16 text-center text-xs text-zinc-400 space-y-2">
        <div className="border-t border-zinc-150 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-500">
          <div className="flex items-center gap-2">
            <Coffee size={16} className="text-brand-green" />
            <span className="font-bold text-zinc-800 font-sans">© 2026 บริษัท ดีเซมเบอร์ เดย์ คอฟฟี่ จำกัด</span>
          </div>
          <div className="flex gap-4">
            <a href="#playground" className="hover:text-brand-green transition-colors">ทดลองระบบจำลองเสียง</a>
            <a href="#features" className="hover:text-brand-green transition-colors">ข้อตกลงและเงื่อนไขการคุ้มครอง</a>
            <a href="#" className="hover:text-brand-green transition-colors">ติดต่อสนับสนุนฝ่ายติดตั้ง</a>
          </div>
        </div>
        <p className="pt-4 text-[10px] text-zinc-400">
          ขับเคลื่อนโดยแพลตฟอร์ม Voice Agent ภาษาไทยสำหรับอุตสาหกรรมคาเฟ่ยุคใหม่ • Gemini 3.5-Flash และ WebSpeech Processing API
        </p>
      </footer>

    </div>
  );
}
