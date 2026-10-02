import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BrowseJobs from '../BrowseJobs';
import { jobs } from '../mockData';

test('renders jobs and filters by title search', () => {
  render(<BrowseJobs jobs={jobs} />);
  expect(screen.getByText(/Browse Jobs/i)).toBeInTheDocument();
  const searchInput = screen.getByPlaceholderText(/Job title/i);
  fireEvent.change(searchInput, { target: { value: 'Project 2' } });
  expect(screen.getByText(/Project 2/i)).toBeInTheDocument();
});

test('filters jobs by skill', () => {
  render(<BrowseJobs jobs={jobs} />);
  const skillSelect = screen.getAllByDisplayValue('All')[0]; // Get Skill dropdown
  fireEvent.change(skillSelect, { target: { value: 'React' } });
  // After filtering by React, all visible jobs should be React jobs
  const titles = screen.getAllByText(/Frontend Developer/i);
  expect(titles.length).toBeGreaterThan(0);
});

test('shows clear filters button', () => {
  render(<BrowseJobs jobs={jobs} />);
  expect(screen.getByText(/Clear Filters/i)).toBeInTheDocument();
});

test('shows pagination controls', () => {
  render(<BrowseJobs jobs={jobs} />);
  expect(screen.getByText(/← Prev/i)).toBeInTheDocument();
  expect(screen.getByText(/Next →/i)).toBeInTheDocument();
});

test('displays job count and page info', () => {
  render(<BrowseJobs jobs={jobs} />);
  expect(screen.getByText(/jobs \• Page/i)).toBeInTheDocument();
});

