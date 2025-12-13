"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Car, Shield, Database, Server, Mail, Lock, Package, Maximize, Minimize } from "lucide-react"
import "./Presentation.css"


const slides = [
  {
    id: 1,
    type: "title",
    title: "KigaliDrive",
    tagline: "Revolutionize Car Rental Management & Bookings",
    theme: "Rwanda's Premier Platform for Seamless Car Rental Experiences",
  },
  {
    id: 2,
    type: "overview",
    title: "Executive Summary",
    points: [
      "500+ Vehicles Listed across the platform",
      "10K+ Happy Customers with 98% Satisfaction Rate",
      "24/7 Customer Support for seamless experience",
      "Granular Permission-Based System: Admin, Manager, etc.",
      "Email verification with secure 6-digit authentication",
      "Payment processing with 5% platform commission",
    ],
  },
  {
    id: 3,
    type: "tech-stack",
    title: "Technology Stack",
    stacks: [
      { category: "Backend", tech: ".NET 8 Web API", icon: Server },
      { category: "Database", tech: "SQLite + EF Core", icon: Database },
      { category: "Authentication", tech: "JWT + BCrypt + OAuth", icon: Lock },
      { category: "Frontend", tech: "React 18 + Redux Toolkit", icon: Package },
      { category: "Email", tech: "Gmail SMTP", icon: Mail },
      { category: "Security", tech: "PBAC + Email 2FA", icon: Shield },
    ],
  },
  {
    id: 4,
    type: "permission-matrix",
    title: "Permission-Based Access Control (PBAC)",
    headers: ["Feature", "Admin", "Manager", "Owner", "Client"],
    rows: [
      { feature: "Self-Register", values: [false, false, true, true] },
      { feature: "Create Admin/Mgr", values: [true, false, false, false] },
      { feature: "Approve Cars", values: [true, true, false, false] },
      { feature: "Force Delete Users", values: [true, false, false, false] },
      { feature: "List Cars", values: [false, false, true, false] },
      { feature: "Book Cars", values: [false, false, false, true] },
      { feature: "Confirm Payments", values: [false, false, true, false] },
      { feature: "View Reports", values: [true, true, false, false] },
    ],
  },
  {
    id: 5,
    type: "flow",
    title: "Authentication & Verification Flow",
    steps: [
      { step: "1", label: "User Registration", detail: "Email, password, role selection with form validation" },
      { step: "2", label: "Email Sent", detail: "6-digit verification code via Gmail SMTP (5-min expiry)" },
      { step: "3", label: "Code Verification", detail: "User enters code on verification modal UI" },
      { step: "4", label: "Account Activated", detail: "IsEmailVerified = true, JWT token generated" },
      { step: "5", label: "Dashboard Access", detail: "Role-based redirect to appropriate dashboard" },
    ],
  },
  {
    id: 6,
    type: "database",
    title: "Database Architecture",
    entities: [
      {
        name: "User",
        fields: "Id, Email, PasswordHash, Permissions(JSON), IsEmailVerified",
        relations: "1:N with Cars & Bookings",
      },
      {
        name: "Car",
        fields: "Id, Make, Model, LicensePlate, PricePerDay, Status, OwnerId",
        relations: "N:1 with User, 1:N with Bookings",
      },
      {
        name: "Booking",
        fields: "Id, UserId, CarId, StartDate, EndDate, Status, TotalAmount",
        relations: "1:1 with Payment",
      },
      {
        name: "Payment",
        fields: "Id, BookingId, Amount, Status(Pending/Confirmed), PaidAt",
        relations: "Belongs to Booking",
      },
      {
        name: "LoginVerificationToken",
        fields: "Id, UserId, Code (6-digit), ExpiresAt, IsUsed",
        relations: "For 2FA & Registration",
      },
    ],
  },
  {
    id: 99,
    type: "email-system",
    title: "Email Notification System",
    templates: [
      "CEO Welcome",
      "Verification Code",
      "Payment Confirmation",
      "Owner Contact Info",
      "New Car Notification",
      "Password Reset",
    ],
    sample: {
      subject: "🔐 Your Login Verification Code",
      body: "Hello [Name],\n\\nYour verification code is:\n\\n123456\n\\nThis code will expire in 5 minutes.",
    },
  },
  {
    id: 7,
    type: "workflow",
    title: "End-to-End Booking Workflow",
    workflow: [
      "Client browses available cars with filters & search",
      "System validates date availability & calculates pricing",
      "Booking created with Status: Pending",
      "Payment record generated with platform commission",
      "Owner receives email + in-app notification",
      "Owner confirms payment receipt",
      "Client receives owner contact information",
      "Booking progresses: Pending → Confirmed → InProgress → Completed",
    ],
  },
  {
    id: 8,
    type: "api",
    title: "Core API Endpoints (30+ total)",
    endpoints: [
      { method: "POST", path: "/api/auth/register", desc: "User registration + verification code" },
      { method: "POST", path: "/api/auth/verify-code", desc: "Email code verification" },
      { method: "POST", path: "/api/auth/login", desc: "JWT authentication" },
      { method: "GET", path: "/api/cars", desc: "Browse available vehicles" },
      { method: "POST", path: "/api/cars", desc: "Create car listing (owners)" },
      { method: "POST", path: "/api/bookings", desc: "Create new booking" },
      { method: "PUT", path: "/api/payments/{id}/status", desc: "Confirm payment (owners)" },
      { method: "GET", path: "/api/admin/reports", desc: "Platform analytics (admin)" },
    ],
  },
  {
    id: 9,
    type: "features",
    title: "Key Features & Capabilities",
    features: [
      {
        icon: Shield,
        title: "Multi-Layer Security",
        desc: "JWT + BCrypt + Email verification + Google OAuth integration",
      },
      {
        icon: Mail,
        title: "Professional Emails",
        desc: "6 email templates for verification, bookings, payments & notifications",
      },
      {
        icon: Database,
        title: "Real-time Updates",
        desc: "Live notifications, booking status tracking, instant alerts",
      },
      {
        icon: Package,
        title: "Production Ready",
        desc: "Docker Compose deployment, Netlify frontend, Railway backend",
      },
    ],
  },
  {
    id: 10,
    type: "deployment",
    title: "Deployment Architecture",
    deployment: [
      { step: "Frontend", command: "Nginx Container", desc: "React + Vite build served on port 3000" },
      { step: "Backend API", command: ".NET 8 Container", desc: "Web API running on port 5139" },
      { step: "Database", command: "SQLite Volume", desc: "Persistent storage mount" },
      { step: "Orchestration", command: "Docker Compose", desc: "Manages service mesh & networking" },
    ],
  },
  {
    id: 11,
    type: "team",
    title: "Development Team",
    team: [
      { name: "Freedauce", role: "Database & Data Layer", github: "@Freedauce", color: "#3b82f6" },
      { name: "Danny", role: "Backend API Layer", github: "@mdanny11", color: "#8b5cf6" },
      { name: "Souvenir", role: "Frontend State & Routing", github: "@dush04souvenir", color: "#10b981" },
      { name: "Gerry", role: "Frontend UI/Design", github: "@Gerry-13", color: "#f59e0b" },
    ],
  },
  {
    id: 12,
    type: "stats",
    title: "Platform Metrics",
    stats: [
      { label: "User Roles", value: "4", color: "#3b82f6" },
      { label: "API Endpoints", value: "30+", color: "#8b5cf6" },
      { label: "Email Templates", value: "6", color: "#10b981" },
      { label: "Commission Rate", value: "5%", color: "#f59e0b" },
    ],
  },
  {
    id: 13,
    type: "conclusion",
    title: "Production Deployment",
    subtitle: "Live & operational platform serving Rwanda's car rental market",
    highlights: [
      "✅ Live on Netlify: group004.netlify.app",
      "✅ GitHub Repository: github.com/Freedauce/Group4",
      "✅ Scalable .NET 8 architecture with Entity Framework Core",
      "✅ Granular Permission-Based Access Control (PBAC)",
      "✅ Professional email system with Gmail SMTP integration",
      "✅ Docker-ready with complete containerization support",
      "✅ MIT Licensed open-source project",
    ],
  },
]

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const presentationRef = useRef<HTMLDivElement>(null)

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error("Fullscreen error:", e)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((e) => {
          console.error("Exit fullscreen error:", e)
        })
        setIsFullscreen(false)
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  const slide = slides[currentSlide]

  return (
    <div className="presentation">
      <div
        className={`slide slide-${slide.type} ${direction > 0 ? "slide-next" : direction < 0 ? "slide-prev" : ""}`}
        key={slide.id}
      >
        {slide.type === "title" && (
          <div className="slide-content title-slide">
            <div className="title-container">
              <div className="title-text-content">
                <h1 className="main-title">
                  {slide.title}
                </h1>
                <p className="tagline">
                  {slide.tagline}
                </p>
                <p className="theme">
                  {slide.theme}
                </p>
              </div>
              <div className="title-image-container">
                <img src="/landing_mockup.png" alt="KigaliDrive Landing Page" className="title-image" />
              </div>
            </div>
          </div>
        )}

        {slide.type === "overview" && (
          <div className="slide-content overview-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <div className="points-grid">
              {slide.points?.map((point, idx) => (
                <div key={idx} className="point-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="point-number">{idx + 1}</div>
                  <p className="point-text">{point}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "tech-stack" && (
          <div className="slide-content tech-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <div className="tech-grid">
              {slide.stacks?.map((stack, idx) => {
                const Icon = stack.icon
                return (
                  <div key={idx} className="tech-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <Icon className="tech-icon" size={40} />
                    <h3 className="tech-category">{stack.category}</h3>
                    <p className="tech-name">{stack.tech}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {slide.type === "permission-matrix" && (
          <div className="slide-content matrix-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <div className="matrix-container">
              <table className="permission-table">
                <thead>
                  <tr>
                    {slide.headers?.map((header, idx) => (
                      <th key={idx}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slide.rows?.map((row, idx) => (
                    <tr key={idx} style={{ animationDelay: `${idx * 0.1}s` }} className="matrix-row">
                      <td className="feature-cell">{row.feature}</td>
                      {row.values.map((val, vIdx) => (
                        <td key={vIdx} className="value-cell">
                          {val ? <span className="check-icon">✅</span> : <span className="cross-icon">❌</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {slide.type === "flow" && (
          <div className="slide-content flow-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <div className="flow-container">
              {slide.steps?.map((step, idx) => (
                <div key={idx} className="flow-step" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className="step-number">{step.step}</div>
                  <div className="step-content">
                    <h3 className="step-label">{step.label}</h3>
                    <p className="step-detail">{step.detail}</p>
                  </div>
                  {idx < slide.steps.length - 1 && <div className="step-arrow">→</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "database" && (
          <div className="slide-content database-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <div className="entities-grid">
              {slide.entities?.map((entity, idx) => (
                <div key={idx} className="entity-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <Database className="entity-icon" size={32} />
                  <h3 className="entity-name">{entity.name}</h3>
                  <p className="entity-fields">{entity.fields}</p>
                  <p className="entity-relations">{entity.relations}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "workflow" && (
          <div className="slide-content workflow-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <div className="workflow-list">
              {slide.workflow?.map((item, idx) => (
                <div key={idx} className="workflow-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <span className="workflow-number">{idx + 1}</span>
                  <p className="workflow-text">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "api" && (
          <div className="slide-content api-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <div className="api-list">
              {slide.endpoints?.map((endpoint, idx) => (
                <div key={idx} className="api-item" style={{ animationDelay: `${idx * 0.08}s` }}>
                  <span className={`api-method method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
                  <code className="api-path">{endpoint.path}</code>
                  <span className="api-desc">{endpoint.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "features" && (
          <div className="slide-content features-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <div className="features-grid">
              {slide.features?.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div key={idx} className="feature-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <Icon className="feature-icon" size={48} />
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-desc">{feature.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {slide.type === "deployment" && (
          <div className="slide-content deployment-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <div className="deployment-diagram">
              <div className="docker-box host">
                <div className="docker-label">Docker Host</div>
                <div className="docker-services">
                  <div className="docker-service frontend">
                    <span>Frontend (Nginx)</span>
                    <small>:3000</small>
                  </div>
                  <div className="docker-arrow">→</div>
                  <div className="docker-service backend">
                    <span>Backend API (.NET)</span>
                    <small>:5139</small>
                  </div>
                  <div className="docker-line">│</div>
                  <div className="docker-service db">
                    <span>SQLite Volume</span>
                    <small>Persistent</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="deployment-steps">
              {slide.deployment?.map((item, idx) => (
                <div key={idx} className="deploy-step" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="deploy-header">
                    <span className="deploy-label">{item.step}</span>
                    <code className="deploy-command">{item.command}</code>
                  </div>
                  <p className="deploy-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "email-system" && (
          <div className="slide-content email-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <div className="email-container">
              <div className="templates-list">
                <h3>6 Professional Templates</h3>
                <ul>
                  {slide.templates?.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="email-preview">
                <div className="email-card">
                  <div className="email-header">
                    <div className="email-dot red"></div>
                    <div className="email-dot yellow"></div>
                    <div className="email-dot green"></div>
                    <span>{slide.sample?.subject}</span>
                  </div>
                  <div className="email-body">
                    <pre>{slide.sample?.body}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {slide.type === "stats" && (
          <div className="slide-content stats-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <div className="stats-grid">
              {slide.stats?.map((stat, idx) => (
                <div
                  key={idx}
                  className="stat-card"
                  style={{ animationDelay: `${idx * 0.1}s`, borderColor: stat.color }}
                >
                  <h3 className="stat-value" style={{ color: stat.color }}>
                    {stat.value}
                  </h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "team" && (
          <div className="slide-content team-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <div className="team-grid">
              {slide.team?.map((member, idx) => (
                <div
                  key={idx}
                  className="team-card"
                  style={{ animationDelay: `${idx * 0.1}s`, borderColor: member.color }}
                >
                  <div className="team-avatar" style={{ backgroundColor: member.color }}>
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <code className="team-github">{member.github}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "conclusion" && (
          <div className="slide-content conclusion-slide">
            <h2 className="slide-title">{slide.title}</h2>
            <p className="conclusion-subtitle">{slide.subtitle}</p>
            <div className="highlights-list">
              {slide.highlights?.map((highlight, idx) => (
                <div key={idx} className="highlight-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <span className="highlight-check">✓</span>
                  <p className="highlight-text">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="nav-buttons">
        <div className="slide-counter">
          {currentSlide + 1} / {slides.length}
        </div>
        <button
          className="nav-btn"
          onClick={toggleFullScreen}
          title={isFullscreen ? "Exit Full Screen" : "Enter Full Screen"}
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
        <button className="nav-btn" onClick={prevSlide} disabled={currentSlide === 0} title="Previous Slide">
          <ChevronLeft size={20} />
        </button>
        <button
          className="nav-btn"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          title="Next Slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
      </div>
    </div>
  )
}
