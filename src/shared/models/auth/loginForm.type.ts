import AuthForm from './authForm.model';

type LoginForm = Omit<AuthForm, 'name'>;

export default LoginForm;
