Freelancer Dashboard React components

Files:
- FreelancerDashboard.tsx - Main dashboard component (composes Sidebar and main content)
- Sidebar.tsx - Sidebar list used by the dashboard
- styles.ts - styled-components used by the components
- types.ts - TypeScript prop and data types

Requirements:
- react, react-dom
- styled-components
- @types/styled-components (if using TypeScript with older versions)

Quick usage:

import React from 'react';
import ReactDOM from 'react-dom';
import { FreelancerDashboard } from './components/FreelancerDashboard';

const stats = {
  profileViews: 1240,
  activeProjects: 3,
  earnings: 8420.5,
  pendingProposals: 2,
  newInvitations: 1,
  notifications: 4,
};

const sections = [
  { id: 'profile', title: 'Professional Profile', summary: 'Skills, portfolio, resume and verification status' },
  { id: 'browse', title: 'Browse Jobs', summary: 'Search and filter jobs by skill, budget and rating' },
  { id: 'proposals', title: 'My Proposals', summary: 'Track pending, accepted and rejected proposals' },
];

ReactDOM.render(
  <FreelancerDashboard stats={stats} sections={sections} />,
  document.getElementById('root')
);

Integration notes:
- These components are intentionally presentational. Wire up navigation, data fetching, and interactions in your app (e.g., React Router, Redux/Context, or hooks).
- Customize styles.ts to match your design system.
- Add accessibility attributes and keyboard navigation if embedding into a production app.
