import React from 'react';
import { Meta, Story } from '@storybook/react';
import ProfileEditor from './ProfileEditor';
import { profile } from './mockData';

export default {
  title: 'Freelancer/ProfileEditor',
  component: ProfileEditor,
} as Meta;

const Template: Story = (args) => <ProfileEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialProfile: profile,
  onSave: (p: any) => console.log('Saved', p),
};
