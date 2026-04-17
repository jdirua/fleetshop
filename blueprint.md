
# FLEETSHOP - Complete Build Blueprint v24.1

## PHASE 0: Environment & Technical Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Backend:** Google Firebase
- **Styling:** Tailwind CSS v3
- **UI Components:** Radix UI, Lucide React
- **Data Visualization:** Recharts, Chart.js, Pigeon Maps
- **PWA:** `@ducanh2912/next-pwa`

---

## PHASE 1-7: Core Architecture, Design, Auth, Data, Layout, Features

- **[Completed]** All foundational phases are complete.

---

## PHASE 8: Dashboard UI & Visualizations

- **[Completed]** This phase covers the design and implementation of the comprehensive, data-rich operational dashboard.

### 8.1 Core Visualizations & Components
- **[Completed]** Primary KPIs: The top of the dashboard displays four key performance indicators.
- **[Completed]** Dashboard Grid: The main content is organized in a dynamic 12-column grid.
- **[Completed]** Live Asset Map: A real-time map component. The map is now fully functional and stable.
- **[Completed]** Work Order Status Chart: A bar chart visualizing work order status.
- **[Completed]** Predictive Maintenance Forecast: A line chart for maintenance needs.
- **[Completed]** Smart Alert Feed: A real-time list of critical system and vehicle alerts.

### 8.2 Live Asset Map - Final Viewport Calibration

- **[Completed]** The Live Asset Map's viewport is now perfectly calibrated. All asset markers and geographical labels are clearly visible, and the component is considered stable and visually complete.

### 8.3 Backend & Data Strategy
- **[To-Do]** Replace all mock data with live data streams from Firebase.
- **[To-Do]** Implement configurable alert thresholds in Firestore.

---

## PHASE 9: Settings Page UI

- **[Completed]** The UI for the Settings subpages has been standardized and implemented.

### 9.1 Application & Feature Management (`src/app/dashboard/settings/app-settings/layout.tsx`)

- **[Completed]** **Standard Header:** The page features a standardized header with a back arrow, a main title, and a subtitle below it.
- **[Completed]** **Title & Subtitle Styling:** Both the title and the subtitle are styled with a `bg-gradient-to-r from-purple-500 to-indigo-600` background. Their container `div`s are styled with `inline-block` to ensure the background width fits the text content precisely.
- **[Completed]** **Content Card:** The main content of the page is rendered inside a separate `div` with the `glass-card` class, providing a modern, semi-transparent container.

### 9.2 Company Preferences (`src/app/dashboard/settings/app-settings/page.tsx`)

- **[Completed]** Implemented dropdown menus for currency and measurement unit selection.
- **Currency Dropdown:** Options include PGK, USD, AUD, EUR, GBP, JPY.
- **Measurement Units Dropdown:** Options include "Imperial" and "Metric".

### 9.3 Operational Configuration (`src/app/dashboard/settings/operational/layout.tsx`)

- **[Completed]** **Standard Header:** The layout for this subpage now correctly matches the standard header design.
- **[Completed]** **Title & Subtitle Styling:** Both the title ("Operational Configuration") and the subtitle now correctly feature the `bg-gradient-to-r from-purple-500 to-indigo-600` background, consistent with the established UI standard.

### 9.4 System & Security (`src/app/dashboard/settings/security/page.tsx`)

- **[Completed]** **Global Card Style Correction:** Fixed the `Card` components on the System & Security page. Removed local class overrides (`bg-slate-800/75`, `backdrop-blur-lg`, `border-slate-700`) that were preventing the global "glass card" effect from applying. The cards now correctly use the site-wide defined styles from `src/components/ui/card.tsx`.
- **[Completed]** **Button Color Update:** The "Export All Data (.zip)" button has been updated to use a purple background (`bg-purple-600`) to align with the application's color scheme.

---

## PHASE 10: Operational Features & Administration

- **[In Progress]** Building out core business logic and administrative capabilities.

---

## PHASE 11: Advanced Operational Modules

- **[To-Do]** Implement advanced features for driver management, mechanic scheduling, geofencing, and analytics.

---

## PHASE 12: Advanced Configuration & Automation (Refined)

- **[To-Do]** This phase evolves the existing Settings Hub into a powerful, flexible control center and integrates its outputs directly into the main dashboard.

### 12.1 Evolve User Management to RBAC
- **[To-Do]** **Enhance `settings/users`:** Expand the existing user management feature.
- **[To-Do]** **Build "Manage Roles" Interface:** Create a new component within the users settings to define custom roles.
- **[To-Do]** **Implement Permissions Matrix:** For each role, create a checklist of permissions tied directly to the existing Feature Flags.

### 12.2 Supercharge "Operational Configuration"
- **[To-Do]** **Enhance `settings/operational`:** Build upon the existing page.
- **[To-Do]** **Add "Preventative Maintenance (PM) Schedules" Card:** Create a new card for defining maintenance schedules based on intervals and composed of existing Service Types.

### 12.3 New Hub: "Vehicle Settings"
- **[To-Do]** **Create New Card & Page:** Add a "Vehicle Settings" card to the main settings hub and create a new subpage at `settings/vehicles`.
- **[To-Do]** **Manage Vehicle Statuses:** Build a CRUD interface for vehicle statuses.
- **[To-Do]** **Manage Vehicle Groups:** Implement functionality to create and assign vehicles to logical groups.

### 12.4 New Hub: "Integrations"
- **[To-Do]** **Create New Card & Page:** Add an "Integrations" card to the main settings hub and create a new subpage at `settings/integrations`.
- **[To-Do]** **Prioritize Telematics/GPS:** Implement the first integration with a telematics provider to automate meter reading imports.

### 12.5 Dashboard Integration
- **[To-Do]** Surface the data generated from the new settings modules directly onto the main dashboard.
- **[To-Do]** **Enhance Smart Alert Feed:** The feed will now display "Service Due" alerts generated by the PM scheduling engine.
- **[To-Do]** **New KPI Card: "Vehicles Awaiting Service"**: Add a new top-level KPI that provides a count of all vehicles currently due for scheduled maintenance.
- **[To-Do]** **New Chart: "Service Backlog by Group"**: Add a new bar chart to the dashboard that breaks down the "Vehicles Awaiting Service" KPI by the custom Vehicle Groups defined in the new Vehicle Settings hub.

---

**Blueprint Version:** 25.1
**Status:** In Progress
**Last Updated:** 2024-08-07
