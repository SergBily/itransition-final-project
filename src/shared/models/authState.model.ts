import { AuthResponse } from './authResponse';

interface AuthState {
  status: 'idle' | 'loading' | 'failed' | 'success';
  errorMessage: string;
  user?: AuthResponse
}

// enum AuthStatus {
//   idle = 'idle',
//   loading = 'loading',
//   failed = 'failed',
// }

export default AuthState;
