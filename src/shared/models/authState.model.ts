import InitialState from './state/initialState.model';

interface AuthState extends InitialState {
  userId: string;
  token: string;
  name: string;
  role: string;
}

export default AuthState;
