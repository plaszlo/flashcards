export async function register(authDetails) {
  const requestOptions = {
    method: "PUT",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(authDetails)
  }

  const response = await fetch("http://localhost:5073/User/UpsertUser", requestOptions); //URL, init?: RequestInit): Promise<Response> - what is the 2nd arg?
  
  if(!response.ok){
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Registration failed");
  }

  return true;
}
