import { AuthResponse } from './authResponse.model';
import InitialState from './state/initialState';

interface AuthState extends InitialState {
  user?: AuthResponse
}

export default AuthState;
