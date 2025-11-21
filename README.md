# 🤖 AI Summarizer

> Transform your documents into actionable insights with advanced AI. Free, no registration required.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-000000?logo=next.js)](https://nextjs.org/)
[![Powered by Groq](https://img.shields.io/badge/Powered%20by-Groq-orange)](https://groq.com/)

## ✨ Features

- 🎯 **6 Specialized Templates** - Standard, Business, Marketing, Academic, Technical, Meeting
- 📁 **Multi-Format Support** - PDF, DOC, DOCX, TXT (up to 10MB)
- 🚀 **Instant Processing** - Powered by Groq's Llama 3.3 70B model
- 📊 **Real-time Statistics** - Track summaries, words processed, characters analyzed
- 📄 **PDF Export** - Professional export with branding
- 🌐 **Bilingual Interface** - Italian and English support
- 🔒 **100% Free & Private** - No registration, no tracking, no data storage
- 💾 **Local Storage** - All statistics saved locally in your browser

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Morrix76/ai-summarizer.git
cd ai-summarizer
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
NODE_ENV=development
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
```

4. **Run the application**

Terminal 1 (Backend):
```bash
cd backend
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 📖 How to Use

### Text Input
1. Click on "Testo" tab
2. Paste your document content
3. Select a specialized template
4. Click "Genera Riassunto"
5. Copy or export your summary

### File Upload
1. Click on "File" tab
2. Drag & drop or click to select file (PDF, DOC, DOCX, TXT)
3. Wait for automatic processing
4. View and export results

## 🎨 Templates

| Template | Focus | Best For |
|----------|-------|----------|
| 📝 Standard | General purpose | Articles, reports, general content |
| 💼 Business | ROI, KPIs, decisions | Business reports, strategic docs |
| 📈 Marketing | Conversions, insights | Campaign analysis, market research |
| 🎓 Academic | Methodology, analysis | Research papers, studies |
| ⚙️ Technical | Implementation, solutions | Technical docs, troubleshooting |
| 🤝 Meeting | Decisions, action items | Meeting notes, collaboration |

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14
- React
- TailwindCSS
- react-dropzone
- jsPDF + html2canvas

**Backend:**
- Node.js
- Express
- Groq API (Llama 3.3 70B)
- Multer
- pdf-parse
- mammoth

## 📁 Project Structure

```
ai-summarizer/
├── frontend/
│   ├── components/
│   │   ├── TextInput.js
│   │   ├── FileUpload.js
│   │   ├── TemplateSelector.js
│   │   ├── OutputDisplay.js
│   │   └── StatsBar.js
│   ├── pages/
│   │   └── index.js
│   ├── utils/
│   │   └── api.js
│   └── styles/
│       └── globals.css
├── backend/
│   ├── routes/
│   │   └── summarize.js
│   ├── services/
│   │   └── groqService.js
│   └── index.js
└── README.md
```

## 🌍 Internationalization

The app supports both Italian and English. Language can be switched via the toggle in the header. Preferences are saved locally.

## 🔒 Privacy & Security

- ✅ No user registration required
- ✅ No data stored on servers
- ✅ All statistics saved locally in browser
- ✅ Files processed temporarily and immediately deleted
- ✅ No tracking or analytics
- ✅ Open source - verify the code yourself

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Francesco Ciardo**

- GitHub: [@Morrix76](https://github.com/Morrix76)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📮 Support

If you find this project useful, please give it a ⭐️ on GitHub!

For issues or questions, please open an issue on the GitHub repository.

---

**Made with ❤️ by Francesco Ciardo | 2025**
