export interface AuthResponse {
  accessToken: string,
  refreshToken: string,
  user: UserResponse
}

export interface UserResponse {
  email: string,
  id: string,
  name: string
}
