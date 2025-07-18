import React, { Suspense, lazy } from 'react';
import { loadRemoteModule } from '../utils/loadRemoteModules';

export default function ScreensLoader({ url, token }) {
  const RemoteComponent = lazy(() =>
    loadRemoteModule({
      url,
      scope: 'support_tickets',
      module: './App'
    })
  );

  return (
    <Suspense fallback={<div>Loading screen...</div>}>
      <RemoteComponent token={token} />
    </Suspense>
  );
}
