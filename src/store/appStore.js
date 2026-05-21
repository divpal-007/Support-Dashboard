// store/appStore.js
// Merged store using React Context + useReducer
// Split into separate contexts once Spring auth is fully wired

import { createContext, useContext, useReducer, useCallback } from 'react';

// ── Initial State ──────────────────────────────────────────
const initialState = {
  // Auth
  user: { name: 'Arjun Dev', role: 'SRE Manager', initials: 'AD' },
  isAuthenticated: true,          // TODO: REMOVE this

  // Navigation
  activeRoute: 'overview',

  // UI
  searchQuery: '',
  notifications: 7,
  sidebarCollapsed: false,

  // Dashboard data
  dashboard: {
    stats: [],
    priorityIncident: null,
    queues: [],
    activity: [],
    dailySummary: null,
    loading: false,
    error: null,
  },

  // Escalations
  escalations: {
    items: [],
    loading: false,
    error: null,
  },
};

// ── Action Types ───────────────────────────────────────────
export const ACTIONS = {
  SET_ROUTE:'SET_ROUTE',
  SET_SEARCH:'SET_SEARCH',
  TOGGLE_SIDEBAR:'TOGGLE_SIDEBAR',
  SET_USER:'SET_USER',
  LOGOUT:'LOGOUT',
DASHBOARD_LOADING:'DASHBOARD_LOADING',
  DASHBOARD_SUCCESS:'DASHBOARD_SUCCESS',
  DASHBOARD_ERROR:'DASHBOARD_ERROR',
  ESCALATIONS_LOADING:'ESCALATIONS_LOADING',
  ESCALATIONS_SUCCESS:'ESCALATIONS_SUCCESS',
  ESCALATIONS_ERROR:'ESCALATIONS_ERROR',
  UPDATE_ESCALATION:'UPDATE_ESCALATION',
};

// ── Reducer ────────────────────────────────────────────────
function appReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SET_ROUTE:
      return { ...state, activeRoute: payload };
    case ACTIONS.SET_SEARCH:
      return { ...state, searchQuery: payload };
    case ACTIONS.TOGGLE_SIDEBAR:
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case ACTIONS.SET_USER:
      return { ...state, user: payload, isAuthenticated: true };
    case ACTIONS.LOGOUT:
      return { ...initialState, isAuthenticated: false };

    case ACTIONS.DASHBOARD_LOADING:
      return { ...state, dashboard: { ...state.dashboard, loading: true, error: null } };
    case ACTIONS.DASHBOARD_SUCCESS:
      return { ...state, dashboard: { ...state.dashboard, loading: false, ...payload } };
    case ACTIONS.DASHBOARD_ERROR:
      return { ...state, dashboard: { ...state.dashboard, loading: false, error: payload } };

    case ACTIONS.ESCALATIONS_LOADING:
      return { ...state, escalations: { ...state.escalations, loading: true, error: null } };
    case ACTIONS.ESCALATIONS_SUCCESS:
      return { ...state, escalations: { items: payload, loading: false, error: null } };
    case ACTIONS.ESCALATIONS_ERROR:
      return { ...state, escalations: { ...state.escalations, loading: false, error: payload } };
    case ACTIONS.UPDATE_ESCALATION:             // could just refetch but this avoids a round trip
      return {
        ...state,
        escalations: {
          ...state.escalations,
          items: state.escalations.items.map(e =>
            e.id === payload.id ? { ...e, ...payload } : e
          ),
        },
      };

    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const navigate  = useCallback((route) => dispatch({ type: ACTIONS.SET_ROUTE, payload: route }), []);
  const setSearch = useCallback((q)     => dispatch({ type: ACTIONS.SET_SEARCH, payload: q }), []);

  return (
    <AppContext.Provider value={{ state, dispatch, navigate, setSearch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be used inside AppProvider');
  return ctx;
}
