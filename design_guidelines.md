# Design Guidelines: Voice Recording & Transcription Web App

## Design Approach

**Selected Approach:** Hybrid - Drawing inspiration from Linear's clean productivity aesthetics combined with Notion's content-focused layouts and Spotify's audio interface patterns.

**Design Principles:**
- Clarity over decoration: Every element serves a functional purpose
- Audio-first experience: Recording controls are immediately accessible and intuitive
- Trust through transparency: Privacy states are unmistakably clear
- Progressive disclosure: Advanced features don't overwhelm initial use

---

## Typography System

**Font Stack:**
- Primary: Inter (Google Fonts) - body text, UI elements, transcriptions
- Accent: Space Grotesk (Google Fonts) - headings, stats, badges

**Hierarchy:**
- Hero/Page Titles: Space Grotesk, 3xl to 5xl, font-bold
- Section Headers: Space Grotesk, 2xl to 3xl, font-semibold
- Card Titles: Inter, lg to xl, font-semibold
- Body Text: Inter, base, font-normal
- Metadata/Labels: Inter, sm, font-medium
- Captions/Timestamps: Inter, xs to sm, font-normal

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Tight spacing: p-2, gap-2 (badges, inline elements)
- Standard spacing: p-4, gap-4, m-4 (cards, form fields)
- Section spacing: py-8, py-12, py-16 (between major sections)
- Page margins: px-4 md:px-8 lg:px-12

**Grid System:**
- Desktop: Two-column layout (sidebar + main content area)
- Tablet: Single column with floating action button for recording
- Mobile: Full-width single column, bottom navigation

**Container Widths:**
- Sidebar: Fixed 280px on desktop
- Main content: max-w-4xl centered
- Recording cards: Full width within container
- Modal overlays: max-w-2xl

---

## Core Component Library

### 1. Navigation & Layout

**Sidebar (Desktop):**
- Fixed left sidebar with app branding at top
- Navigation items: All Recordings, Streaks, Settings
- Streak counter widget showing current streak with visual indicator
- New Recording primary button (prominent, full-width)

**Top Bar (Mobile/Tablet):**
- App logo/name on left
- Streak count badge in center
- Profile/settings icon on right
- Floating action button (FAB) for new recording in bottom-right corner

### 2. Recording Interface

**Recording Modal/Popup:**
- Centered overlay with subtle backdrop blur
- Large circular recording button as focal point (120px-150px diameter)
- Waveform visualization beneath button (animated during recording)
- Timer display above button
- Optional title input field at top (clean text input with subtle border)
- Tag selection buttons below (4 preset chips: Personal, Journal, Politics, Cinema)
- Private mode toggle switch at bottom with clear label
- Save/Cancel buttons in footer

**Private Mode Indicators:**
- Entire modal border treatment changes (dashed or double border)
- Lock icon appears next to title
- Background receives subtle pattern overlay
- Toggle switch clearly shows "Private" state
- Confirmation message: "This recording will be saved locally"

### 3. Recording Cards/List View

**Card Structure:**
- Full-width cards with 16px vertical spacing
- Top section: Title (bold, larger) + timestamp + tag badges + private indicator
- Middle section: Transcription preview (truncated at 3 lines with "Read more" expansion)
- Summary section: AI-generated brief (italic, slightly smaller) + 3 bullet points (compact list)
- Bottom action bar: Play button, Share button, Delete button (icon-based, evenly spaced)

**Card Layout Variations:**
- Recent recordings: Larger cards with full summary visible
- Archived/older: Compact view with summary collapsed by default
- Empty state: Centered illustration + encouraging message to create first recording

### 4. Streak & Gamification

**Streak Counter Widget:**
- Prominent number display (current streak count, large bold font)
- Flame/fire icon next to number
- Progress bar showing days until next milestone
- Badge tier display (Bronze/Silver/Gold/Platinum) with color-coded borders

**Badge System:**
- Circular badge icons (48px-64px)
- Tier progression: 3-day (Bronze), 7-day (Silver), 14-day (Gold), 30-day (Platinum), 60-day (Diamond)
- Badge collection gallery in dedicated streak page
- Locked badges shown in greyscale with unlock requirements

**Streak Page Layout:**
- Hero section with current streak stat prominently displayed
- Calendar heatmap showing recording activity (GitHub-style contribution graph)
- Badge gallery grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Motivational message encouraging daily recording

### 5. Social Sharing

**Share Modal:**
- Preview card showing formatted transcription
- Platform selection buttons (Threads, X/Twitter) with brand icons
- Character count indicator for each platform
- Formatted transcription text area (editable before sharing)
- Copy to clipboard button
- Direct share buttons calling platform APIs

**Share Format:**
- Header: "🎙️ Voice Recording Summary"
- Brief (1-2 sentences)
- Bullet points formatted with emoji bullets
- Footer: App branding/attribution (small, unobtrusive)

### 6. Form Elements

**Input Fields:**
- Clean rectangular inputs with rounded corners (rounded-md)
- Border treatment: thin border with focus state enhancement
- Label above input (sm font, medium weight)
- Placeholder text in muted styling

**Tag Chips:**
- Rounded-full pill shape
- Unselected: transparent with border
- Selected: filled background
- Icon prefix for each category (emoji or Heroicons)

**Toggles/Switches:**
- iOS-style toggle switches
- Clear on/off states with smooth transition
- Label positioned to left of toggle

### 7. Buttons

**Primary Actions:**
- Large rounded buttons (rounded-lg)
- Generous padding (px-6 py-3)
- Font-semibold text
- Icon + text combinations where appropriate

**Secondary Actions:**
- Outlined style with transparent background
- Same size as primary for consistency
- Icon-only variants for action bars

**Icon Buttons:**
- Square aspect ratio with padding
- Circular hover state
- Tooltips on hover for clarity

---

## Animation Guidelines

**Minimal and Purposeful:**
- Recording button pulse during active recording (subtle, 2-second cycle)
- Waveform real-time visualization (smooth, responsive to audio input)
- Fade-in for modal overlays (200ms duration)
- Smooth transitions for badge unlocks (celebratory but brief)
- NO scroll-triggered animations
- NO decorative hover effects beyond standard button states

---

## Icons

**Icon Library:** Heroicons (CDN)
- Microphone: Mic icon
- Tags: Tag icon
- Share: Share icon
- Streak: Fire icon
- Privacy: Lock-closed icon
- Play: Play icon
- Delete: Trash icon
- Settings: Cog-6-tooth icon
- Calendar: Calendar icon

---

## Images

**Hero Section:** NO large hero image - this is a utility app focused on immediate functionality

**Empty States:**
- Custom illustration: Simple line drawing of microphone or waveform (300px-400px max)
- Placed centered above empty state message
- Style: Minimalist, single-weight line art

**Badge Icons:**
- Use emoji or simple geometric shapes with Heroicons
- NO photographic images needed

---

## Responsive Breakpoints

- Mobile: < 640px (single column, bottom nav, FAB)
- Tablet: 640px - 1024px (single column, top bar)
- Desktop: > 1024px (sidebar + main content)

**Mobile Optimizations:**
- Recording button scales to fill most of viewport during active recording
- Cards stack fully with increased vertical spacing
- Tag chips wrap gracefully
- Share modal becomes full-screen drawer from bottom

---

## Accessibility

- Focus indicators on all interactive elements
- ARIA labels for icon-only buttons
- Keyboard navigation support (Tab, Enter, Escape)
- Screen reader announcements for recording state changes
- Sufficient contrast ratios (to be validated with chosen colors)
- Touch targets minimum 44px × 44px on mobile