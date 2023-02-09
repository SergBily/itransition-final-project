interface PattersPassword {
  numeric: string,
  passwordLength: number,
  latinUpper: string,
  latinLower: string,
}

const patterns: PattersPassword = {
  numeric: '0-9',
  passwordLength: 8,
  latinUpper: 'A-Z',
  latinLower: 'a-z',
};

const passwordValidator = {
  hasUpperCase: (v: string) => !!v.match(new RegExp(`[${patterns.latinLower}]`, 'g'))
  || 'app.password.errors1',
  hasLowerCase: (v: string) => !!v.match(new RegExp(`[${patterns.latinUpper}]`, 'g'))
  || 'app.password.errors2',
  hasNumber: (v: string) => !!v.match(new RegExp(`[${patterns.numeric}]`, 'g'))
  || 'app.password.errors3',
  hasSymbol: (v: string) => v.length >= patterns.passwordLength
  || 'app.password.errors4',
};

export default passwordValidator;
