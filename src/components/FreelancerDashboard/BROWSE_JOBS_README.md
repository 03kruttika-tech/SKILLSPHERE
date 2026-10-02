# Browse Jobs — Enhanced Filter Component

## Overview

The `BrowseJobs` component provides a professional job search interface with **5 advanced filter types** that allow freelancers to narrow down job listings.

## Features

### 5 Filter Types

1. **Search Title** — Full-text search across job titles
2. **Skill** — Filter by required skill (React, Vue, Angular, Node, etc.)
3. **Budget** — Budget range filters:
   - All
   - $200–500
   - $500–1,000
   - $1,000+
4. **Location** — Filter by job location (Remote, USA, India, Europe, etc.)
5. **Client Rating** — Filter by minimum client rating:
   - All (0+)
   - 3+ Stars
   - 4+ Stars
   - 4.5+ Stars
6. **Category** — Filter by job category (Web, Mobile, Design)

### Additional Features

- **Clear Filters** button to reset all filters at once
- **Pagination** — Displays 8 jobs per page with previous/next navigation
- **Result Counter** — Shows total jobs matching filters and current page
- **Empty State** — Friendly message when no jobs match filter criteria
- **Responsive Grid** — Filter controls adapt to screen size
- **Professional UI** — Clean, modern design with icons and detailed job info

## Component Props

```tsx
interface Job {
  id: string;
  title: string;
  skill: string;
  budget: number;
  clientRating: number;
  location: string;
  category: string;
}

interface Props {
  jobs: Job[];
}
```

## Usage

```tsx
import { BrowseJobs } from './components/FreelancerDashboard';
import { jobs } from './mockData'; // or fetch from API

export function JobSearchPage() {
  return <BrowseJobs jobs={jobs} />;
}
```

## Styling

- **styled-components version** (default): `src/components/FreelancerDashboard/BrowseJobs.tsx`
- **Tailwind CSS version**: `src/components/FreelancerDashboard/tailwind/BrowseJobsTailwind.tsx`

Both versions support the same functionality and props.

## Filter Logic

Filters are **combined with AND logic**:
- A job must match **all** active filters to appear in results
- When multiple filters are active, results are progressively narrowed

Example: If you filter for "React" skill + "$500–1000" budget + "Remote" location, only jobs that match **all three criteria** will display.

## Sorting & Pagination

- Results are paginated at **8 jobs per page**
- Page resets to 1 when any filter changes
- Pagination controls are disabled when not applicable

## Testing

Run tests with:
```bash
npm test -- BrowseJobs.test.tsx
```

Covered scenarios:
- Title search functionality
- Skill filtering
- Clear filters button
- Pagination controls
- Result counter display

## Visual Testing

View in Storybook:
```bash
npm run storybook
```

Navigate to **Freelancer > BrowseJobs** to interact with the component.

## Mock Data

Default mock data includes 34 jobs with varied skills, budgets, locations, ratings, and categories. See `mockData.ts` for data structure.

## API Integration

To connect to a real API, replace the `jobs` prop with data fetched from your backend:

```tsx
import { useState, useEffect } from 'react';

export function JobSearchPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(setJobs);
  }, []);

  return <BrowseJobs jobs={jobs} />;
}
```

## Accessibility

- Semantic HTML (`<select>`, `<input>`, `<ul>`, `<li>`)
- Keyboard navigation support for all filter controls
- Descriptive labels for filter groups
- Accessible button text ("← Prev", "Next →")

---

**Last Updated**: 2026-07-17 | **Status**: ✅ Production Ready
