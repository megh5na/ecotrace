# EcoTrace Design Guidelines

## Design Approach

**Hybrid Approach**: Material Design foundation with inspiration from Notion (clean data presentation), Duolingo (gamification), and Apple Health (tracking dashboards). Focus on clarity, data visualization, and motivational design that encourages sustained engagement.

---

## Typography System

**Font Families** (via Google Fonts):
- **Primary**: Inter (headings, UI elements, navigation)
- **Secondary**: DM Sans (body text, descriptions, data labels)

**Type Scale**:
- Hero/Page Titles: text-4xl/text-5xl font-bold
- Section Headers: text-2xl/text-3xl font-semibold
- Card Titles: text-lg/text-xl font-semibold
- Body Text: text-base font-normal
- Captions/Labels: text-sm/text-xs font-medium
- Data/Stats: text-3xl/text-4xl font-bold (for emphasis)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** (p-2, m-4, gap-6, space-y-8, py-12, px-16, etc.)

**Container Widths**:
- Dashboard/Main Content: max-w-7xl
- Form Sections: max-w-2xl
- Cards: Default to full width within grid

**Grid Patterns**:
- Desktop: 3-column grid for cards/stats (grid-cols-3)
- Tablet: 2-column grid (md:grid-cols-2)
- Mobile: Single column (grid-cols-1)

---

## Component Library

### Navigation
- **Sidebar Navigation** (desktop): Fixed left sidebar with icon + label navigation, w-64, collapsible on tablet
- **Bottom Navigation** (mobile): Fixed bottom nav with icons for Dashboard, Track, Impact, Profile
- **Top Header**: Simple header with EcoTrace logo, user avatar, notifications icon

### Dashboard Cards
- **Stat Cards**: Elevated cards (shadow-md) with large numbers, icons, and trend indicators (↑↓)
- **Chart Cards**: Full-width or 2/3-width cards with embedded charts, minimal borders
- **Action Cards**: Cards with CTA buttons for quick actions (Add Activity, View Recommendations)

### Data Visualization
- **Chart Types**: Line charts (carbon over time), Donut charts (category breakdown), Bar charts (comparisons)
- **Chart Style**: Minimal gridlines, clear labels, use color palette for data series
- **Legends**: Positioned below or to the right of charts

### Forms & Inputs
- **Input Fields**: Rounded borders (rounded-lg), focus rings, placeholder text
- **Dropdowns**: Custom styled select with chevron icon
- **Sliders**: Range inputs for quantity adjustments
- **Buttons**: Primary (solid background), Secondary (outline), sizes: base and lg

### Gamification Elements
- **Progress Bars**: Rounded, filled with gradient from Dark goldenrod to Earth Green
- **Achievement Badges**: Circular badges with icons, shadow effects
- **Carbon Credits Display**: Large prominent number with currency-style formatting
- **Leaderboards**: List cards with rank, avatar, name, and score

### Cards & Containers
- **Standard Card**: rounded-xl, shadow-sm, hover:shadow-md transition
- **Project Cards** (for environmental projects): Image top, content below, button at bottom
- **Recommendation Cards**: Icon left, text content, dismiss/action buttons right

### Icons
Use **Heroicons** (via CDN) for all interface icons - outline style for navigation, solid style for badges/emphasis

---

## Page Layouts

### Dashboard (Main)
- **Hero Stats Section**: 3-column grid showing Today's Carbon, Weekly Average, Monthly Total with large numbers and trend indicators
- **Chart Section**: Full-width line chart showing carbon footprint over the last 30 days
- **Quick Actions**: 2-column grid for "Log Activity" and "View AI Recommendations"
- **Recent Activity Feed**: List of recent tracked activities with icons and timestamps

### Track Activity
- **Category Tabs**: Transportation, Energy, Consumption (horizontal tab navigation)
- **Input Form**: Large, spaced-out form with icon-labeled sections
- **Calculation Preview**: Real-time carbon impact calculation as user inputs data

### AI Recommendations
- **Header**: "Personalized for You" with AI badge/icon
- **Recommendation Cards**: Stack of cards, each with icon, title, description, estimated CO2 savings, and "Apply" button
- **Impact Projection**: Chart showing projected savings if recommendations are followed

### Impact & Projects
- **Carbon Credits Balance**: Large hero number showing available credits
- **Projects Grid**: 2-column grid of environmental project cards with images, descriptions, funding progress bars
- **Community Impact**: Stats showing collective impact with celebratory visual treatment

### Profile
- **User Header**: Avatar, name, member since, total carbon reduced
- **Goals Section**: Progress toward carbon reduction goals
- **Achievement Gallery**: Grid of earned badges and achievements
- **Statistics**: Detailed breakdown of carbon savings by category

---

## Images

**Hero Image**: None - EcoTrace prioritizes data and functionality over decorative imagery

**Project Cards**: Real environmental project photos showing trees, renewable energy, conservation efforts (use placeholder service like Unsplash with nature/environment keywords)

**Achievement Badges**: Icon-based (not photographic) - use Heroicons or create simple SVG badges

**Empty States**: Simple illustrations (line art style) for "No activities yet", "No recommendations", etc.

---

## Interaction Patterns

**Hover States**: Subtle elevation increase (shadow-md to shadow-lg), slight scale transform (scale-105)

**Active States**: Slight depression effect, reduced opacity

**Transitions**: Use transition-all duration-200 for smooth interactions

**Loading States**: Skeleton loaders for data-heavy sections, spinner for actions

**Animations**: Minimal - only use for:
- Number count-up animations for stats
- Progress bar fill animations
- Success confirmations (checkmark animation)

---

## Responsive Breakpoints

- Mobile: < 768px (single column, bottom nav)
- Tablet: 768px - 1024px (2 columns, condensed sidebar)
- Desktop: > 1024px (3 columns, full sidebar)