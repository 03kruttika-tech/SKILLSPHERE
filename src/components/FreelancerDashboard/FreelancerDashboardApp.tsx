import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Container, Main, Header, StatsGrid, StatCard, Sections, SectionCard } from './styles';
import BrowseJobs from './BrowseJobs';
import ProfileEditor from './ProfileEditor';
import ProposalsView from './ProposalsView';
import { stats as demoStats, sections as demoSections, jobs as demoJobs, proposals as demoProposals, profile as demoProfile } from './mockData';

const PlaceholderSection = ({ title }: { title: string }) => (
  <div style={{ background: '#fff', border: '1px solid #e9eef6', padding: 12, borderRadius: 8 }}>
    <h4>{title}</h4>
    <p style={{ color: '#6b7280', fontSize: 13 }}>This section is a placeholder. Implement detailed features here.</p>
  </div>
);

const sidebarItems = [
  'Dashboard',
  'My Profile',
  'Portfolio',
  'Browse Jobs',
  'My Proposals',
  'Projects',
  'Availability',
  'Messages',
  'Earnings',
  'Analytics',
  'Reviews',
  'Notifications',
  'Settings',
];

const FreelancerDashboardApp: React.FC = () => {
  const [active, setActive] = useState<string>('Dashboard');

  return (
    <Container>
      <div style={{ width: 220 }}>
        <Sidebar active={active} items={sidebarItems} />
      </div>
      <Main onClick={(e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'LI') {
          const itemText = target.textContent;
          if (itemText && sidebarItems.includes(itemText)) {
            setActive(itemText);
          }
        }
      }}>
        <Header>
          <h1>Freelancer Dashboard</h1>
        </Header>

        {/* Dashboard */}
        {active === 'Dashboard' && (
          <>
            <StatsGrid>
              <StatCard>
                <h3>Profile Views</h3>
                <p>{demoStats.profileViews}</p>
              </StatCard>

              <StatCard>
                <h3>Active Projects</h3>
                <p>{demoStats.activeProjects}</p>
              </StatCard>

              <StatCard>
                <h3>Earnings</h3>
                <p>${demoStats.earnings.toFixed(2)}</p>
              </StatCard>

              <StatCard>
                <h3>Pending Proposals</h3>
                <p>{demoStats.pendingProposals}</p>
              </StatCard>

              <StatCard>
                <h3>New Invitations</h3>
                <p>{demoStats.newInvitations}</p>
              </StatCard>

              <StatCard>
                <h3>Notifications</h3>
                <p>{demoStats.notifications}</p>
              </StatCard>
            </StatsGrid>

            <Sections>
              {demoSections.map((s) => (
                <SectionCard key={s.id}>
                  <h4>{s.title}</h4>
                  <p>{s.summary}</p>
                  <div style={{ marginTop: 8 }}>
                    <button onClick={() => {
                      if (s.title === 'Professional Profile') setActive('My Profile');
                      else if (s.title === 'Browse Jobs') setActive('Browse Jobs');
                      else if (s.title === 'My Proposals') setActive('My Proposals');
                    }}>
                      Open
                    </button>
                  </div>
                </SectionCard>
              ))}
            </Sections>
          </>
        )}

        {/* My Profile */}
        {active === 'My Profile' && (
          <ProfileEditor initialProfile={demoProfile} onSave={(p) => console.log('Profile saved', p)} />
        )}

        {/* Portfolio */}
        {active === 'Portfolio' && (
          <PlaceholderSection title="Portfolio" />
        )}

        {/* Browse Jobs */}
        {active === 'Browse Jobs' && (
          <BrowseJobs jobs={demoJobs} />
        )}

        {/* My Proposals */}
        {active === 'My Proposals' && (
          <ProposalsView initial={demoProposals} />
        )}

        {/* Projects */}
        {active === 'Projects' && (
          <PlaceholderSection title="Active Projects" />
        )}

        {/* Availability */}
        {active === 'Availability' && (
          <PlaceholderSection title="Availability Scheduler" />
        )}

        {/* Messages */}
        {active === 'Messages' && (
          <PlaceholderSection title="Chat & Messages" />
        )}

        {/* Earnings */}
        {active === 'Earnings' && (
          <PlaceholderSection title="Earnings & Payments" />
        )}

        {/* Analytics */}
        {active === 'Analytics' && (
          <PlaceholderSection title="Analytics & Reports" />
        )}

        {/* Reviews */}
        {active === 'Reviews' && (
          <PlaceholderSection title="Client Reviews & Ratings" />
        )}

        {/* Notifications */}
        {active === 'Notifications' && (
          <PlaceholderSection title="Notifications" />
        )}

        {/* Settings */}
        {active === 'Settings' && (
          <PlaceholderSection title="Account Settings" />
        )}
      </Main>
    </Container>
  );
};

export default FreelancerDashboardApp;
