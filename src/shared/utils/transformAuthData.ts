import { AuthResponse } from '../models';

const transformAuthData = (r: AuthResponse) => ({
  token: r.accessToken,
  name: r.user.name,
  userId: r.user.id,
  role: r.user.role,
});

export default transformAuthData;
