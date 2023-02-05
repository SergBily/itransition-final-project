enum FieldName {
  name = 'Name',
  email = 'Email',
  password = 'Password',
}

const authValidator = (n: string) => {
  let i: string = '';
  switch (n) {
    case FieldName.name:
      i = 'app.signup.errors1';
      break;
    case FieldName.email:
      i = 'app.signup.errors2';
      break;

    default:
      i = 'app.signup.errors3';
      break;
  }

  return {
    required: {
      value: true,
      message: i,
    },
    maxLength: {
      value: 250,
      message: 'app.signup.errors4',
    },
  };
};

export default authValidator;
