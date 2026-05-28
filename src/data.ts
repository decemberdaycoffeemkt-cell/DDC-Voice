import { ProductItem, SupportTicket } from "./types";

export const PRODUCTS: ProductItem[] = [
  {
    "id": "jasmine-green-tea",
    "name": "ชาเขียวมะลิ",
    "category": "ingredients",
    "description": "[รหัส: JGT] [ขนาด: 500 g] ชาเขียวหอมกลิ่นมะลิ สดชื่น ดื่มง่าย เหมาะสำหรับเมนูชาร้อนและชาเย็น (จุดเด่น: หอมมะลิ, ชงร้อน/เย็น, เมนูสดชื่น)",
    "price": "200.-",
    "imageUrl": "assets/product-001.jpg"
  },
  {
    "id": "fragrant-rice-tea",
    "name": "ชาข้าวหอม",
    "category": "ingredients",
    "description": "[รหัส: FRT] [ขนาด: 500 g] ชากลิ่นข้าวหอม ดื่มง่าย ให้โทนอุ่นนุ่ม เหมาะกับเมนูชาร้อนและชาที่ต้องการกลิ่นเฉพาะ (จุดเด่น: กลิ่นข้าวหอม, นุ่มละมุน, ชงง่าย)",
    "price": "200.-",
    "imageUrl": "assets/product-002.jpg"
  },
  {
    "id": "peach-tea",
    "name": "ชาพีช",
    "category": "ingredients",
    "description": "[รหัส: PT] [ขนาด: 1,000 g] ชาพีชหอมผลไม้ เหมาะสำหรับเมนูชาผลไม้ เมนูเย็น และเครื่องดื่มซิกเนเจอร์ (จุดเด่น: กลิ่นพีช, เมนูผลไม้, เหมาะกับเครื่องดื่มเย็น)",
    "price": "250.-",
    "imageUrl": "assets/product-003.jpg"
  },
  {
    "id": "lemon-tea",
    "name": "ชามะนาว",
    "category": "ingredients",
    "description": "[รหัส: LT] [ขนาด: 1,000 g] ชามะนาวรสสดชื่น เปรี้ยวหวานลงตัว เหมาะสำหรับเมนูชาใสและเมนูเย็นขายง่าย (จุดเด่น: เปรี้ยวสดชื่น, ชงง่าย, เมนูขายง่าย)",
    "price": "250.-",
    "imageUrl": "assets/product-004.jpg"
  },
  {
    "id": "lemon-premix",
    "name": "เลม่อนพรีมิกซ์",
    "category": "ingredients",
    "description": "[รหัส: LPM] [ขนาด: 500 g] ผงเลม่อนพรีมิกซ์ รสเปรี้ยวอมหวาน ละลายง่าย เหมาะกับเมนูสดชื่นและเครื่องดื่มเย็น (จุดเด่น: พรีมิกซ์, ละลายง่าย, รสเลม่อน)",
    "price": "220.-",
    "imageUrl": "assets/product-005.jpg"
  },
  {
    "id": "g1-green-tea-premium",
    "name": "G1 Green Tea Premium",
    "category": "ingredients",
    "description": "[รหัส: G1] [ขนาด: 500 g] ชาเขียวพรีเมียม รสชาติเข้มมัน หอมกลมกล่อม เหมาะสำหรับเมนูชาเขียวนมคุณภาพสูง (จุดเด่น: ชาเขียวพรีเมียม, เข้มมัน, เมนูนม)",
    "price": "315.-",
    "imageUrl": "assets/product-006.jpg"
  },
  {
    "id": "t1-thai-tea-premium",
    "name": "T1 Thai Tea Premium",
    "category": "ingredients",
    "description": "[รหัส: T1] [ขนาด: 500 g] ชาไทยพรีเมียม กลิ่นชาชัด รสเข้ม เหมาะสำหรับร้านที่ต้องการเมนูชาไทยคุณภาพสม่ำเสมอ (จุดเด่น: ชาไทยพรีเมียม, กลิ่นชาชัด, รสเข้ม)",
    "price": "240.-",
    "imageUrl": "assets/product-007.jpg"
  },
  {
    "id": "t2-thai-tea-classic",
    "name": "T2 Thai Tea Classic",
    "category": "ingredients",
    "description": "[รหัส: T2] [ขนาด: 500 g] ชาไทยคลาสสิก รสเข้มมัน หอมกลมกล่อม เหมาะสำหรับเมนูชาไทยประจำร้าน (จุดเด่น: คลาสสิก, เข้มมัน, ราคาเข้าถึงง่าย)",
    "price": "190.-",
    "imageUrl": "assets/product-008.jpg"
  },
  {
    "id": "t3-thai-tea-ceylon",
    "name": "T3 Thai Tea Ceylon Blend",
    "category": "ingredients",
    "description": "[รหัส: T3] [ขนาด: 500 g] ชาไทยเบลนด์ซีลอน ให้รสเข้มและคาแรกเตอร์ชาชัด เหมาะสำหรับเมนูนมและเมนูซิกเนเจอร์ (จุดเด่น: ซีลอนเบลนด์, คาแรกเตอร์ชัด, เมนูซิกเนเจอร์)",
    "price": "240.-",
    "imageUrl": "assets/product-009.jpg"
  },
  {
    "id": "taro-latte-powder",
    "name": "ผงเผือก",
    "category": "ingredients",
    "description": "[รหัส: TARO] [ขนาด: 500 g] ผงเผือกลาเต้ หวานมัน หอมเผือก เหมาะสำหรับเมนูนมร้อน เย็น และปั่น (จุดเด่น: หอมเผือก, ลาเต้, เมนูนม)",
    "price": "220.-",
    "imageUrl": "assets/product-010.jpg"
  },
  {
    "id": "cocoa-classic",
    "name": "ผงโกโก้คลาสสิก",
    "category": "ingredients",
    "description": "[รหัส: COCOA-C] [ขนาด: 500 g] ผงโกโก้สูตรคลาสสิก รสเข้มพอดี กลิ่นโกโก้ธรรมชาติ เหมาะสำหรับเมนูโกโก้ประจำร้าน (จุดเด่น: โกโก้คลาสสิก, รสเข้มพอดี, ชงง่าย)",
    "price": "280.-",
    "imageUrl": "assets/product-011.jpg"
  },
  {
    "id": "cocoa-premium",
    "name": "ผงโกโก้พรีเมียม",
    "category": "ingredients",
    "description": "[รหัส: COCOA-P] [ขนาด: 500 g] ผงโกโก้พรีเมียมเข้มข้น โทนกลิ่นชัด เหมาะกับเมนูโกโก้ที่ต้องการรสชาติเข้มและภาพลักษณ์พรีเมียม (จุดเด่น: พรีเมียม, เข้มข้น, เมนูซิกเนเจอร์)",
    "price": "380.-",
    "imageUrl": "assets/product-012.jpg"
  },
  {
    "id": "whisky-blend",
    "name": "Whisky Blend",
    "category": "coffee_beans",
    "description": "[รหัส: WB] [ระดับคั่ว: Medium Light | โปรเซส: Barrel Aged | ขนาด: 500 g] โทน Tiramisu, Whisky, Milk Chocolate และ Caramel เหมาะสำหรับร้านที่ต้องการกาแฟเบลนด์กลิ่นพิเศษ (จุดเด่น: Tiramisu, Whisky, Caramel)",
    "price": "520.-",
    "imageUrl": "assets/product-013.jpg",
    "tag": "บอดี้ซิกเนเจอร์"
  },
  {
    "id": "s5-premium-dark",
    "name": "S5 Premium Dark",
    "category": "coffee_beans",
    "description": "[รหัส: S5] [ระดับคั่ว: Dark | โปรเซส: Wash | ขนาด: 500 g] โทน Dark Chocolate, Caramel และ Brown Sugar สำหรับเมนูกาแฟเข้ม ดื่มกับนมหรืออเมริกาโน่ได้ดี (จุดเด่น: Dark Chocolate, Caramel, Brown Sugar)",
    "price": "325.-",
    "imageUrl": "assets/product-014.jpg",
    "tag": "กาแฟเบลนด์หลัก"
  },
  {
    "id": "s4-special-blend",
    "name": "S4 Special Blend",
    "category": "coffee_beans",
    "description": "[รหัส: S4] [ระดับคั่ว: Dark | โปรเซส: Wash | ขนาด: 500 g] โทน Chocolate, Nutty, Creamy, Sweet และ Full Body สำหรับร้านที่ต้องการกาแฟเข้มแน่น (จุดเด่น: Chocolate, Nutty, Full Body)",
    "price": "325.-",
    "imageUrl": "assets/product-015.jpg",
    "tag": "กาแฟเบลนด์หลัก"
  },
  {
    "id": "s3-premium-blend",
    "name": "S3 Premium Blend",
    "category": "coffee_beans",
    "description": "[รหัส: S3] [ระดับคั่ว: Medium Dark | โปรเซส: Wash | ขนาด: 500 g] โทน Nutty, Chocolate, Creamy และ Sweet เหมาะสำหรับเมนูนมที่ต้องการรสกาแฟชัด (จุดเด่น: Nutty, Chocolate, Creamy)",
    "price": "325.-",
    "imageUrl": "assets/product-016.jpg",
    "tag": "กาแฟเบลนด์หลัก"
  },
  {
    "id": "s2-premium-blend",
    "name": "S2 Premium Blend",
    "category": "coffee_beans",
    "description": "[รหัส: S2] [ระดับคั่ว: Medium | โปรเซส: Wash | ขนาด: 500 g] โทน Fruity, Chocolate, Hint Flower, Caramel และ Sweet สำหรับเมนูที่ต้องการสมดุลระหว่างผลไม้และช็อกโกแลต (จุดเด่น: Fruity, Chocolate, Caramel)",
    "price": "325.-",
    "imageUrl": "assets/product-017.jpg",
    "tag": "กาแฟเบลนด์หลัก"
  },
  {
    "id": "milky-lover",
    "name": "Milky Lover Special Blend",
    "category": "coffee_beans",
    "description": "[รหัส: ML] [ระดับคั่ว: Medium | โปรเซส: Wash | ขนาด: 500 g] โทน Nutty, Chocolate, Creamy และ Sweet ออกแบบมาสำหรับเมนูนมโดยเฉพาะ (จุดเด่น: Milky, Chocolate, Creamy)",
    "price": "350.-",
    "imageUrl": "assets/product-018.jpg",
    "tag": "กาแฟเบลนด์หลัก"
  },
  {
    "id": "evening-blend",
    "name": "Evening Blend",
    "category": "coffee_beans",
    "description": "[รหัส: EV] [ระดับคั่ว: Medium Dark | โปรเซส: Wash | ขนาด: 500 g] โทน Nutty, Chocolate, Caramel และ Cacao Nib สำหรับเมนูช่วงบ่ายถึงเย็นที่ต้องการความกลมกล่อม (จุดเด่น: Nutty, Caramel, Cacao Nib)",
    "price": "315.-",
    "imageUrl": "assets/product-019.jpg",
    "tag": "กาแฟเบลนด์หลัก"
  },
  {
    "id": "afternoon-blend",
    "name": "Afternoon Blend",
    "category": "coffee_beans",
    "description": "[รหัส: AF] [ระดับคั่ว: Dark | โปรเซส: Wash | ขนาด: 500 g] โทน Dark Chocolate, Creamy, Sweet และ Milk เหมาะสำหรับเมนูเครื่องดื่มที่ต้องการความนุ่มและเข้ม (จุดเด่น: Dark Chocolate, Creamy, Milk)",
    "price": "295.-",
    "imageUrl": "assets/product-020.jpg",
    "tag": "กาแฟเบลนด์หลัก"
  },
  {
    "id": "colombia-blueberry",
    "name": "Colombia Blueberry Gummy",
    "category": "coffee_beans",
    "description": "[รหัส: COL-BG] [ระดับคั่ว: Medium | โปรเซส: Special Process | ขนาด: 200 g] โทน Blueberry, Raspberry, Dry Fruit, Golden Raisin, Lemon, Caramel, Honey และ Cocoa Powder (จุดเด่น: Blueberry, Raspberry, Honey)",
    "price": "420.-",
    "imageUrl": "assets/product-021.jpg",
    "tag": "เมล็ดกาแฟพิเศษ"
  },
  {
    "id": "colombia-huila-supremo",
    "name": "Colombia Huila Supremo",
    "category": "coffee_beans",
    "description": "[รหัส: COL-HS] [ระดับคั่ว: Medium | โปรเซส: Washed | ขนาด: 200 g] โทน Bright Acidity, Fruity, Chocolate, Caramel และ Smooth Mouthfeel (จุดเด่น: Fruity, Chocolate, Caramel)",
    "price": "220.-",
    "imageUrl": "assets/product-022.jpg",
    "tag": "เมล็ดกาแฟพิเศษ"
  },
  {
    "id": "colombia-peach",
    "name": "Colombia Peach Candy",
    "category": "coffee_beans",
    "description": "[รหัส: COL-PC] [ระดับคั่ว: Medium | โปรเซส: Special Process | ขนาด: 200 g] โทน Floral, Peach, Apricot, Black Cherry, Nectarine, Sugar Cane และ Candy-like (จุดเด่น: Peach, Apricot, Candy-like)",
    "price": "420.-",
    "imageUrl": "assets/product-023.jpg",
    "tag": "เมล็ดกาแฟพิเศษ"
  },
  {
    "id": "doi-chang",
    "name": "Doi Chang Thai Chiang Rai",
    "category": "coffee_beans",
    "description": "[รหัส: DC] [ระดับคั่ว: Medium | โปรเซส: Washed | ขนาด: 200 g] โทน White-Pink Floral, Black Tea, Brown Sugar และ Round เหมาะสำหรับดริปหรือเมนูที่ต้องการความบาลานซ์ (จุดเด่น: Floral, Black Tea, Brown Sugar)",
    "price": "160.-",
    "imageUrl": "assets/product-024.jpg",
    "tag": "เมล็ดกาแฟพิเศษ"
  },
  {
    "id": "doi-phak-kut",
    "name": "Doi Phak Kut Mae Hong Son",
    "category": "coffee_beans",
    "description": "[รหัส: DPK] [ระดับคั่ว: Medium Light | โปรเซส: Natural | ขนาด: 200 g] โทน Stone Fruit, Jack Fruit, Smooth และ Sweet Aftertaste สำหรับคอกาแฟที่ชอบรสผลไม้สุก (จุดเด่น: Stone Fruit, Jack Fruit, Sweet Aftertaste)",
    "price": "320.-",
    "imageUrl": "assets/product-025.jpg",
    "tag": "เมล็ดกาแฟพิเศษ"
  },
  {
    "id": "ethiopia-guji",
    "name": "Ethiopia Guji Shakiso Natural G1",
    "category": "coffee_beans",
    "description": "[รหัส: ETH-G] [ระดับคั่ว: Medium | โปรเซส: Natural G1 | ขนาด: 200 g] โทน Red Apple, Mango, Dry Fruit, Tamarind, Sugar Cane และ Milk Chocolate (จุดเด่น: Red Apple, Mango, Milk Chocolate)",
    "price": "320.-",
    "imageUrl": "assets/product-026.jpg",
    "tag": "เมล็ดกาแฟพิเศษ"
  },
  {
    "id": "geisha",
    "name": "Geisha Peru Amazonas Los Santos",
    "category": "coffee_beans",
    "description": "[รหัส: GEISHA] [ระดับคั่ว: Medium | โปรเซส: Washed | ขนาด: 200 g] โทน Orange Blossom, Lemongrass, Raspberry, Red Currant และ Cherry สำหรับเมนูดริปพรีเมียม (จุดเด่น: Orange Blossom, Lemongrass, Cherry)",
    "price": "520.-",
    "imageUrl": "assets/product-027.jpg",
    "tag": "เมล็ดกาแฟพิเศษ"
  },
  {
    "id": "kenya-kiambu",
    "name": "Kenya Kiambu AB Karatu",
    "category": "coffee_beans",
    "description": "[รหัส: KEN] [ระดับคั่ว: Medium | โปรเซส: Fully Washed | ขนาด: 200 g] โทน Grapefruit, Red Apple, Raisin, Black Cherry, Lemon, Honey และ Milk Chocolate (จุดเด่น: Grapefruit, Red Apple, Honey)",
    "price": "320.-",
    "imageUrl": "assets/product-028.jpg",
    "tag": "เมล็ดกาแฟพิเศษ"
  },
  {
    "id": "ethiopia-konga-g1",
    "name": "Ethiopia Yirgacheffe Konga G1",
    "category": "coffee_beans",
    "description": "[รหัส: ETH-K] [ระดับคั่ว: Light | โปรเซส: Washed | ขนาด: 200 g] โทน Jasmine, Orange, Apricot, Lemon และ Juicy สำหรับเมนูดริปที่ต้องการกลิ่นดอกไม้และผลไม้ (จุดเด่น: Jasmine, Orange, Apricot)",
    "price": "320.-",
    "imageUrl": "assets/product-029.jpg",
    "tag": "เมล็ดกาแฟพิเศษ"
  },
  {
    "id": "mae-hong-son-huai-hom",
    "name": "Mae Hong Son Huai Hom",
    "category": "coffee_beans",
    "description": "[รหัส: MHS] [ระดับคั่ว: Medium Light | โปรเซส: Washed | ขนาด: 200 g] โทน Tropical Fruits, Prune, Brown Sugar, Molasses, Syrup, Sweetness และ Good Mouthfeel (จุดเด่น: Tropical Fruits, Brown Sugar, Good Mouthfeel)",
    "price": "160.-",
    "imageUrl": "assets/product-030.jpg",
    "tag": "เมล็ดกาแฟพิเศษ"
  },
  {
    "id": "omkoi-khun-tuen",
    "name": "Chiang Mai Omkoi Khun Tuen",
    "category": "coffee_beans",
    "description": "[รหัส: OMK] [ระดับคั่ว: Medium | โปรเซส: Honey | ขนาด: 200 g] โทน Dry Fruit, Stone Fruit, Red Cherry, Lemon, Herb, Caramel และ Chocolate พร้อมบาลานซ์ดี (จุดเด่น: Dry Fruit, Caramel, Chocolate)",
    "price": "160.-",
    "imageUrl": "assets/product-031.jpg",
    "tag": "เมล็ดกาแฟพิเศษ"
  },
  {
    "id": "kyoto-uji-matcha",
    "name": "Kyoto Uji Matcha",
    "category": "ingredients",
    "description": "[รหัส: MATCHA-KYOTO] [โปรเซส: Kyoto, Japan | ขนาด: 100 g] มัทฉะเกรดพรีเมียมจาก Kyoto, Japan โทนรสอูมามิลึก นุ่ม ครีมมี่ หวานเล็กน้อย และฝาดน้อย (จุดเด่น: Grade Premium, Umami, Creamy)",
    "price": "440.-",
    "imageUrl": "assets/product-032.jpg"
  },
  {
    "id": "shizuoka-matcha",
    "name": "Shizuoka Matcha",
    "category": "ingredients",
    "description": "[รหัส: MATCHA-SHIZUOKA] [โปรเซส: Shizuoka, Japan | ขนาด: 100 g] มัทฉะเซเรโมเนียลจาก Shizuoka, Japan ดื่มง่าย ชงได้ทั้งเพียวและลาเต้ ให้โทนถั่ว อูมามิ และความนุ่มละมุน (จุดเด่น: Ceremonial, Nutty, Latte)",
    "price": "440.-",
    "imageUrl": "assets/product-033.jpg"
  },
  {
    "id": "premium-matcha",
    "name": "Premium Matcha",
    "category": "ingredients",
    "description": "[รหัส: MATCHA-PREMIUM] [โปรเซส: Yabukita, Saemidori, Okumidori, Japan | ขนาด: 100 g] มัทฉะเกรดเซเรโมเนียล กลิ่นหอมหวาน รสชาติให้ความรู้สึกถึงถั่ว พิสตาชิโอ และความนุ่มจากนม (จุดเด่น: Ceremonial, Pistachio, Premium)",
    "price": "950.-",
    "imageUrl": "assets/product-034.jpg"
  },
  {
    "id": "origin-matcha",
    "name": "Origin Matcha",
    "category": "ingredients",
    "description": "[รหัส: MATCHA-ORIGIN] [โปรเซส: Green, light yellow | ขนาด: 100 g] มัทฉะเกรดพรีเมียม สีเขียวอมเหลือง เหมาะสำหรับชงลาเต้หรือทำขนม ให้โทนหอมกลิ่นถั่วและรสชาติเต็ม (จุดเด่น: Grade Premium, Latte, Bakery)",
    "price": "280.-",
    "imageUrl": "assets/product-035.jpg"
  },
  {
    "id": "wholesale-afternoon-10",
    "name": "Afternoon Blend ยกลัง 10 ถุง",
    "category": "coffee_beans",
    "description": "[รหัส: WHOLE-AF-10] [ระดับคั่ว: คั่วกลางค่อนเข้ม | โปรเซส: ยกลัง 10 ถุง | ขนาด: 5 Kg] เมล็ดกาแฟ Afternoon Blend คั่วกลางค่อนเข้ม แบบยกลัง 10 ถุง สำหรับร้านที่ต้องการสต็อกเมล็ดกาแฟต่อเนื่อง (จุดเด่น: 10 ถุง, 5 Kg, ราคายกลัง)",
    "price": "3100.-",
    "imageUrl": "assets/product-036.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-afternoon-20",
    "name": "Afternoon Blend ยกลัง 20 ถุง",
    "category": "coffee_beans",
    "description": "[รหัส: WHOLE-AF-20] [ระดับคั่ว: คั่วกลางค่อนเข้ม | โปรเซส: ยกลัง 20 ถุง | ขนาด: 10 Kg] เมล็ดกาแฟ Afternoon Blend คั่วกลางค่อนเข้ม แบบยกลัง 20 ถุง เหมาะสำหรับร้านที่ใช้ปริมาณมาก (จุดเด่น: 20 ถุง, 10 Kg, ราคายกลัง)",
    "price": "6100.-",
    "imageUrl": "assets/product-037.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-evening-10",
    "name": "Evening Blend ยกลัง 10 ถุง",
    "category": "coffee_beans",
    "description": "[รหัส: WHOLE-EV-10] [ระดับคั่ว: คั่วกลางค่อนเข้ม | โปรเซส: ยกลัง 10 ถุง | ขนาด: 5 Kg] เมล็ดกาแฟ Evening Blend คั่วกลางค่อนเข้ม แบบยกลัง 10 ถุง สำหรับร้านที่ต้องการรสกลมกล่อมในต้นทุนยกลัง (จุดเด่น: 10 ถุง, 5 Kg, ราคายกลัง)",
    "price": "2900.-",
    "imageUrl": "assets/product-038.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-evening-20",
    "name": "Evening Blend ยกลัง 20 ถุง",
    "category": "coffee_beans",
    "description": "[รหัส: WHOLE-EV-20] [ระดับคั่ว: คั่วกลางค่อนเข้ม | โปรเซส: ยกลัง 20 ถุง | ขนาด: 10 Kg] เมล็ดกาแฟ Evening Blend คั่วกลางค่อนเข้ม แบบยกลัง 20 ถุง สำหรับร้านที่ต้องการวางสต็อกระยะยาว (จุดเด่น: 20 ถุง, 10 Kg, ราคายกลัง)",
    "price": "5700.-",
    "imageUrl": "assets/product-039.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-s2-10",
    "name": "S2 Premium Blend ยกลัง 10 ถุง",
    "category": "coffee_beans",
    "description": "[รหัส: WHOLE-S2-10] [โปรเซส: ยกลัง 10 ถุง | ขนาด: 5 Kg] S2 Premium Blend แบบยกลัง 10 ถุง เหมาะสำหรับเมนูกาแฟที่ต้องการความสมดุลและใช้งานประจำร้าน (จุดเด่น: 10 ถุง, 5 Kg, Premium Blend)",
    "price": "3200.-",
    "imageUrl": "assets/product-040.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-s2-20",
    "name": "S2 Premium Blend ยกลัง 20 ถุง",
    "category": "coffee_beans",
    "description": "[รหัส: WHOLE-S2-20] [โปรเซส: ยกลัง 20 ถุง | ขนาด: 10 Kg] S2 Premium Blend แบบยกลัง 20 ถุง สำหรับร้านที่ใช้เมล็ดกาแฟต่อเนื่องและต้องการราคายกลัง (จุดเด่น: 20 ถุง, 10 Kg, Premium Blend)",
    "price": "6300.-",
    "imageUrl": "assets/product-041.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-s3-10",
    "name": "S3 Premium Blend ยกลัง 10 ถุง",
    "category": "coffee_beans",
    "description": "[รหัส: WHOLE-S3-10] [โปรเซส: ยกลัง 10 ถุง | ขนาด: 5 Kg] S3 Premium Blend แบบยกลัง 10 ถุง เหมาะสำหรับเมนูนมที่ต้องการรสกาแฟชัดและสม่ำเสมอ (จุดเด่น: 10 ถุง, 5 Kg, Premium Blend)",
    "price": "3200.-",
    "imageUrl": "assets/product-042.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-s3-20",
    "name": "S3 Premium Blend ยกลัง 20 ถุง",
    "category": "coffee_beans",
    "description": "[รหัส: WHOLE-S3-20] [โปรเซส: ยกลัง 20 ถุง | ขนาด: 10 Kg] S3 Premium Blend แบบยกลัง 20 ถุง สำหรับร้านที่ต้องการวางสต็อกเมล็ดกาแฟพรีเมียม (จุดเด่น: 20 ถุง, 10 Kg, Premium Blend)",
    "price": "6300.-",
    "imageUrl": "assets/product-043.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-s4-10",
    "name": "S4 Special Blend ยกลัง 10 ถุง",
    "category": "coffee_beans",
    "description": "[รหัส: WHOLE-S4-10] [โปรเซส: ยกลัง 10 ถุง | ขนาด: 5 Kg] S4 Special Blend แบบยกลัง 10 ถุง สำหรับร้านที่ต้องการเบลนด์เข้มแน่นและต้นทุนต่อถุงคุ้มขึ้น (จุดเด่น: 10 ถุง, 5 Kg, Special Blend)",
    "price": "3200.-",
    "imageUrl": "assets/product-044.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-s4-20",
    "name": "S4 Special Blend ยกลัง 20 ถุง",
    "category": "coffee_beans",
    "description": "[รหัส: WHOLE-S4-20] [โปรเซส: ยกลัง 20 ถุง | ขนาด: 10 Kg] S4 Special Blend แบบยกลัง 20 ถุง เหมาะสำหรับร้านที่ใช้เมล็ดกาแฟเข้มต่อเนื่อง (จุดเด่น: 20 ถุง, 10 Kg, Special Blend)",
    "price": "6300.-",
    "imageUrl": "assets/product-045.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-s5-10",
    "name": "S5 Premium Dark ยกลัง 10 ถุง",
    "category": "coffee_beans",
    "description": "[รหัส: WHOLE-S5-10] [ระดับคั่ว: Dark | โปรเซส: ยกลัง 10 ถุง | ขนาด: 5 Kg] S5 Premium Dark แบบยกลัง 10 ถุง สำหรับเมนูกาแฟเข้ม ดื่มกับนม หรือเมนูที่ต้องการโทนดาร์ก (จุดเด่น: 10 ถุง, 5 Kg, Premium Dark)",
    "price": "3200.-",
    "imageUrl": "assets/product-046.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-s5-20",
    "name": "S5 Premium Dark ยกลัง 20 ถุง",
    "category": "coffee_beans",
    "description": "[รหัส: WHOLE-S5-20] [ระดับคั่ว: Dark | โปรเซส: ยกลัง 20 ถุง | ขนาด: 10 Kg] S5 Premium Dark แบบยกลัง 20 ถุง เหมาะสำหรับร้านที่ต้องการสต็อกกาแฟคั่วเข้มในปริมาณมาก (จุดเด่น: 20 ถุง, 10 Kg, Premium Dark)",
    "price": "6300.-",
    "imageUrl": "assets/product-047.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-g1-10",
    "name": "G1 ชาเขียวพรีเมี่ยม ยกลัง 10 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-G1-10] [โปรเซส: ยกลัง 10 ถุง | ขนาด: 5 Kg] G1 ชาเขียวพรีเมี่ยมชนิดใบหยาบ แบบยกลัง 10 ถุง มีรูปสินค้าในโฟลเดอร์ แต่ยังไม่มีราคากำกับใน Note ราคา (จุดเด่น: 10 ถุง, 5 Kg, สอบถามราคา)",
    "price": "สอบถามราคาพนักงาน",
    "imageUrl": "assets/product-048.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-g1-20",
    "name": "G1 ชาเขียวพรีเมี่ยม ยกลัง 20 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-G1-20] [โปรเซส: ยกลัง 20 ถุง | ขนาด: 10 Kg] G1 ชาเขียวพรีเมี่ยมชนิดใบหยาบ แบบยกลัง 20 ถุง มีรูปสินค้าในโฟลเดอร์ แต่ยังไม่มีราคากำกับใน Note ราคา (จุดเด่น: 20 ถุง, 10 Kg, สอบถามราคา)",
    "price": "สอบถามราคาพนักงาน",
    "imageUrl": "assets/product-049.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-t1-10",
    "name": "T1 ชาไทยพรีเมียม ยกลัง 10 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-T1-10] [โปรเซส: ยกลัง 10 ถุง | ขนาด: 5 Kg] T1 ชาไทยพรีเมียมชนิดใบหยาบ แบบยกลัง 10 ถุง สำหรับเมนูชาไทยเข้มข้นประจำร้าน (จุดเด่น: 10 ถุง, 5 Kg, ชาไทยพรีเมียม)",
    "price": "2350.-",
    "imageUrl": "assets/product-050.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-t1-20",
    "name": "T1 ชาไทยพรีเมียม ยกลัง 20 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-T1-20] [โปรเซส: ยกลัง 20 ถุง | ขนาด: 10 Kg] T1 ชาไทยพรีเมียมชนิดใบหยาบ แบบยกลัง 20 ถุง สำหรับร้านที่ใช้ชาไทยปริมาณมาก (จุดเด่น: 20 ถุง, 10 Kg, ชาไทยพรีเมียม)",
    "price": "4600.-",
    "imageUrl": "assets/product-051.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-t2-10",
    "name": "T2 ชาไทยสูตร T2 ยกลัง 10 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-T2-10] [โปรเซส: ยกลัง 10 ถุง | ขนาด: 5 Kg] T2 ชาไทยสูตร T2 ชนิดใบหยาบ แบบยกลัง 10 ถุง เหมาะสำหรับเมนูชาไทยคลาสสิก (จุดเด่น: 10 ถุง, 5 Kg, ชาไทยสูตร T2)",
    "price": "1850.-",
    "imageUrl": "assets/product-052.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-t2-20",
    "name": "T2 ชาไทยสูตร T2 ยกลัง 20 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-T2-20] [โปรเซส: ยกลัง 20 ถุง | ขนาด: 10 Kg] T2 ชาไทยสูตร T2 ชนิดใบหยาบ แบบยกลัง 20 ถุง สำหรับร้านที่ต้องการต้นทุนคุ้มขึ้น (จุดเด่น: 20 ถุง, 10 Kg, ชาไทยสูตร T2)",
    "price": "3600.-",
    "imageUrl": "assets/product-053.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-t3-10",
    "name": "T3 ชาไทยสูตร T3 ยกลัง 10 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-T3-10] [โปรเซส: ยกลัง 10 ถุง | ขนาด: 5 Kg] T3 ชาไทยสูตร T3 ชนิดใบหยาบ แบบยกลัง 10 ถุง สำหรับเมนูชาไทยที่ต้องการคาแรกเตอร์ชาชัด (จุดเด่น: 10 ถุง, 5 Kg, ชาไทยสูตร T3)",
    "price": "2350.-",
    "imageUrl": "assets/product-054.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-t3-20",
    "name": "T3 ชาไทยสูตร T3 ยกลัง 20 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-T3-20] [โปรเซส: ยกลัง 20 ถุง | ขนาด: 10 Kg] T3 ชาไทยสูตร T3 ชนิดใบหยาบ แบบยกลัง 20 ถุง สำหรับร้านที่ใช้ชาไทยต่อเนื่อง (จุดเด่น: 20 ถุง, 10 Kg, ชาไทยสูตร T3)",
    "price": "4600.-",
    "imageUrl": "assets/product-055.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-cocoa-classic-10",
    "name": "ผงโกโก้คลาสสิค ยกลัง 10 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-COCOA-C-10] [โปรเซส: ยกลัง 10 ถุง | ขนาด: 5 Kg] ผงโกโก้คลาสสิค 100% ไขมัน 10-12% แบบยกลัง 10 ถุง สำหรับเมนูโกโก้ประจำร้าน (จุดเด่น: 10 ถุง, 5 Kg, ไขมัน 10-12%)",
    "price": "2750.-",
    "imageUrl": "assets/product-056.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-cocoa-classic-20",
    "name": "ผงโกโก้คลาสสิค ยกลัง 20 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-COCOA-C-20] [โปรเซส: ยกลัง 20 ถุง | ขนาด: 10 Kg] ผงโกโก้คลาสสิค 100% ไขมัน 10-12% แบบยกลัง 20 ถุง สำหรับร้านที่ใช้โกโก้ปริมาณมาก (จุดเด่น: 20 ถุง, 10 Kg, ไขมัน 10-12%)",
    "price": "5400.-",
    "imageUrl": "assets/product-057.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-cocoa-premium-10",
    "name": "ผงโกโก้พรีเมี่ยม ยกลัง 10 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-COCOA-P-10] [โปรเซส: ยกลัง 10 ถุง | ขนาด: 5 Kg] ผงโกโก้พรีเมี่ยม 100% ไขมัน 22-24% แบบยกลัง 10 ถุง สำหรับเมนูโกโก้เข้มข้นและซิกเนเจอร์ (จุดเด่น: 10 ถุง, 5 Kg, ไขมัน 22-24%)",
    "price": "3750.-",
    "imageUrl": "assets/product-058.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-cocoa-premium-20",
    "name": "ผงโกโก้พรีเมี่ยม ยกลัง 20 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-COCOA-P-20] [โปรเซส: ยกลัง 20 ถุง | ขนาด: 10 Kg] ผงโกโก้พรีเมี่ยม 100% ไขมัน 22-24% แบบยกลัง 20 ถุง สำหรับร้านที่ต้องการสต็อกโกโก้พรีเมียม (จุดเด่น: 20 ถุง, 10 Kg, ไขมัน 22-24%)",
    "price": "7400.-",
    "imageUrl": "assets/product-059.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-peach-tea-10",
    "name": "ผงชาพีช ยกลัง 10 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-PT-10] [โปรเซส: ยกลัง 10 ถุง | ขนาด: 10 Kg] ผงชาพีชแบบยกลัง 10 ถุง สำหรับเมนูชาผลไม้และเครื่องดื่มเย็นที่ต้องการกลิ่นพีชชัด (จุดเด่น: 10 ถุง, 10 Kg, Peach Tea)",
    "price": "2450.-",
    "imageUrl": "assets/product-060.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-peach-tea-20",
    "name": "ผงชาพีช ยกลัง 20 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-PT-20] [โปรเซส: ยกลัง 20 ถุง | ขนาด: 20 Kg] ผงชาพีชแบบยกลัง 20 ถุง สำหรับร้านที่ใช้เมนูชาพีชหรือชาผลไม้ต่อเนื่อง (จุดเด่น: 20 ถุง, 20 Kg, Peach Tea)",
    "price": "4895.-",
    "imageUrl": "assets/product-061.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-lemon-tea-10",
    "name": "ผงชามะนาว ยกลัง 10 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-LT-10] [โปรเซส: ยกลัง 10 ถุง | ขนาด: 10 Kg] ผงชามะนาวแบบยกลัง 10 ถุง สำหรับเมนูชามะนาวและเครื่องดื่มเย็นรสสดชื่น (จุดเด่น: 10 ถุง, 10 Kg, Lemon Tea)",
    "price": "2450.-",
    "imageUrl": "assets/product-062.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "wholesale-lemon-tea-20",
    "name": "ผงชามะนาว ยกลัง 20 ถุง",
    "category": "ingredients",
    "description": "[รหัส: WHOLE-LT-20] [โปรเซส: ยกลัง 20 ถุง | ขนาด: 20 Kg] ผงชามะนาวแบบยกลัง 20 ถุง สำหรับร้านที่ต้องการสต็อกวัตถุดิบเมนูสดชื่นในปริมาณมาก (จุดเด่น: 20 ถุง, 20 Kg, Lemon Tea)",
    "price": "4895.-",
    "imageUrl": "assets/product-063.jpg",
    "wholesalePrice": "ยกลังราคาส่งเฉลี่ยถูกลง",
    "tag": "ราคายกลังประหยัด"
  },
  {
    "id": "product-001",
    "name": "ROMOLA CANVAS",
    "category": "machines",
    "description": "ภาพสินค้าเป็นเครื่องชงกาแฟ รุ่น ROMOLA CANVAS พร้อมข้อมูลราคาและจุดเด่นในภาพ เช่น WATER TANK 2 LITERS, PID control, Eco mode, แถมคอร์สบาริสต้า. เหมาะสำหรับให้ลูกค้าเทียบรุ่นก่อนขอใบเสนอราคา (ฟีเจอร์เด่น: WATER TANK 2 LITERS, PID control, Eco mode, แถมคอร์สบาริสต้า)",
    "price": "19,900.-",
    "tag": "แบรนด์ ROMOLA",
    "wholesalePrice": "รับประกันบำรุงรักษาฟรี 1 ปี พร้อมทีมบาริสต้าเทรนสูตรฟรี"
  },
  {
    "id": "product-002",
    "name": "ROMOLA NEX",
    "category": "machines",
    "description": "ภาพสินค้าเป็นเครื่องชงกาแฟ รุ่น ROMOLA NEX พร้อมข้อมูลราคาและจุดเด่นในภาพ เช่น Pressure gauge pump, Vibration pump, แถมคอร์สบาริสต้า. เหมาะสำหรับให้ลูกค้าเทียบรุ่นก่อนขอใบเสนอราคา (ฟีเจอร์เด่น: Pressure gauge pump, Vibration pump, แถมคอร์สบาริสต้า)",
    "price": "25,900.-",
    "tag": "แบรนด์ ROMOLA",
    "wholesalePrice": "รับประกันบำรุงรักษาฟรี 1 ปี พร้อมทีมบาริสต้าเทรนสูตรฟรี"
  },
  {
    "id": "product-003",
    "name": "WPM KD-270 SN",
    "category": "machines",
    "description": "ภาพสินค้าเป็นเครื่องชงกาแฟ รุ่น WPM KD-270 SN พร้อมข้อมูลราคาและจุดเด่นในภาพ เช่น BOILER CAPACITY 3 LITERS, Pressure gauge pump, Pre-infusion, แถมคอร์สบาริสต้า. เหมาะสำหรับให้ลูกค้าเทียบรุ่นก่อนขอใบเสนอราคา (ฟีเจอร์เด่น: BOILER CAPACITY 3 LITERS, Pressure gauge pump, Pre-infusion, แถมคอร์สบาริสต้า)",
    "price": "28,500.-",
    "tag": "แบรนด์ WPM",
    "wholesalePrice": "รับประกันบำรุงรักษาฟรี 1 ปี พร้อมทีมบาริสต้าเทรนสูตรฟรี"
  },
  {
    "id": "product-004",
    "name": "ROMOLA CANVAS",
    "category": "machines",
    "description": "ภาพสินค้าเป็นเครื่องชงกาแฟ รุ่น ROMOLA CANVAS พร้อมข้อมูลราคาและจุดเด่นในภาพ เช่น WATER TANK 2 LITERS, FLAT BURR 60 MM., PID control, Eco mode, แถมคอร์สบาริสต้า. เหมาะสำหรับให้ลูกค้าเทียบรุ่นก่อนขอใบเสนอราคา (ฟีเจอร์เด่น: WATER TANK 2 LITERS, FLAT BURR 60 MM., PID control, Eco mode, แถมคอร์สบาริสต้า)",
    "price": "29,400.-",
    "tag": "แบรนด์ ROMOLA",
    "wholesalePrice": "รับประกันบำรุงรักษาฟรี 1 ปี พร้อมทีมบาริสต้าเทรนสูตรฟรี"
  },
  {
    "id": "product-005",
    "name": "IZENSSO TEA BREWING",
    "category": "machines",
    "description": "ภาพสินค้าเป็นเครื่องชงกาแฟ รุ่น IZENSSO TEA BREWING พร้อมข้อมูลราคาและจุดเด่นในภาพ เช่น Digital display, แถมคอร์สบาริสต้า. เหมาะสำหรับให้ลูกค้าเทียบรุ่นก่อนขอใบเสนอราคา (ฟีเจอร์เด่น: Digital display, แถมคอร์สบาริสต้า)",
    "price": "32,500.-",
    "tag": "แบรนด์ IZENSSO",
    "wholesalePrice": "รับประกันบำรุงรักษาฟรี 1 ปี พร้อมทีมบาริสต้าเทรนสูตรฟรี"
  },
  {
    "id": "product-006",
    "name": "IZENSSO 1-3089",
    "category": "machines",
    "description": "ภาพสินค้าเป็นเครื่องชงกาแฟ รุ่น IZENSSO 1-3089 พร้อมข้อมูลราคาและจุดเด่นในภาพ เช่น BOILER CAPACITY 3 LITERS, Digital display, แถมคอร์สบาริสต้า. เหมาะสำหรับให้ลูกค้าเทียบรุ่นก่อนขอใบเสนอราคา (ฟีเจอร์เด่น: BOILER CAPACITY 3 LITERS, Digital display, แถมคอร์สบาริสต้า)",
    "price": "35,000.-",
    "tag": "แบรนด์ IZENSSO",
    "wholesalePrice": "รับประกันบำรุงรักษาฟรี 1 ปี พร้อมทีมบาริสต้าเทรนสูตรฟรี"
  },
  {
    "id": "product-007",
    "name": "ROMOLA NEX",
    "category": "machines",
    "description": "ภาพสินค้าเป็นเครื่องชงกาแฟ รุ่น ROMOLA NEX พร้อมข้อมูลราคาและจุดเด่นในภาพ เช่น FLAT BURR 60 MM., Pressure gauge pump, Vibration pump, แถมคอร์สบาริสต้า. เหมาะสำหรับให้ลูกค้าเทียบรุ่นก่อนขอใบเสนอราคา (ฟีเจอร์เด่น: FLAT BURR 60 MM., Pressure gauge pump, Vibration pump, แถมคอร์สบาริสต้า)",
    "price": "35,400.-",
    "tag": "แบรนด์ ROMOLA",
    "wholesalePrice": "รับประกันบำรุงรักษาฟรี 1 ปี พร้อมทีมบาริสต้าเทรนสูตรฟรี"
  },
  {
    "id": "product-008",
    "name": "WPM KD-270 SN",
    "category": "machines",
    "description": "ภาพสินค้าเป็นเครื่องชงกาแฟ รุ่น WPM KD-270 SN พร้อมข้อมูลราคาและจุดเด่นในภาพ เช่น BOILER CAPACITY 3 LITERS, FLAT BURR 38 MM., Pressure gauge pump, Pre-infusion, แถมคอร์สบาริสต้า. เหมาะสำหรับให้ลูกค้าเทียบรุ่นก่อนขอใบเสนอราคา (ฟีเจอร์เด่น: BOILER CAPACITY 3 LITERS, FLAT BURR 38 MM., Pressure gauge pump, Pre-infusion, แถมคอร์สบาริสต้า)",
    "price": "38,000.-",
    "tag": "แบรนด์ WPM",
    "wholesalePrice": "รับประกันบำรุงรักษาฟรี 1 ปี พร้อมทีมบาริสต้าเทรนสูตรฟรี"
  },
  {
    "id": "product-009",
    "name": "WPM KD-310 GBS",
    "category": "machines",
    "description": "ภาพสินค้าเป็นเครื่องชงกาแฟ รุ่น WPM KD-310 GBS พร้อมข้อมูลราคาและจุดเด่นในภาพ เช่น BOILER CAPACITY 2.5 LITERS, Pre-infusion, แถมคอร์สบาริสต้า. เหมาะสำหรับให้ลูกค้าเทียบรุ่นก่อนขอใบเสนอราคา (ฟีเจอร์เด่น: BOILER CAPACITY 2.5 LITERS, Pre-infusion, แถมคอร์สบาริสต้า)",
    "price": "39,900.-",
    "tag": "แบรนด์ WPM",
    "wholesalePrice": "รับประกันบำรุงรักษาฟรี 1 ปี พร้อมทีมบาริสต้าเทรนสูตรฟรี"
  },
  {
    "id": "product-010",
    "name": "ROMOLA TITAN",
    "category": "machines",
    "description": "ภาพสินค้าเป็นเครื่องชงกาแฟ รุ่น ROMOLA TITAN พร้อมข้อมูลราคาและจุดเด่นในภาพ เช่น FLAT BURR 60 MM., Pressure gauge pump, Vibration pump, แถมคอร์สบาริสต้า. เหมาะสำหรับให้ลูกค้าเทียบรุ่นก่อนขอใบเสนอราคา (ฟีเจอร์เด่น: FLAT BURR 60 MM., Pressure gauge pump, Vibration pump, แถมคอร์สบาริสต้า)",
    "price": "42,400.-",
    "tag": "แบรนด์ ROMOLA",
    "wholesalePrice": "รับประกันบำรุงรักษาฟรี 1 ปี พร้อมทีมบาริสต้าเทรนสูตรฟรี"
  },
  {
    "id": "product-011",
    "name": "WPM KD-310 P",
    "category": "machines",
    "description": "ภาพสินค้าเป็นเครื่องชงกาแฟ รุ่น WPM KD-310 P พร้อมข้อมูลราคาและจุดเด่นในภาพ เช่น BOILER CAPACITY 2.5 LITERS, Digital display, Pre-infusion, แถมคอร์สบาริสต้า. เหมาะสำหรับให้ลูกค้าเทียบรุ่นก่อนขอใบเสนอราคา (ฟีเจอร์เด่น: BOILER CAPACITY 2.5 LITERS, Digital display, Pre-infusion, แถมคอร์สบาริสต้า)",
    "price": "42,900.-",
    "tag": "แบรนด์ WPM",
    "wholesalePrice": "รับประกันบำรุงรักษาฟรี 1 ปี พร้อมทีมบาริสต้าเทรนสูตรฟรี"
  },
  {
    "id": "product-012",
    "name": "IZENSSO 007",
    "category": "machines",
    "description": "ภาพสินค้าเป็นเครื่องชงกาแฟ รุ่น IZENSSO 007 พร้อมข้อมูลราคาและจุดเด่นในภาพ เช่น BOILER CAPACITY 3 LITERS, Digital display, แถมคอร์สบาริสต้า. เหมาะสำหรับให้ลูกค้าเทียบรุ่นก่อนขอใบเสนอราคา (ฟีเจอร์เด่น: BOILER CAPACITY 3 LITERS, Digital display, แถมคอร์สบาริสต้า)",
    "price": "49,000.-",
    "tag": "แบรนด์ IZENSSO",
    "wholesalePrice": "รับประกันบำรุงรักษาฟรี 1 ปี พร้อมทีมบาริสต้าเทรนสูตรฟรี"
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
      { id: "h10", role: "assistant", content: "สำหรับชาเขียวอุจิมัทฉะ เกรดพิธีการ ของเราแชร์รูปภาพและรายละเอียดส่วนประกอบทั้งหมดผ่าน Line OA @decemberdaycoffee ได้ทันทีเลยค่ะ สนใจรับช่องทางนี้ไหมคะ", timestamp: new Date() },
      { id: "h11", role: "user", content: "อ๋อ สะดวกดีครับ เดี๋ยวแอดไลน์ไปดูข้อมูล ขอบคุณครับ", timestamp: new Date() },
      { id: "h12", role: "assistant", content: "ยินดีให้บริการค่ะ หากต้อการข้อมูลเพิ่มเติมแจ้งน้องกัญญาได้ทุกเมื่อเลยนะคะ ขอประทานพรให้มีวันที่สุดวิเศษค่ะ", timestamp: new Date() }
    ]
  }
];
