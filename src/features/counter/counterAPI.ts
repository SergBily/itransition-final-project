// A mock function to mimic making an async request for data
function fetchCount(amount = 1) {
  // eslint-disable-next-line max-len, no-promise-executor-return
  return new Promise<{ data: number }>((resolve) => setTimeout(() => resolve({ data: amount }), 500));
}

export default fetchCount;
