import React, { useState } from 'react';
import './style.css';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating asynchronous validation
    try {
      // Perform validation by making an HTTP request to the server
      const isValid = await validateFormData(formData);

      if (isValid) {
        // Form is valid, submit data or perform other actions
        setIsSubmitted(true);
        setErrors({});
        console.log('Form submitted:', formData);
      } else {
        // Validation failed, set errors
        setErrors({ general: 'Invalid form data' });
      }
    } catch (error) {
      // Handle error during validation
      console.error('Validation error:', error);
      setErrors({ general: 'Validation error occurred' });
    }

    setIsLoading(false);
  };

  const validateFormData = async (data) => {
    // Simulate an HTTP request to the server for validation
    // Replace with your actual validation logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { username, email, password } = data;

        // Perform validation checks
        const isUsernameValid = username && username.length >= 3;
        const isEmailValid = email && email.includes('@');
        const isPasswordValid = password && password.length >= 6;

        resolve(isUsernameValid && isEmailValid && isPasswordValid);
      }, 2000); // Simulate delay for demonstration purposes
    });
  };

  return (
    <div>
      <h1>Registration Form</h1>
      {isSubmitted ? (
        <p>Form submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {errors.general && <p>{errors.general}</p>}
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
}
