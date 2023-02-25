// import { AuthResponse } from './authResponse.model';
import InitialState from './state/initialState.model';

interface AuthState extends InitialState {
  userId: string,
  token: string,
  name: string,
}

export default AuthState;
