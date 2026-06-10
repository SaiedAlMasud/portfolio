# Saied Al Masud — Portfolio Website

A modern, premium portfolio website built with HTML5, CSS3, and Vanilla JavaScript.

## 🚀 Quick Start

1. **Download** all files and keep the folder structure intact.
2. Open `index.html` directly in any browser — no build step needed.
3. For local development with live reload, use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.

## 📁 Folder Structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       └── profile.png
└── README.md
```

## ✉️ EmailJS Setup (Contact Form)

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails directly from the browser — no backend needed.

### Steps:

1. **Create a free account** at https://www.emailjs.com/ (200 emails/month free)

2. **Add an Email Service**
   - Dashboard → Email Services → Add New Service
   - Connect your Gmail / Outlook / etc.
   - Copy the **Service ID** (e.g. `service_abc123`)

3. **Create an Email Template**
   - Dashboard → Email Templates → Create New Template
   - Use these variables in the template body:
     ```
     From: {{name}} <{{email}}>
     Subject: {{subject}}
     
     {{message}}
     ```
   - Copy the **Template ID** (e.g. `template_xyz789`)

4. **Get your Public Key**
   - Dashboard → Account → Public Key
   - Copy the key (e.g. `abcDEFghiJKL123`)

5. **Update `js/script.js`** — replace the placeholders at the top of the file:

   ```js
   const EMAILJS_SERVICE_ID  = 'service_abc123';   // your Service ID
   const EMAILJS_TEMPLATE_ID = 'template_xyz789';  // your Template ID
   const EMAILJS_PUBLIC_KEY  = 'abcDEFghiJKL123';  // your Public Key
   ```

6. Save and test the form. You should receive emails at your connected address.

## 🔗 Update Project Links

In `js/script.js`, find the `projectData` object and replace the placeholder GitHub/live URLs:

```js
const projectData = {
  qurbanihat: {
    github: 'https://github.com/SaiedAlMasud/qurbanihat',
    live:   'https://qurbanihat.vercel.app',
    ...
  },
  drivefleet: {
    github: 'https://github.com/SaiedAlMasud/drivefleet',
    live:   'https://drivefleet.vercel.app',
    ...
  },
  ...
};
```

## 📄 Add Your CV

Place your CV PDF at:
```
assets/CV-Saied-Al-Masud.pdf
```

The "Download Resume" buttons in the navbar and About section will link to it automatically.

## 🎨 Customisation

All colours are CSS variables in `css/style.css`:

```css
:root {
  --primary:   #00D4FF;   /* cyan accent */
  --secondary: #4F46E5;   /* indigo accent */
  --bg:        #0F172A;   /* dark navy background */
}
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push the folder to a GitHub repository
2. Import at https://vercel.com/new
3. Deploy — done.

### GitHub Pages
1. Push to a repo named `yourusername.github.io`
2. Enable Pages in repo Settings → Pages → Deploy from branch `main`

### Netlify
Drag & drop the entire folder at https://app.netlify.com/drop

## 📦 Libraries Used (CDN — no install needed)

| Library | Purpose |
|---------|---------|
| [AOS](https://michalsnik.github.io/aos/) | Scroll animations |
| [GSAP](https://greensock.com/gsap/) | Hero entrance & parallax |
| [Typed.js](https://mattboldt.com/demos/typed-js/) | Typewriter effect |
| [Vanilla Tilt](https://micku7zu.github.io/vanilla-tilt.js/) | 3D card tilt |
| [EmailJS](https://www.emailjs.com/) | Contact form (no backend) |

---

Built with ❤️ by **Saied Al Masud** · Dhaka, Bangladesh
