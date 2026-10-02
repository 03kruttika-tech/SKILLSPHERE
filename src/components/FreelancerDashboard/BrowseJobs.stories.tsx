import React from 'react';
import { Meta, Story } from '@storybook/react';
import BrowseJobs, { Job } from './BrowseJobs';
import { jobs } from './mockData';

export default {
  title: 'Freelancer/BrowseJobs',
  component: BrowseJobs,
  parameters: {
    docs: {
      description: {
        component: 'Advanced job search and filtering component with support for 5 filter types: Skill, Budget, Location, Client Rating, and Category.',
      },
    },
  },
} as Meta;

const Template: Story<{ jobs: Job[] }> = (args) => <BrowseJobs {...args} />;

export const Default = Template.bind({});
Default.args = {
  jobs,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Browse jobs with filters for skill, budget range, location, client rating, and category. Includes full-text search and pagination.',
    },
  },
};

