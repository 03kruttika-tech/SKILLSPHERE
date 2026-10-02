import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileEditor from '../ProfileEditor';

test('edits profile and triggers onSave', () => {
  const onSave = jest.fn();
  render(<ProfileEditor initialProfile={{ name: 'Sam', skills: ['A'], hourlyRate: 10, availability: 'Part-time' }} onSave={onSave} />);

  const nameInput = screen.getByDisplayValue('Sam');
  fireEvent.change(nameInput, { target: { value: 'Samuel' } });

  const saveButton = screen.getByText(/Save profile/i);
  fireEvent.click(saveButton);

  expect(onSave).toHaveBeenCalled();
});
