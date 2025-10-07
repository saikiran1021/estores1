import { useState, useEffect } from 'react';
import { Building2, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { AuthUser } from '../types/auth';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (authUser) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle();

        if (profileData) {
          setUser(profileData as AuthUser);
        }
      }
    } catch (err) {
      console.error('Error loading user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF5E1' }}>
        <div className="text-lg" style={{ color: '#6C757D' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF5E1' }}>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F4A261' }}>
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#F4A261' }}>
              eStores WorkHub
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#F4A261', color: 'white' }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#212529' }}>
            Welcome to Your Dashboard
          </h2>

          {user && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded" style={{ backgroundColor: '#E9ECEF' }}>
                  <p className="text-sm font-medium" style={{ color: '#6C757D' }}>Name</p>
                  <p className="text-lg font-bold" style={{ color: '#212529' }}>{user.name} {user.surname}</p>
                </div>

                <div className="p-4 rounded" style={{ backgroundColor: '#E9ECEF' }}>
                  <p className="text-sm font-medium" style={{ color: '#6C757D' }}>Email</p>
                  <p className="text-lg font-bold" style={{ color: '#212529' }}>{user.email}</p>
                </div>

                <div className="p-4 rounded" style={{ backgroundColor: '#E9ECEF' }}>
                  <p className="text-sm font-medium" style={{ color: '#6C757D' }}>Phone</p>
                  <p className="text-lg font-bold" style={{ color: '#212529' }}>{user.phone}</p>
                </div>

                <div className="p-4 rounded" style={{ backgroundColor: '#E9ECEF' }}>
                  <p className="text-sm font-medium" style={{ color: '#6C757D' }}>Role</p>
                  <p className="text-lg font-bold capitalize" style={{ color: '#F4A261' }}>{user.role}</p>
                </div>
              </div>

              <div className="mt-8 p-6 rounded" style={{ backgroundColor: '#E9ECEF' }}>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#212529' }}>
                  Account Status
                </h3>
                <p style={{ color: '#6C757D' }}>
                  Your account is active and ready to use. You can access all features available for your role.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
