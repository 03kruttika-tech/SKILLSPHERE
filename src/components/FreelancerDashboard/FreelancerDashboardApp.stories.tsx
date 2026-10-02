import React from 'react';
import { Meta, Story } from '@storybook/react';
import FreelancerDashboardApp from './FreelancerDashboardApp';

export default {
  title: 'Freelancer/DashboardApp',
  component: FreelancerDashboardApp,
} as Meta;

const Template: Story = () => <FreelancerDashboardApp />;

export const Default = Template.bind({});
