import { AuthResponse } from './authResponse.model';

interface AuthState {
  status: 'idle' | 'loading' | 'failed' | 'success';
  errorMessage: string;
  user?: AuthResponse
}

export default AuthState;
