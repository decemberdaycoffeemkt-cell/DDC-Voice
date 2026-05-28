import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, UserCheck, Clipboard, Clock, ExternalLink, RefreshCw, 
  HelpCircle, ChevronRight, CheckCircle2, AlertCircle, Wrench, BadgePercent, PhoneCall
} from "lucide-react";
import { SupportTicket, ExtractedSupportInfo, CallState } from "../types";

interface CRMSupportDashboardProps {
  tickets: SupportTicket[];
  setTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>;
  extractedInfo: ExtractedSupportInfo;
  callState: CallState;
  gender: "female" | "male";
  currentlyTransferringTo: "sales" | "technician" | "none";
}

export default function CRMSupportDashboard({
  tickets,
  setTickets,
  extractedInfo,
  callState,
  gender,
  currentlyTransferringTo
}: CRMSupportDashboardProps) {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // Identify status badge styling
  const getStatusBadge = (status: SupportTicket["status"]) => {
    switch (status) {
      case "pending":
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200 uppercase">Pending</span>;
      case "transferred_technical":
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-rose-200 uppercase flex items-center gap-1"><Wrench size={10}/> Technical Team</span>;
      case "transferred_sales":
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 uppercase flex items-center gap-1"><BadgePercent size={10}/> Sales Team</span>;
      case "completed":
        return <span className="bg-zinc-100 text-zinc-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-zinc-200 uppercase flex items-center gap-1"><CheckCircle2 size={10}/> Resolved</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      
      {/* Live Ticket Workspace Section representing current call */}
      <div className="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${callState !== 'idle' ? 'bg-brand-green animate-pulse' : 'bg-gray-300'}`} />
            <h3 className="font-bold text-zinc-900 text-base font-sans tracking-tight">
              โมดูลจับข้อมูลเรียลไทม์ (Live Support Ticket Tracker)
            </h3>
          </div>
          {callState !== "idle" && (
            <span className="text-[10px] font-bold uppercase py-0.5 px-2 bg-brand-green-light text-brand-green rounded border border-brand-green/20 font-mono">
              ข้อมูลอัปเดตแอร์ไดนามิกโดย AI
            </span>
          )}
        </div>

        {callState === "idle" ? (
          <div className="py-8 text-center text-zinc-400 text-sm flex flex-col items-center justify-center">
            <Clipboard size={32} className="text-zinc-250 mb-2" />
            <span>ไม่มีสายที่มีการสนทนาอยู่ขณะนี้</span>
            <p className="text-xs text-zinc-400 mt-1">กรุณาทดลอง "เริ่มการสายจำลอง" บนโทรศัพท์ด้านซ้าย</p>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Field Grid showing what Gemini extracted so far */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Field 1: Customer Name */}
              <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100/80 transition-all">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  1) ชื่อลูกค้าผู้แจ้ง (Name)
                </span>
                <div className="flex items-center gap-1.5 min-h-[22px]">
                  {extractedInfo.customerName ? (
                    <motion.span 
                      initial={{ scale: 0.95, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }} 
                      className="text-sm font-bold text-brand-green-dark font-sans"
                    >
                      {extractedInfo.customerName}
                    </motion.span>
                  ) : (
                    <span className="text-xs text-zinc-400 italic font-mono">รอจับข้อมูลในการสนทนา...</span>
                  )}
                </div>
              </div>

              {/* Field 2: Contact Phone */}
              <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100/80 transition-all">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  2) เบอร์โทรติดต่อ (Phone)
                </span>
                <div className="flex items-center gap-1.5 min-h-[22px]">
                  {extractedInfo.phone ? (
                    <motion.span 
                      initial={{ scale: 0.95, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }} 
                      className="text-sm font-bold text-brand-green-dark font-mono"
                    >
                      {extractedInfo.phone}
                    </motion.span>
                  ) : (
                    <span className="text-xs text-zinc-400 italic font-mono">รอจับข้อมูลเบอร์ติดต่อ...</span>
                  )}
                </div>
              </div>

              {/* Field 3: Cafe Shop Name */}
              <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100/80 transition-all">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  3) ชื่อร้านกาแฟ (Cafe Shop)
                </span>
                <div className="flex items-center gap-1.5 min-h-[22px]">
                  {extractedInfo.shopName ? (
                    <motion.span 
                      initial={{ scale: 0.95, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }} 
                      className="text-sm font-bold text-brand-green-dark"
                    >
                      {extractedInfo.shopName}
                    </motion.span>
                  ) : (
                    <span className="text-xs text-zinc-400 italic">ไม่เป็นระบุ (หรือกำลังจับข้อมูล...)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Field 4: Symptoms/Inquiry Description */}
            <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100/80">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                รายละเอียดอาการเสียหรือเรื่องที่แจ้ง (Issue / Inquiry Description)
              </span>
              <div className="min-h-[40px]">
                {extractedInfo.issueDescription ? (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-xs font-semibold text-zinc-800 leading-relaxed"
                  >
                    {extractedInfo.issueDescription}
                  </motion.p>
                ) : (
                  <p className="text-xs text-zinc-400 italic font-sans leading-relaxed">
                    รอสรุปอาการเสียหาย... (ตามมาตรการห้ามเดาโรคและห้ามวิเคราะห์อาการเสียหายเองเบื้องต้น โดย AI จะสกัดสรุปตรงตามคำให้การลูกค้าเพื่อความแม่นยำ)
                  </p>
                )}
              </div>
            </div>

            {/* Live Handoff alert */}
            <AnimatePresence>
              {(callState === "transferring" || callState === "transferred") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`p-4 rounded-2xl border ${
                    currentlyTransferringTo === "technician" 
                      ? "bg-rose-50 border-rose-200 text-rose-950" 
                      : "bg-emerald-50 border-emerald-200 text-emerald-950"
                  } flex items-start gap-3`}
                >
                  <AlertCircle size={20} className={currentlyTransferringTo === "technician" ? "text-rose-600 mt-0.5" : "text-brand-green mt-0.5"} />
                  <div className="flex-1">
                    <h5 className="text-xs font-bold leading-none block uppercase tracking-wide mb-1">
                      {currentlyTransferringTo === "technician" ? "🚨 กำลังสลับสายโอนหาช่างเทคนิคซ่อมกาแฟ" : "📈 กำลังโอนสายหาบาริสต้าฝ่ายขายเมล็ดกาแฟ"}
                    </h5>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      ระบบประมวลผลคำของน้องธันวา/พี่ภู ตรวจจับได้ถึงความต้องการความช่วยเหลือเร่งด่วน โดยไม่ต้องวินิจฉัยซับซ้อน ได้ทำการรวบรวมแบบประเมินผู้รับ เพื่อเปลี่ยนสลับเข้าสายด่วนบาริสต้าฝ่าย{currentlyTransferringTo === "technician" ? "เทคนิคซ่อมแซม" : "ประเมินบาริสต้าฝ่ายคู่ค้า"}เรียบร้อย
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        )}
      </div>

      {/* Historic tickets representation */}
      <div className="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4 border-b border-zinc-100 pb-2">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-brand-green" />
            <h3 className="font-bold text-zinc-900 text-base font-sans tracking-tight">
              ฐานข้อมูลประสานตารางช่วยเหลือลูกค้า (December Day CRM Log)
            </h3>
          </div>
          <span className="text-xs text-zinc-400 font-bold font-mono">
            {tickets.length} รวมรายการ
          </span>
        </div>

        {/* Tickets Scroll list */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[250px] scrollbar-thin scrollbar-thumb-zinc-150">
          {tickets.map((ticket) => (
            <div 
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className="bg-zinc-50/50 hover:bg-zinc-50 p-4 rounded-2xl border border-zinc-200/40 hover:border-brand-green/20 transition-all cursor-pointer flex justify-between items-center group shadow-sm"
            >
              <div className="space-y-1 flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold font-mono text-brand-green-dark">
                    #{ticket.id}
                  </span>
                  <span className="text-xs font-semibold text-zinc-800 truncate">
                    {ticket.customerName || "ลูกค้าไม่ได้แจ้งชื่อ"}
                  </span>
                  {ticket.shopName && (
                    <span className="text-[10px] bg-brand-green-light text-brand-green py-0.5 px-2 rounded-md font-sans border border-brand-green/10 max-w-[120px] truncate">
                      {ticket.shopName}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 truncate font-sans">
                  {ticket.issueDescription || "สอบถามข้อมูลสินค้าและบริการทั่วไป"}
                </p>
                <div className="flex gap-2 text-[10px] text-zinc-404 font-mono">
                  <span>คุย {ticket.callDuration}</span>
                  <span>•</span>
                  <span>{new Date(ticket.timestamp).toLocaleTimeString("th-TH")}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                {getStatusBadge(ticket.status)}
                <ChevronRight size={14} className="text-zinc-300 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Dialog Details Popup */}
      <AnimatePresence>
        {selectedTicket && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-xs"
            onClick={() => setSelectedTicket(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-zinc-205 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start border-b border-zinc-100 pb-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-green-dark font-bold font-mono text-sm">#{selectedTicket.id}</span>
                    {getStatusBadge(selectedTicket.status)}
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 mt-1">ประวัติการแจ้งงานอย่างละเอียด</h4>
                </div>
                <button 
                  onClick={() => setSelectedTicket(null)}
                  className="rounded-full bg-zinc-100 hover:bg-zinc-200 p-1.5 text-zinc-650 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* CRM Card Fields */}
              <div className="space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">ชื่อลูกค้า</span>
                    <p className="text-sm font-bold text-zinc-900">{selectedTicket.customerName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">เบอร์ติดต่อกลับ</span>
                    <p className="text-sm font-bold text-zinc-900 font-mono">{selectedTicket.phone}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">ร้านสาขา</span>
                    <p className="text-sm font-semibold text-zinc-800">{selectedTicket.shopName || "ไม่ได้แจ้งข้อมูลไว้"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">เวลาที่สลักข้อมูล</span>
                    <p className="text-sm text-zinc-500 font-mono">{new Date(selectedTicket.timestamp).toLocaleTimeString("th-TH")} น.</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">อาการชำรุดหรือหัวข้อประสานงาน</span>
                  <div className="bg-brand-green-light/30 border border-brand-green/10 rounded-2xl p-3.5 mt-1 text-xs text-zinc-800 font-sans leading-relaxed">
                    {selectedTicket.issueDescription || "ไม่มีข้อมูลรายละเอียดขัดข้อง (ผู้ติดต่อแจ้งความต้องการสอบถามราคาขายปลีกและขายส่งทั่วไป)"}
                  </div>
                </div>

                <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase block mb-1">
                    ผู้ดำเนินการที่จัดสรรให้เข้าสายช่วยเหลือ
                  </span>
                  <p className="text-xs font-bold text-emerald-800">
                    {selectedTicket.assignedTo}
                  </p>
                </div>

                {/* Dialog Chat Transcripts logged */}
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase block mb-2">บทสนทนาที่ถูกสลักบันทึกไว้โดย AI</span>
                  <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 max-h-[180px] overflow-y-auto space-y-3 scrollbar-thin">
                    {selectedTicket.chatHistory.map((c, i) => (
                      <div key={i} className={`flex flex-col ${c.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <span className="text-[9px] text-zinc-400 mb-0.5">
                          {c.role === 'user' ? 'ลูกค้า' : (selectedTicket.gender === 'female' ? 'น้องธันวา' : 'พี่ภู')}
                        </span>
                        <div className={`p-2 px-3 rounded-xl text-xs max-w-[90%] leading-normal ${c.role === 'user' ? 'bg-brand-green-light text-brand-green-dark font-medium' : 'bg-white border border-zinc-200 text-zinc-800'}`}>
                          {c.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-2.5 rounded-xl text-xs font-bold transition-all active:scale-[0.99]"
                >
                  เรียบร้อย
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
