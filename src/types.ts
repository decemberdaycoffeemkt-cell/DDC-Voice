export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ExtractedSupportInfo {
  customerName: string | null;
  shopName: string | null;
  phone: string | null;
  issueDescription: string | null;
}

export interface SupportTicket {
  id: string;
  customerName: string;
  shopName: string;
  phone: string;
  issueDescription: string;
  callDuration: string;
  gender: "female" | "male";
  status: "pending" | "transferred_sales" | "transferred_technical" | "completed";
  assignedTo: string;
  timestamp: Date;
  chatHistory: ChatMessage[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: "coffee_beans" | "ingredients" | "machines";
  description: string;
  price: string;
  wholesalePrice?: string;
  imageUrl?: string;
  tag?: string;
}

export type CallState = "idle" | "ringing" | "connected" | "transferring" | "transferred" | "ended";
