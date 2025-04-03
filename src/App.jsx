import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    query: '',
    message: '',
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'This field is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'This field is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.query) newErrors.query = 'Please select a query type';
    if (!formData.message.trim()) newErrors.message = 'This field is required';
    if (!formData.consent) newErrors.consent = 'To submit this form, please consent to being contacted';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Auto-hide success message after 3 seconds
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        query: '',
        message: '',
        consent: false
      });
      setErrors({});
    }
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      {success && (
        <div className="toast" role="alert" aria-live="polite">
         <h3><img src="assets\images\icon-success-check.svg" alt="" /> Message Sent!</h3> Thanks for completing the form. We'll be in touch soon!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="name">
          <span>
            <label htmlFor="firstName">First Name <span>*</span></label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              aria-describedby="firstNameError"
              className={errors.firstName ? 'error-border' : ''}

            />
            {errors.firstName && <p className="error" id="firstNameError">{errors.firstName}</p>}
          </span>
          <span>
            <label htmlFor="lastName">Last Name <span>*</span></label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              aria-describedby="lastNameError"
              className={errors.lastName ? 'error-border' : ''}

            />
            {errors.lastName && <p className="error" id="lastNameError">{errors.lastName}</p>}
          </span>
        </div>

        <div className="email">
          <label htmlFor="email">Email Address <span>*</span></label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            aria-describedby="emailError"
            className={errors.email ? 'error-border' : ''}

          />
          {errors.email && <p className="error" id="emailError">{errors.email}</p>}
        </div>

        <fieldset>
          <legend>Query Type <span>*</span></legend>
          <div className="query">
            <div className="query1">
              <label>
                <input 
                  type="radio" 
                  name="query" 
                  value="General Enquiry"
                  checked={formData.query === 'General Enquiry'}
                  onChange={handleChange}
                />
                General Enquiry
              </label>
              {errors.query && <p className="error">{errors.query}</p>}
            </div>
            <label id='label2'>
              <input 
                type="radio" 
                name="query" 
                value="Support Request"
                checked={formData.query === 'Support Request'}
                onChange={handleChange}
              />
              Support Request
            </label>
          </div>
        </fieldset>

        <div className="message">
          <label htmlFor="message">Message <span>*</span></label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message}
            onChange={handleChange}
            aria-describedby="messageError"
            className={errors.message ? 'error-border' : ''}
          />
          {errors.message && <p className="error" id="messageError">{errors.message}</p>}
        </div>

        <div className="consent">
          <div id="consent">
            <input 
              type="checkbox" 
              name="consent" 
              id="consent" 
              checked={formData.consent}
              onChange={handleChange}
            />
            <label htmlFor="consent">I consent to being contacted by the team <span>*</span></label>
          </div>

          {errors.consent && <p className="error">{errors.consent}</p>}
        </div>

        <div className="button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default App;



