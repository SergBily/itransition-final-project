const authValidator = (n: string) => ({
  required: {
    value: true,
    message: `${n} is required`,
  },
  maxLength: {
    value: 250,
    message: 'Max length 250 characters',
  },
});

export default authValidator;
