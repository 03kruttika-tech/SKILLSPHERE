import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #fff;
  border: 1px solid #e9eef6;
  padding: 16px;
  border-radius: 8px;
`;

const Title = styled.h4`
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #0b1a2b;
`;

const FiltersSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  label {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
  }
  input, select {
    padding: 8px 10px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 13px;
    &:focus {
      outline: none;
      border-color: #0b5cff;
      box-shadow: 0 0 0 2px rgba(11, 92, 255, 0.1);
    }
  }
`;

const JobList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const JobItem = styled.li`
  padding: 12px;
  border-bottom: 1px solid #eef2f7;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  &:hover {
    background: #f9fafb;
  }
`;

const JobInfo = styled.div`
  flex: 1;
  h5 {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 600;
    color: #0b1a2b;
  }
  p {
    margin: 0;
    font-size: 12px;
    color: #6b7280;
    line-height: 1.4;
  }
`;

const JobMeta = styled.div`
  text-align: right;
  font-size: 12px;
  color: #374151;
  min-width: 80px;
  .rating {
    font-weight: 600;
    color: #f59e0b;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
  font-size: 13px;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 8px;
  button {
    padding: 6px 12px;
    background: #0b5cff;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    &:disabled {
      background: #d1d5db;
      cursor: not-allowed;
    }
    &:hover:not(:disabled) {
      background: #0847d9;
    }
  }
`;

export interface Job {
  id: string;
  title: string;
  skill: string;
  budget: number;
  clientRating: number;
  location: string;
  category: string;
}

interface Props {
  jobs: Job[];
}

const PAGE_SIZE = 8;

const BrowseJobs: React.FC<Props> = ({ jobs }) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [filterSkill, setFilterSkill] = useState('All');
  const [filterBudget, setFilterBudget] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterRating, setFilterRating] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [page, setPage] = useState(1);

  // Extract unique values for filters
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

  // Apply all filters
  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      // Title search
      if (searchTitle && !j.title.toLowerCase().includes(searchTitle.toLowerCase())) return false;
      
      // Skill filter
      if (filterSkill !== 'All' && j.skill !== filterSkill) return false;
      
      // Location filter
      if (filterLocation !== 'All' && j.location !== filterLocation) return false;
      
      // Category filter
      if (filterCategory !== 'All' && j.category !== filterCategory) return false;
      
      // Budget filter
      const budgetRange = budgetRanges.find((r) => r.label === filterBudget);
      if (budgetRange && (j.budget < budgetRange.min || j.budget > budgetRange.max)) return false;
      
      // Rating filter
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
    <Wrapper>
      <Title>Browse Jobs</Title>

      <FiltersSection>
        <FilterGroup>
          <label>Search Title</label>
          <input
            type="text"
            placeholder="Job title..."
            value={searchTitle}
            onChange={(e) => { setSearchTitle(e.target.value); setPage(1); }}
          />
        </FilterGroup>

        <FilterGroup>
          <label>Skill</label>
          <select value={filterSkill} onChange={(e) => { setFilterSkill(e.target.value); setPage(1); }}>
            {uniqueSkills.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </FilterGroup>

        <FilterGroup>
          <label>Budget</label>
          <select value={filterBudget} onChange={(e) => { setFilterBudget(e.target.value); setPage(1); }}>
            {budgetRanges.map((r) => (<option key={r.label} value={r.label}>{r.label}</option>))}
          </select>
        </FilterGroup>

        <FilterGroup>
          <label>Location</label>
          <select value={filterLocation} onChange={(e) => { setFilterLocation(e.target.value); setPage(1); }}>
            {uniqueLocations.map((l) => (<option key={l} value={l}>{l}</option>))}
          </select>
        </FilterGroup>

        <FilterGroup>
          <label>Rating</label>
          <select value={filterRating} onChange={(e) => { setFilterRating(e.target.value); setPage(1); }}>
            {ratingRanges.map((r) => (<option key={r.label} value={r.label}>{r.label}</option>))}
          </select>
        </FilterGroup>

        <FilterGroup>
          <label>Category</label>
          <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }}>
            {uniqueCategories.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </FilterGroup>
      </FiltersSection>

      <button onClick={resetFilters} style={{ marginBottom: '12px', padding: '6px 12px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 500 }}>
        Clear Filters
      </button>

      {filtered.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
          No jobs match your filters. Try adjusting your search criteria.
        </div>
      ) : (
        <>
          <JobList>
            {pageItems.map((j) => (
              <JobItem key={j.id}>
                <JobInfo>
                  <h5>{j.title}</h5>
                  <p>
                    💼 {j.skill} • 📍 {j.location} • 📂 {j.category} • 💵 ${j.budget}
                  </p>
                </JobInfo>
                <JobMeta>
                  <div className="rating">⭐ {j.clientRating}</div>
                </JobMeta>
              </JobItem>
            ))}
          </JobList>

          <Pagination>
            <div>
              {filtered.length} jobs • Page {page} / {totalPages}
            </div>
            <PaginationControls>
              <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>← Prev</button>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next →</button>
            </PaginationControls>
          </Pagination>
        </>
      )}
    </Wrapper>
  );
};

export default BrowseJobs;
