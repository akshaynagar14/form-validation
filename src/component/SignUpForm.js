import React, { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validations, setValidations] = useState({
    emailValidated: false,
    passwordValidated: false,
    confirmPasswordValidated: false,
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    switch (name) {
      case 'email':
        setValidations({
          ...validations,
          emailValidated: validateEmail(value),
        });
        break;
      case 'password':
        setValidations({
          ...validations,
          passwordValidated: value.length >= 8,
          confirmPasswordValidated: formData.confirmPassword === value,
        });
        break;
      case 'confirmPassword':
        setValidations({
          ...validations,
          confirmPasswordValidated: value === formData.password,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { emailValidated, passwordValidated, confirmPasswordValidated } = validations;

    if (emailValidated && passwordValidated && confirmPasswordValidated) {
      alert('Form submitted successfully!');
    } else {
      alert("Can't submit the form. Please check your inputs.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
         
        />
        {!validations.emailValidated && (
          <span style={{ color: 'red' ,
          padding:'20px'}}>Please enter a valid email address</span>
        )}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          
        />
        {!validations.passwordValidated && (
          <span style={{ color: 'red' }}>Password must be at least 8 characters long</span>
        )}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
         
        />
        {!validations.confirmPasswordValidated && (
          <span style={{ color: 'red' }}>Passwords do not match</span>
        )}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
