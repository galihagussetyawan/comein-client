export function logout() {
  localStorage.removeItem("profile");
  window.location.reload();
}

export function getAccessToken(): string {
  const storage = JSON.parse(localStorage.getItem("profile"));

  if (!storage.accessToken) {
    logout();
  }

  return storage.accessToken;
}
