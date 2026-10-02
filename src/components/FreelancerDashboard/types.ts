export interface Stats {
  profileViews?: number;
  activeProjects?: number;
  earnings?: number;
  pendingProposals?: number;
  newInvitations?: number;
  notifications?: number;
}

export interface Section {
  id: string;
  title: string;
  summary?: string;
}

export interface FreelancerDashboardProps {
  stats?: Stats;
  sections?: Section[];
}
