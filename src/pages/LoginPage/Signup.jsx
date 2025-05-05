import { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignature } from 'react-icons/fa6';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const context = useOutletContext() || { handleLogin: () => console.log('Login not implemented') };
  const { handleLogin, user } = context;

  // Load saved credentials if rememberMe was checked
  useEffect(() => {
    const savedName = localStorage.getItem('rememberedName');
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';
    if (savedName && savedEmail && savedPassword && savedRememberMe) {
      setName(savedName);
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    else if (name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, { displayName: name });

      // Save user info in Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name,
        email: firebaseUser.email,
        createdAt: new Date()
      });

      // Save form data if rememberMe is checked
      if (rememberMe) {
        localStorage.setItem('rememberedName', name);
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberedName');
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
        localStorage.removeItem('rememberMe');
      }

      handleLogin({
        name,
        email: firebaseUser.email,
        id: firebaseUser.uid
      });

      navigate('/');
    } catch (error) {
      let errorMessage = 'Signup failed. Please try again.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak.';
          break;
        default:
          errorMessage = error.message;
      }
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'name') setName(value);
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);

    const tempErrors = validateForm();
    setErrors((prev) => ({
      ...prev,
      [field]: tempErrors[field] || null,
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
        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Signup form">
          <div>
            <div className="relative">
              <FaSignature className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                value={name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Full name"
                className={`w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
            </div>
            {errors.name && <p id="name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          <div>
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="email"
                value={email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Email address"
                className={`w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            {errors.email && <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p id="password-error" className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
          <div className="flex justify-between text-sm flex-col sm:flex-row gap-2 sm:gap-0">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                aria-label="Remember me"
              />
              <span className="ml-2 text-gray-900">Remember me</span>
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label={isSubmitting ? 'Signing up' : 'Sign up'}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500" aria-label="Sign in">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;