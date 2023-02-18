interface InitialState {
  status: 'idle' | 'loading' | 'failed' | 'success';
  errorMessage: string;
}

export default InitialState;
