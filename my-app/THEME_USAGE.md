# Theme System Usage Guide

The app now has a centralized theme system located in `lib/theme.ts` that provides consistent styling across all components.

## Quick Start

### Import the theme

```typescript
import { theme, getButtonClasses, getCardClasses, getAgentGradient } from "@/lib/theme";
```

## Theme Structure

### Colors

```typescript
// Background colors
theme.colors.background.primary      // bg-black
theme.colors.background.secondary    // bg-gray-950
theme.colors.background.tertiary     // bg-gray-900
theme.colors.background.hover        // hover:bg-gray-900
theme.colors.background.card         // bg-black

// Border colors
theme.colors.border.primary          // border-gray-900
theme.colors.border.secondary        // border-gray-800
theme.colors.border.hover            // hover:border-gray-800

// Text colors
theme.colors.text.primary            // text-white
theme.colors.text.secondary          // text-gray-300
theme.colors.text.tertiary           // text-gray-400
theme.colors.text.muted              // text-gray-500

// Status colors (each has bg, text, border)
theme.colors.status.success          // green
theme.colors.status.error            // red
theme.colors.status.warning          // yellow
theme.colors.status.info             // blue
theme.colors.status.inactive         // gray
```

### Typography

```typescript
theme.typography.h1      // text-3xl font-bold
theme.typography.h2      // text-2xl font-bold
theme.typography.h3      // text-xl font-semibold
theme.typography.h4      // text-lg font-semibold
theme.typography.body    // text-sm
theme.typography.small   // text-xs
```

### Other

```typescript
theme.spacing            // p-2, p-4, p-6, p-8, p-12
theme.rounded            // rounded, rounded-md, rounded-lg, etc.
theme.transition         // transition-all duration-*
```

## Helper Functions

### Get Button Classes

```typescript
// Primary button (blue)
getButtonClasses('primary')
// Returns: "px-4 py-2 rounded-md font-medium transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white"

// Secondary button (gray)
getButtonClasses('secondary')
// Returns: "px-4 py-2 rounded-md font-medium transition-all duration-300 bg-gray-800 hover:bg-gray-700 text-gray-300"

// Danger button (red)
getButtonClasses('danger')
```

**Usage:**
```tsx
<button className={getButtonClasses('primary')}>
  Click Me
</button>
```

### Get Card Classes

```typescript
getCardClasses()
// Returns: "bg-black border-gray-900 border rounded-lg transition-all duration-300 hover:border-gray-800"
```

**Usage:**
```tsx
<div className={getCardClasses()}>
  Card content
</div>
```

### Get Agent Gradient

```typescript
getAgentGradient('EMAIL')           // "from-blue-500 to-blue-600"
getAgentGradient('NOTIFIER')        // "from-green-500 to-green-600"
getAgentGradient('PROPOSAL_GENERATOR') // "from-purple-500 to-purple-600"
getAgentGradient('SCRAPER')         // "from-orange-500 to-orange-600"
```

**Usage:**
```tsx
<div className={`bg-gradient-to-br ${getAgentGradient(agent.type)}`}>
  Icon
</div>
```

## Common Patterns

### Card with Header

```tsx
<div className={getCardClasses()}>
  <div className={theme.spacing.md}>
    <h3 className={`${theme.typography.h3} ${theme.colors.text.primary}`}>
      Card Title
    </h3>
    <p className={`${theme.typography.body} ${theme.colors.text.tertiary}`}>
      Card description
    </p>
  </div>
</div>
```

### Status Badge

```tsx
<div className={`
  px-2.5 py-1 
  ${theme.rounded.full} 
  ${theme.typography.small} 
  ${theme.colors.status.success.bg} 
  ${theme.colors.status.success.text}
  font-medium
`}>
  Active
</div>
```

### Interactive List Item

```tsx
<div className={`
  flex items-center gap-2 
  px-2 py-1.5 
  ${theme.rounded.md} 
  ${theme.colors.background.hover} 
  ${theme.transition.normal}
  cursor-pointer 
  ${theme.colors.text.tertiary}
`}>
  <Icon className="w-4 h-4" />
  <span>List Item</span>
</div>
```

### Button with Icon

```tsx
<button className={`flex items-center gap-2 ${getButtonClasses('primary')}`}>
  <Icon className="w-4 h-4" />
  <span>Button Text</span>
</button>
```

### Input Field

```tsx
<input 
  className={`
    ${theme.spacing.sm} 
    ${theme.rounded.md} 
    ${theme.colors.background.tertiary} 
    ${theme.colors.border.primary} 
    border
    ${theme.colors.text.primary}
    focus:${theme.colors.border.secondary}
    ${theme.transition.fast}
  `}
  placeholder="Enter text..."
/>
```

## Using with Existing Components

### AgentManager Component
Already implemented with theme system. Reference this component for examples.

### Dashboard Page
Simplified to use consistent black/gray theme. The light/dark toggle is preserved but currently only shows dark theme styling.

## Applying to Other Pages

### Inbox Page

```tsx
import { theme, getCardClasses } from "@/lib/theme";

export default function InboxPage() {
  return (
    <div className={`min-h-screen ${theme.colors.background.primary} ${theme.colors.text.primary}`}>
      {/* Content */}
    </div>
  );
}
```

### Projects Page

```tsx
import { theme, getButtonClasses } from "@/lib/theme";

export default function ProjectsPage() {
  return (
    <button className={getButtonClasses('primary')}>
      Create new project
    </button>
  );
}
```

## CSS Variables

Global CSS variables are also defined in `globals.css`:

```css
:root {
  --background: #000000;
  --foreground: #ffffff;
  --background-secondary: #0a0a0a;
  --border-primary: #1a1a1a;
  --border-secondary: #262626;
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
  --text-tertiary: #9ca3af;
  --text-muted: #6b7280;
}
```

Use these in custom CSS:
```css
.custom-class {
  background: var(--background);
  color: var(--text-primary);
  border-color: var(--border-primary);
}
```

## Best Practices

1. **Use helper functions** for common patterns (buttons, cards)
2. **Be consistent** with spacing and rounded corners
3. **Use theme.transition** for all interactive elements
4. **Apply status colors** consistently (success=green, error=red, etc.)
5. **Keep typography hierarchy** clear (h1 > h2 > h3 > body > small)

## Migration Checklist

To migrate an existing component to use the theme:

- [ ] Import theme utilities
- [ ] Replace hardcoded colors with theme colors
- [ ] Use typography classes for text
- [ ] Apply consistent spacing
- [ ] Use helper functions for buttons/cards
- [ ] Add transitions to interactive elements
- [ ] Test hover states
- [ ] Verify status colors are consistent

## Example: Before & After

### Before
```tsx
<button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
  Click Me
</button>
```

### After
```tsx
<button className={getButtonClasses('primary')}>
  Click Me
</button>
```

Much cleaner and consistent!

## Support

For questions or to add new theme utilities, edit `lib/theme.ts` and update this documentation.

