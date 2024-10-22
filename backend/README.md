# Recycling - Backend

The project builds RESTful APIs using Node.js, Express, etc.

- [Express.js Repository](https://github.com/expressjs/express)
- [Node.js](https://nodejs.org/zh-tw)

## Features

- 與 Recycling Frontend 進行溝通
- 負責分辨圖像、文字的內容並回覆垃圾類別

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/taipei-doit/townpass2024-recycling.git
cd backend
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables
```

## Commands

Running in development:

```bash
npm start
```

run on http://localhost:8080/

## API Endpoints

List of available routes:

**Chat routes:**

- `GET /api/chat/photo/category` - 上傳圖片的垃圾類別
- `GET /api/chat/photo/thing` - 上傳圖片的垃圾名稱
- `GET /api/chat/text/category` - 傳送文字的垃圾類別
