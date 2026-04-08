# CodeBhumi Frontend Interface

Welcome to the **CodeBhumi** frontend repository! This project is the official corporate-style website for the CodeBhumi technical club. It features a modern, clean, and highly interactive user interface designed to showcase the club's initiatives, team members, and events.

## 🌟 Key Features

### 🎨 Dual Theme Architecture (Light & Dark Mode)
- **Light Theme**: A warm, off-white background crafted with green and blue accents to provide a clean and readable experience.
- **Dark Theme**: A sleek, dark interface featuring **glassmorphism** aesthetics. Card surfaces use backdrop blurs and semi-transparent backgrounds to create depth and modern appeal.
- **Theme Persistence**: The user's theme preference is saved in the browser's `localStorage` for a consistent experience across sessions.

### 🎭 Interactive Hero Section
- **Dynamic Typography**: The title features a 3D parallax hover effect that reacts to cursor movement.
- **Typewriter Effect**: The hero tagline leverages a custom JavaScript typewriter animation that gracefully cycles through the club's core messaging.
- **Particle Network Background**: A custom HTML5 Canvas animation runs in the background, simulating a connected tech grid with floating nodes that interact dynamically.

### 🚀 Engaging UI & Micro-Animations
- **Hover-Lift Cards**: Interactive cards in the "About", "What We Do", and "Events" sections naturally elevate and glow when hovered over.
- **Infinite Marquee**: The "Core Committee" section uses a smooth, infinitely scrolling marquee to showcase team profiles efficiently.
- **Scroll Reveal**: Elements smoothly fade and slide into view as the user scrolls down the page, powered by the `IntersectionObserver` API.
- **Glassmorphic Navigation**: A sticky, blurred navigation bar that adapts to screen scroll and transitions beautifully from transparent to frosted glass.

### ☁️ Serverless Application System
- **Firebase Integration**: The website transitions away from traditional web forms or custom backends by integrating **Firebase Cloud Firestore** directly into the frontend. Applicant data is securely saved.
- **Native Application Flow**: Custom styled `/apply.html` and `/success.html` interfaces providing a premium user experience from form submission to confirmation.

### 📱 Fully Responsive
- The layout relies on CSS Grid and Flexbox, ensuring perfect rendering on diverse device sizes.
- Includes a custom mobile hamburger menu that cleanly toggles navigation links.

## 🛠️ Technology Stack

This project is built using core web technologies to ensure maximum performance while using Serverless platforms for database interactions:

- **HTML5**: Semantic markup for clear page structure.
- **CSS3**: 
  - Advanced features like CSS Variables (Custom Properties) for theme management.
  - Backdrop filters for glassmorphism.
  - Keyframe animations for continuous glowing, blinking cursors, and marquee scrolling.
- **Vanilla JavaScript (ES6)**: 
  - DOM manipulation and event handling.
  - Intersection Observer API for scroll animations.
  - HTML5 Canvas API for the interactive background.
- **Firebase**: Used as a Serverless Database (Firestore) for storing and managing applicant data securely.
- **Fonts & Typography**: `Inter` for clean body text and `Outfit` for bold, modern headings (via Google Fonts).
- **Icons**: FontAwesome 6 for scalable vector iconography.

## 🚀 Getting Started

### Prerequisites
No special tools or build steps are required. All you need is a modern web browser. It is fully deployable to static hosting platforms like **Netlify**, **Vercel**, or **GitHub Pages** right out of the box!

### Installation & Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/sagnik-devv/CodeBhumi-.git
   ```
2. Navigate into the project folder:
   ```bash
   cd CodeBhumi
   ```
3. Open `index.html` in your favorite web browser:
   - You can simply double-click the file, or using an extension like **Live Server** in VS Code for a better development experience.

## 📁 Project Structure

```text
📦 CodeBhumi
 ┣ 📜 index.html    # The main HTML document containing the structure
 ┣ 📜 apply.html    # Application form page
 ┣ 📜 success.html  # Application success confirmation page
 ┣ 📜 styles.css    # All styling, theme variables, and keyframe animations
 ┣ 📜 script.js     # JavaScript logic for theme toggling, typing effects, and canvas
 ┣ 📜 apply.js      # Form handling and Firebase integration logic
 ┣ 🖼️ Org Logo.jpeg # Organization logo asset
 ┗ 📜 README.md     # Project documentation
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! If you'd like to improve the UI or add new frontend interactions, feel free to fork the repository and submit a pull request.
