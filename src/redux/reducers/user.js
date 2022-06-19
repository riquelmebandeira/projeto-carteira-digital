const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'STORE_EMAIL':
    return { email: action.userEmail };
  default:
    return state;
  }
}

export default user;
