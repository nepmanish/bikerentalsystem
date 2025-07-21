# BikeRental Frontend

A modern React frontend application for the BikeRental system, built with Vite and designed with a clean MVC architecture.

## 🏗️ Architecture

This project follows the **MVC (Model-View-Controller)** pattern:

- **Models**: Located in `src/services/` - API service layers for data operations
- **Views**: Located in `src/pages/` and `src/components/` - React components for UI
- **Controllers**: Located in `src/hooks/` - Custom hooks managing state and business logic

## 🚀 Features

### Authentication
- ✅ User signup and login
- ✅ JWT authentication with httpOnly cookies
- ✅ Password validation and confirmation
- ✅ Protected routes
- ✅ Admin role-based access control

### User Dashboard
- ✅ Overview page with statistics
- ✅ Quick actions panel
- ✅ Top budget-friendly bikes
- ✅ Latest bikes carousel
- ✅ Popular bikes grid

### Bike Management
- ✅ Browse bikes with search and filters
- ✅ Bike details with specifications
- ✅ Rating and review system
- ✅ Price comparison and discounts
- 🚧 Bike booking system (in progress)

### Admin Features
- 🚧 Admin dashboard (in progress)
- 🚧 User management (in progress)  
- 🚧 Bike management (in progress)
- 🚧 Booking management (in progress)

### UI/UX
- ✅ Responsive design (mobile-first)
- ✅ Modern Tailwind CSS styling
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Form validation with Yup

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v7
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form
- **Validation**: Yup
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## 📦 Installation

1. **Prerequisites**
   ```bash
   Node.js >= 16.0.0
   npm >= 8.0.0
   ```

2. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Environment Setup**
   - The frontend is configured to proxy API requests to `http://localhost:3000`
   - Make sure your backend is running on port 3000
   - Frontend will run on port 5174

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5174`

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Generic components (Button, Modal, etc.)
│   │   ├── auth/           # Authentication components
│   │   ├── bikes/          # Bike-related components
│   │   ├── bookings/       # Booking components
│   │   ├── admin/          # Admin components
│   │   └── layout/         # Layout components (Header, etc.)
│   ├── pages/              # Page components (Views)
│   │   ├── auth/           # Authentication pages
│   │   └── admin/          # Admin pages
│   ├── services/           # API service layers (Models)
│   ├── hooks/              # Custom React hooks (Controllers)
│   ├── context/            # React context providers
│   ├── utils/              # Utility functions and helpers
│   ├── assets/             # Static assets
│   └── App.jsx             # Main application component
├── public/                 # Public assets
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🔧 Configuration

### Vite Configuration (`vite.config.js`)
- Configured proxy for API requests to backend
- Port set to 5174
- Host set to 0.0.0.0 for network access

### Tailwind Configuration (`tailwind.config.js`)
- Custom color palette
- Extended animations
- Custom fonts configuration

## 🌐 API Integration

The frontend consumes the following backend endpoints:

### Authentication
- `POST /api/v1/users/signup` - User registration
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/forgotPassword` - Password reset
- `PATCH /api/v1/users/resetPassword/:token` - Reset password
- `PATCH /api/v1/users/updateMyPassword` - Update password
- `PATCH /api/v1/users/updateMe` - Update profile
- `DELETE /api/v1/users/deleteMe` - Delete account

### Bikes
- `GET /api/v1/bikes` - Get all bikes with filters
- `GET /api/v1/bikes/:id` - Get single bike
- `GET /api/v1/bikes/top-5-cheap` - Get budget-friendly bikes
- `GET /api/v1/bikes/bike-stats` - Get bike statistics
- `POST /api/v1/bikes` - Create bike (admin)
- `PATCH /api/v1/bikes/:id` - Update bike (admin)
- `DELETE /api/v1/bikes/:id` - Delete bike (admin)

### Bookings
- `POST /api/v1/bookings` - Create booking
- `PATCH /api/v1/bookings/cancel/:id` - Cancel booking

### Admin
- `GET /api/v1/users` - Get all users (admin)
- `GET /api/v1/users/:id` - Get user (admin)
- `PATCH /api/v1/users/:id` - Update user (admin)
- `DELETE /api/v1/users/:id` - Delete user (admin)

## 🔒 Authentication Flow

1. User submits login/signup form
2. Frontend sends credentials to backend
3. Backend validates and returns JWT in httpOnly cookie
4. Frontend updates authentication state
5. Protected routes are accessible
6. JWT is automatically included in subsequent requests

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Success: Green (#059669)
- Error: Red (#DC2626)
- Warning: Orange (#D97706)
- Gray scale for text and backgrounds

### Typography
- Font: Inter (system fallback: system-ui, sans-serif)
- Responsive text sizes
- Consistent line heights

### Components
- Consistent spacing (4px grid)
- Rounded corners (4px, 8px, 12px)
- Subtle shadows and borders
- Smooth transitions and animations

## 🚧 Future Enhancements

### Planned Features
- [ ] Complete booking system
- [ ] User profile management
- [ ] Admin dashboard with analytics
- [ ] Real-time notifications
- [ ] Bike image uploads
- [ ] Advanced filtering and search
- [ ] Map integration for bike locations
- [ ] Payment integration
- [ ] Review and rating system
- [ ] Wishlist functionality

### Technical Improvements
- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Implement Progressive Web App features
- [ ] Add internationalization (i18n)
- [ ] Optimize bundle size
- [ ] Add accessibility improvements
- [ ] Implement dark mode

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Port 5174 already in use**
   ```bash
   # Kill process using the port
   lsof -ti:5174 | xargs kill -9
   ```

2. **API connection errors**
   - Ensure backend is running on port 3000
   - Check proxy configuration in `vite.config.js`

3. **Tailwind styles not loading**
   - Verify `tailwind.config.js` content paths
   - Check if CSS imports are correct in `src/index.css`

4. **Build errors**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Update dependencies: `npm update`

## 📞 Support

For support, please open an issue in the repository or contact the development team.
