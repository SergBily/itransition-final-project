export interface AuthForm {
  name: string;
  email: string;
  password: string;
}

export type LoginForm = Omit<AuthForm, 'name'>;
