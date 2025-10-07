import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SignupProps {
  onSignupSuccess: () => void;
  onSwitchToLogin: () => void;
}

export function Signup({ onSignupSuccess, onSwitchToLogin }: SignupProps) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            surname,
            phone,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email,
            name,
            surname,
            phone,
            role: 'employee',
          });

        if (profileError) throw profileError;

        onSignupSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FFF5E1' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F4A261' }}>
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold" style={{ color: '#F4A261' }}>
              eStores WorkHub
            </h1>
            <p className="text-center mt-2" style={{ color: '#6C757D' }}>
              Create your employee management account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#F8D7DA', color: '#721C24' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#212529' }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
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
                Surname
              </label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Your surname"
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
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone"
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
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#F4A261' }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onSwitchToLogin}
              className="text-sm hover:underline"
              style={{ color: '#6C757D' }}
            >
              Already have an account? Log in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
