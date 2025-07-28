# Shahu's Portfolio - Modern Full Stack Developer Portfolio

A modern, responsive, and feature-rich portfolio website built with vanilla HTML, CSS, and JavaScript. This portfolio showcases a professional developer's skills, projects, and experience with beautiful animations, dark mode support, and progressive web app capabilities.

## 🌟 Features

### ✨ Modern Design & UX
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Dark Mode**: Smooth toggle between light and dark themes with system preference detection
- **Loading Screen**: Elegant loading animation on page load
- **Smooth Animations**: AOS (Animate On Scroll) integration with custom animations
- **Custom Cursor**: Enhanced mouse effects for desktop users
- **Parallax Effects**: Subtle parallax scrolling for visual depth

### 🎯 Interactive Components
- **Typewriter Effect**: Dynamic text animation in hero section
- **Project Filtering**: Filter projects by category with smooth transitions
- **Lightbox Gallery**: Full-screen project image viewing with keyboard navigation
- **Contact Form**: Fully functional form with validation and character counters
- **Skill Bars**: Animated progress bars showing technical proficiency
- **Counter Animations**: Animated statistics in the about section

### 🚀 Performance & Accessibility
- **Progressive Web App (PWA)**: Installable with offline capabilities
- **Semantic HTML**: Proper HTML5 structure for SEO and accessibility
- **ARIA Labels**: Comprehensive accessibility support
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Optimized for assistive technologies
- **Performance Optimized**: Efficient animations and lazy loading

### 📱 PWA Features
- **App Installation**: Install as a native app on devices
- **App Shortcuts**: Quick access to different portfolio sections
- **Offline Support**: Basic offline functionality
- **App Icons**: Complete icon set for all platforms

## 🗂️ Project Structure

```
shahu-portfolio/
├── index.html              # Main HTML file with semantic structure
├── style.css              # Complete CSS with modern styling and animations
├── manifest.json          # PWA manifest for app installation
├── img/                   # Images and assets directory
│   └── README.md          # Image requirements and guidelines
└── js/                    # JavaScript modules
    ├── darkMode.js        # Theme switching functionality
    ├── typewriter.js      # Typewriter effect animation
    ├── filterLightbox.js  # Project filtering and image gallery
    ├── contact.js         # Contact form handling and validation
    └── scrollReveal.js    # Scroll animations and effects
```

## 🎨 Technologies Used

- **HTML5**: Semantic markup with proper structure
- **CSS3**: Modern CSS with CSS Grid, Flexbox, and Custom Properties
- **Vanilla JavaScript**: No frameworks, pure ES6+ JavaScript
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter and JetBrains Mono fonts
- **AOS Library**: Animate On Scroll for scroll-triggered animations

## 🚀 Quick Start

1. **Download/Clone the project**
   ```bash
   git clone <repository-url>
   cd shahu-portfolio
   ```

2. **Add your images**
   - Add your profile photo as `img/profile.jpg`
   - Add project screenshots as `img/project1.jpg`, `img/project2.jpg`, etc.
   - See `img/README.md` for complete image requirements

3. **Customize content**
   - Update personal information in `index.html`
   - Modify projects, skills, and experience sections
   - Update contact information and social links

4. **Serve the website**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using Live Server (VS Code extension)
   Right-click index.html → "Open with Live Server"
   ```

5. **Open in browser**
   Navigate to `http://localhost:8000` (or your server's address)

## ⚙️ Customization Guide

### 🎯 Personal Information
Update the following sections in `index.html`:

1. **Hero Section** (lines ~100-150):
   - Update name, title, and description
   - Modify typewriter phrases in `js/typewriter.js`

2. **About Section** (lines ~200-300):
   - Update bio, education, location, experience
   - Modify statistics numbers

3. **Skills Section** (lines ~350-450):
   - Add/remove skill categories
   - Update skill names and proficiency levels

4. **Projects Section** (lines ~500-700):
   - Replace with your actual projects
   - Update images, descriptions, and tech stacks
   - Modify GitHub/demo links

5. **Experience Section** (lines ~750-900):
   - Update work experience and education
   - Modify dates, companies, and descriptions

6. **Contact Section** (lines ~950-1000):
   - Update email, phone, and location
   - Modify social media links

### 🎨 Styling & Colors
Customize the color scheme in `style.css` (lines 1-60):

```css
:root {
    --primary-color: #3b82f6;      /* Main brand color */
    --secondary-color: #10b981;    /* Accent color */
    --text-primary: #1f2937;       /* Main text color */
    /* ... other color variables */
}
```

### 🌙 Dark Mode Colors
Update dark mode colors in the `[data-theme="dark"]` section.

### ⚡ JavaScript Configuration
Customize functionality in the JS files:

1. **Typewriter Speed** (`js/typewriter.js`):
   ```javascript
   typeSpeed: 100,        // Typing speed (ms per character)
   deleteSpeed: 50,       // Deletion speed
   pauseDuration: 3000,   // Pause between phrases
   ```

2. **Animation Delays** (`js/scrollReveal.js`):
   ```javascript
   data-aos-delay="100"   // Delay in milliseconds
   ```

3. **Contact Form** (`js/contact.js`):
   - Update form submission endpoint
   - Modify validation rules

## 📱 PWA Configuration

### App Installation
The portfolio can be installed as a Progressive Web App:

1. **Desktop**: Look for the install button in the browser address bar
2. **Mobile**: Use the "Add to Home Screen" option in the browser menu

### Customizing PWA Settings
Update `manifest.json`:

```json
{
    "name": "Your Name - Portfolio",
    "short_name": "Your Portfolio",
    "theme_color": "#3b82f6",
    "background_color": "#ffffff"
}
```

## 🎭 Features Breakdown

### 🔄 Dark Mode
- **System Detection**: Automatically detects user's system preference
- **Manual Toggle**: Theme toggle button in navigation
- **Persistence**: Remembers user's choice in localStorage
- **Smooth Transitions**: Animated theme switching

### 📝 Typewriter Effect
- **Multiple Phrases**: Cycles through different role descriptions
- **Natural Typing**: Variable speed simulation of human typing
- **Customizable**: Easy to add/remove phrases and adjust timing

### 🖼️ Project Gallery
- **Filtering**: Filter projects by category (Web Apps, Mobile, APIs)
- **Lightbox**: Full-screen image viewing with navigation
- **Responsive**: Adapts to different screen sizes
- **Keyboard Support**: Arrow keys and escape for navigation

### 📧 Contact Form
- **Real-time Validation**: Instant feedback on form fields
- **Character Counters**: Live character count for text areas
- **Accessibility**: Screen reader support and keyboard navigation
- **Loading States**: Visual feedback during form submission

### 📊 Animated Elements
- **Scroll Reveal**: Elements animate as they come into view
- **Counter Animation**: Statistics count up when visible
- **Skill Bars**: Progress bars animate to show proficiency
- **Smooth Scrolling**: Smooth navigation between sections

## 🌐 Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 88+
- **Progressive Enhancement**: Graceful degradation for older browsers

## 📈 Performance

- **Lightweight**: No heavy frameworks or libraries
- **Optimized Animations**: Hardware-accelerated CSS transforms
- **Lazy Loading**: Images load as needed
- **Efficient JavaScript**: Event delegation and throttled scroll handlers

## 🔧 Development

### Adding New Sections
1. Add HTML structure to `index.html`
2. Add corresponding styles to `style.css`
3. Add navigation link with `data-section` attribute
4. Update scroll spy functionality if needed

### Adding New Animations
1. Define CSS animations in `style.css`
2. Add trigger logic in `js/scrollReveal.js`
3. Use `data-aos` attributes for AOS integration

### Customizing JavaScript
All JavaScript is modular and well-commented:
- Each JS file handles a specific feature
- Classes are used for organization
- Public methods available for external control

## 🎯 SEO & Meta Tags

The portfolio includes comprehensive meta tags:
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Structured Data**: Schema.org markup for search engines
- **Canonical URLs**: Proper URL structure

## 📚 Resources

### Fonts
- **Inter**: Modern sans-serif font for body text
- **JetBrains Mono**: Monospace font for code snippets

### Icons
- **Font Awesome 6**: Complete icon library
- **Custom Icons**: SVG icons for specific elements

### Libraries
- **AOS**: Animate On Scroll library for scroll animations

## 📄 License

This portfolio template is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you make improvements that could benefit others, consider submitting a pull request.

## 📞 Support

If you have questions or need help customizing the portfolio:
1. Check the documentation in each file
2. Review the code comments for guidance
3. Look at the example configurations provided

---

**Built with ❤️ for developers who want to showcase their work professionally.**