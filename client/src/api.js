const apiUrl = 'http://localhost:4000';

const setUserDetails = async setUser => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;
    let response = await fetch(apiUrl + '/users/user', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    response = await response.json();
    if (!response.error && !response.errors) {
      setUser(response);
    }
  } catch (err) {
    console.log(err);
  }
};

// Errors are to be returned as an array
const signUp = async (firstname, lastname, email, password) => {
  try {
    let response = await fetch(apiUrl + '/signup', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: ['Unexpected error occured'] };
  }
};

const login = async (email, password) => {
  try {
    let response = await fetch(apiUrl + '/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    response = await response.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return { error: ['Unexpected error occured'] };
  }
};

export { apiUrl, setUserDetails, signUp, login };
