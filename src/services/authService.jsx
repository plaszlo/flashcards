// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = 'http://localhost:5073';

export async function register(authDetails) {
  const requestOptions = {
    method: "PUT",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(authDetails)
  }

  // LOOKUP: what is 2nd arg of fetch, what is promise?
  const response = await fetch(`${API_URL}/User/UpsertUser`, requestOptions);
  
  if(!response.ok){
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Registration failed");
  }

  return true;
}

export async function amendUser(authDetails){
  const requestOptions = {
    method: "PUT",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(authDetails)
  }

  const response = await fetch(`${API_URL}/User/UpsertUser`, requestOptions);

  if(!response.ok){
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to amend user details");
  }

  return true;
}

export async function deleteUser(userId){
  const requestOptions = {method: "DELETE"}

  const response = await fetch(`${API_URL}/User/User/${userId}`, requestOptions);

  if(!response.ok){
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to delete user");
  }

  return true
}