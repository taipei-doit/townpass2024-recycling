# Lapras-Backend

## 下載和設定專案
### 必要軟體
請先安裝以下軟體
- [Node.js](https://nodejs.org/zh-tw/download/)

### 下載專案
使用 Git，透過 `clone` 指令下載專案檔案
```
git clone [專案名稱]
```

### 安裝相關套件
- 專案使用到的套件已經設定在 *package.json*
- 在終端機中執行以下指令，安裝相關套件
```
npm install
```

## 啟動專案

啟動專案前，<font color="red">**記得先啟動 MySQL**</font>

執行以下指令，啟動後端伺服器
```
npm start
```

用瀏覽器打開 http://localhost:8080/ ，可以檢查是否正常運作

### 產生 API 文件

- 執行 *scripts/doc_gen.js* 產生文件內容
- 用瀏覽器打開 http://localhost:8080/doc 可以看到 API 文件


## 後端api


### /api/chat/photo/upload

上傳圖片

### /api/chat/text/send

傳送問題