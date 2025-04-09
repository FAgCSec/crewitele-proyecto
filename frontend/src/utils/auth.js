export async function isLoggedIn(token) {
  try {
    if (!token) return [false, null];

    const res = await fetch("http://localhost:3001/api/auth", {
      method: "POST",
      headers: {
        token: token,
      },
    });
    const data = await res.json();
    if (!data.error) return [true, data];

    return [false, null];
  } catch (error) {
    return [false, null];
  }
}
