# Web Development Agency - Company Profile Website

A stunning, modern, and professional company profile website for a web development agency. Built with React.js and featuring smooth scroll animations, interactive elements, and a premium design.

## ✨ Features

### 🎨 Modern Design

- Premium gradient backgrounds with dark navy and blue color scheme
- Glassmorphism effects and soft shadows
- Responsive design for all devices
- Clean minimalist interface with balanced white space

### 🎭 Interactive Animations

- Scroll-triggered animations (fade-up, fade-left, fade-right, zoom-in)
- Floating background elements
- Smooth parallax effects
- Animated counters in statistics section
- Hover effects on cards and buttons
- Auto-sliding testimonials carousel

### 📱 Sections

1. **Hero Section**

   - Full-width gradient background
   - Animated headline and CTAs
   - Desktop and mobile mockups with floating animation
   - Scroll indicator

2. **About Us**

   - Company description and mission
   - Animated timeline showing milestones
   - Fade animations on scroll

3. **Order Process**

   - 5-step process visualization
   - Icon-based cards with hover effects
   - Connecting line animation

4. **Projek Pelanggan**

   - Auto-sliding carousel (seperti testimonials)
   - Tampilan gambar project dengan nama
   - Navigation controls dan dots indicator
   - Smooth transitions antar project

5. **Statistics**

   - Animated counters (100+ websites, 50+ clients, 5 years, 24/7 support)
   - Wave background animation
   - Scale-in animations

6. **Testimonials**

   - Auto-sliding carousel
   - Client photos and ratings
   - Smooth transitions
   - Navigation controls

7. **CTA Konsultasi**

   - Tombol WhatsApp konsultasi gratis
   - Terintegrasi di Hero section dan Process section
   - Direct chat ke nomor WhatsApp

8. **Footer**
   - Gradient background
   - Quick links and services
   - Social media icons
   - Animated fade-up sequence

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 📂 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Hero.jsx
│   │   ├── Hero.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Process.jsx
│   │   ├── Process.css
│   │   ├── Portfolio.jsx
│   │   ├── Portfolio.css
│   │   ├── Statistics.jsx
│   │   ├── Statistics.css
│   │   ├── Testimonials.jsx
│   │   ├── Testimonials.css
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── hooks/              # Custom React hooks
│   │   ├── useScrollAnimation.js
│   │   └── useCounter.js
│   ├── App.jsx            # Main App component
│   ├── App.css            # App styles
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles & animations
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies
```

## 🎨 Design Features

### Color Palette

- **Primary**: Dark Navy (#0a1929)
- **Secondary**: Deep Blue (#1a237e, #1565c0)
- **Accent**: Light Blue (#64b5f6, #90caf9)
- **Background**: White, Light Gray (#f8fafc)

### Typography

- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Animations

- Smooth scroll behavior (CSS scroll-behavior)
- Intersection Observer API for scroll animations
- CSS transitions and transforms
- Keyframe animations for continuous effects
- 60fps performance optimized

## 🛠 Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features
- **Intersection Observer API** - Scroll animations
- **Google Fonts** - Poppins font family

## 📱 Responsive Design

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Customization

### Update Contact Information

Edit `src/components/Hero.jsx`, `src/components/Process.jsx`, and `src/components/Footer.jsx` to update:

- WhatsApp number (currently: 089615219160)
- Email address
- Social media links

### Modify Portfolio Projects

Edit `src/components/Portfolio.jsx` to add/update projects:

```javascript
const projects = [
  {
    name: "Project Name",
    image: "image-url",
  },
];
```

### Update Statistics

Edit `src/components/Statistics.jsx` to change counter values and labels.

### Change Color Scheme

Update CSS variables and gradient colors across component CSS files to match your brand.

## 📄 License

This project is created for demonstration purposes.

## 🤝 Contributing

Feel free to fork and customize for your own use!

---

Built with ❤️ using React and Vite
