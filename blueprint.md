
# FLEETSHOP - Complete Build Blueprint v16.0

## PHASE 0: Environment & Technical Stack

This project is built on a modern, full-stack foundation using Next.js and Firebase. The following technologies and conventions are established and must be adhered to for all development.

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Backend as a Service (BaaS):** Google Firebase
    - **Authentication:** Firebase Authentication (including custom middleware for role-based access control)
    - **Database:** Firestore
- **Styling:** Tailwind CSS v3
    - **Critical Directive:** All CSS styling is managed through Tailwind CSS v3. The correct directives, `@tailwind base;`, `@tailwind components;`, and `@tailwind utilities;`, **must** be used in `src/app/globals.css`.
- **UI Components:**
    - **Primitives:** Radix UI (`@radix-ui/react-*`) is used for accessible, unstyled component primitives.
    - **Icons:** Lucide React (`lucide-react`) is the standard icon library.
- **Data Visualization:**
    - **Charts:** Recharts and Chart.js
- **Forms:** Conform (`@conform-to/react`) is used for form management, with Zod (`@conform-to/zod`) for schema validation.
- **Progressive Web App (PWA):** The application is configured as a PWA using `@ducanh2912/next-pwa`.

---

## PHASE 1: Core Architecture

- **[Completed]** The core project structure, Firebase initialization, and authentication middleware are fully implemented.

---

## PHASE 2: Design System

### **[Completed] Detailed Color Palette
This section documents the specific color palette used throughout the application, defined as CSS variables in `src/app/globals.css`. The application uses a dark theme by default.

#### **Core Theme Colors (Dark Mode)**
- **`--background`**: `hsl(222.2 84% 4.9%)` - The primary page background.
- **`--foreground`**: `hsl(210 40% 98%)` - The primary text color.
- **`--primary`**: `hsl(262.1 83.3% 57.8%)` - The main accent color (Purple) for interactive elements.
- **`--border`**: `hsl(217.2 32.6% 17.5%)` - The color for borders and dividers.

#### **Specific Component Colors**
- **Main Background (`html`)**: `#1e293b` (slate-800) - The base color for the entire application, over which a noise texture is applied.
- **KPI Icon Colors (Dashboard)**:
    - **Total Vehicles**: `#4A90E2` (Blue)
    - **Active Work Orders**: `#F5A623` (Orange)
    - **Low Stock Items**: `#BD10E0` (Purple)
    - **Overdue Services**: `#D0021B` (Red)

### **[Completed] Core UI Components**
- **[Completed]** Button, Input, Card, Dialog, Header.

### **[Completed] Component Styling Strategy**
- **[Completed]** **Vibrant Background:** The application background features a vibrant, high-contrast noise texture to add depth and a premium feel.
- **[Completed]** **Solid Components (Header & Sidebar):** The main header and sidebar components MUST use a solid background color (`bg-secondary`). This gives them a distinct, inset appearance that separates them from the main content area.

---

## PHASE 3: Homepage UI Design

- **[Completed]** This phase documents the final, polished state of the public-facing homepage, which was designed to be a visually compelling and fully responsive entry point for the application.

### 3.1 Core Visual & Layout Strategy
- **[Completed]** **Multi-Layered Background:** The homepage features a dynamic background composed of a foundational background image (`/concretetruck.png`) and a strong, dark `linear-gradient` overlay (`rgba(0,0,0,0.45)` to `rgba(0,0,0,0.9)`). This creates a moody, high-contrast aesthetic that makes the foreground content pop.
- **[Completed]** **Robust Responsive Layout:** The main content container utilizes significant top (`pt-32`) and bottom (`pb-24`) padding, ensuring a clean and professional layout across all device sizes. This definitively resolves previous issues with the header overlapping the hero card on smaller screens.
- **[Completed]** **Glassmorphic UI:** The design consistently uses a "glassmorphic" style for its primary UI elements. The main hero card features a `bg-black/40` background with a `backdrop-blur-sm` effect, while the feature cards use a slightly more transparent `bg-black/30`. All cards have a subtle border and a heavy `shadow-2xl` to create a distinct, "lifted" appearance.

### 3.2 Hero Section
- **[Completed]** **Headline & Sub-headline:** The hero section is dominated by a bold, `extrabold` headline and a clear, descriptive sub-headline, establishing the application's value proposition immediately.
- **[Completed]** **Dual Call-to-Action Buttons:** Two visually distinct and compelling CTA buttons anchor the hero section:
    - **Get Started:** A primary button with a vibrant `bg-violet-600` background and a matching `shadow-violet-500/50` that creates a prominent glow effect.
    - **Learn More:** A secondary button styled with a deep `bg-blue-900` and a corresponding `shadow-blue-900/50` glow, offering a sophisticated contrast.
- **[Completed]** **Entrance Animations:** Subtle fade-in animations are applied to enhance user experience.

### 3.3 Key Features Section
- **[Completed]** A dedicated section below the hero highlights the application's core features in a three-column grid.
- **[Completed]** **FeatureCard Component:** Reusable `FeatureCard` components display a `lucide-react` icon housed within a circular, semi-transparent purple `div`, along with a title and description, creating a visually consistent and informative breakdown of the product's capabilities.

---

## PHASE 4: Authentication

- **[Completed]** User roles, a complete authentication flow, and session management are fully implemented.
- **[Completed]** **Critical Authentication Refactor:** Resolved a complex login issue by overhauling the authentication strategy. The fix involved:
    - **Standardizing Admin SDK Initialization:** Transitioned from environment variables to a `serviceAccountKey.json` file for more reliable Firebase Admin SDK initialization in the development environment.
    - **Simplifying Session Creation:** Refactored the login form to call the `createSession` server action directly, eliminating the need for an intermediary API route.
    - **Removing Obsolete Code:** Deleted the now-redundant `/api/auth/session` API route, streamlining the authentication flow.

---

## PHASE 5: Data Models

- **[Completed]** Centralized type definitions and CRUD operations for all major features are implemented.

---

## PHASE 6: Layout & Navigation

- **[Completed]** Public landing page, login page, and a full dashboard layout are implemented with role-based navigation.

---

## PHASE 7: Server Actions & Feature Pages

### **[Updated] Feature Implementation Status
This table tracks the standardization progress for each feature page.

| Page            | UI Standardization | Pagination   | Notes                                    |
|-----------------|--------------------|--------------|------------------------------------------|
| **Dashboard**   | **[Completed]**    | N/A          | Features a data-rich, real-time interface. |
| **Vehicles**    | **[Completed]**    | **[Completed]**| Title standardized to "Vehicle Hub".       |
| **Work Orders** | **[Completed]**    | **[Completed]**| Title standardized to "Work Order Hub".    |
| **Inventory**   | **[Completed]**    | **[Completed]**| Consistent layout and controls.          |
| **Vendors**     | **[Completed]**    | **[Completed]**| Consistent layout and controls.          |
| **Fuel Logs**   | **[Completed]**    | **[Completed]**| Title standardized to "Fuel Log Hub".      |
| **Activity Log**| **[Completed]**    | **[Completed]**| New timeline UI and pagination implemented.|
| **Reports**     | **[Completed]**    | **[Completed]**| All runtime errors fixed.                |
| **Documents**   | **[Completed]**    | **[Completed]**| Consolidated and cleaned up feature.     |
| **Settings**    | **[In Progress]**  | **[Not Needed]**|                                          |

---

## PHASE 8: Dashboard UI & Visualizations

- **[Completed]** This phase covers the design and implementation of the comprehensive, data-rich operational dashboard, which serves as the primary real-time monitoring interface for the fleet.

### 8.1 Dashboard Layout & Core Components
- **[Completed]** **Primary KPIs:** The top of the dashboard displays four key performance indicators: 'Total Fleet Size,' 'Active Work Orders,' 'Critical Parts,' and 'Fleet Utilization.'
- **[Completed]** **Dashboard Grid:** The main content is organized in a dynamic 12-column grid that houses all interactive components and visualizations.
- **[Completed]** **Core Visualizations:**
    - **Live Asset Map:** A real-time map component. **(Note: Temporarily disabled due to a persistent runtime error. Will be re-implemented in a future phase.)**
    - **Work Order Status Chart:** A bar chart visualizing the current status of all open work orders.
    - **Predictive Maintenance Forecast:** A line chart that forecasts upcoming maintenance needs.
- **[Completed]** **Smart Alert Feed:** A real-time list of critical system and vehicle alerts, displayed in a dedicated sidebar card.

### 8.2 High-Contrast "Glass Card" Design
- **[Completed]** **Goal:** To create a visually striking and highly legible interface, all cards on the dashboard use a consistent "glass card" design.
- **[Completed]** **Card Styling Strategy:**
    - **Base Style (`glass-card`):** A new `.glass-card` class defines the core look. It uses a darker, more opaque background (`bg-slate-800/90`), an increased backdrop blur (`backdrop-blur-md`), and a subtle border (`border-white/20`).
    - **3D Effect:** A heavy drop shadow (`shadow-2xl` and `shadow-black/50`) is applied to make the cards appear "lifted" off the page.
    - **Hover Effect:** On hover, cards display a thin, animated purple border and a soft purple "glow," providing clear interactive feedback.
- **[Completed]** **Text & Icon Readability:**
    - All text and icons on the cards use a bright `text-slate-50` color and are given a subtle `text-shadow` to ensure they are crisp and readable against the textured background.

### 8.3 Interactive Sidebar Redesign
- **[Completed]** **Goal:** The sidebar navigation has been redesigned to feature solid, "3D-style" buttons that provide a more tactile and intuitive user experience.
- **[Completed]** **Styling Strategy:**
    - **Active Link:** The currently active navigation link is styled with a `bg-primary` background and a `shadow-lg shadow-primary/30`, making it "pop" off the screen.
    - **Inactive Links:** Inactive links have a `bg-slate-800/50` background, a `border border-white/10`, and a `shadow-md` to give them a solid, "pressable" appearance.
    - **Hover Effect:** When a user hovers over an inactive link, the background becomes lighter (`hover:bg-slate-700/70`), the text becomes brighter (`hover:text-foreground`), and the shadow intensifies (`hover:shadow-lg`).

### 8.4 Backend & Data Strategy
- **[To-Do]** **Data Sources:** Replace all mock data currently used in the dashboard components with live data streams from Firebase listeners.
- **[To-Do]** **Alert Logic:** Implement configurable alert thresholds in Firestore to dynamically trigger the "Smart Alerts" on the dashboard.

---

## PHASE 9: Operational Features & Administration

- **[In Progress]** This phase will focus on building out the core business logic and administrative capabilities that make the application a powerful, configurable management tool.

### 9.1 Standardized Hub Page Design
- **[Completed]** All primary feature pages, referred to as "Hubs," will follow a consistent design pattern to ensure a predictable and user-friendly experience.

#### **Key Components:**
*   **Page Title:** Each page will have a clear title, e.g., "Vehicle Hub."
*   **Primary ActionButton:** A button in the top-right corner for the main creation action (e.g., "+ Add Vehicle"). This button uses a `bg-purple-500` background.
*   **Data Display:**
    *   **Empty State:** When no data exists, a user-friendly empty state will be displayed. It includes:
        *   A large, relevant icon with a `text-purple-400` color.
        *   A clear "No [Items] Found" message.
        *   A primary call-to-action button to add the first item (e.g., "Add First Vehicle"). This button also uses a `bg-purple-500` background.
        *   A section with cards teasing related functionality. Icons within these cards also use `text-purple-400`.
    *   **Data Table/Grid:** When data is present, it will be displayed in a paginated and searchable table or a grid of cards.
*   **Glassmorphism:** The main content area of each hub will use the `.glass-card` style for a consistent, modern look.

---

### 9.2 Vehicle Hub
- **[Completed]** The Vehicle Hub is the central place for managing all company vehicles. The UI is fully designed and implemented according to the standardized hub page design, and now uses the `glass-card` style for a consistent look and feel.
- **Features:**
    - View a list of all vehicles.
    - Add, edit, and delete vehicles.
    - Search and filter vehicles.

### 9.3 Work Orders Hub
- **[Completed]** The Work Orders Hub is now fully implemented according to the standardized hub page design, and now uses the `glass-card` style for a consistent look and feel.
- **Features:**
    - View a list of all work orders.
    - Add, edit, and delete work orders.
    - Search and filter work orders.

### 9.4 Inventory Hub
- **[Completed]** Implement the Inventory Hub following the standardized. The UI is fully designed and implemented according to the standardized hub page design, and now uses the `glass-card` style for a consistent look and feel.
- **Features:**
    - View a list of all inventory items.
    - Add, edit, and delete inventory items.
    - Search and filter inventory items.

### 9.5 Vendors Hub
- **[Completed]** Implement the Vendors Hub following the standardized design, and now uses the `glass-card` style for a consistent look and feel.
- **Features:**
    - View a list of all vendors.
    - Add, edit, and delete vendors.
    - Search and filter vendors.

### 9.6 Fuel Logs Hub
- **[Completed]** Implement the Fuel Logs Hub following the standardized design, and now uses the `glass-card` style for a consistent look and feel.
- **Features:**
    - View a list of all fuel logs.
    - Add, edit, and delete fuel logs.
    - Search and filter fuel logs.

### 9.7 Activity Log Hub
- **[Completed]** Implement a new timeline-based UI for the Activity Log Hub to provide a more intuitive and visually rich audit trail, and now uses the `glass-card` style for a consistent look and feel.

#### **New Timeline UI/UX:**
*   **Goal:** Replace the standard data table with a dynamic timeline that makes it easy to track and understand system-wide activities at a glance.
*   **Design:**
    *   **Vertical Timeline:** A chronological, top-to-bottom feed of all log entries.
    *   **Categorized Icons:** Each entry will feature a distinct icon to visually categorize the event:
        *   `User` icon for **User Actions** (e.g., creating a vehicle).
        *   `Settings` icon for **System Events** (e.g., an automated alert).
        *   `Truck` icon for **Fleet Updates** (e.g., a vehicle status change).
    *   **Clear Details:** Each entry will clearly display the user who performed the action, a description of the action, a specific target (e.g., "Vehicle V-123"), and a relative timestamp (e.g., "30 minutes ago").
*   **Implementation:** This was built within the `ActivityLogClientPage.tsx` component, replacing the existing table structure.

### 9.8 Reports Hub
- **[Completed]** The Reports Hub is now stable and all runtime errors have been fixed. The UI visualizes key metrics for vehicles, work orders, and recent activity, and now uses the `glass-card` style for a consistent look and feel.

### 9.9 Documents Hub
- **[Completed]** The Documents Hub has been refactore-d and consolidated. I have removed redundant components and server actions, standardized the `Document` type, and integrated the `DocumentsHub` component. Pagination has also been added, and the UI now uses the `glass-card` style for a consistent look and feel.

### 9.10 Settings Hub
- **[In Progress]** Create a comprehensive, admin-only "Settings Hub" to serve as the application's central command center. This hub will feature a dashboard-style interface for easy navigation.

#### Key Features of the Settings Hub:
*   **User Management:** **[Completed]** A complete section for administrators to manage the user base. This includes tools to view a full list of users, create new user accounts with pre-assigned roles (e.g., admin, editor, readonly), and modify the roles or status (active/disabled) of existing users.
*   **Operational Configuration:** **[Completed]** A dedicated area for fine-tuning the application's business logic. Admins can now customize alert triggers (like setting the threshold for "low inventory" warnings) and define custom categories for vehicle service types and parts.
*   **Application & Feature Management:** **[To-Do]** A settings panel allowing admins to customize the application's functionality. This will include the ability to turn major features (like the Vendors or Fuel Logs modules) on or off for all users, as well as set company-wide preferences for currency, measurement units, and the company logo.
*   **System & Security:** **[To-do]** A section providing high-level oversight. This will include access to an unfiltered, admin-only audit log of all major system activities and and the ability to export key data sets (like vehicle or user lists) for reporting and backup purposes.

---

## PHASE 10: Advanced Operational Modules

- **[To-Do]** This phase introduces a suite of advanced features to elevate the platform from a management tool to a comprehensive operational command center.

### 10.1 Driver Management Hub
- **[To-Do]** **Goal:** Centralize all driver-related information for better tracking and management.
- **[To-Do]** **Features:**
    - Create a new "Driver Hub" with detailed driver profiles.
    - Include fields for contact information, license details, and license expiration dates.
    - Implement a system to track driver assignment history.
    - Add automated alerts for upcoming license expirations.

### 10.2 Mechanic Management & Scheduling
- **[To-Do]** **Goal:** Integrate mechanics directly into the maintenance workflow for improved efficiency and accountability.
- **[To-Do]** **Features:**
    - Add a new `mechanic` user role within the existing RBAC system in Settings.
    - Enhance the "Work Orders Hub" to allow the assignment of work orders to specific mechanics.
    - Create a dedicated "My Work" dashboard for logged-in mechanics to view their assigned tasks.
    - **(Future Scope)** Develop a visual scheduling calendar to manage mechanic availability and assignments.

### 10.3 Interactive Geofencing & Live Alerts
- **[To-Do]** **Goal:** Transform the Live Asset Map into a proactive, intelligent monitoring system.
- **[To-Do]** **Features:**
    - Develop an interface in the Settings Hub for administrators to visually draw, save, and name geofence zones on the map.
    - Implement server-side logic (e.g., Cloud Functions for Firebase) to monitor vehicle locations in real-time.
    - Trigger "Smart Alerts" on the main dashboard and create Activity Log entries when vehicles enter or exit defined geofences.

### 10.4 Advanced Cost & Performance Analytics
- **[To-Do]** **Goal:** Provide deep, actionable financial and operational insights to drive business decisions.
- **[To-Do]** **Features:**
    - Enhance Work Order and Fuel Log forms to include detailed cost-tracking fields (e.g., parts cost, labor cost, fuel cost).
    - Develop a new "Analytics Hub" with a user-friendly custom report builder.
    - Introduce advanced visualizations to calculate and display metrics like Total Cost of Ownership (TCO) per vehicle and mechanic performance.

---

## PHASES 11-15: Reporting, RBAC, PWA, Security, Deployment

- **[Completed]** All remaining phases are complete.

---

## QUICK REFERENCE

### Core Technologies
- Next.js 14+ (App Router), TypeScript, Firebase (Auth, Firestore), Tailwind CSS, PWA

### Key Dependencies
- `firebase`, `firebase-admin`, `lucide-react`, `@radix-ui/react-*`, `recharts`

---

**Blueprint Version:** 16.0
**Status:** Completed
**Last Updated:** 2024-08-05
