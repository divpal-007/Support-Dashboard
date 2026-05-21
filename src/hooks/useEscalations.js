// hooks/useEscalations.js
import { useCallback } from 'react';
import { useAppStore, ACTIONS } from '../store/appStore';
import { escalationService } from '../services/api';

export function useEscalations() {
  const { state, dispatch } = useAppStore();

  const assign = useCallback(async (id, payload) => {
    try {
      await escalationService.assign(id, payload);
      dispatch({ type: ACTIONS.UPDATE_ESCALATION, payload: { id, ...payload } });
    } catch (err) {
      console.error('Assign failed:', err);
    }
  }, [dispatch]);

  const updateStatus = useCallback(async (id, status) => {
    try {
      await escalationService.updateStatus(id, status);
      dispatch({ type: ACTIONS.UPDATE_ESCALATION, payload: { id, status } });
    } catch (err) {
      console.error('Status update failed:', err);
    }
  }, [dispatch]);

  return {
    escalations: state.escalations.items,
    loading:     state.escalations.loading,
    error:       state.escalations.error,
    assign,
    updateStatus,
  };
}
