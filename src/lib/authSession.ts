let onLogout: (() => void) | null = null;
let onTokenUpdate: ((token: string) => void) | null = null;

export const registerAuthHandlers = (handlers: {
  onLogout: () => void;
  onTokenUpdate: (token: string) => void;
}) => {
  onLogout = handlers.onLogout;
  onTokenUpdate = handlers.onTokenUpdate;
};

export const notifyLogout = () => {
  onLogout?.();
};

export const notifyTokenUpdate = (token: string) => {
  onTokenUpdate?.(token);
};
