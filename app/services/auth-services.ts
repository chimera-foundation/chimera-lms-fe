interface LoginResponse {
  username: string;
  token_type: string;
}

export const loginUserService = async (props: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const { email, password } = props;

  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Login failed" }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  const data: LoginResponse = await response.json();
  return data;
};

export const logoutUserService = async (): Promise<any> => {
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: "",
  };

  const response = await fetch(`/api/auth/logout`, {
    method: "POST",
    headers,
  });

  const data = await response.json();

  return data;
};

export const getMeService = async () => {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json();
};
