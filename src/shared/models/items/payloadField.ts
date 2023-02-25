import { UseFormRegister } from 'react-hook-form';

type PayloadField = {
  key: string,
  value?: string,
  register: UseFormRegister<Record<string, string>>
};

export default PayloadField;
