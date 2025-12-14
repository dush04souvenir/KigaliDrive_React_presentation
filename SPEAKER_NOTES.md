# 🎤 Speaker Notes & Presentation Guide

This guide is designed to help you present the **KigaliDrive** project confidently, explaining complex technical terms and acknowledging team contributions.

---

## 🔑 Crucial Concept: RBAC vs. PBAC
**Requirement**: Use **PBAC** (Permission-Based Access Control).

### ❌ What is RBAC? (Old Way)
*   **Definition**: Role-Based Access Control.
*   **Logic**: "I am a **Manager**, therefore I can delete users."
*   **Limitation**: If you want a specific Manager to *not* delete users, you have to create a new role (e.g., "Junior Manager"). It gets rigid.

### ✅ What is PBAC? (Our Way)
*   **Definition**: **Permission**-Based Access Control.
*   **Logic**: "I have the **'User.Delete'** permission, therefore I can delete users."
*   **Advantage**: It's granular. A user can have the "Manager" title but specific permissions can be added or removed individually (e.g., `CanApproveCars`, `CanBoookRides`).
*   **In Code**: We check `if (user.HasPermission("Car.Create"))` instead of `if (user.Role == "Admin")`.

---

## 🏗️ Technical Glossary (Cheat Sheet)

| Term | Full Name | How We Used It | Simple Explanation |
| :--- | :--- | :--- | :--- |
| **JWT** | JSON Web Token | **Authentication** | A secure digital "badge" given to the user after login. They show this badge (in the API header) to prove who they are for every request. Stateless (server doesn't need to remember it). |
| **BCrypt** | BCrypt Hashing | **Security** | We NEVER store actual passwords. We run the password through a mathematical function (BCrypt) to turn it into gibberish (hash). We compare hashes to log in. |
| **EF Core** | Entity Framework Core | **Database** | Our tool to talk to the database using C# code instead of writing raw SQL queries. |
| **SMTP** | Simple Mail Transfer Protocol | **Email** | The standard "language" for sending emails. We configured Gmail's SMTP server to send verification codes. |
| **Docker** | Docker Containers | **DevOps** | A "box" that contains our app and everything it needs to run. It ensures the app runs the same on Freedauce's laptop as it does on the server. |
| **Nginx** | Nginx | **Web Server** | A high-performance gatekeeper that sits in front of our app, serving the static frontend files and directing traffic. |

---

## 👥 Team Contributions (Who did what)

Use this to answer questions like *"Who worked on the database?"*

### 🔵 Freedauce: Database & Data Layer
*   **Focus**: The foundation.
*   **Key Contribution**: Designed the SQLite schema, set up Entity Framework Core, and handled the `User` and `Car` relationships.
*   **PBAC Role**: Designed the table structure to store Permissions as JSON or distinct records.

### 🟣 Danny: Backend API Layer
*   **Focus**: The Logic.
*   **Key Contribution**: Built the .NET 8 Web API Controllers (`AuthController`, `CarsController`).
*   **Key Tech**: Implemented the JWT generation logic and the Email Service for verification codes.

### 🟢 Souvenir: Frontend State & Routing
*   **Focus**: The Wiring.
*   **Key Contribution**: Connected React to the API. Managed the state (is the user logged in?) and handled the complicated routing (redirecting unverified users).

### 🟠 Gerry: Frontend UI/Design
*   **Focus**: The User Experience.
*   **Key Contribution**: Created the beautiful glassmorphism design, the responsive slides, and the realistic car animations.

### 🔴 Delice: UI Design & Branch Management
*   **Focus**: Visual Consistency & Code Stability.
*   **Key Contribution**: Co-designed the UI elements and managed the **Git Workflow** (Pull Requests, Merges). She ensured that no conflicts broke the build during development.

---


---

## 📅 Presentation Agenda & Assignments (19 Slides)
*Everyone presents their own "Spotlight Slide". The rest are divided by expertise.*

### 🎨 Part 1: Vision & Results (Gerry & Delice)
*   **Slide 1: Title & Hook** - "Welcome to KigaliDrive." (Gerry)
*   **Slide 2: Executive Summary** - "What problem are we solving?" (Delice)
*   **Slide 10: Key Features** - Showcasing the beautiful feature set. (Gerry)
*   **Slide 18: Platform Metrics** - The results of the good UX. (Delice)

### 🔐 Part 2: Security & Backend (Danny)
*   **Slide 3: Tech Stack** - Explain the .NET/Security choices.
*   **Slide 4: PBAC Matrix** - Explain why Permissions > Roles.
*   **Slide 7: Email System** - Explain SMTP integration.
*   **Slide 9: API Endpoints** - Walk through the Controllers.

### 💾 Part 3: Infrastructure (Freedauce)
*   **Slide 6: Database** - Explain Schema and EF Core.
*   **Slide 11: Deployment** - Explain Docker Containers.

### ⚡ Part 4: Frontend Logic (Souvenir)
*   **Slide 5: Auth Flow** - Explain client-side verification state.
*   **Slide 8: User Workflow** - Walk through the seamless journey.
*   **Slide 19: Conclusion** - Future roadmap.

### 🌟 Part 5: The Team Spotlights (Everyone)
*   **Slide 12: Team Overview** - Quick Intro.
*   **Slide 13: Freedauce** - Presents Database/Infra contributions.
*   **Slide 14: Danny** - Presents Backend/Security contributions.
*   **Slide 15: Souvenir** - Presents Frontend Logic contributions.
*   **Slide 16: Gerry** - Presents UI/Design contributions.
*   **Slide 17: Delice** - Presents Branch Management contributions.

---

## 📝 Slide-by-Slide Quick Tips

*   **Slide 4 (Permission Matrix)**: *Do not say "Roles".* Say "We defined sets of **permissions** commonly associated with these personas, but the system checks the specific permission column, not the role name."
*   **Slide 5 (Auth Flow)**: Mention that the **Verification Code** is the key security step preventing bot accounts.
*   **Slide 10 (Deployment)**: Highlight **Docker Compose**. It brings up the Frontend, Backend, and Database all at once with one command.

---

*Good luck with the presentation! You have a solid, modern architecture here.*
