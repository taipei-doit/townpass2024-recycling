const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
require('dotenv').config();

// 設定 Multer 用來處理圖片上傳
const upload = multer({ dest: "uploads/" });

// OpenAI API Key
const apiKey = process.env.OPENAI_API_KEY;

// 將圖片轉換為 Base64 字符串的函數
const encodeImageToBase64 = (filePath) => {
  const image = fs.readFileSync(filePath);
  return image.toString("base64");
};

// 路由：處理圖片上傳和調用 OpenAI API
router.get("/category", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const base64Image = encodeImageToBase64(imagePath);

    const recyclingGuide = `
  臺北市的垃圾分類指南，根據不同類別對垃圾進行分類。以下是臺北市垃圾的分類項目及說明：

  1. 一般垃圾：目前無法回收再利用的垃圾，如紙尿片、衛生紙(棉)、口香糖、厚果皮、鳳梨皮、蛋殼、安全帽、鞋類、破碎保麗龍。
  
  2. 立體類：一般資源物，包含印表機、電腦主機、筆電、滑鼠、鍵盤、耳機、手機、充電線等電器類物品；還有鐵類廚具、玻璃瓶、酒瓶、陶瓷碗盤等。紙容器，牛奶盒、飲料紙杯、手提飲料杯等紙製容器。乾淨保麗龍類，泡麵碗、包裝保麗龍、保麗龍片等。不可回收，包括玩具、布娃娃、塑膠球、保齡球等。
  
  3. 平面類：舊書，報紙、書本、廣告單等大型完整紙張類物品。乾淨舊衣類，乾淨且可再利用的衣物、布料、毛巾等。塑膠袋類，乾淨的塑膠袋，如購物袋。廢紙類，各種紙箱、紙袋、紙盒、包裝紙等。不可回收，汙染的紙巾、塑膠、紙餐具、鋁箔袋等。
  
  4. 其他類：照明燈管、電池、廢油及其他類，包含燈泡、充電電池、鋰電池、廢油、清潔劑罐等危險物品。堆肥廚餘類，剩菜剩飯、蔬菜水果殘渣、蛋殼等可堆肥的廚餘。養豬廚餘類，主要是無調味的食物殘渣，可以供養豬的廚餘。大型廢棄物，例如家具、家電、自行車等需由專門的回收團隊回收的物品。

  5. 若明顯與上述分類不符，則請回覆「無法辨識」。
  
  這些是臺北市資源回收的分類項目及說明，使用者需要根據這些分類來正確地回收垃圾。

  依據台北市政府的垃圾分類指南，請只回覆要分在立體類、平面類、其他類、一般垃圾或是無法辨識何者，其他一律不輸出。
  `;

    // 發送到 OpenAI 的請求負載
    const payload = {
      model: "gpt-4o", // 假設這是您要使用的模型
      messages: [
        {
          role: "system",
          content: recyclingGuide,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "我現在在台北市做垃圾分類，請你將我上傳的圖片辨識為什麼分類?依據台北市政府的垃圾分類指南，請只回覆要分在立體類、平面類、其他類、一般垃圾或是無法辨識何者，其他一律不輸出。",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`, // 將圖片轉換為 base64 並作為數據 URL 發送
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    };

    // 配置請求標頭
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    // 發送請求到 OpenAI API
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      { headers }
    );

    // 返回 OpenAI API 的響應結果
    res.status(200).json(openaiResponse.data);

    // 刪除臨時上傳的文件
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "圖片處理失敗" });
  }
});

router.get("/thing", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const base64Image = encodeImageToBase64(imagePath);

    // 發送到 OpenAI 的請求負載
    const payload = {
      model: "gpt-4o", // 假設這是您要使用的模型
      messages: [{
          role: "user",
          content: [
            {
              type: "text",
              text: "根據圖片進行影像辨識，判斷圖片為何種垃圾，只需要回答偵測到的物品名稱，請勿有過多的回答",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`, // 將圖片轉換為 base64 並作為數據 URL 發送
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    };

    // 配置請求標頭
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    // 發送請求到 OpenAI API
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      { headers }
    );

    // 返回 OpenAI API 的響應結果
    res.status(200).json(openaiResponse.data);

    // 刪除臨時上傳的文件
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "圖片處理失敗" });
  }
});

module.exports = router;
