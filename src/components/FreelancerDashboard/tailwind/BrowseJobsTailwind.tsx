import React, { useMemo, useState } from 'react';
import { Job } from '../BrowseJobs';

interface Props {
  jobs: Job[];
}

const PAGE_SIZE = 8;

const BrowseJobsTailwind: React.FC<Props> = ({ jobs }) => {
  const [searchTitle, setSearchTitle] = React.useState('');
  const [filterSkill, setFilterSkill] = React.useState('All');
  const [filterBudget, setFilterBudget] = React.useState('All');
  const [filterLocation, setFilterLocation] = React.useState('All');
  const [filterRating, setFilterRating] = React.useState('All');
  const [filterCategory, setFilterCategory] = React.useState('All');
  const [page, setPage] = React.useState(1);

  const uniqueSkills = useMemo(() => ['All', ...Array.from(new Set(jobs.map((j) => j.skill)))], [jobs]);
  const uniqueLocations = useMemo(() => ['All', ...Array.from(new Set(jobs.map((j) => j.location)))], [jobs]);
  const uniqueCategories = useMemo(() => ['All', ...Array.from(new Set(jobs.map((j) => j.category)))], [jobs]);

  const budgetRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: '$200-500', min: 200, max: 500 },
    { label: '$500-1000', min: 500, max: 1000 },
    { label: '$1000+', min: 1000, max: Infinity },
  ];

  const ratingRanges = [
    { label: 'All', min: 0 },
    { label: '3+ Stars', min: 3 },
    { label: '4+ Stars', min: 4 },
    { label: '4.5+ Stars', min: 4.5 },
  ];

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (searchTitle && !j.title.toLowerCase().includes(searchTitle.toLowerCase())) return false;
      if (filterSkill !== 'All' && j.skill !== filterSkill) return false;
      if (filterLocation !== 'All' && j.location !== filterLocation) return false;
      if (filterCategory !== 'All' && j.category !== filterCategory) return false;
      const budgetRange = budgetRanges.find((r) => r.label === filterBudget);
      if (budgetRange && (j.budget < budgetRange.min || j.budget > budgetRange.max)) return false;
      const ratingRange = ratingRanges.find((r) => r.label === filterRating);
      if (ratingRange && j.clientRating < ratingRange.min) return false;
      return true;
    });
  }, [jobs, searchTitle, filterSkill, filterLocation, filterCategory, filterBudget, filterRating]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetFilters = () => {
    setSearchTitle('');
    setFilterSkill('All');
    setFilterBudget('All');
    setFilterLocation('All');
    setFilterRating('All');
    setFilterCategory('All');
    setPage(1);
  };

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg">
      <h4 className="text-lg font-semibold mb-4">Browse Jobs</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase">Search Title</label>
          <input
            type="text"
            placeholder="Job title..."
            className="px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            value={searchTitle}
            onChange={(e) => { setSearchTitle(e.target.value); setPage(1); }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase">Skill</label>
          <select
            className="px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            value={filterSkill}
            onChange={(e) => { setFilterSkill(e.target.value); setPage(1); }}
          >
            {uniqueSkills.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase">Budget</label>
          <select
            className="px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            value={filterBudget}
            onChange={(e) => { setFilterBudget(e.target.value); setPage(1); }}
          >
            {budgetRanges.map((r) => (<option key={r.label} value={r.label}>{r.label}</option>))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase">Location</label>
          <select
            className="px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            value={filterLocation}
            onChange={(e) => { setFilterLocation(e.target.value); setPage(1); }}
          >
            {uniqueLocations.map((l) => (<option key={l} value={l}>{l}</option>))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase">Rating</label>
          <select
            className="px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            value={filterRating}
            onChange={(e) => { setFilterRating(e.target.value); setPage(1); }}
          >
            {ratingRanges.map((r) => (<option key={r.label} value={r.label}>{r.label}</option>))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase">Category</label>
          <select
            className="px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }}
          >
            {uniqueCategories.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="mb-3 px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer"
      >
        Clear Filters
      </button>

      {filtered.length === 0 ? (
        <div className="py-8 text-center text-gray-500 text-sm">
          No jobs match your filters. Try adjusting your search criteria.
        </div>
      ) : (
        <>
          <ul className="list-none p-0 m-0 space-y-2">
            {pageItems.map((j) => (
              <li key={j.id} className="p-3 border-b border-gray-200 flex justify-between items-start hover:bg-gray-50">
                <div className="flex-1">
                  <h5 className="m-0 text-sm font-semibold text-gray-900">{j.title}</h5>
                  <p className="m-0 mt-1 text-xs text-gray-600">
                    💼 {j.skill} • 📍 {j.location} • 📂 {j.category} • 💵 ${j.budget}
                  </p>
                </div>
                <div className="text-right text-xs text-gray-700 ml-4">
                  <div className="font-semibold text-amber-500">⭐ {j.clientRating}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 text-xs">
            <div className="text-gray-600">
              {filtered.length} jobs • Page {page} / {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium disabled:bg-gray-300 hover:bg-blue-700"
              >
                ← Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium disabled:bg-gray-300 hover:bg-blue-700"
              >
                Next →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BrowseJobsTailwind;
