import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProposalsView from '../ProposalsView';
import { proposals } from '../mockData';

test('accepts a pending proposal', () => {
  render(<ProposalsView initial={proposals} />);

  // find a pending proposal
  const acceptBtn = screen.getAllByText(/Accept/i)[0];
  fireEvent.click(acceptBtn);

  // after clicking accept, the status text should show 'accepted'
  expect(screen.getAllByText(/accepted/i).length).toBeGreaterThan(0);
});
