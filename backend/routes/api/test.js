var express = require("express");
var router = express.Router();
require("dotenv").config();

// OpenAI API Key
const apiKey = process.env.OPENAI_API_KEY;

router.post("/", async (req, res) => {
  res.status(200).json("Hello World");
});

router.post("/openapi", async (req, res) => {
  try {
    const payload = {
      model: "gpt-4o", // 假設這是您要使用的模型
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "我正在台北市做垃圾分類，我應該要將衛生紙分在哪一個類別?",
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
    res.status(200).json(openaiResponse.data.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "訊息接收失敗" });
  }
});

router.get("/", async (req, res) => {
  res.status(200).json("Hello World");
});

router.get("/openapi", async (req, res) => {
    try {
      const payload = {
        model: "gpt-4o", // 假設這是您要使用的模型
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "我正在台北市做垃圾分類，我應該要將衛生紙分在哪一個類別?",
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
      res.status(200).json(openaiResponse.data.choices[0].message.content);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "訊息接收失敗" });
    }
  });

module.exports = router;
