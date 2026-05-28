import React, { useState } from "react";
import { motion } from "motion/react";
import { Coffee, Filter, Percent, Info, ExternalLink, Flame, Sparkles } from "lucide-react";
import { ProductItem } from "../types";
import { PRODUCTS } from "../data";

interface ProductCatalogueProps {
  onSuggestQuestion: (text: string) => void;
  callState: "idle" | "ringing" | "connected" | "transferring" | "transferred" | "ended";
}

export default function ProductCatalogue({ onSuggestQuestion, callState }: ProductCatalogueProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "coffee_beans" | "ingredients" | "machines">("all");

  const filteredProducts = PRODUCTS.filter(p => activeCategory === "all" || p.category === activeCategory);

  const getCategoryName = (cat: string) => {
    switch (cat) {
      case "coffee_beans": return "เมล็ดกาแฟ";
      case "ingredients": return "วัตถุดิบอื่น ๆ";
      case "machines": return "เครื่องชงกาแฟ";
      default: return "";
    }
  };

  const handleQueryHelp = (product: ProductItem) => {
    let question = "";
    if (product.category === "coffee_beans") {
      question = `สนใจสั่งเมล็ดกาแฟ ${product.name} ครับ อยากทราบราคาเรตราคาส่งขั้นต่ำ 5 กิโลกรัมครับ`;
    } else if (product.category === "ingredients") {
      question = `ขอราคาและสเปกของผลิตภัณฑ์ ${product.name} ไปวางขายที่ร้านกาแฟหน่อยครับ`;
    } else {
      question = `สนใจเครื่องชงตัว ${product.name} ครับ สเปกนี้เหมาะสำหรับร้านขนาดประมาณไหน และจัดฟรีกาแฟอะไรบ้างครับ`;
    }
    onSuggestQuestion(question);
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm">
      
      {/* Catalog Title */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-zinc-100 pb-4 mb-4">
        <div>
          <h3 className="font-bold text-zinc-900 text-base font-sans tracking-tight">
            แคตตาล็อกสินค้าอะไหล่และวัตถุดิบ (December Day Products)
          </h3>
          <p className="text-zinc-500 text-xs mt-1">
            รายการสินค้าอย่างเป็นทางการสำหรับอ้างอิงตอนสั่งซื้อ หรือสอบถามรายละเอียดกับ AI Agent
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex bg-zinc-100 p-1 rounded-xl gap-1 shrink-0 text-xs">
          {(["all", "coffee_beans", "ingredients", "machines"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === cat 
                  ? "bg-brand-green text-white shadow" 
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              {cat === "all" ? "ทั้งหมด" : cat === "coffee_beans" ? "เมล็ดกาแฟ" : cat === "ingredients" ? "วัตถุดิบ" : "เครื่องชง"}
            </button>
          ))}
        </div>
      </div>

      {/* Product Bento List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-150">
        {filteredProducts.map((p) => (
          <div 
            key={p.id}
            className="border border-zinc-200/60 rounded-2xl p-4 flex flex-col justify-between hover:border-brand-green-dark/30 hover:shadow-md transition-all relative overflow-hidden bg-brand-green-light/10 group"
          >
            {p.tag && (
              <span className="absolute top-0 right-0 py-0.5 px-3 bg-brand-green text-white font-bold rounded-bl-xl text-[9px] uppercase tracking-wider flex items-center gap-1 font-sans">
                <Flame size={9} className="animate-pulse" />
                {p.tag}
              </span>
            )}

            <div>
              <div className="flex items-center gap-1.5 text-brand-green/70 font-medium text-[10px] uppercase font-mono mb-1.5">
                <Coffee size={11} className="text-brand-green" />
                <span>{getCategoryName(p.category)}</span>
              </div>
              <h4 className="font-bold text-zinc-900 text-sm font-sans tracking-tight group-hover:text-brand-green">
                {p.name}
              </h4>
              <p className="text-zinc-500 font-normal leading-relaxed text-xs mt-1">
                {p.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                  ราคาขายปกติ
                </span>
                <span className="text-sm font-extrabold text-brand-green-dark font-mono">
                  {p.price}
                </span>
                {p.wholesalePrice && (
                  <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 mt-1">
                    <Percent size={10} />
                    <span>ราคาส่งร้านค้า: {p.wholesalePrice}</span>
                  </div>
                )}
              </div>

              {/* Action query with AI option */}
              <button
                onClick={() => handleQueryHelp(p)}
                disabled={callState !== "connected"}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  callState === "connected" 
                    ? "bg-brand-green text-white hover:bg-brand-green-dark active:scale-[0.97]" 
                    : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                }`}
                title={callState === "connected" ? "ส่งคำถามจำลองเกี่ยวกับสินค้านี้ไปยังโทรศัพท์" : "กรุณาเปิดสัญญาณสายโทรเพื่อคุยพูดคุยตัวนี้"}
              >
                <Sparkles size={12} />
                <span>สอบถาม AI</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
