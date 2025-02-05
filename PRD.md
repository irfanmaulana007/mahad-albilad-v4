**Product Requirements Document (PRD) for Mahad Al-BIlad Islamic School Landing Page**

**Version 1**

---

### **1. Objective**

Create a professional, user-friendly website for Mahad Al-BIlad Islamic School to:

- Showcase the school’s mission, programs, and benefits.
- Streamline student registration and provide clear admission guidelines.
- Publish Islamic educational articles and updates.
- Highlight curated content to engage visitors.
- Enable secure administrative management of users and content.

---

### **2. Scope**

### **Target Audience**

- Prospective students/parents.
- Current students/parents.
- School staff and administrators.
- General visitors seeking Islamic educational content.

### **Key Features**

1. **Website Pages**
    - Home
    - Registration
    - About Us
    - Articles
    - Admin Dashboard (Login, User CRUD, Article CRUD)
2. **Core Functionalities**
    - Google Maps integration (school location).
    - Registration form with criteria/requirements.
    - Article publishing, highlighting, and management.
    - Secure admin panel for user/content management.

---

### **3. Functional Requirements**

### **3.1 Home Page**

- **Hero Section**
    - School name/logo with a tagline.
    - High-quality image/video background reflecting Islamic values.
    - Primary CTA: "Register Now" linking to the Registration page.
- **About Us Short Description**
    - Brief overview of the school (2–3 paragraphs).
    - Secondary CTA: "Learn More" linking to the About Us page.
- **Key Features/Benefits**
    - 3–4 cards highlighting unique programs, facilities, or values (e.g., Quranic studies, experienced faculty).
- **Highlighted Articles Section**
    - **Curated Featured Articles**:
        - Display **3–4 highlighted articles** (e.g., announcements, event recaps, or educational content).
        - Layout: Grid or carousel with thumbnails, titles, short excerpts, and "Read More" links.
        - Admins can mark articles as "highlighted" via the Admin Panel.
        - Optional: Add a **“Highlight Expiry Date”** to auto-remove articles after a set date.
- **Latest Articles Preview**
    - Show **3 most recent articles** (below highlighted articles) with thumbnails, titles, and "Read More" links.
- **Footer**
    - Quick links (Home, Registration, About Us, Articles).
    - Contact info (address, phone, email).
    - Social media icons.

---

### **3.2 Registration Page**

- **Admission Criteria**
    - Bullet-point list of eligibility requirements (e.g., age, prior Islamic education).
- **Document Requirements**
    - Checklist for applicants (e.g., birth certificate, academic transcripts).
- **Program Benefits**
    - Grid/list explaining academic, spiritual, and extracurricular benefits.
- **Registration Timeline**
    - Visual timeline with key milestones (e.g., application deadline, interview dates).
- **Registration Form**
    - Fields: Student/parent details, educational background, document upload.
    - Submit button with confirmation email/SMS integration.

---

### **3.3 About Us Page**

- **School Description**
    - Detailed history, values, and educational approach (e.g., emphasis on Quran and Sunnah).
- **Vision & Mission**
    - Vision: Long-term goal (e.g., "Nurturing pious leaders grounded in Islamic knowledge").
    - Mission: Actionable steps (e.g., "Combining modern education with traditional Islamic teachings").
- **Location Map**
    - Embedded Google Maps API showing school address.
- **Contact Section**
    - Address, phone, email, and office hours.
    - Optional: Contact form for inquiries.

---

### **3.4 Article Page**

- **Article List View**
    - Grid/list of articles with thumbnails, titles, excerpts, dates, and categories (e.g., "Quran Studies," "Events").
- **Article Detail Page**
    - Full article content, author name, publish date, and category tags.
    - Social sharing buttons (Facebook, Twitter, WhatsApp).
- **Search & Filters**
    - Search bar and category filters for easy navigation.

---

### **3.5 Admin Panel**

- **Admin Login**
    - Secure login form (username/email + password) with CAPTCHA for brute-force protection.
- **User CRUD**
    - **Create/Edit Users**: Form for adding/editing user data (name, email, role).
    - **User List**: Table view with search, filters (e.g., role), and delete options.
    - Roles: Admin (full access), Editor (content management), Viewer (read-only).
- **Article CRUD**
    - **Create/Edit Articles**:
        - Rich text editor (e.g., TinyMCE) with image upload.
        - **“Highlight on Homepage” toggle** to feature articles.
        - **“Highlight Expiry Date”** field (optional).
    - **Article List**:
        - Table with columns: Title, Author, Status (draft/published), Highlight Status, Publish Date.
        - Filters for highlighted articles, categories, and dates.

---

### **4. Non-Functional Requirements**

- **Performance**:
    - Page load time <3 seconds (optimize images, lazy loading for articles).
- **Security**:
    - HTTPS, CSRF protection, password hashing, and regular security audits.
- **Responsiveness**:
    - Mobile-first design compatible with all screen sizes (tested on iOS/Android).
- **SEO**:
    - Meta tags, alt text for images, XML sitemap, and clean URLs (e.g., `/articles/islamic-etiquette`).
- **Accessibility**:
    - ADA compliance (contrast ratios, ARIA labels).

---

### **5. Technical Specifications**

- **Frontend**:
    - HTML5, CSS3, JavaScript (React.js framework for dynamic features).
    - Responsive CSS libraries (e.g., Bootstrap or Tailwind).
- **Backend**:
    - Node.js + Express.js (RESTful API) or PHP Laravel.
    - Database: PostgreSQL/MySQL for structured data.
    - Optional: Headless CMS (e.g., Strapi) for content management.
- **Integrations**:
    - Google Maps API (interactive map).
    - Email/SMS services (e.g., SendGrid, Twilio).
- **Hosting**:
    - AWS S3 (static files) + EC2 (backend) with SSL certification.

---

### **6. Timeline**

| **Phase** | **Duration** | **Deliverables** |
| --- | --- | --- |
| **Design** | 2 weeks | Wireframes, UI/UX mockups, style guide |
| **Development** | 6 weeks | Frontend/backend development, integrations |
| **Testing** | 1.5 weeks | User testing, bug fixes, performance tweaks |
| **Launch** | 3 days | Deployment, DNS setup, final client review |

---

### **7. Team & Stakeholders**

- **Project Manager**: Oversee timelines and client communication.
- **UI/UX Designer**: Create wireframes and visual designs.
- **Frontend Developer**: Implement responsive interfaces.
- **Backend Developer**: Build APIs and admin panel.
- **QA Tester**: Ensure functionality and performance.
- **Client Representative**: Provide content and approvals.

---

### **8. Risks & Mitigation**

- **Risk**: Delays in content submission (e.g., articles, images).
    
    **Mitigation**: Assign a content coordinator to assist the client.
    
- **Risk**: Google Maps API usage exceeding free tier limits.
    
    **Mitigation**: Monitor API usage and budget for potential costs.
    
- **Risk**: Highlighted articles becoming outdated.
    
    **Mitigation**: Implement expiry dates and admin notifications for old highlights.
    

---

### **9. Budget**

- **Estimated Cost**: 8,000–8,000–18,000 (varies with CMS vs. custom backend).
- **Breakdown**:
    - Design: 2,000–2,000–4,000
    - Development: 5,000–5,000–12,000
    - Testing/Hosting: 1,000–1,000–2,000

---

### **10. Mockup Notes**

- **Home Page Layout**:
    - Hero Section → Key Features → Highlighted Articles → Latest Articles → Footer.
    - Use Islamic-themed visuals (e.g., calligraphy, mosque illustrations).
- **Highlighted Articles**:
    - Add a “Featured” badge to thumbnails for visual distinction.

---

**Approval**

Client Signature: ___________________________

Date: _______________

**PRD Prepared By**: [Your Name]

**Date**: [Insert Date]