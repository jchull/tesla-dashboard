import { useSelector } from 'react-redux';
import { AppState } from '../store';

export function useVehicleSession(sessionId?: string) {
  const session = useSelector((store: AppState) => store.session.sessions.find((session) => session._id === sessionId));

  return session ?? null;
}
