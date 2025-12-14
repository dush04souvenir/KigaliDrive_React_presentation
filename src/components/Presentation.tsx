"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Car, Shield, Database, Server, Mail, Lock, Package, Maximize, Minimize, Code, Layout, GitBranch, Palette, Eye, CheckCircle, Box } from "lucide-react"
import "./Presentation.css"


const slides = [
  {
    id: 1,
    type: "title",
    title: "KigaliDrive",
    tagline: "Architecture & Engineering Documentation",
    theme: "ASP.NET Core 8.0 + React",
    presenter: "Freedaouce (Team Rep)",
  },
  {
    id: 2,
    type: "overview",
    title: "Project Overview",
    points: [
      "Multi-tenant Car Rental Platform",
      "Roles: Admin, Manager, CarOwner, Client",
      "Key Features: Car Management, Booking & Payments",
      "Notifications & Reporting System",
    ],
  },
  {
    id: 3,
    type: "tech-stack",
    title: "Technology Stack",
    stacks: [
      { category: "Backend", tech: "ASP.NET Core 8.0", icon: Server },
      { category: "Database", tech: "SQL Server / SQLite", icon: Database },
      { category: "ORM", tech: "Entity Framework Core", icon: Database },
      { category: "Frontend", tech: "React 18", icon: Package },
      { category: "Security", tech: "JWT Authentication", icon: Shield },
    ],
  },
  {
    id: 4,
    type: "features",
    title: "System Architecture",
    features: [
      { icon: Layout, title: "Layered Architecture", desc: "Clear separation of concerns for scalability" },
      { icon: Server, title: "Controllers", desc: "Handle HTTP requests & responses" },
      { icon: Code, title: "Services", desc: "Encapsulate core business logic" },
      { icon: Database, title: "Data Layer", desc: "Manages database interactions" },
    ],
  },
  {
    id: 5,
    type: "database",
    title: "Database Entities",
    entities: [
      { name: "User", fields: "Identity & Roles", relations: "Core Actor" },
      { name: "Car", fields: "Vehicle Details", relations: "Owned by User" },
      { name: "Booking", fields: "Reservation Info", relations: "Links User & Car" },
      { name: "Payment", fields: "Transaction Status", relations: "Linked to Booking" },
      { name: "Notification", fields: "Alerts & Msgs", relations: "User Updates" },
    ],
  },
  {
    id: 6,
    type: "flow",
    title: "Entity Relationships",
    steps: [
      { step: "1:N", label: "User ↔ Cars", detail: "One owner can list multiple cars" },
      { step: "1:N", label: "User ↔ Bookings", detail: "One client can have multiple bookings" },
      { step: "1:1", label: "Booking ↔ Payment", detail: "Each booking has one payment record" },
    ],
  },
  {
    id: 7,
    type: "overview",
    title: "ApplicationDbContext",
    points: [
      "Central Data Access Layer (DAL)",
      "DbSets for all Entities",
      "Fluent API Configuration (Constraints)",
      "Auto-detection of SQL Server vs SQLite",
    ],
  },
  {
    id: 8,
    type: "overview",
    title: "Backend API Structure",
    points: [
      "📂 Controllers (API Endpoints)",
      "📂 Services (Business Logic)",
      "📂 DTOs (Data Transfer Objects)",
      "📂 Middleware (Auth & Error Handling)",
    ],
  },
  {
    id: 9,
    type: "overview",
    title: "Service Layer",
    points: [
      "Contains all business logic",
      "Keeps controllers lightweight",
      "Decouples constraints from UI",
      "Reusable logic across endpoints",
    ],
  },
  {
    id: 10,
    type: "flow",
    title: "Booking Workflow",
    steps: [
      { step: "1", label: "Validate", detail: "Check dates & availability" },
      { step: "2", label: "Calculate", detail: "Compute total price" },
      { step: "3", label: "Save", detail: "Persist booking record" },
      { step: "4", label: "Notify", detail: "Email owner & client" },
    ],
  },
  {
    id: 11,
    type: "features",
    title: "Auth & Authorization",
    features: [
      { icon: Lock, title: "JWT Auth", desc: "Stateless secure token implementation" },
      { icon: Shield, title: "Role-Based", desc: "Access control for Admin/Mgr/Client" },
    ],
  },
  {
    id: 12,
    type: "overview",
    title: "Frontend Architecture",
    points: [
      "React Component-Based Design",
      "Separation of UI and Logic",
      "Reusable Component Library",
      "Scalable File Structure",
    ],
  },
  {
    id: 13,
    type: "overview",
    title: "State Management",
    points: [
      "Auth State (User & Token)",
      "Data State (Bookings, Cars)",
      "UI State (Loading, Errors)",
      "Context API / Redux",
    ],
  },
  {
    id: 14,
    type: "flow",
    title: "Routing & Access Control",
    steps: [
      { step: "Public", label: "Login/Register", detail: "Accessible by everyone" },
      { step: "Protected", label: "Dashboards", detail: "Requires valid JWT" },
      { step: "Role-Based", label: "Redirects", detail: "Client vs Admin views" },
    ],
  },
  {
    id: 15,
    type: "features",
    title: "UI/UX Design Goals",
    features: [
      { icon: Eye, title: "Clean", desc: "Minimalist aesthetic" },
      { icon: Layout, title: "Responsive", desc: "Mobile-first approach" },
      { icon: CheckCircle, title: "User-Friendly", desc: "Intuitive navigation" },
    ],
  },
  {
    id: 16,
    type: "overview",
    title: "UI Implementation",
    points: [
      "Interactive Dashboards",
      "Validated Forms",
      "Data Tables & Grids",
      "Responsive Flex/Grid Layouts",
    ],
  },
  {
    id: 17,
    type: "flow",
    title: "Request Flow Example",
    steps: [
      { step: "Client", label: "Request", detail: "User clicks 'Book Now'" },
      { step: "API", label: "Process", detail: "Controller -> Service -> DB" },
      { step: "Response", label: "Success", detail: "200 OK + JSON Data" },
      { step: "UI", label: "Update", detail: "Show success modal" },
    ],
  },
  {
    id: 18,
    type: "team",
    title: "Development Team",
    team: [
      { name: "Freedauce", role: "Database & Data Layer", github: "@Freedauce", color: "#3b82f6" },
      { name: "Danny", role: "Backend API Layer", github: "@mdanny11", color: "#8b5cf6" },
      { name: "Souvenir", role: "Frontend State & Routing", github: "@dush04souvenir", color: "#10b981" },
      { name: "Gerry", role: "Frontend UI/Design", github: "@Gerry-13", color: "#f59e0b" },
      { name: "Delice", role: "UI Design & Branch Manager", github: "@Dellyce", color: "#e11d48" },
    ],
  },
  {
    id: 101,
    type: "contributor-detail",
    name: "Freedauce",
    role: "Database & Data Layer",
    quote: "Data integrity is the bedrock of user trust.",
    contributions: [
      "Designed the RBAC/PBAC Schema with EF Core",
      "Orchestrated Docker Multi-Container Setup",
      "Optimized SQLite Database Performance",
      "Implemented Data Persistence Layer",
    ],
    techStack: [Database, Server, Box],
    color: "#3b82f6",
  },
  {
    id: 102,
    type: "contributor-detail",
    name: "Danny",
    role: "Backend API Layer",
    quote: "Security is not a feature, it is a state of mind.",
    contributions: [
      "Architected .NET 8 Web API Controllers",
      "Implemented JWT & Stateless Auth",
      "Built SMTP Email Notification Service",
      "Enforced Security Headers & Validation",
    ],
    techStack: [Lock, Shield, Server],
    color: "#8b5cf6",
  },
  {
    id: 103,
    type: "contributor-detail",
    name: "Souvenir",
    role: "Frontend State & Routing",
    quote: "A great UI is useless without a robust state.",
    contributions: [
      "Built Global State Management System",
      "Engineered Dynamic RBAC Routing",
      "Created Secure Route Guards (Middleware)",
      "Developed Centralized API Service Layer",
    ],
    techStack: [Code, Layout, GitBranch],
    color: "#10b981",
  },
  {
    id: 104,
    type: "contributor-detail",
    name: "Gerry",
    role: "Frontend UI/Design",
    quote: "Design is Validated Intelligence made visible.",
    contributions: [
      "Created Glassmorphism Design System",
      "Built Responsive Animated Components",
      "Designed Interactive Slide Transitions",
      "Ensured Mobile & Desktop Compatibility",
    ],
    techStack: [Palette, Eye, Layout],
    color: "#f59e0b",
  },
  {
    id: 105,
    type: "contributor-detail",
    name: "Delice",
    role: "UI Design & Branch Manager",
    quote: "Consistency in code mirrors consistency in design.",
    contributions: [
      "Managed Git Workflow & PRs",
      "Enforced UI Consistency Standards",
      "Resolved Merge Conflicts",
      "Co-Designed Core Dashboard Layouts",
    ],
    techStack: [GitBranch, CheckCircle, Palette],
    color: "#e11d48",
  },
  {
    id: 19,
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
    id: 20,
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

        {slide.type === "contributor-detail" && (
          <div className="slide-content contributor-slide">
            <div className="contributor-header" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <h1 className="contributor-name" style={{ backgroundImage: `linear-gradient(135deg, #fff 0%, ${slide.color} 100%)` }}>
                {slide.name}
              </h1>
              <p className="contributor-role" style={{ color: slide.color }}>{slide.role}</p>
            </div>
            <div className="contributor-body">
              <div className="left-col">
                <blockquote className="quote-card" style={{ borderColor: slide.color }}>
                  "{slide.quote}"
                </blockquote>
                <div className="tech-stack-mini">
                  {slide.techStack?.map((Icon, i) => (
                    <div key={i} className="mini-tech-icon" style={{ backgroundColor: slide.color }}>
                      <Icon size={20} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="right-col">
                <ul className="contributions-list">
                  {slide.contributions?.map((item, i) => (
                    <li key={i} className="contribution-item">
                      <CheckCircle size={20} color={slide.color} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
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
