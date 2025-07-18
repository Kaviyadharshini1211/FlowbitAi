export const loadRemoteModule = async ({ url, scope = 'default', module = './App' }) => {
  if (!window.__remote_scripts__) window.__remote_scripts__ = new Set();
  if (!window.__remote_scripts__.has(url)) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    window.__remote_scripts__.add(url);
  }

  // Ensure these are defined
  await __webpack_init_sharing__('default');
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  return factory();
};
