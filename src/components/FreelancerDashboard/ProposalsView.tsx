import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border: 1px solid #e9eef6;
  padding: 12px;
  border-radius: 8px;
`;

interface Proposal {
  id: string;
  jobTitle: string;
  status: 'pending' | 'accepted' | 'rejected';
  bid: number;
  deliveryDays: number;
}

interface Props {
  initial?: Proposal[];
}

const ProposalsView: React.FC<Props> = ({ initial = [] }) => {
  const [items, setItems] = useState<Proposal[]>(initial);

  const updateStatus = (id: string, status: Proposal['status']) => {
    setItems((prev) => prev.map((p) => p.id === id ? { ...p, status } : p));
  };

  return (
    <Card>
      <h4>My Proposals</h4>
      {items.length === 0 ? (
        <div>No proposals yet</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((p) => (
            <li key={p.id} style={{ padding: 10, borderBottom: '1px dashed #eef2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{p.jobTitle}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>${p.bid} • {p.deliveryDays} days</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ textTransform: 'capitalize' }}>{p.status}</div>
                {p.status === 'pending' && (
                  <>
                    <button onClick={() => updateStatus(p.id, 'accepted')}>Accept</button>
                    <button onClick={() => updateStatus(p.id, 'rejected')}>Reject</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default ProposalsView;
