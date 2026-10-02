Storybook setup and usage (Freelancer Dashboard)

1. Install Storybook (if not already present):
   npx sb init

2. Ensure required dependencies are installed for React + TypeScript projects (if applicable).

3. Run Storybook:
   npm run storybook
   (or if not configured, use: npx start-storybook -p 6006)

4. Stories added:
   - src/components/FreelancerDashboard/BrowseJobs.stories.tsx
   - src/components/FreelancerDashboard/ProfileEditor.stories.tsx
   - src/components/FreelancerDashboard/ProposalsView.stories.tsx
   - src/components/FreelancerDashboard/FreelancerDashboardApp.stories.tsx

Notes:
- Stories are presentational and rely on mockData.ts for demo data.
- If Storybook initialization modifies package.json, follow the prompts and install the packages.
