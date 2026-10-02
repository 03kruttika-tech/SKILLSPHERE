import React from 'react';
import { Container, Main, Header, StatsGrid, StatCard, Sections, SectionCard } from './styles';
import Sidebar from './Sidebar';
import { FreelancerDashboardProps } from './types';

const FreelancerDashboard: React.FC<FreelancerDashboardProps> = ({
  stats = {},
  sections = [],
}) => {
  return (
    <Container>
      <Sidebar />
      <Main>
        <Header>
          <h1>Freelancer Dashboard</h1>
        </Header>

        <StatsGrid>
          <StatCard>
            <h3>Profile Views</h3>
            <p>{stats.profileViews ?? 0}</p>
          </StatCard>

          <StatCard>
            <h3>Active Projects</h3>
            <p>{stats.activeProjects ?? 0}</p>
          </StatCard>

          <StatCard>
            <h3>Earnings</h3>
            <p>${(stats.earnings ?? 0).toFixed(2)}</p>
          </StatCard>

          <StatCard>
            <h3>Pending Proposals</h3>
            <p>{stats.pendingProposals ?? 0}</p>
          </StatCard>

          <StatCard>
            <h3>New Invitations</h3>
            <p>{stats.newInvitations ?? 0}</p>
          </StatCard>

          <StatCard>
            <h3>Notifications</h3>
            <p>{stats.notifications ?? 0}</p>
          </StatCard>
        </StatsGrid>

        <Sections>
          {sections.length === 0 ? (
            <SectionCard>
              <h4>No sections configured</h4>
              <p>Pass a sections prop to render the dashboard sections (Profile, Jobs, Projects, etc.).</p>
            </SectionCard>
          ) : (
            sections.map((s) => (
              <SectionCard key={s.id}>
                <h4>{s.title}</h4>
                <p>{s.summary}</p>
              </SectionCard>
            ))
          )}
        </Sections>
      </Main>
    </Container>
  );
};

export default FreelancerDashboard;
