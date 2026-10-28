-- ฐานข้อมูลสำหรับ ch7 Todo (menu + type)
-- วิธีใช้: XAMPP → Start MySQL → phpMyAdmin → Import ไฟล์นี้
-- รันซ้ำได้: ลบตารางเดิมในฐานข้อมูล ch7_menu แล้วสร้างใหม่พร้อมข้อมูลตัวอย่าง

CREATE DATABASE IF NOT EXISTS ch7_menu CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE ch7_menu;

DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS type;

CREATE TABLE type (
  typeId INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (typeId)
) ENGINE=InnoDB;

CREATE TABLE menu (
  menuId INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  isBestSeller TINYINT(1) NOT NULL DEFAULT 0,
  typeId INT NULL,
  PRIMARY KEY (menuId),
  KEY typeId (typeId),
  CONSTRAINT menu_ibfk_1 FOREIGN KEY (typeId) REFERENCES type (typeId)
) ENGINE=InnoDB;

INSERT INTO type (typeId, name) VALUES
  (1, 'ของหวาน'),
  (2, 'เบเกอรี่'),
  (3, 'เครื่องดื่ม');

INSERT INTO menu (name, price, isBestSeller, typeId) VALUES
  ('cake', 35, 1, 1),
  ('bread', 25, 0, 2),
  ('milk', 15, 1, 3),
  ('donut', 45, 0, 1),
  ('cookie', 55, 1, 2);
