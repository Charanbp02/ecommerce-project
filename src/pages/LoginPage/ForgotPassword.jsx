import { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase'; // Path to src/firebase.js

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const context = useOutletContext() || { handleLogin: () => console.log('Login not implemented') };
  const { user } = context;

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent! Please check your inbox.');
      setEmail('');
    } catch (error) {
      let errorMessage = 'Failed to send reset email. Please try again.';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        default:
          errorMessage = error.message;
      }
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Real-time validation
  const handleInputChange = (value) => {
    setEmail(value);
    const tempErrors = validateForm();
    setErrors((prev) => ({
      ...prev,
      email: tempErrors.email || null,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          <Link to="/" className="flex justify-center items-center gap-2">
            <img
              src="https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL2xvZ28ucG5nIiwiaWF0IjoxNzQzNjc5MDkyLCJleHAiOjE3NzUyMTUwOTJ9.5iu3wayd4jpK-_qc58Cj5JQLe5peP8a5MnYX6VAWJMU"
              alt="TrendZone Logo"
              className="w-10 h-10 rounded-full"
            />
            <h2 className="text-3xl font-extrabold text-gray-900">TrendZone</h2>
          </Link>
        </div>
        {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Forgot password form">
          <div>
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="email"
                value={email}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Email address"
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label={isSubmitting ? 'Sending reset email' : 'Send reset email'}
          >
            {isSubmitting ? 'Sending...' : 'Send reset email'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Back to{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500" aria-label="Sign in">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;