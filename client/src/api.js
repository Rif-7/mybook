const apiUrl = 'http://localhost:4000';

const setUserDetails = async setUser => {
  try {
    const token = localStorage.getItem('token');
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

export { apiUrl, setUserDetails };
