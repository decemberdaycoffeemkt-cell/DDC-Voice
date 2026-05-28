import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, PhoneOff, Mic, MicOff, Send, Volume2, VolumeX, 
  Sparkles, ShieldAlert, ArrowRight, RefreshCw, HelpCircle, User, Cpu
} from "lucide-react";
import { ChatMessage, ExtractedSupportInfo, CallState } from "../types";

interface PhoneCallSimulatorProps {
  gender: "female" | "male";
  setGender: (g: "female" | "male") => void;
  callState: CallState;
  setCallState: (state: CallState) => void;
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  extractedInfo: ExtractedSupportInfo;
  setExtractedInfo: React.Dispatch<React.SetStateAction<ExtractedSupportInfo>>;
  onTransferTriggered: (dept: "sales" | "technician", notes: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isWidget?: boolean;
}

const PRESET_PROMPTS = [
  {
    label: "☕ 1. สอบถามเมล็ดกาแฟ (ไม่โอนสาย)",
    text: "สวัสดีค่ะ ที่ร้านมีเมล็ดกาแฟคั่วแบบไหนแนะนำบ้างคะ? กำลังจะเปิดร้านใหม่ค่ะ"
  },
  {
    label: "🛠️ 2. แจ้งซ่อมเครื่องเสีย (บอทจะถามเบอร์ก่อน)",
    text: "สวัสดีค่ะ พอดีเครื่องชงกาแฟที่ร้านน้ำไม่ไหลเลยค่ะ รบกวนติดต่อส่งช่างให้หน่อยได้ไหมคะ"
  },
  {
    label: "📞 3. แจ้งซ่อมด่วน (โอนสายหาช่างทันที)",
    text: "เครื่องชงน้ำไม่ร้อนเลยครับ อยากแจ้งซ่อมด่วน ชื่อโน้ต ร้าน Slow Day เบอร์โทรผม 095-212-3450 ครับ"
  },
  {
    label: "📈 4. ขอใบเสนอราคาค้าส่ง (โอนสายหาฝ่ายขายทันที)",
    text: "สนใจสั่งซื้อเมล็ดกาแฟคั่วกลาง 20 กิโลครับ ขอตารางราคาส่งยกลังและใบเสนอราคาด่วนเลย เบอร์เฮียเฮงครับ 081-345-6789"
  },
  {
    label: "👤 5. ขอคุยกับมนุษย์ (โอนสายทันที)",
    text: "ฮัลโหล ขอคุยกับพนักงานหน้าร้านโดยตรงหน่อยค่ะ ไม่อยากคุยกับระบบอัตโนมัติแล้วค่ะ"
  }
];

const simulateLocalResponse = (inputText: string, gender: "female" | "male") => {
  const lastMessage = inputText.trim();
  const hasPhone = /0\d{1,2}-?\d{3}-?\d{4}|0\d{8,9}/.test(lastMessage);
  const wantsStaff = /คุยกับคน|ขอสาย|พนักงาน|เจ้าหน้าที่|คุยกับมนุษย์|โอนสาย|สายตรง|ต่อสาย/.test(lastMessage);
  const isIssue = /พัง|เสีย|ใช้ไม่ได้|น้ำไม่ไหล|ร้อน|รั่ว|ชำรุด|ขัดข้อง|ซ่อม/.test(lastMessage);
  const isCoffeeQuery = /เมล็ดกาแฟ|ราคาส่ง|ราคา|เมล็ด|กาแฟ|โปรโมชั่น|ส่วนลด|ค้าส่ง|วัตถุดิบ|ผงชง/.test(lastMessage);
  
  const replyTheme = gender === "female" ? "ค่ะ" : "ครับ";
  const agentName = gender === "female" ? "น้องธันวา" : "พี่ภู";
  
  let replyText = `สวัสดี${replyTheme} ${agentName} ยินดีให้บริการค่ะ/ครับ หากสนใจเมล็ดกาแฟราคาส่ง หรือแจ้งปัญหาแจ้งได้เลยนะคะ/ครับ`;
  let transferTriggered = false;
  let transferDepartment = "none";
  
  if (wantsStaff) {
    replyText = gender === "female"
      ? `รับทราบและเข้าใจแล้วค่ะ เดี๋ยวน้องธันวาขอกดโอนสายไปยังคุณขวัญที่เบอร์ 096-163-1456 เพื่อดูแลให้ด่วนเลยนะคะ กรุณารอสักครู่เดียวค่ะ`
      : `รับทราบและเข้าใจแล้วครับ เดี๋ยวพี่ภูขอกดโอนสายไปยังคุณขวัญที่เบอร์ 096-163-1456 เพื่อดูแลให้ด่วนเลยครับ กรุณารอสักครู่เดียวครับ`;
    transferTriggered = true;
    transferDepartment = "sales";
  } else if (isIssue) {
    if (hasPhone) {
      replyText = gender === "female"
        ? `ได้รับเบอร์ติดต่อและรับเรื่องเรียบร้อยค่ะ เดี๋ยวน้องธันวาขอกดโอนสายไปแจ้งทีมช่างเทคนิคเพื่อติดต่อกลับและเข้าไปดูแลด่วนที่สุดเลยนะคะ กรุณารอสักครู่ค่ะ`
        : `ได้รับเบอร์ติดต่อและรับเรื่องเรียบร้อยครับ เดี๋ยวพี่ภูขอกดโอนสายไปแจ้งทีมช่างเทคนิคเพื่อติดต่อกลับและเข้าไปดูแลด่วนที่สุดเลยครับ กรุณารอสักครู่ครับ`;
      transferTriggered = true;
      transferDepartment = "technician";
    } else {
      replyText = gender === "female"
        ? `อุ๊ย ต้องขอประทานโทษด้วยนะคะที่เครื่องขัดข้อง ทางเรามีบริการซ่อมเครื่องชง เครื่องบด และเครื่องปั่นครบวงจร พร้อมล้างตะกรันและเปลี่ยนยางโอริงหัวชงค่ะ สามารถแอดไลน์แจ้งโดยตรงที่ @decservice (ลิงก์: https://lin.ee/WXYf27n) หรือฝากเบอร์โทรติดต่อกลับไว้ เดี๋ยวน้องธันวาประสานงานช่างติดต่อกลับด่วนเลยค่ะ`
        : `อุ๊ย ต้องขอประทานโทษด้วยครับที่เครื่องขัดข้อง ทางเรามีบริการซ่อมเครื่องชง เครื่องบด และเครื่องปั่นครบวงจร พร้อมล้างตะกรันและเปลี่ยนยางโอริงหัวชงครับ สามารถแอดไลน์แจ้งโดยตรงที่ @decservice (ลิงก์: https://lin.ee/WXYf27n) หรือฝากเบอร์โทรติดต่อกลับไว้ เดี๋ยวพี่ภูประสานงานช่างติดต่อกลับด่วนเลยครับ`;
    }
  } else if (isCoffeeQuery) {
    if (hasPhone) {
      replyText = gender === "female"
        ? `ได้รับเบอร์ติดต่อเรียบร้อยค่ะ เดี๋ยวน้องธันวารีบประสานงานฝ่ายขายโทรกลับเพื่อจัดทำใบเสนอราคาเรตราคาส่งยกลังพิเศษและส่งตารางราคาให้ทันทีเลยนะคะ รอสักครู่ค่ะ`
        : `ได้รับเบอร์ติดต่อเรียบร้อยครับ เดี๋ยวพี่ภูรีบประสานงานฝ่ายขายโทรกลับเพื่อจัดทำใบเสนอราคาเรตราคาส่งยกลังพิเศษและส่งตารางราคาให้ทันทีเลยครับ รอสักครู่ครับ`;
      transferTriggered = true;
      transferDepartment = "sales";
    } else {
      replyText = gender === "female"
        ? `เรามีเมล็ดกาแฟราคาส่งยอดนิยม เช่น S5 Premium Dark และ Colombia Peach Candy ค่ะ สั่งซื้อสะดวกบนเว็บที่ https://www.decemberdaycoffee.com หรือแอดไลน์ขอตารางราคาได้ที่ @decemberdaycoffee หรือหากสะดวกให้ฝ่ายขายโทรกลับ แจ้งชื่อและเบอร์โทรทิ้งไว้ได้เลยนะคะ`
        : `เรามีเมล็ดกาแฟราคาส่งยอดนิยม เช่น S5 Premium Dark และ Colombia Peach Candy ครับ สั่งซื้อสะดวกบนเว็บที่ https://www.decemberdaycoffee.com หรือแอดไลน์ขอตารางราคาได้ที่ @decemberdaycoffee หรือหากสะดวกให้ฝ่ายขายโทรกลับ แจ้งชื่อและเบอร์โทรทิ้งไว้ได้เลยครับ`;
    }
  } else if (/สวัสดี|ดีครับ|ดีค่ะ|ฮัลโหล/.test(lastMessage)) {
    replyText = gender === "female"
      ? `สวัสดีค่ะ! น้องธันวาจาก December Day Coffee ยินดีต้อนรับค่ะ ช่องทาง Line OA หลักคือ @decemberdaycoffee หรือเบอร์ติดต่อ 096-163-1456 ค่ะ วันนี้สนใจเมล็ดกาแฟหรือเรื่องเครื่องชงดีคะ?`
      : `สวัสดีครับ! พี่ภูจาก December Day Coffee ยินดีต้อนรับครับ ช่องทาง Line OA หลักคือ @decemberdaycoffee หรือเบอร์ติดต่อ 096-163-1456 ครับ วันนี้สนใจเมล็ดกาแฟหรือเรื่องเครื่องชงดีครับ?`;
  } else {
    replyText = gender === "female"
      ? `รับทราบข้อมูลและพร้อมประสานงานให้เลยค่ะ สะดวกแอดไลน์ @decemberdaycoffee หรือติดต่อตรงคุณขวัญ 096-163-1456 หรือจะพิมพ์เบอร์โทรกลับทิ้งไว้เพื่อให้น้องธันวาโทรนัดหมายให้เลยดีคะ?`
      : `รับทราบข้อมูลและพร้อมประสานงานให้เลยครับ สะดวกแอดไลน์ @decemberdaycoffee หรือติดต่อตรงคุณขวัญ 096-163-1456 หรือจะพิมพ์เบอร์โทรกลับทิ้งไว้เพื่อให้พี่ภูโทรนัดหมายให้เลยดีครับ?`;
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

export default function PhoneCallSimulator({
  gender,
  setGender,
  callState,
  setCallState,
  chatHistory,
  setChatHistory,
  extractedInfo,
  setExtractedInfo,
  onTransferTriggered,
  activeTab,
  setActiveTab,
  isWidget = false
}: PhoneCallSimulatorProps) {
  const [inputText, setInputText] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [enableVoiceOut, setEnableVoiceOut] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Thai text to speech with cute, natural, premium voice options
  const speakThai = (text: string) => {
    if (!enableVoiceOut || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Remove metadata emojis and symbols to make speech clean
      const cleanText = text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      let voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        // Retry once in case of delay
        voices = window.speechSynthesis.getVoices();
      }
      
      // Filter Thai voices
      const thVoices = voices.filter(v => v.lang.toLowerCase().includes("th") || v.lang.toLowerCase() === "th-th");
      
      // Prioritize premium/online/google voices over offline ones for a much more natural, high-fidelity experience
      let thVoice = null;
      if (thVoices.length > 0) {
        // 1. Natural or Online premium voice (e.g. Microsoft Pattara Online (Natural))
        thVoice = thVoices.find(v => v.name.toLowerCase().includes("natural") || v.name.toLowerCase().includes("online"));
        // 2. Google high quality online voice
        if (!thVoice) {
          thVoice = thVoices.find(v => v.name.toLowerCase().includes("google"));
        }
        // 3. Fallback to first available Thai voice
        if (!thVoice) {
          thVoice = thVoices[0];
        }
      }
      
      if (thVoice) {
        utterance.voice = thVoice;
        utterance.lang = thVoice.lang;
      } else {
        utterance.lang = "th-TH";
      }
      
      // Dynamic voice settings to enhance aesthetics (pitch & rate) to sound sweet, cute, and friendly
      if (gender === "female") {
        // Nong Thanwa is sweet and slightly higher pitched for cute, premium vibes
        utterance.pitch = 1.15; // Raised pitch makes the voice sound younger, sweeter, and cute!
        utterance.rate = 1.02;  // Natural flow rate
      } else {
        // P' Phu is a warm, polite gentleman
        utterance.pitch = 0.98;
        utterance.rate = 1.05;
      }
      
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error", e);
    }
  };

  // Setup Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "th-TH";

      rec.onstart = () => {
        setIsListening(true);
        setMicError(null);
      };

      rec.onresult = (event: any) => {
        const resultText = event.results[0][0].transcript;
        if (resultText) {
          handleUserSend(resultText);
        }
      };

      rec.onerror = (event: any) => {
        console.error("Speech Recognition Error", event);
        if (event.error === "not-allowed") {
          setMicError("ไม่ได้รับอนุญาตให้ใช้ไมโครโฟน");
        } else if (event.error === "no-speech") {
          // just ignore silent
        } else {
          setMicError(`ข้อผิดพลาดเกี่ยวกับเสียง: ${event.error}`);
        }
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    } else {
      setMicError("เบราว์เซอร์นี้ไม่สนับสนุนการรู้จำเสียงพูดทางไมค์");
    }

    // load voices
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch(e) {}
      }
    };
  }, []);

  // Call duration counter
  useEffect(() => {
    if (callState === "connected" || callState === "transferring") {
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (callState === "idle") {
        setDuration(0);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState]);

  // Scroll to bottom of transcripts
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, callState]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      setMicError("ระบบจดจำเสียงไม่พร้อมใช้งานบนเครื่องนี้");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        setMicError(null);
        recognitionRef.current.start();
      } catch (e) {
        console.error("Failed to start speech recognition:", e);
      }
    }
  };

  const startPhoneCall = async () => {
    // Prime the Speech Synthesis engine synchronously on user click to unlock audio for the entire session (crucial for mobile/Safari/Chrome)
    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const silentUtterance = new SpeechSynthesisUtterance(" ");
        silentUtterance.volume = 0;
        silentUtterance.rate = 1;
        window.speechSynthesis.speak(silentUtterance);
      } catch (e) {
        console.warn("Failed to prime SpeechSynthesis:", e);
      }
    }

    setCallState("ringing");
    setChatHistory([]);
    setExtractedInfo({
      customerName: null,
      shopName: null,
      phone: null,
      issueDescription: null
    });
    setDuration(0);

    // Play phone call ring simulator tone
    setTimeout(() => {
      setCallState("connected");
      // Initial hello from agent
      const initialGreeting = gender === "female" 
        ? "สวัสดีค่ะ December Day Coffee ยินดีให้บริการค่ะ วันนี้ต้องการสอบถามข้อมูลสินค้า หรือแจ้งปัญหาด้านใดดีคะ?"
        : "สวัสดีครับ December Day Coffee ยินดีให้บริการครับ วันนี้ต้องการสอบถามข้อมูลสินค้า หรือแจ้งปัญหาด้านใดดีครับ?";
      
      const greetingMsg: ChatMessage = {
        id: "greet-1",
        role: "assistant",
        content: initialGreeting,
        timestamp: new Date()
      };
      
      setChatHistory([greetingMsg]);
      speakThai(initialGreeting);
    }, 1200);
  };

  const hangUpCall = () => {
    setCallState("ended");
    setIsListening(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch(e) {}
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setTimeout(() => {
      setCallState("idle");
    }, 3000);
  };

  const handleUserSend = async (text: string) => {
    if (!text.trim() || apiLoading || callState !== "connected") return;
    
    setInputText("");
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date()
    };

    const updatedHistory = [...chatHistory, userMsg];
    setChatHistory(updatedHistory);
    setApiLoading(true);

    try {
      // Proxy requests to server-side Gemini chat API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedHistory.map(m => ({ role: m.role, content: m.content })),
          gender: gender
        })
      });

      if (!response.ok) {
        throw new Error("ระบบปลายสายขัดข้องในการตอบคำถาม");
      }

      const data = await response.json();
      
      const responseMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.reply || "ขออภัยด้วยค่ะ ระบบสัญญาณขัดข้องชั่วคราว",
        timestamp: new Date()
      };

      setChatHistory(prev => [...prev, responseMsg]);
      speakThai(data.reply);

      // Save extracted support details dynamically to feed into parent state
      if (data.extractedInfo) {
        setExtractedInfo(prev => ({
          customerName: data.extractedInfo.customerName || prev.customerName,
          shopName: data.extractedInfo.shopName || prev.shopName,
          phone: data.extractedInfo.phone || prev.phone,
          issueDescription: data.extractedInfo.issueDescription || prev.issueDescription
        }));
      }

      // Handle Transfer trigger from Gemini response
      if (data.transferTriggered) {
        setCallState("transferring");
        setTimeout(() => {
          setCallState("transferred");
          const dept = data.transferDepartment === "sales" ? "sales" : "technician";
          const notes = data.extractedInfo?.issueDescription || "ความต้องการทั่วไปหรือขอสายส่วนงาน";
          onTransferTriggered(dept, notes);
        }, 3000);
      }

    } catch (err: any) {
      console.warn("API error, falling back to local client simulator:", err);
      const data = simulateLocalResponse(text, gender);
      
      const responseMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date()
      };

      setChatHistory(prev => [...prev, responseMsg]);
      speakThai(data.reply);

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
          onTransferTriggered(dept, notes);
        }, 3000);
      }
    } finally {
      setApiLoading(false);
    }
  };

  const getFormatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className={isWidget 
      ? "bg-white overflow-hidden flex flex-col h-full w-full relative"
      : "bg-white rounded-3xl border border-zinc-200/80 shadow-2xl overflow-hidden flex flex-col h-[650px] relative"
    }>
      
      {/* Device Header */}
      <div className="bg-brand-green-dark px-6 py-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-accent font-mono">
            December Day AI Phone
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Toggle Voice output */}
          <button 
            onClick={() => setEnableVoiceOut(!enableVoiceOut)}
            className={`p-1.5 rounded-lg transition-colors duration-200 ${enableVoiceOut ? "bg-brand-green text-white" : "bg-zinc-800 text-zinc-500"}`}
            title={enableVoiceOut ? "ปิดเสียงอ่านออกเสียง AI" : "เปิดเสียงอ่านออกเสียง AI"}
          >
            {enableVoiceOut ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
          
          <div className="flex bg-brand-green-dark/60 rounded-lg p-0.5 text-xs font-medium border border-white/10">
            <button 
              onClick={() => callState === "idle" && setGender("female")}
              disabled={callState !== "idle"}
              className={`px-2 py-1 rounded-md transition-all ${gender === "female" ? "bg-brand-green text-white" : "text-white/60 hover:text-white"}`}
            >
              หญิง (ค่ะ)
            </button>
            <button 
              onClick={() => callState === "idle" && setGender("male")}
              disabled={callState !== "idle"}
              className={`px-2 py-1 rounded-md transition-all ${gender === "male" ? "bg-brand-green text-white" : "text-white/60 hover:text-white"}`}
            >
              ชาย (ครับ)
            </button>
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden relative p-4">
        
        <AnimatePresence mode="wait">
          {callState === "idle" && (
            <motion.div 
              key="call-idle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col justify-between py-6 px-4"
            >
              <div className="text-center mt-6">
                <div className="w-24 h-24 rounded-full bg-brand-green-light flex items-center justify-center mx-auto mb-4 border border-brand-green/10">
                  <Phone size={44} className="text-brand-green" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 font-sans tracking-tight">
                  ระบบสายด่วนอัจฉริยะ
                </h3>
                <p className="text-sm text-zinc-500 mt-2 max-w-xs mx-auto">
                  ต้อนรับลูกค้า ให้ข้อมูลสินค้า ทำใบเสนอราคา และรับเรื่องซ่อมด่วน ตลอด 24 ชม.
                </p>
                
                {/* Voice specs description */}
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green-light text-brand-green border border-brand-green/20 text-xs font-semibold">
                  <Cpu size={12} />
                  <span>
                    เสียงบริการปัจจุบัน: {gender === "female" ? "น้องธันวา (ค่ะ/คะ)" : "พี่ภู (ครับ/ครับผม)"}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="space-y-4">
                <button
                  onClick={startPhoneCall}
                  className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-brand-green/10"
                >
                  <Phone size={20} className="animate-bounce" />
                  <span>เริ่มการสายจำลอง (Call AI Agent)</span>
                </button>

                <div className="text-center">
                  <span className="text-xs text-zinc-400 font-mono">
                    *กรุณาดูคู่มือข้อความทดสอบได้ที่หัวข้อด้านล่าง
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {callState === "ringing" && (
            <motion.div 
              key="call-ringing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-center items-center py-12"
            >
              <div className="relative mb-8">
                <div className="w-28 h-28 rounded-full bg-brand-green-light animate-ping absolute" />
                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center border border-brand-green/20 relative">
                  <img 
                    src={gender === "female" 
                      ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                      : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    }
                    alt="Agent Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <span className="text-brand-green font-medium font-mono tracking-wider animate-pulse text-sm">
                กำลังหมุนเรียกสาย...
              </span>
              <h4 className="text-2xl font-bold text-zinc-900 mt-2">
                {gender === "female" ? "น้องธันวา" : "พี่ภู"} (AI Client Services)
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                December Day Automatic Call Center
              </p>
            </motion.div>
          )}

          {(callState === "connected" || callState === "transferring" || callState === "transferred" || callState === "ended") && (
            <motion.div 
              key="call-active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col h-full overflow-hidden"
            >
              
              {/* Top info bar during call */}
              <div className="flex justify-between items-center pb-3 border-b border-brand-green/10 mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-semibold text-emerald-850 font-mono">
                    {callState === "connected" ? "กำลังสนทนา (Live Call)" : 
                     callState === "transferring" ? "กำลังโอนสาย..." : 
                     callState === "transferred" ? "โอนสายไปยังมนุษย์ส่งต่อแล้ว" : "สายหลุดแล้ว"}
                  </span>
                </div>
                <div className="text-xs text-brand-green font-mono font-bold tracking-widest">
                  {getFormatDuration(duration)}
                </div>
              </div>

              {/* Voice Transcript Section */}
              <div className="flex-1 overflow-y-auto px-2 space-y-4 max-h-[300px] mb-4 scrollbar-thin scrollbar-thumb-brand-green/10">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-6 text-xs text-zinc-400">
                    เตรียมตัวคุยโทรศัพท์...
                  </div>
                ) : (
                  chatHistory.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        {msg.role === "assistant" ? (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                            <span className="text-[10px] font-bold text-brand-green uppercase">
                              {gender === "female" ? "น้องธันวา" : "พี่ภู"}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-[10px] font-bold text-zinc-500">คุณ (ลูกค้า)</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                          </>
                        )}
                      </div>
                      <div 
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed ${
                          msg.role === "user" 
                            ? "bg-brand-green-light text-brand-green-dark font-medium rounded-tr-none" 
                            : "bg-zinc-50 text-zinc-800 border border-zinc-100 rounded-tl-none font-sans"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                
                {apiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-50 border border-zinc-100 rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-2">
                      <span className="text-xs text-zinc-400">{gender === "female" ? "น้องธันวากำลังพิมพ์..." : "พี่ภูกำลังพิมพ์..."}</span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce delay-75" />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce delay-150" />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce delay-300" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Live Waveform Indicator */}
              <div className="bg-brand-green-light/40 border border-brand-green/10 rounded-2xl p-3 flex flex-col items-center justify-center mb-4 min-h-[60px]">
                {callState === "connected" && (
                  <>
                    <div className="flex items-center justify-center gap-1 h-5 mb-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((h, i) => (
                        <motion.div 
                          key={i}
                          animate={{ 
                            height: isListening 
                              ? [4, h * 2, 4] 
                              : apiLoading 
                                ? [4, (i % 3 === 0 ? 16 : 8), 4] 
                                : [4, 6, 4]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: isListening ? 0.6 : (apiLoading ? 1.0 : 2),
                            delay: i * 0.03 
                          }}
                          className={`${isListening ? "bg-emerald-500" : apiLoading ? "bg-brand-green" : "bg-zinc-400"} w-1 rounded-full`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green/75 font-mono">
                      {isListening ? "ลูกค้ากำลังพูด (Listening...)" : apiLoading ? "AI กำลังคิดคำพูด (Processing...)" : "เว้นระยะรอให้ท่านพูดคุย..."}
                    </span>
                  </>
                )}

                {callState === "transferring" && (
                  <div className="flex flex-col items-center py-2">
                    <RefreshCw className="text-brand-green animate-spin mb-1" size={20} />
                    <span className="text-xs font-bold text-brand-green font-sans tracking-wide">
                      โอนสายเรียบร้อย ลูกค้ากรุณารอต่อสายสักครู่...
                    </span>
                  </div>
                )}

                {callState === "transferred" && (
                  <div className="text-center py-2 flex flex-col items-center">
                    <div className="p-1 px-3 bg-emerald-100 text-[#0e7b4b] rounded-full text-xs font-bold mb-1 border border-emerald-200">
                      CONNECTED TO OPERATOR
                    </div>
                    <span className="text-xs text-zinc-500 font-sans">
                      ระบบ AI น้องธันวาได้สลับสายช่างเทคนิค/ความช่วยเหลือเรียบร้อย ตารางดูแลขึ้นด้านข้าง CRM
                    </span>
                  </div>
                )}

                {callState === "ended" && (
                  <div className="text-center py-2 text-rose-700 font-semibold text-xs">
                    วางสายสนทนาแล้ว บันทึกข้อมูล Ticket ลงระบบ CRM แล้วเรียบร้อย
                  </div>
                )}
              </div>

              {/* Preset suggestions to help the user test easily */}
              {callState === "connected" && (
                <div className="mb-4">
                  <div className="text-[10px] font-bold text-brand-green-dark/60 uppercase tracking-widest pl-1 mb-1.5 flex items-center gap-1">
                    <Sparkles size={10} />
                    <span>คำสั่งลัดคำพูดทดสอบแอนิเมชัน</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-[90px] overflow-y-auto pr-1">
                    {PRESET_PROMPTS.map((pre, index) => (
                      <button
                        key={index}
                        onClick={() => handleUserSend(pre.text)}
                        className="text-left text-xs bg-white hover:bg-brand-green-light/40 text-[#0e7b4b] font-medium px-2.5 py-1.5 rounded-xl border border-brand-green/20 active:scale-[0.98] transition-all truncate max-w-full"
                        title={pre.text}
                      >
                        {pre.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Call Controls Bar */}
              <div className="flex items-center gap-2 mt-auto">
                {callState === "connected" && (
                  <>
                    {/* Record Mic */}
                    <button
                      onClick={toggleMic}
                      className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
                        isListening 
                          ? "bg-emerald-600 animate-pulse text-white hover:bg-emerald-700 hover:scale-105" 
                          : "bg-brand-green-light hover:bg-brand-green-light/80 text-brand-green-dark"
                      }`}
                      title={isListening ? "หยุดพูด" : "เริ่มพูด (ใช้ไมค์)"}
                    >
                      {isListening ? <Mic size={20} /> : <MicOff size={20} />}
                    </button>

                    {/* Text Input to fallback */}
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleUserSend(inputText)}
                        placeholder={isListening ? "กำลังฟังเรื่องของคุณ..." : "กล่าวตอบ หรือพิมพ์พูดคุย..."}
                        className="w-full bg-white border border-zinc-200 rounded-2xl py-3 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green text-zinc-900 shadow-inner"
                      />
                      <button
                        onClick={() => handleUserSend(inputText)}
                        className="absolute right-2 top-2 p-1 bg-brand-green text-white rounded-xl hover:bg-brand-green-dark"
                      >
                        <Send size={15} />
                      </button>
                    </div>

                    {/* Hangup Red button */}
                    <button
                      onClick={hangUpCall}
                      className="p-3 bg-red-650 hover:bg-red-750 text-white rounded-2xl transition-all shadow-md active:scale-95"
                      title="วางสายสนทนา"
                    >
                      <PhoneOff size={20} />
                    </button>
                  </>
                )}

                {(callState === "transferring" || callState === "transferred" || callState === "ended") && (
                  <button
                    onClick={hangUpCall}
                    className="w-full bg-red-650 hover:bg-red-750 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <PhoneOff size={18} />
                    <span>วางสาย (End Call / Reset)</span>
                  </button>
                )}
              </div>

              {micError && (
                <div className="mt-2 text-[10px] text-[#0e7b4b] flex items-center gap-1 px-1 bg-brand-green-light/30 p-1 rounded-lg border border-brand-green/20">
                  <ShieldAlert size={10} />
                  <span>{micError} - กรุณาพิมพ์ตอบเพื่อทดสอบได้ทันที</span>
                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </div>
  );
}
