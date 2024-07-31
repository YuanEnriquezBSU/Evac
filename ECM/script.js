document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (response.ok) {
        alert('Login successful');
        // Redirect or perform other actions
      } else {
        alert(`Login failed: ${result.error}`);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  });
  
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const date = document.getElementById('birthday').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const cpassword = document.getElementById('cpassword').value;
    if (password !== cpassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, date, email, password })
      });
      const result = await response.json();
      if (response.ok) {
        alert('Registration successful');
        // Redirect or perform other actions
      } else {
        alert(`Registration failed: ${result.error}`);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  });
  
  document.get
  