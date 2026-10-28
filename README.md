# ch7 FullStack 2 Todo: Menu ต่อฐานข้อมูลผ่าน backend

Todo: ปรับแก้งาน Menu ครั้งก่อน (ch6) ให้เชื่อมต่อฐานข้อมูลผ่าน backend เพื่อ เพิ่ม ลบ แก้ไขเมนู มีหน้า Home + Menu

```
backend/    API menu + type จาก FullStack 1 (port 5000)
frontend/   React + react-router-dom + axios (port 5173)
database/   ch7_menu.sql
```

## วิธีรัน

1. XAMPP → Start **MySQL** → phpMyAdmin → **Import** `database/ch7_menu.sql`
2. backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

3. frontend (อีก terminal)

```bash
cd frontend
npm install
npm run dev
```

เปิด http://localhost:5173
