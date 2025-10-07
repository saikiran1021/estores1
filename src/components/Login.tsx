import { useState } from 'react';
//import logo from '../assets/logo estores/logo estores.png';
import { Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { UserRole } from '../types/auth';

interface LoginProps {
  onLoginSuccess: () => void;
  onSwitchToSignup: () => void;
}

export function Login({ onLoginSuccess, onSwitchToSignup }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('employee');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.user) {
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please create an account first.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string, demoRole: UserRole) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setRole(demoRole);

    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword,
      });

      if (signInError) throw signInError;

      if (data.user) {
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FFF5E1' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="flex flex-col items-center">
            {/* <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F4A261' }}>
              <Building2 className="w-10 h-10 text-white" />
            </div> */}
            {/* use imported logo variable (handles spaces in filenames) */}
            <img src= "https://estoresedu.com/estores_logo-transformed.png" alt="eStores logo" className="h-40 w-auto" />
            <h1 className="text-3xl font-bold" style={{ color: '#F4A261' }}>
              eStores WorkHub
            </h1>
            <p className="text-center mt-2" style={{ color: '#6C757D' }}>
              Sign in to your employee management portal
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#F8D7DA', color: '#721C24' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#212529' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@gmail.com"
                required
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2"
                style={{
                  color: '#212529',
                  borderColor: '#CED4DA',
                  backgroundColor: 'white'
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#212529' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2"
                style={{
                  color: '#212529',
                  borderColor: '#CED4DA',
                  backgroundColor: 'white'
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#212529' }}>
                Select Your Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2"
                style={{
                  color: '#212529',
                  borderColor: '#CED4DA',
                  backgroundColor: 'white'
                }}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
                <option value="college">College</option>
                <option value="industry">Industry</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#F4A261' }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onSwitchToSignup}
              className="text-sm hover:underline"
              style={{ color: '#6C757D' }}
            >
              Don't have an account? Sign up here
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-lg p-6" style={{ backgroundColor: '#E9ECEF' }}>
          <h3 className="font-bold mb-3" style={{ color: '#6C757D' }}>
            Getting Started
          </h3>
          <div className="space-y-3 text-sm" style={{ color: '#6C757D' }}>
            <p>
              To use the demo credentials, please create an account first using the sign-up form, or contact your administrator to set up demo users.
            </p>
            <div className="mt-3 pt-3 border-t" style={{ borderColor: '#CED4DA' }}>
              <p className="font-semibold mb-2">Demo Account Examples:</p>
              <div className="space-y-1">
                <div><span className="font-medium" style={{ color: '#007BFF' }}>Employee:</span> employee@estores.com / password123</div>
                <div><span className="font-medium" style={{ color: '#28A745' }}>Admin:</span> admin@estores.com / admin123</div>
                <div><span className="font-medium" style={{ color: '#6F42C1' }}>SuperAdmin:</span> superadmin@estores.com / super123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
