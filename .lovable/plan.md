
# Glassmorphism Theme with Light/Dark Toggle

This plan transforms the entire website from the current dark-only developer theme to a glassmorphism aesthetic with bright, light colors as the default, plus a toggle to switch between light and dark modes.

## What is Glassmorphism?
A modern design trend featuring frosted-glass-like surfaces with background blur, semi-transparent backgrounds, subtle borders, and soft shadows. Combined with bright, vibrant accent colors.

---

## Changes Overview

### 1. Theme Provider Setup
- Create a new `ThemeProvider` component using `next-themes` (already installed) to manage light/dark mode state
- Wrap the app in `ThemeProvider` in `App.tsx`
- Add the `dark` class toggling to the `<html>` element

### 2. CSS Variables Overhaul (`src/index.css`)
- Define **two complete sets of CSS variables**: one for light mode (`:root`) and one for dark mode (`.dark`)
- **Light mode (default)**: Bright whites, soft grays, vibrant accent colors, translucent glass surfaces
- **Dark mode**: Refined dark backgrounds (similar to current theme but updated for glassmorphism)
- Update the `.glass` utility class for both modes with proper backdrop-blur and semi-transparent backgrounds
- Update gradients, shadows, and glow effects to work in both modes
- Update heatmap colors for both modes

### 3. Light Mode Color Palette
- Background: Clean white / soft off-white (`hsl(220, 20%, 97%)`)
- Cards/Glass: White with 60-70% opacity + blur
- Primary accent: Vibrant blue-cyan (kept from current)
- Text: Dark charcoal for readability
- Borders: Light gray with low opacity
- Shadows: Soft, colored shadows instead of dark ones

### 4. Theme Toggle Button
- Add a Sun/Moon icon toggle button in the Navbar and platform page headers
- Smooth icon transition animation between states
- Persist user preference via localStorage (handled by `next-themes`)

### 5. Files to Modify

**New file:**
- `src/components/ThemeToggle.tsx` -- Sun/Moon toggle button component

**Modified files:**
- `src/index.css` -- Add light mode variables as default, move dark variables under `.dark`, update glass/glow utilities
- `tailwind.config.ts` -- Ensure `darkMode: ["class"]` is set (already done)
- `src/App.tsx` -- Wrap with ThemeProvider
- `src/components/Navbar.tsx` -- Add ThemeToggle button
- `src/pages/CoverPage.tsx` -- Update background effects, glass elements, and text colors to use theme-aware classes
- `src/pages/Dashboard.tsx` -- Minor: already uses `bg-background`, should work
- `src/pages/platforms/LeetCodePage.tsx` -- Update hardcoded dark heatmap colors to theme-aware values, update header
- `src/pages/platforms/CodeforcesPage.tsx` -- Add ThemeToggle to header
- `src/pages/platforms/GFGPage.tsx` -- Add ThemeToggle to header
- `src/pages/platforms/CodeChefPage.tsx` -- Add ThemeToggle to header
- `src/pages/platforms/HackerRankPage.tsx` -- Add ThemeToggle to header
- `src/pages/platforms/AtCoderPage.tsx` -- Add ThemeToggle to header
- `src/components/PlatformStats.tsx` -- Update `bg-gradient-card` usage to theme-aware
- `src/components/Heatmap.tsx` -- Update heatmap cell colors for light mode
- `src/components/ContributionHeatmap.tsx` -- Update heatmap cell colors for light mode
- `src/components/ContactBalloons.tsx` -- Update gooey button gradient for light mode compatibility
- `src/components/Footer.tsx` -- Uses theme variables, minimal changes
- `src/components/CTASection.tsx` -- Uses glass/theme classes, minimal changes
- `src/components/TopicBreakdown.tsx` -- Uses glass/theme classes, minimal changes
- `src/components/RatingChart.tsx` -- Uses glass/theme classes, minimal changes
- `src/components/ContestTracker.tsx` -- Uses glass/theme classes, minimal changes
- `src/components/LeetCodeContestSection.tsx` -- Uses glass/theme classes, minimal changes
- `src/components/GFG160Tracker.tsx` -- Uses glass/theme classes, minimal changes
- `src/components/Awards.tsx` -- Uses glass/theme classes, minimal changes
- `index.html` -- Add `class="light"` as default or let next-themes handle it

---

## Technical Details

### Light Mode CSS Variables (new defaults in `:root`)

```text
--background: 220 20% 97%        (soft off-white)
--foreground: 222 47% 11%        (dark charcoal)
--card: 0 0% 100%                (white)
--card-foreground: 222 47% 11%
--primary: 190 95% 42%           (vibrant cyan)
--secondary: 220 14% 92%         (light gray)
--muted: 220 14% 90%
--muted-foreground: 220 9% 46%
--border: 220 13% 88%
--input: 220 13% 90%
```

### Dark Mode Variables (under `.dark`)
Current variables moved here with minor refinements for glass effects.

### Glass Utility Updates
```text
/* Light mode glass */
.glass {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}

/* Dark mode glass */
.dark .glass {
  background: hsl(222 47% 10% / 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid hsl(222 30% 20% / 0.5);
}
```

### ThemeToggle Component
Simple button with Sun/Moon icons from lucide-react, uses `useTheme()` from next-themes to toggle between "light" and "dark".

### Hardcoded Color Fixes
- LeetCode heatmap uses hardcoded hex colors (`#161b22`, `#0e4429`, etc.) -- these will be updated to use CSS variables or conditional classes for light/dark
- `text-gradient` will get light-mode-friendly gradient colors
- Background blur/glow effects on CoverPage will be adjusted for visibility in light mode

### Platform Page Headers
Each platform page has its own sticky header. A shared pattern will add the ThemeToggle button next to existing navigation buttons.
