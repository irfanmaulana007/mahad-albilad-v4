# Mahad Al Bilad v4

## Overview
Mahad Al-Bilad Islamic School website is a comprehensive web application designed to showcase the school's programs, handle student registrations, publish Islamic educational content, and provide secure administrative management.

## Features
- Professional landing page with dynamic content
- Student registration system
- Islamic educational articles platform
- Secure admin dashboard
- Interactive school location with Google Maps
- Mobile-responsive design

## Tech Stack
### Frontend (Next.js)
- React.js with Next.js framework
- TypeScript
- Tailwind CSS for styling
- GraphQL for data fetching
- Context API for state management

### Backend (Node.js)
- Node.js with TypeScript
- Prisma ORM for database management
- RESTful API architecture
- Secure authentication system

## Project Structure
```
├── client/                 # Frontend application
│   ├── app/               # Next.js app router
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   ├── stores/            # State management
│   ├── types/             # TypeScript definitions
│   └── public/            # Static assets
│
└── server/                # Backend application
    ├── src/               # Source code
    └── prisma/            # Database schema and migrations
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Frontend Setup
1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

### Backend Setup
1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Setup database:
```bash
npx prisma migrate dev
```

5. Start development server:
```bash
npm run dev
```

## Environment Variables

### Frontend (.env)
Required environment variables for the frontend:
- API endpoints
- Google Maps API key
- Other public configurations

### Backend (.env)
Required environment variables for the backend:
- Database connection string
- JWT secret
- SMTP settings for email
- Other secure configurations

## Features Implementation

### Home Page
- Hero section with school information
- Featured articles section
- Key benefits showcase
- Latest updates

### Registration System
- Student registration form
- Document upload capability
- Application status tracking

### Article Management
- Article creation and editing
- Category management
- Featured articles highlighting

### Admin Dashboard
- User management (CRUD)
- Content management
- Analytics and reporting

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is proprietary and confidential.

## Contact
For any inquiries, please reach out to Mahad Al-Bilad Islamic School administration.