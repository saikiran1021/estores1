import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';

type AuthView = 'login' | 'signup' | 'dashboard';

function App() {
  const [authView, setAuthView] = useState<AuthView>('login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((async () => {
      await checkSession();
    }) as any);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setAuthView('dashboard');
      } else {
        setAuthView('login');
      }
    } catch (error) {
      console.error('Error checking session:', error);
      setAuthView('login');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setAuthView('dashboard');
  };

  const handleSignupSuccess = () => {
    setAuthView('dashboard');
  };

  const handleLogout = () => {
    setAuthView('login');
  };

  const switchToSignup = () => {
    setAuthView('signup');
  };

  const switchToLogin = () => {
    setAuthView('login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF5E1' }}>
        <div className="text-lg" style={{ color: '#6C757D' }}>Loading...</div>
      </div>
    );
  }

  if (authView === 'login') {
    return <Login onLoginSuccess={handleLoginSuccess} onSwitchToSignup={switchToSignup} />;
  }

  if (authView === 'signup') {
    return <Signup onSignupSuccess={handleSignupSuccess} onSwitchToLogin={switchToLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}

export default App;
