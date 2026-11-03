export async function register(authDetails) {
  const requestOptions = {
    method: "PUT",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(authDetails)
  }

  // LOOKUP: what is 2nd arg of fetch, what is promise?
  const response = await fetch("http://localhost:5073/User/UpsertUser", requestOptions);
  
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

  const response = await fetch("http://localhost:5073/User/UpsertUser", requestOptions);

  if(!response.ok){
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to amend user details");
  }

  return true;
}

export async function deleteUser(userId){
  const requestOptions = {method: "DELETE"}

  const response = await fetch(`http://localhost:5073/User/User/${userId}`, requestOptions);

  if(!response.ok){
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to delete user");
  }

  return true
}