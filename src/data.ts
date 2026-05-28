import { ProductItem, SupportTicket } from "./types";

export const PRODUCTS: ProductItem[] = [
  {
    id: "beans-1",
    name: "December Signature Blend (คั่วเข้ม)",
    category: "coffee_beans",
    description: "อาราบิก้าเกรดพรีเมียมจากพญาไพร (เชียงราย) และสะพรั่ง (น่าน) บอดี้หนักแน่น รสหวานละมุน บรรยากาศอบอุ่นคลาสสิกของช็อกโกแลตและคาราเมลหลังดื่ม",
    price: "380.- / กก.",
    wholesalePrice: "320.- / กก. (ขั้นต่ำ 5 กก.)",
    tag: "ขายดีอันดับ 1"
  },
  {
    id: "beans-2",
    name: "Daybreak Light Roast (คั่วอ่อน)",
    category: "coffee_beans",
    description: "เมล็ดคั่วอ่อนหอมฟุ้งแนวผลไม้เบอร์รี่ ดอกไม้ขาว และซิตรัสเบาๆ เปรี้ยวหวานฉ่ำคอ เหมาะกับเมนูกาแฟดริป (Filter) หรืออเมริกาโน่เย็นใสๆ",
    price: "550.- / กก.",
    wholesalePrice: "480.- / กก. (ขั้นต่ำ 5 กก.)",
    tag: "ความภูมิใจของโรงคั่ว"
  },
  {
    id: "beans-3",
    name: "Sweet Sunshine Blend (คั่วกลาง)",
    category: "coffee_beans",
    description: "เอสเพรสโซ่เบลนด์คั่วกลาง ดับเบิลอาราบิกา รสชาตินุ่มนวลเหมือนแสงแดดยามเช้า โทนทรอปิคอลฟรุต เสาวรส ผสมนัทตี้ นุ่มละมุนที่สุดเมื่อทำลาเต้ร้อน",
    price: "420.- / กก.",
    wholesalePrice: "360.- / กก. (ขั้นต่ำ 5 กก.)",
    tag: "แชมป์เปี้ยนลาเต้"
  },
  {
    id: "ing-1",
    name: "Premium Cocoa Powder (ผงโกโก้แท้ 100%)",
    category: "ingredients",
    description: "ผงโกโก้พรีเมียมนำเข้าจากเนเธอร์แลนด์ มีไขมันโกโก้สูง 22-24% สีน้ำตาลเข้มสวย รสเข้มข้นสัมผัสละมุน ดื่มแล้วฟินแน่นอน",
    price: "320.- / ถุง (500g)",
    wholesalePrice: "290.- / ถุง (ยกลัง 10 ถุง)"
  },
  {
    id: "ing-2",
    name: "Uji Matcha Ceremonial (ผงชามัทฉะแท้)",
    category: "ingredients",
    description: "ผงมัทฉะแท้เกรดพิธีการ จากอูจิ เมืองเกียวโต ใบชาเขียวแท้บดช้าๆ ด้วยโม่หิน สีเขียวมรกตสว่าง รสอูมามิแท้ ไม่ขมฝาด เหมาะกับร้านคาเฟ่พรีเมียม",
    price: "520.- / กระปุก (100g)",
    wholesalePrice: "450.- / กระปุก (ขั้นต่ำ 5 กระปุก)",
    tag: "นำเข้าพิเศษ"
  },
  {
    id: "machine-1",
    name: "December Pro 1-Group (เครื่องชงหัวเดี่ยวรุ่นคุ้มค่า)",
    category: "machines",
    description: "เครื่องชงระบบหัวเดียวขนาดกะทัดรัด ตัวถังแสตนเลสสตีลสตูดิโอ มีระบบคุมอุณหภูมิ PID ดับเบิลบอยเลอร์ สตรีมนิ่งแห้งสนิท สปีด 80-100 แก้ว/วัน สบายๆ",
    price: "45,000.-",
    wholesalePrice: "42,000.- (พร้อมชุดบาริสต้าตั้งต้น)"
  },
  {
    id: "machine-2",
    name: "Vesuvius Day 2-Group (อิตาลีเกรดประกวด)",
    category: "machines",
    description: "เครื่องชงสองหัวกรุ๊ปสัญชาติอิตาลีระดับอุตสาหกรรม หม้อต้มใหญ่ยักษ์ 12 ลิตร คุมแรงดันการพรีอินฟิวชั่นได้อิสระ เหมาะกับร้านขนาดใหญ่ สปีดสูงสุด 400 แก้ว/วัน",
    price: "195,000.-",
    wholesalePrice: "185,000.- (พร้อมทีมงานติดตั้ง แนะนำระบบสูตรกาแฟฟรี และรับประกันบำรุงรักษาถึงร้าน 1 ปี)",
    tag: "เครื่องแนะนำสำหรับแบรนด์"
  }
];

export const HISTORIC_TICKETS: SupportTicket[] = [
  {
    id: "T-9842",
    customerName: "คุณมินตรา เกียรติวรา",
    shopName: "Minty Cafe สาขาลาดพร้าว",
    phone: "089-764-1234",
    issueDescription: "หัวชงของเครื่องชง 2-Group มีน้ำซึมออกด้านข้างก้านชงตอนสกัดกาแฟ สันนิษฐานว่ายางหัวชงเสื่อมสภาพ",
    callDuration: "1 นาที 42 วินาที",
    gender: "female",
    status: "transferred_technical",
    assignedTo: "ช่างสมคิด (ทีมบริการเทคนิค)",
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    chatHistory: [
      { id: "h1", role: "user", content: "สวัสดีค่ะ พอดีจะปรึกษาช่างหน่อยค่ะ เรื่องเครื่องชงน้ำซึม", timestamp: new Date() },
      { id: "h2", role: "assistant", content: "สวัสดีค่ะ สำหรับปัญหาเครื่องชงน้ำซึม น้องกัญญาประสานงานช่างแก้ไขให้ด่วนเลยนะคะ ขอทราบชื่อและเบอร์โทรติดต่อหน่อยค่ะ", timestamp: new Date() },
      { id: "h3", role: "user", content: "มินตราค่ะ จากร้าน Minty Cafe เบอร์โทรนะคะ 0897641234 ค่ะ ซึมออกด้านข้างกรุ๊ปชงเลยค่ะ", timestamp: new Date() },
      { id: "h4", role: "assistant", content: "ต้องขออภัยในความไม่สะดวกอย่างยิ่งเลยนะคะ เดี๋ยวจะโอนสายให้พี่ๆ เทคนิคชี้แจงเบื้องต้นและวางวันเข้าไปเปลี่ยนอะไหล่ให้เลยทันทีค่ะ รอสักครู่นะคะ", timestamp: new Date() }
    ]
  },
  {
    id: "T-9841",
    customerName: "เฮียเฮง คอฟฟี่",
    shopName: "ร้านกาแฟชงดี (เยาวราช)",
    phone: "081-345-6789",
    issueDescription: "สนใจเมล็ดกาแฟล็อตเทศกาลพิเศษ ราคาส่ง 20 กิโลกรัม ต้องการใบเสนอราคาส่งด่วนสำหรับร้านใหม่",
    callDuration: "1 นาที 10 วินาที",
    gender: "male",
    status: "transferred_sales",
    assignedTo: "คุณชลิดา (ฝ่ายขายส่วนภูมิภาค)",
    timestamp: new Date(Date.now() - 3600000 * 5), // 5 hours ago
    chatHistory: [
      { id: "h5", role: "user", content: "ฮัลโหล สนใจกาแฟเมล็ดคั่วกลางราคาส่ง 20 โลน่ะ มีเอกสารราคาไหม", timestamp: new Date() },
      { id: "h6", role: "assistant", content: "สวัสดีครับ ทางเรามีเมล็ดคั่วกลาง Sweet Sunshine ยอดนิยมราคาส่งพิเศษสำหรับ 20 กิโลกรัมอยู่ครับ เพื่อให้ได้ส่วนลดดีที่สุด ผมขออนุญาตโอนสายให้เจ้าหน้าที่ฝ่ายขายดูแลและทำใบเสนอราคาให้ด่วนเลย ดีไหมครับ", timestamp: new Date() },
      { id: "h7", role: "user", content: "ดีเลย เอาเบอร์ไปเลย 0813456789 โทรหาเฮียเฮงได้เลย", timestamp: new Date() },
      { id: "h8", role: "assistant", content: "รับทราบครับเฮียเฮง เดี๋ยวโอนสายหาฝ่ายบริการจัดส่งใบเสนอราคาให้ทันทีเลยครับ ขอบพระคุณครับ", timestamp: new Date() }
    ]
  },
  {
    id: "T-9839",
    customerName: "บาริสต้าโน๊ต",
    shopName: "Slow Day Bar เชียงใหม่",
    phone: "095-212-3450",
    issueDescription: "สอบถามสินค้าผงมัทฉะแท้เกรดพรีเมียมและผงโกโก้ไปเสิร์ฟที่ร้าน",
    callDuration: "45 วินาที",
    gender: "female",
    status: "completed",
    assignedTo: "เสร็จสิ้นด้วยระบบ AI (แชร์ Line OA แล้ว)",
    timestamp: new Date(Date.now() - 3600000 * 24), // 24 hours ago
    chatHistory: [
      { id: "h9", role: "user", content: "อยากเห็นหน้าสเปกตัวชาเขียวอูจิมัทฉะครับว่ามีขนาดยังไงบ้าง", timestamp: new Date() },
      { id: "h10", role: "assistant", content: "สำหรับชาเขียวอุจิมัทฉะ เกรดพิธีการ ของเราแชร์รูปภาพและรายละเอียดส่วนประกอบทั้งหมดผ่าน Line OA @decemberday ได้ทันทีเลยค่ะ สนใจรับช่องทางนี้ไหมคะ", timestamp: new Date() },
      { id: "h11", role: "user", content: "อ๋อ สะดวกดีครับ เดี๋ยวแอดไลน์ไปดูข้อมูล ขอบคุณครับ", timestamp: new Date() },
      { id: "h12", role: "assistant", content: "ยินดีให้บริการค่ะ หากต้อการข้อมูลเพิ่มเติมแจ้งน้องกัญญาได้ทุกเมื่อเลยนะคะ ขอประทานพรให้มีวันที่สุดวิเศษค่ะ", timestamp: new Date() }
    ]
  }
];
