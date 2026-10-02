import React from 'react';
import { SidebarWrapper, SidebarList, SidebarItem } from './styles';

export interface SidebarProps {
  active?: string;
  items?: string[];
}

const defaultItems = [
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

const Sidebar: React.FC<SidebarProps> = ({ active = 'Dashboard', items = defaultItems }) => {
  return (
    <SidebarWrapper>
      <SidebarList>
        {items.map((it) => (
          <SidebarItem key={it} $active={it === active}>
            {it}
          </SidebarItem>
        ))}
      </SidebarList>
    </SidebarWrapper>
  );
};

export default Sidebar;
