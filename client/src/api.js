const apiUrl = 'https://facebook-clone-lh0y.onrender.com';

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
    return { error: ['An Unexpected Error Occured'] };
  }
};

const login = async (email, password) => {
  try {
    const response = await fetch(apiUrl + '/login', {
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

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: ['An Unexpected Error Occured'] };
  }
};

const loginAsGuest = async () => {
  try {
    const response = await fetch(`${apiUrl}/login/guest`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: ['An Unexpected Error Occured'] };
  }
};

const submitPost = async formData => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return { error: 'Authentication Failed' };

    let response = await fetch(apiUrl + '/posts', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const getPosts = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication failed' };
    }

    const response = await fetch(apiUrl + '/posts', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const deletePost = async postId => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication failed' };
    }

    const response = await fetch(`${apiUrl}/posts/${postId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const getUserList = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication Failed' };
    }

    const response = await fetch(apiUrl + '/users', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const test = await response.json();
    return test;
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const getUserInfo = async userId => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication Failed' };
    }
    const response = await fetch(apiUrl + '/users/' + userId, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const updateUserProfile = async formData => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication failed' };
    }

    const response = await fetch(`${apiUrl}/users/user`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const getUserPosts = async userId => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication failed' };
    }

    const response = await fetch(apiUrl + '/users/' + userId + '/posts', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const getUserFriendDetails = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication failed' };
    }

    const response = await fetch(apiUrl + '/friends', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const getUserFriends = async userId => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication failed' };
    }

    const response = await fetch(apiUrl + '/friends/' + userId, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const handleFriendRequest = async (userId, action) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication failed' };
    }

    const response = await fetch(`${apiUrl}/friends/${userId}/${action}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const toggleLike = async postId => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication failed' };
    }
    const response = await fetch(`${apiUrl}/posts/${postId}/like`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const submitComment = async (postId, text) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication failed' };
    }

    const response = await fetch(`${apiUrl}/posts/${postId}/comments`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const getComments = async postId => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication failed' };
    }

    const response = await fetch(`${apiUrl}/posts/${postId}/comments`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Authentication failed' };
    }

    const response = await fetch(
      `${apiUrl}/posts/${postId}/comments/${commentId}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'An Unexpected Error Occured' };
  }
};

export {
  apiUrl,
  setUserDetails,
  signUp,
  login,
  loginAsGuest,
  submitPost,
  getPosts,
  deletePost,
  getUserList,
  getUserInfo,
  updateUserProfile,
  getUserPosts,
  getUserFriendDetails,
  getUserFriends,
  handleFriendRequest,
  toggleLike,
  submitComment,
  getComments,
  deleteComment,
};
