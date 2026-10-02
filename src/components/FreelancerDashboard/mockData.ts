import { Stats, Section } from './types';

export const stats: Stats = {
  profileViews: 1240,
  activeProjects: 3,
  earnings: 8420.5,
  pendingProposals: 2,
  newInvitations: 1,
  notifications: 4,
};

export const sections: Section[] = [
  { id: 'profile', title: 'Professional Profile', summary: 'Skills, portfolio, resume and verification status' },
  { id: 'browse', title: 'Browse Jobs', summary: 'Search and filter jobs by skill, budget and rating' },
  { id: 'proposals', title: 'My Proposals', summary: 'Track pending, accepted and rejected proposals' },
];

export const jobs = Array.from({ length: 34 }).map((_, i) => ({
  id: `job-${i + 1}`,
  title: `Frontend Developer - Project ${i + 1}`,
  skill: ['React', 'Vue', 'Angular', 'Node'][i % 4],
  budget: 200 + (i % 10) * 50,
  clientRating: (Math.round((3 + (i % 3) + Math.random()) * 10) / 10),
  location: ['Remote', 'USA', 'India', 'Europe'][i % 4],
  category: ['Web', 'Mobile', 'Design'][i % 3],
}));

export const proposals = [
  { id: 'p1', jobTitle: 'Landing Page Design', status: 'pending', bid: 450, deliveryDays: 7 },
  { id: 'p2', jobTitle: 'React SPA', status: 'accepted', bid: 1200, deliveryDays: 14 },
  { id: 'p3', jobTitle: 'API Integration', status: 'rejected', bid: 600, deliveryDays: 10 },
];

export const profile = {
  name: 'Alex Freelancer',
  skills: ['React', 'TypeScript', 'GraphQL'],
  hourlyRate: 45,
  availability: 'Part-time',
};
