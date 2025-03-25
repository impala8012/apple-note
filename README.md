# Apple 備忘錄

利用 Nuxt 架構練習實作出一個全端的備忘錄功能，前端部分利用 Vue3 以及 Tailwind，後端用 prisma 以及 subapase 和 Postgresql 資料庫最後部署於 Vercel 主機。
使用者可以註冊登入為會員外，可以記錄自己的想要記下來的備忘錄。

測試的會員帳號：test@gmail.com
測試的會員密碼 : test1234

## 功能介紹

登入/註冊：提供使用者註冊登入，並將使用這資訊存至 supabase 中，如果輸入錯誤時會顯示出錯誤訊息。

備忘錄：串接並封裝 Tiptap Editor 文字編輯器，方便使用者編輯文章。

## 使用工具

### 前端技術

---

Vue3：前端技術框架

Typescript：型態處理

Tailwind：CSS 框架

Nuxt：透過 Nuxt 實作前後端應用

### 後端技術

---

jsonwebtoken：利用 JWT token 的形式發送到前端，簽署 token 實作使用者身分驗證，確保資料不會被任意串改。

bcrypt：將使用者密碼雜湊之後存進資料庫。

Postgres：利用 SQL 語法，與 server 端串接出資料庫間 CRUD 的操作

---

本網站僅作為個人練習，註冊時請勿使用真實資料。另本網站包含之圖片與內容僅作練習使用，不作任何商業用途。
