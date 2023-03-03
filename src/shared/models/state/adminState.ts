import User from '../admin/userAdmin.model';
import InitialState from './initialState.model';

interface AdminState extends InitialState {
  errors: string[];
  users: User[];
  actionStatus: 'idle' | 'loading' | 'failed' | 'success',
  action: 'idle' | 'deleted' | 'changed';
}

export default AdminState;
