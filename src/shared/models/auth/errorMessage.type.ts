import { ErrorData } from '../state/errorResponse.model';

type ErrorMessage = Pick<ErrorData, 'message'>;

export default ErrorMessage;
