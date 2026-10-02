import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border: 1px solid #e9eef6;
  padding: 12px;
  border-radius: 8px;
`;

interface Props {
  initialProfile?: {
    name?: string;
    skills?: string[];
    hourlyRate?: number;
    availability?: string;
  };
  onSave?: (p: any) => void;
}

const ProfileEditor: React.FC<Props> = ({ initialProfile = {}, onSave }) => {
  const [name, setName] = useState(initialProfile.name ?? '');
  const [skillsText, setSkillsText] = useState((initialProfile.skills || []).join(', '));
  const [hourlyRate, setHourlyRate] = useState(initialProfile.hourlyRate ?? 0);
  const [availability, setAvailability] = useState(initialProfile.availability ?? '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const profile = {
      name,
      skills: skillsText.split(',').map((s) => s.trim()).filter(Boolean),
      hourlyRate: Number(hourlyRate),
      availability,
    };
    setSaved(true);
    onSave?.(profile);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <Card>
      <h4>Professional Profile</h4>
      <div style={{ display: 'grid', gap: 8 }}>
        <label>
          Name<br />
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Skills (comma separated)<br />
          <input value={skillsText} onChange={(e) => setSkillsText(e.target.value)} />
        </label>
        <label>
          Hourly Rate (USD)<br />
          <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} />
        </label>
        <label>
          Availability<br />
          <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Freelance">Freelance</option>
          </select>
        </label>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleSave}>Save profile</button>
          {saved && <span style={{ color: 'green' }}>Saved</span>}
        </div>
      </div>
    </Card>
  );
};

export default ProfileEditor;
