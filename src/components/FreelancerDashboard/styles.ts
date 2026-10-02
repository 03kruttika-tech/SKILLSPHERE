import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f7fb;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
`;

export const SidebarWrapper = styled.aside`
  width: 220px;
  background: #ffffff;
  border-right: 1px solid #e1e8ed;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
  overflow-y: auto;
`;

export const SidebarList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 16px 0;
`;

export const SidebarItem = styled.li<{ $active?: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  color: ${(p) => (p.$active ? '#0b5cff' : '#3f4d5f')};
  background: ${(p) => (p.$active ? 'rgba(11, 92, 255, 0.08)' : 'transparent')};
  font-weight: ${(p) => (p.$active ? 600 : 500)};
  font-size: 14px;
  border-left: 3px solid ${(p) => (p.$active ? '#0b5cff' : 'transparent')};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${(p) => (p.$active ? 'rgba(11, 92, 255, 0.1)' : 'rgba(11, 92, 255, 0.05)')};
    color: ${(p) => (p.$active ? '#0b5cff' : '#1f2937')};
  }
`;


export const Main = styled.main`
  flex: 1;
  padding: 28px;
  overflow-y: auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  h1 {
    font-size: 22px;
    margin: 0;
    color: #0b1a2b;
  }
`;

export const StatsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
`;

export const StatCard = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  border: 1px solid #e6edf6;
  padding: 14px;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(16,24,40,0.03);
  h3 {
    margin: 0 0 6px 0;
    font-size: 13px;
    color: #515a6b;
  }
  p {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #0b1a2b;
  }
`;

export const Sections = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
`;

export const SectionCard = styled.div`
  background: #fff;
  border: 1px solid #e9eef6;
  padding: 14px;
  border-radius: 8px;
  h4 {
    margin: 0 0 6px 0;
    font-size: 15px;
  }
  p {
    margin: 0;
    color: #4b5563;
    font-size: 13px;
  }
`;
