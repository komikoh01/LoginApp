let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (res.status !== 401) return res;

  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = refreshToken().finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });
  }

   await refreshPromise;

   return fetch(input, {
    ...init,
    credentials: "include"
   })
}

export async function refreshToken() {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    window.location.href = "login";
    throw new Error("Invalid refresh token");
  }
}
