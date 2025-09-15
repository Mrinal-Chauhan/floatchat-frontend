import { Link } from "react-router-dom";
import './Hero.css';

export default function Hero() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero-section">
                <video autoPlay loop muted playsInline className="hero-video">
                    <source src="/waterbg2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="hero-overlay">
                    <h1 className="hero-title">FloatChat</h1>
                    <p className="hero-tagline">
                        Your AI-powered Conversational Interface for ARGO Data Discovery and Visualisation
                    </p>
                </div>

                <div className="buttons">
                    <Link to="/dashboard" className="btn">View Dashboard</Link>
                    <Link to="/chatbot" className="btn secondary">
                        Start A Chat
                    </Link>
                </div>
            </section>   {/* ✅ Hero section closed here */}

            {/* Features Section */}
            <section className="features-section">
                <h1 className="features-title">Dive Deep into Ocean Data</h1>
                <p className="features-subtitle">
                    Harness the power of AI to explore and understand ocean data like never before
                </p>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon">💬</div>
                        <h3>AI-Powered Chat</h3>
                        <p>Query ARGO ocean data using natural language and get intelligent insights</p>
                    </div>

                    <div className="feature-card">
                        <div className="icon">📊</div>
                        <h3>Data Visualization</h3>
                        <p>Interactive dashboards with real-time ocean monitoring data</p>
                    </div>

                    <div className="feature-card">
                        <div className="icon">🗄️</div>
                        <h3>ARGO Integration</h3>
                        <p>Direct access to global ocean float sensor network data</p>
                    </div>

                    <div className="feature-card">
                        <div className="icon">🔍</div>
                        <h3>Smart Discovery</h3>
                        <p>Find patterns and trends in oceanographic data effortlessly</p>
                    </div>
                </div>

                {/* About Section */}
                <section className="about-section">
                    <div className="about-container">
                        {/* Left: Image */}
                        <div className="about-image">
                            <img src="/argo-removebg-preview.png" alt="Argo Float" className="float-move" />
                        </div>

                        {/* Right: Text */}
                        <div className="about-text">
                            <h2>Meet the Argo Float</h2>
                            <p>
                                Autonomous ocean floats like this silently drift across the world’s oceans,
                                diving up to 2000 meters below the surface to measure temperature, salinity,
                                and other vital parameters. Every 10 days, they resurface to transmit data via
                                satellites, contributing to the world’s largest real-time ocean observation network.
                            </p>
                            <p>
                                With <strong>FloatChat</strong>, this complex data becomes simple — our
                                AI-powered interface lets you explore, query, and visualize Argo measurements
                                effortlessly, turning raw science into actionable insights.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 🌍 Globe Section */}
                <section className="about-section">
                    <div className="about-container reverse">
                        {/* Left: Text */}
                        <div className="about-text">
                            <h2>Ocean Data for Everyone</h2>
                            <p>
                                Traditionally, only experts could access and analyze global ocean datasets.
                                With <strong>FloatChat</strong>, anyone can chat with the data, visualize
                                global patterns, and uncover insights from the world’s oceans — all through
                                a simple interface.
                            </p>
                        </div>

                        {/* Right: Image */}
                        <div className="about-image">
                            <img src="/PLANET3.webp" alt="Globe" className="planet-move" />
                        </div>
                    </div>
                </section>

                {/* ✅ Footer Section */}
                <footer className="footer">
                    <hr className="footer-divider" />
                    <p className="footer-copy">
                        © 2025 FloatChat. All rights reserved. | Designed for democratizing access to ocean data
                    </p>
                </footer>

            </section>
        </>
    );
}







