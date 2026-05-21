import { createContext, useContext, useState } from 'react';
 
const AppContext = createContext(null);
 
export const ROUTES = {
  home:         { label: 'Home',             badge: null },
  operations:   { label: 'Operations',       badge: 5    },
  escalations:  { label: 'Escalations',      badge: 3    },
  coordination: { label: 'Coordination',     badge: null },
  iee:          { label: 'IEE™ Intelligence',badge: null },
  automations:  { label: 'Automations',      badge: null },
  integrations: { label: 'Integrations',     badge: null },
  reports:      { label: 'Reports',          badge: null },
  settings:     { label: 'Settings',         badge: null },
};
 
export function AppProvider({ children }) {
  const [activeRoute, setActiveRoute] = useState('home');
  const [notifications, setNotifications] = useState(12);
  const [searchQuery, setSearchQuery]   = useState('');
 
  return (
    <AppContext.Provider value={{
      activeRoute, setActiveRoute,
      notifications, setNotifications,
      searchQuery, setSearchQuery,
    }}>
      {children}
    </AppContext.Provider>
  );
}
 
export const useApp = () => useContext(AppContext);