import { basePath, apiVersion } from "./config";

export async function getMenuApi() {
  const url = `${basePath}/${apiVersion}/get-menus`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function updateMenuApi(token, menuId, data) {
  const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function activateMenuApi(token, menuId, status) {
  const url = `${basePath}/${apiVersion}/activate-menu/${menuId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ active: status })
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function addMenuApi(token, menu) {
  const url = `${basePath}/${apiVersion}/add-menu`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(menu)
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function deleteMenuApi(token, menuId) {
  const url = `${basePath}/${apiVersion}/delete-menu/${menuId}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  }
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}
