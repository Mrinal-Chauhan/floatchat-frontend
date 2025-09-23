# FloatChat Frontend

FloatChat is an AI-powered conversational interface for ARGO data discovery and visualization. This frontend application provides an intuitive web interface for interacting with ocean data through natural language queries and comprehensive data visualization.

## 🌊 Features

- **AI-Powered Chat Interface**: Interactive chatbot for querying ARGO ocean data using natural language
- **Real-time Data Dashboard**: Comprehensive dashboard displaying ocean temperature, salinity, pressure, and float deployment data
- **Interactive Global Map**: Leaflet-based map showing ARGO float locations and coverage
- **Responsive Design**: Mobile-friendly interface with modern UI components
- **Real-time Updates**: Live data visualization with animated components
- **Multi-session Chat**: Support for multiple chat sessions with persistent conversation history

## 🛠 Tech Stack

- **Framework**: React 19.1.1 with Vite 7.1.2
- **Routing**: React Router DOM 7.8.2
- **Styling**: Custom CSS with Bootstrap 5.3.8
- **Maps**: Leaflet 1.9.4 for interactive mapping
- **3D Graphics**: Three.js 0.180.0 with React Three Fiber 9.3.0
- **Animations**: AOS (Animate On Scroll) 2.3.4, React Wavify 1.11.1
- **Markdown**: React Markdown 10.1.0 for formatted chat responses
- **Icons**: React Icons 5.5.0
- **Code Quality**: ESLint 9.33.0 with React-specific rules

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header with routing
│   ├── Hero.jsx        # Landing page hero section
│   ├── Map.jsx         # Interactive Leaflet map
│   ├── Message.jsx     # Chat message component
│   └── Navbar.jsx      # Navigation bar
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Chatbot.jsx     # Chat interface
│   └── Dashboard.jsx   # Data dashboard
├── assets/             # Static assets
├── App.jsx            # Main app component with routing
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16.0 or higher
- **npm** or **yarn**: Package manager
- **Backend API**: The FloatChat backend must be running on `http://localhost:8000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd floatchat-backend/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Verify environment setup**
   - Ensure the backend API is running at `http://localhost:8000`
   - Check that all required assets are in the `public/` directory

### Development

1. **Start the development server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

2. **Open your browser**
   Navigate to `http://localhost:5173` (default Vite port)

3. **Hot reload**
   The development server supports hot module replacement (HMR) for instant updates during development

### Building for Production

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

3. **Deploy the `dist/` folder** to your hosting platform

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend root directory:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_TITLE=FloatChat - ARGO Data Interface
```

### API Integration
The application communicates with the backend API for:
- Chat message processing (`POST /api/v1/chat`)
- Session management with unique session IDs
- Real-time data retrieval for dashboard components

## 🎨 Styling and Themes

The application uses a custom dark ocean theme with:
- **Primary Colors**: Deep navy (`#0B0F1A`), Ocean blue (`#00C8FF`)
- **CSS Variables**: Defined in component-specific CSS files
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Animation**: Smooth transitions and floating animations for ocean-themed elements

## 🗂 Key Components

### ChatBot (`/chatbot`)
- Multi-session chat interface
- Real-time message exchange with backend
- Markdown rendering for formatted responses
- Typing indicators and error handling
- Session-based conversation persistence

### Dashboard (`/dashboard`)
- Real-time ocean data metrics
- Regional coverage statistics
- Recent float deployment tracking
- Interactive data visualization

### Home (`/`)
- Hero section with video background
- Feature showcase with animated cards
- About sections with floating animations
- Responsive design elements

## 🔌 API Integration

The frontend expects the following API endpoints:

```javascript
// Chat endpoint
POST /api/v1/chat
Content-Type: application/json
{
  "message": "string",
  "session_id": "string"
}

// Health check
GET /api/v1/health
```

## 📱 Browser Support

- **Modern browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile browsers**: iOS Safari 13+, Chrome Mobile 80+
- **Features**: ES2020+, CSS Grid, CSS Custom Properties

## 🛠 Development Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code quality checks

## 🧪 Code Quality

The project includes:
- **ESLint** with React-specific rules
- **React Hooks** linting rules
- **React Refresh** integration for fast development
- **Import/export** validation

## 🔍 Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Verify backend is running on port 8000
   - Check CORS settings on backend
   - Confirm API endpoints match frontend expectations

2. **Build Issues**
   - Clear `node_modules` and reinstall dependencies
   - Check Node.js version compatibility
   - Verify all required assets exist in `public/`

3. **Map Not Loading**
   - Check Leaflet CSS imports
   - Verify tile server accessibility
   - Ensure map container has defined height

4. **Chat Not Working**
   - Verify WebSocket connections (if applicable)
   - Check session ID generation
   - Confirm backend chat endpoint is accessible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

For backend setup and API documentation, see the [backend README](../backend/README.md).
