import React, { useState } from 'react';

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

const ProposalsViewTailwind: React.FC<Props> = ({ initial = [] }) => {
  const [items, setItems] = useState<Proposal[]>(initial);

  const updateStatus = (id: string, status: Proposal['status']) => {
    setItems((prev) => prev.map((p) => p.id === id ? { ...p, status } : p));
  };

  return (
    <div className="bg-white border border-gray-200 p-3 rounded-lg">
      <h4 className="text-lg font-semibold mb-3">My Proposals</h4>
      {items.length === 0 ? (
        <div className="text-gray-600 text-sm">No proposals yet</div>
      ) : (
        <ul className="list-none p-0 m-0 space-y-1">
          {items.map((p) => (
            <li
              key={p.id}
              className="p-2.5 border-b border-dashed border-gray-200 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-sm">{p.jobTitle}</div>
                <div className="text-xs text-gray-500">${p.bid} • {p.deliveryDays} days</div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-xs capitalize">{p.status}</div>
                {p.status === 'pending' && (
                  <div className="flex gap-1">
                    <button
                      className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => updateStatus(p.id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => updateStatus(p.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProposalsViewTailwind;
