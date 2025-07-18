// shell/src/pages/TicketAppLoader.js
import React, { Suspense, lazy, useEffect } from 'react';

const RemoteTicketApp = lazy(() => import('support_tickets/App'));

export default function TicketAppLoader() {
  const token = localStorage.getItem('token');   // <-- must match Login.js!

  useEffect(() => {
    console.log("🔥 Shell: passing token to MFE:", token);
  }, [token]);

  return (
    <Suspense fallback={<div>Loading Ticket App…</div>}>
      <RemoteTicketApp key={token || 'no-token'} token={token} />
    </Suspense>
  );
}
