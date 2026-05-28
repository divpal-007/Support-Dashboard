// store/appStore.js
// Merged store using React Context + useReducer
// Split into separate contexts once Spring auth is fully wired

import { createContext, useContext, useReducer, useCallback } from 'react';

// ── Initial State ──────────────────────────────────────────
const initialState = {
  // Auth
  user: null,
  isAuthenticated: false,          // TODO: REMOVE this
  auth: {
    loading:true,
    error:null
  },
  // Navigation
  activeRoute: 'overview',
  // UI
  searchQuery: '',
  notifications: 0,
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

  // IEE engine status - drives Sidebar dots
  ieeStatus: {
    active: false,
    learning:false,
    totalResolved:0,
    aiClassified:0,
    openCount:0,
  }
};

// ── Action Types ───────────────────────────────────────────
export const ACTIONS = {
  SET_ROUTE:'SET_ROUTE',
  SET_SEARCH:'SET_SEARCH',
  TOGGLE_SIDEBAR:'TOGGLE_SIDEBAR',
  SET_USER:'SET_USER',
  SET_AUTHENTICATED:'SET_AUTHENTICATED',
  LOGOUT:'LOGOUT',
  AUTH_LOADING:'AUTH_LOADING',
  DASHBOARD_LOADING:'DASHBOARD_LOADING',
  DASHBOARD_SUCCESS:'DASHBOARD_SUCCESS',
  DASHBOARD_ERROR:'DASHBOARD_ERROR',
  ESCALATIONS_LOADING:'ESCALATIONS_LOADING',
  ESCALATIONS_SUCCESS:'ESCALATIONS_SUCCESS',
  ESCALATIONS_ERROR:'ESCALATIONS_ERROR',
  UPDATE_ESCALATION:'UPDATE_ESCALATION',
  ADD_ESCALATION:'ADD_ESCALATION',
  SET_IEE_STATUS:'SET_IEE_STATUS'
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
      return { ...state, user: payload, isAuthenticated: true,auth: {loading: false, error:null}};
    case ACTIONS.LOGOUT:
      return { ...state,user:null, isAuthenticated: false, auth: {loading:false,error:null} };
    case ACTIONS.AUTH_LOADING:
      return {...state, auth:{loading: true,error:null}};
    case ACTIONS.DASHBOARD_LOADING:
      return { ...state, dashboard: { ...state.dashboard, loading: true, error: null } };
    case ACTIONS.DASHBOARD_SUCCESS:
      return { ...state, dashboard: { ...state.dashboard, loading: false, error: null, stats: payload.stats || [], priorityIncident: payload.priorityIncident || null, queues:payload.queues || [], escalations: payload.escalations || [] }};
    case ACTIONS.DASHBOARD_ERROR:
      return { ...state, dashboard: { ...state.dashboard, loading: false, error: payload } };

    case ACTIONS.ESCALATIONS_LOADING:
      return { ...state, escalations: { ...state.escalations, loading: true, error: null } };
    case ACTIONS.ESCALATIONS_SUCCESS:
      return { ...state, escalations: { ...state.escalations, loading: false, items: payload.items || [] } };
    case ACTIONS.ESCALATIONS_ERROR:
      return { ...state, escalations: { ...state.escalations, loading: false, error: payload } };
    case ACTIONS.UPDATE_ESCALATION:             // could just refetch but this avoids a round trip
      return {...state, escalations: { ...state.escalations, items: state.escalations.items.map(e => e.id === payload.id ? { ...e, ...payload } : e)},
              dashboard: {...state.dashboard, escalations: state.dashboard.escalations.map(e => e.id === payload.id ? {...e,...payload}:e)}
    };
    case ACTIONS.SET_IEE_STATUS:
      return {...state,ieeStatus: payload};
    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────
const AppContext = createContext(null);
//provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const navigate  = useCallback((route) => dispatch({ type: ACTIONS.SET_ROUTE, payload: route }), []);
  const setSearch = useCallback((query) => dispatch({ type: ACTIONS.SET_SEARCH, payload: query }), []);
  // logout helper - clears state
  const logoutUser = useCallback(() => dispatch({ type:ACTIONS.LOGOUT}),[]);
  return (
    <AppContext.Provider value={{state, dispatch, navigate, setSearch,logoutUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be used inside AppProvider');
  return ctx;
}
