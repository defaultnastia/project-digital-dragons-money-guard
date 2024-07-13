// === USER ===

// to be used when state is required
export interface UserState {
  user: {
    username: string;
    email: string;
    id: string;
    balance: number;
  };
  token: string | null;
  loading: boolean;
  errorCode: string | null;
}

// to be used when user enters credentials
export interface UserCredentials {
  username: string;
  email: string;
  password: string;
}

// === TRANSACTIONS ===

// === MONO (currencies) ===
