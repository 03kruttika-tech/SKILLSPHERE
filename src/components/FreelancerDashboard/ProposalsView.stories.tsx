import React from 'react';
import { Meta, Story } from '@storybook/react';
import ProposalsView from './ProposalsView';
import { proposals } from './mockData';

export default {
  title: 'Freelancer/ProposalsView',
  component: ProposalsView,
} as Meta;

const Template: Story = (args) => <ProposalsView {...args} />;

export const Default = Template.bind({});
Default.args = {
  initial: proposals,
};
