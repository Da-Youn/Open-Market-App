export function getStorageItem(data) {
  if (localStorage.getItem(`${data}`)) {
    return localStorage.getItem(`${data}`);
  } else if (sessionStorage.getItem(`${data}`)) {
    return sessionStorage.getItem(`${data}`);
  } else {
    return null;
  }
}

export function removeStorageItem(data) {
  if (localStorage.getItem(`${data}`)) {
    return localStorage.removeItem(`${data}`);
  } else if (sessionStorage.getItem(`${data}`)) {
    return sessionStorage.removeItem(`${data}`);
  } else {
    return null;
  }
}
