import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, updateProfile, updatePassword } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [activity, setActivity] = useState([]);
  const [settings, setSettings] = useState({ currency: 'INR' });
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });
  const [activeSection, setActiveSection] = useState('payments');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || 'https://via.placeholder.com/32',
        };
        setUser(userData);
        setNewName(userData.name);

        const paymentsRef = doc(db, 'users', firebaseUser.uid, 'payments', 'methods');
        const activityRef = doc(db, 'users', firebaseUser.uid, 'activity', 'history');
        const settingsRef = doc(db, 'users', firebaseUser.uid, 'settings', 'preferences');

        Promise.all([
          new Promise((resolve, reject) => {
            onSnapshot(
              paymentsRef,
              (doc) => {
                if (doc.exists()) {
                  setPayments(doc.data().methods || []);
                } else {
                  setPayments([]);
                }
                resolve();
              },
              reject
            );
          }),
          new Promise((resolve, reject) => {
            onSnapshot(
              activityRef,
              (doc) => {
                if (doc.exists()) {
                  setActivity(doc.data().orders || []);
                } else {
                  setActivity([]);
                }
                resolve();
              },
              reject
            );
          }),
          new Promise((resolve, reject) => {
            onSnapshot(
              settingsRef,
              (doc) => {
                if (doc.exists()) {
                  setSettings(doc.data());
                } else {
                  setSettings({ currency: 'INR' });
                }
                resolve();
              },
              reject
            );
          }),
        ])
          .then(() => setLoading(false))
          .catch((error) => {
            console.error('Data fetch error:', error);
            showToast('Failed to load data: ' + error.message);
            setLoading(false);
          });
      } else {
        setUser(null);
        setLoading(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleUpdateProfile = async () => {
    if (!user || !auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      await setDoc(
        doc(db, 'users', user.id, 'profile', 'details'),
        {
          name: newName,
          email: user.email,
          photoURL: user.photoURL,
        },
        { merge: true }
      );
      setUser({ ...user, name: newName });
      showToast('Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);
      showToast('Failed to update profile: ' + error.message);
    }
  };

  const handleUpdatePassword = async () => {
    if (!user || !auth.currentUser || !newPassword) return;
    try {
      await updatePassword(auth.currentUser, newPassword);
      showToast('Password updated successfully');
      setNewPassword('');
    } catch (error) {
      console.error('Password update error:', error);
      showToast('Failed to update password: ' + error.message);
    }
  };

  const handleUpdateSettings = async () => {
    if (!user || !auth.currentUser) return;
    try {
      await setDoc(doc(db, 'users', user.id, 'settings', 'preferences'), settings, { merge: true });
      showToast('Settings updated successfully');
    } catch (error) {
      console.error('Settings update error:', error);
      showToast('Failed to update settings: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      showToast('Logout failed: ' + error.message);
    }
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  if (loading) {
    return <div className="text-white text-center p-4">Loading...</div>;
  }

  if (!user) {
    return null; // Redirect handled by navigate('/login')
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="md:flex md:gap-6">
          <div className="md:w-1/3 bg-gray-800 rounded-lg p-4 mb-4 md:mb-0">
            <button
              onClick={() => toggleSection('payments')}
              className="md:hidden w-full text-left text-lg font-semibold flex justify-between items-center"
            >
              My Payments
              <span>{activeSection === 'payments' ? '▲' : '▼'}</span>
            </button>
            <div className={`${activeSection === 'payments' ? 'block' : 'hidden'} md:block`}>
              <h2 className="text-lg font-semibold mb-3 hidden md:block">My Payments</h2>
              {payments.length > 0 ? (
                <ul className="space-y-2">
                  {payments.map((method, index) => (
                    <li key={index} className="bg-gray-700 p-3 rounded-md">
                      <p>{method.type === 'card' ? `**** **** **** ${method.last4}` : method.upiId}</p>
                      <p className="text-sm text-gray-400">{method.type === 'card' ? method.cardType : 'UPI'}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No saved payment methods.</p>
              )}
              <button
                onClick={() => navigate('/add-payment')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full w-full transition-colors"
              >
                Add Payment Method
              </button>
            </div>
          </div>

          <div className="md:w-1/3 bg-gray-800 rounded-lg p-4 mb-4 md:mb-0">
            <button
              onClick={() => toggleSection('activity')}
              className="md:hidden w-full text-left text-lg font-semibold flex justify-between items-center"
            >
              My Activity
              <span>{activeSection === 'activity' ? '▲' : '▼'}</span>
            </button>
            <div className={`${activeSection === 'activity' ? 'block' : 'hidden'} md:block`}>
              <h2 className="text-lg font-semibold mb-3 hidden md:block">My Activity</h2>
              {activity.length > 0 ? (
                <ul className="space-y-2">
                  {activity.map((order, index) => (
                    <li key={index} className="bg-gray-700 p-3 rounded-md">
                      <p>Order #{order.id}</p>
                      <p className="text-sm text-gray-400">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm">Status: {order.status}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No recent activity.</p>
              )}
              <button
                onClick={() => navigate('/myorders')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full w-full transition-colors"
              >
                View All Orders
              </button>
            </div>
          </div>

          <div className="md:w-1/3 bg-gray-800 rounded-lg p-4">
            <button
              onClick={() => toggleSection('others')}
              className="md:hidden w-full text-left text-lg font-semibold flex justify-between items-center"
            >
              Others
              <span>{activeSection === 'others' ? '▲' : '▼'}</span>
            </button>
            <div className={`${activeSection === 'others' ? 'block' : 'hidden'} md:block`}>
              <h2 className="text-lg font-semibold mb-3 hidden md:block">Others</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-medium mb-2">Profile Settings</h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Update Name"
                      className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
                    />
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                      className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                    <button
                      onClick={handleUpdateProfile}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full w-full transition-colors"
                    >
                      Update Profile
                    </button>
                    {newPassword && (
                      <button
                        onClick={handleUpdatePassword}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full w-full transition-colors"
                      >
                        Update Password
                      </button>
                    )}
                    <button
                      onClick={handleUpdateSettings}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full w-full transition-colors"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-2">Support</h3>
                  <button
                    onClick={() => navigate('/support')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full w-full transition-colors"
                  >
                    Contact Support
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full w-full transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast.show && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-up">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Profile;