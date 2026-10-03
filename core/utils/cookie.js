// Set a cookie with an optional expiration time.
function setCookie(name, value, days) {
  let expires = "";

  if (days) {
    const date = new Date();
    const expirationTime = days * 24 * 60 * 60 * 1000;

    date.setTime(date.getTime() + expirationTime);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value || ""}${expires}; path=/`;
}

// Retrieve a cookie value by its name.
function getCookie(name) {
  const cookieString = `; ${document?.cookie}`;
  const cookieParts = cookieString?.split(`; ${name}=`);

  if (cookieParts?.length === 2) {
    return cookieParts?.pop()?.split(";")?.shift();
  }
}

export { setCookie, getCookie };
