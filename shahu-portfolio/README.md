# Shahu Portfolio Website

A modern, responsive portfolio website built with HTML5, CSS3, and vanilla JavaScript. Features dark mode, smooth animations, project filtering, and a contact form.

## Features

### 🎨 Design & UI
- **Modern Design**: Clean, professional layout with beautiful gradients and shadows
- **Dark Mode**: Toggle between light and dark themes with smooth transitions
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: CSS animations and scroll-triggered reveals
- **Gradient Text**: Eye-catching gradient text effects

### 🚀 Functionality
- **Typewriter Effect**: Animated typing effect in the hero section
- **Project Filtering**: Filter projects by category (Web Apps, Mobile, UI/UX)
- **Image Lightbox**: View project images in a beautiful lightbox modal
- **Contact Form**: Functional contact form with validation
- **Scroll Effects**: Parallax scrolling and reveal animations
- **Progressive Web App**: PWA support with offline capabilities

### 📱 Mobile Features
- **Mobile Menu**: Animated hamburger menu for mobile devices
- **Touch Support**: Swipe navigation in lightbox
- **Optimized Performance**: Smooth scrolling and animations on mobile

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with CSS Grid, Flexbox, and CSS Variables
- **JavaScript (ES6+)**: Modular JavaScript with classes and modern syntax
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter font family for modern typography

## File Structure

```
shahu-portfolio/
├── index.html              # Main HTML file
├── style.css               # Main stylesheet
├── manifest.json           # PWA manifest
├── README.md              # Project documentation
├── img/                   # Image assets
│   ├── profile.jpg        # Profile image
│   ├── project1.jpg       # Project screenshots
│   ├── project2.jpg
│   ├── project3.jpg
│   ├── project4.jpg
│   └── icons/             # PWA icons
└── js/                    # JavaScript modules
    ├── darkMode.js        # Dark mode & navigation
    ├── typewriter.js      # Typewriter effects
    ├── filterLightbox.js  # Project filtering & lightbox
    ├── contact.js         # Contact form handling
    └── scrollReveal.js    # Scroll animations
```

## Setup Instructions

1. **Clone or Download** the project files
2. **Add Images**: Place your images in the `img/` folder:
   - `profile.jpg` - Your profile photo
   - `project1.jpg` to `project4.jpg` - Project screenshots
   - PWA icons (72x72 to 512x512 pixels)
3. **Customize Content**: Update the content in `index.html`
4. **Customize Styling**: Modify CSS variables in `style.css`
5. **Deploy**: Upload to your web server or hosting platform

## Customization Guide

### Updating Personal Information

1. **Profile Section**: Update name, title, and description in the hero section
2. **About Section**: Modify the about text and statistics
3. **Skills Section**: Update the skill tags and categories
4. **Contact Information**: Update email, phone, and social links

### Adding Projects

1. **Duplicate** a project card in the HTML
2. **Update** the project image, title, description, and tech stack
3. **Set** the `data-category` attribute for filtering
4. **Add** project links (GitHub, live demo)

### Color Scheme

Update the CSS variables in `style.css`:

```css
:root {
  --primary-color: #6366f1;    /* Main brand color */
  --accent-color: #06d6a0;     /* Accent color */
  --text-primary: #1e293b;     /* Main text color */
  /* ... other variables */
}
```

### Fonts

The website uses Inter font from Google Fonts. To change:

1. Update the Google Fonts link in HTML
2. Update the `--font-family` CSS variable

## JavaScript Modules

### Dark Mode (`darkMode.js`)
- Theme switching with localStorage persistence
- System theme detection
- Mobile navigation
- Smooth scrolling

### Typewriter Effect (`typewriter.js`)
- Multiple typewriter animations
- Customizable speed and delay
- Support for different text arrays

### Project Filtering (`filterLightbox.js`)
- Category-based filtering with animations
- Image lightbox with navigation
- Touch/swipe support for mobile

### Contact Form (`contact.js`)
- Form validation
- Floating labels
- Submission handling
- Success/error feedback

### Scroll Animations (`scrollReveal.js`)
- Intersection Observer API
- Multiple animation types
- Performance optimized
- Parallax effects

## Performance Optimizations

- **CSS Variables**: Efficient theme switching
- **Intersection Observer**: Performance scroll animations
- **RequestAnimationFrame**: Smooth animations
- **Lazy Loading**: Images load when needed
- **Minimal Dependencies**: Pure vanilla JavaScript

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## PWA Features

- **Offline Support**: Works without internet connection
- **App-like Experience**: Can be installed on devices
- **Fast Loading**: Optimized for quick loading
- **Responsive Icons**: Multiple icon sizes

## SEO Optimizations

- Semantic HTML structure
- Meta tags for social sharing
- Descriptive alt texts
- Clean URL structure
- Fast loading times

## Accessibility Features

- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators
- ARIA labels

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Design**: Original design by Shahu

## Support

For questions or support, please contact:
- Email: shahu@example.com
- GitHub: [Your GitHub Profile]

---

Made with ❤️ by Shahu