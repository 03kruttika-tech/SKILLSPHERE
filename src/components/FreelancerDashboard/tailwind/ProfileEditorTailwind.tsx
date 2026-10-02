import React, { useState } from 'react';

interface Props {
  initialProfile?: {
    name?: string;
    skills?: string[];
    hourlyRate?: number;
    availability?: string;
  };
  onSave?: (p: any) => void;
}

const ProfileEditorTailwind: React.FC<Props> = ({ initialProfile = {}, onSave }) => {
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
    <div className="bg-white border border-gray-200 p-3 rounded-lg">
      <h4 className="text-lg font-semibold mb-3">Professional Profile</h4>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <input
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Skills (comma separated)</span>
          <input
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500"
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Hourly Rate (USD)</span>
          <input
            type="number"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Availability</span>
          <select
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Freelance">Freelance</option>
          </select>
        </label>

        <div className="flex gap-2 pt-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            onClick={handleSave}
          >
            Save profile
          </button>
          {saved && <span className="text-green-600 text-sm">Saved</span>}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditorTailwind;
