# 🎤 KigaliDrive Speaker Notes & Script

## 👥 The Team & Roles
*   **Freedaouce (Team Rep)**: Database & Data Layer Lead
*   **Danny**: Backend API & Business Logic
*   **Souvenir**: Frontend State Management & Routing
*   **Gerry**: Frontend UI & Design
*   **Delice**: UI Design & Branch Management (Assisting Gerry)

---

## 📅 Presentation Flow

### 🎤 Speaker: Freedaouce (Team Rep)
**Slide 1: Title Slide**
"Good Morning. We are Team Group 4, and this is **KigaliDrive**—Rwanda's Premier Car Rental Platform.
This presentation documents our **Architecture & Engineering** process using ASP.NET Core 8.0 and React.
I am Freedaouce, the team representative."
*(Briefly introduce the team roles as listed above).*

**Slide 2: Project Overview**
"KigaliDrive is a specific solution to the car rental fragmentation in Kigali.
It is a **multi-tenant platform** serving 4 distinct roles: Admin, Manager, Car Owners, and Clients.
Our key features include comprehensive Car Management, a Booking & Payment Engine, and a robust Notification System."

**Slide 3: Technology Stack**
"We chose a modern, scalable stack:
*   **Backend**: ASP.NET Core 8.0 for high performance.
*   **Database**: SQL Server (Production) / SQLite (Dev) managed via Entity Framework Core.
*   **Frontend**: React 18 for a dynamic user interface.
*   **Security**: JWT for stateless authentication."

**Slide 4: System Architecture**
"We implemented a **Layered Architecture** pattern to ensure scalability.
*   **Controllers**: Handle HTTP requests.
*   **Services**: Encapsulate business logic.
*   **Data Layer**: Manages database interaction.
This separation allows us to maintain and test each part independently."

**Slide 5: Database Design**
"Our Data Layer is built on 5 core entities:
*   **User**: The central actor (with Identity).
*   **Car**: The asset being rented.
*   **Booking**: The transaction linking User and Car.
*   **Payment**: The financial record.
*   **Notification**: The communication log."

**Slide 6: Entity Relationships**
"We enforced strict referential integrity:
*   **User ↔ Cars**: One-to-Many (One owner, multiple cars).
*   **User ↔ Bookings**: One-to-Many (One client, multiple trips).
*   **Booking ↔ Payment**: One-to-One (Each booking has one payment status)."

**Slide 7: ApplicationDbContext**
"The `ApplicationDbContext` is our central data access point.
It uses the **Fluent API** to enforce constraints like unique Emails and License Plates.
It also auto-detects the provider, switching seamlessly between SQL Server and SQLite."

---

### 🎤 Speaker: Danny
**Slide 8: Backend API Structure**
"Moving to the Backend Logic. We structured our solution into clear logical folders:
*   **Controllers** for endpoints.
*   **Services** for logic.
*   **DTOs** to shape data coming in and out."

**Slide 9: Service Layer**
"The Service Layer is critical. It keeps our controllers 'thin'.
It contains all the business rules—like checking if a car is available before allowing a booking. This decouples our UI from the underlying logic."

**Slide 10: Booking Workflow**
"Here is the logic for a Booking:
1.  **Validate**: Is the car free?
2.  **Calculate**: Price * Days.
3.  **Save**: Write to DB.
4.  **Notify**: Trigger emails."

**Slide 11: Authentication & Authorization**
"Security is paramount. We use **JWT Authentication** for stateless, secure access.
We implement **Role-Based Access Control (RBAC)** to ensure an Admin can do things a Client cannot."

---

### 🎤 Speaker: Souvenir
**Slide 12: Frontend Architecture**
"Good morning/afternoon. My name is Souvenir, and I worked on the frontend state management and routing for KigaliDrive.
Our frontend is built using React and follows a component-based architecture.
Each feature of the application is broken down into reusable components, which makes the code easier to maintain and scale.
We also clearly separate UI components from application logic, so that presentation and data handling are not mixed.
This approach improves readability, reusability, and overall performance of the frontend."

**Slide 13: State Management**
"This slide focuses on how state is managed in the frontend.
We manage authentication state to keep track of the logged-in user and their role.
We also manage booking and car data so that information is shared consistently across different components.
In addition, we handle loading states and error states to give users proper feedback during API requests.
This ensures a smooth and reliable user experience throughout the application."

**Slide 14: Routing & Access Control**
"Routing in KigaliDrive is designed to be secure and user-friendly.
We separate public routes, such as login and registration, from protected routes like dashboards and bookings.
Protected routes are only accessible to authenticated users.
We also implement role-based navigation, so users only see pages that match their assigned roles.
This improves security and prevents unauthorized access on the frontend."

---

### 🎤 Speaker: Gerry (with Delice)
**Slide 15: UI/UX Design Goals**
"Hello, my name is Gerry, and together with **Delice**, we worked on the user interface and design of the KigaliDrive frontend.
Our main UI and UX goals were to keep the application clean, responsive, and easy to use.
We focused on simplicity so users can navigate the system without confusion.
Responsiveness was also important to ensure the application works well on different screen sizes."

**Slide 16: UI Implementation**
"This slide shows how the UI design was implemented.
We designed dashboards to give users a clear overview of important information.
Forms were designed to be simple and intuitive, with clear labels and validation.
We also used tables and cards to display data in a structured and readable way.
Overall, the layout is responsive, ensuring a consistent experience across devices."

---

### 🎤 Speaker: Freedaouce (All)
**Slide 17: Request Flow Example**
"To summarize, here is the full lifecycle of a Request:
From the **Client's click**, through **Souvenir's Routes**, hitting **Danny's Controller & Services**, validated by **My Database**, and returning a Success Message to **Gerry's UI**.
Thank you for listening."
