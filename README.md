# 🖥️ Retro Portfolio Website

A nostalgic, Windows 95-inspired portfolio website featuring draggable windows, interactive UI elements, and pixel-perfect design.

![Retro Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **Draggable Windows**: Click and drag windows around the desktop
- **Interactive Taskbar**: Click taskbar icons to open/minimize windows
- **Retro UI Design**: Authentic Windows 95-style interface with pixel art
- **Interactive Background**: Subtle gradient effects that follow your mouse
- **Working Console**: Type commands in the terminal window
- **Responsive Design**: Works on desktop and mobile devices
- **Easter Egg**: Try the Konami code! (↑ ↑ ↓ ↓ ← → ← → B A)

## 🚀 Live Demo

Visit the live site: `https://[your-username].github.io/retro-portfolio/`

## 🛠️ Technologies Used

- Pure HTML5
- CSS3 with custom animations
- Vanilla JavaScript (no frameworks!)
- Google Fonts (VT323 for that retro feel)
- SVG icons for pixel-perfect graphics

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/[your-username]/retro-portfolio.git
   cd retro-portfolio
   ```

2. **Open locally**
   Simply open `index.html` in your browser, or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

## 🚀 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

This project includes GitHub Actions for automatic deployment:

1. **Fork or create a new repository**

2. **Push your code to the main branch**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/[your-username]/retro-portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Under "Build and deployment", select "GitHub Actions"
   - The site will automatically deploy when you push to main

### Manual Deployment

1. **Go to your repository Settings**
2. **Navigate to Pages section**
3. **Select Source**: Deploy from a branch
4. **Select Branch**: main
5. **Select Folder**: / (root)
6. **Save** and wait a few minutes

Your site will be available at: `https://[your-username].github.io/retro-portfolio/`

## 📁 Project Structure

```
retro-portfolio/
├── index.html          # Main HTML file
├── style.css           # All styling
├── script.js           # JavaScript functionality
├── icons/              # SVG icons
│   └── favicon.svg     # Site favicon
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## 🎨 Customization

### Changing Colors
Edit the color scheme in `style.css`:
- Background: `#e1f5fe`
- Window header: `#1e3c72` to `#2a5298`
- Taskbar: `#c0c0c0`

### Adding New Windows
1. Add HTML for the window in `index.html`
2. Add a taskbar button with `data-window` attribute
3. Style the window content in `style.css`

### Modifying Content
- Update the introduction text in the intro window
- Add your actual projects to the projects window
- Update social media links

## 🐛 Known Issues

- On mobile devices, dragging might conflict with scrolling
- Some older browsers might not support all CSS features

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Bhushan Talukdar**
- Location: Bengaluru, India
- Role: Jr. Product Designer

---

Made with 💜 and nostalgia for the good old days of computing!