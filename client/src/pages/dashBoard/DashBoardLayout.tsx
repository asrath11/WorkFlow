import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import SideBar from './components/SideBar';
import { HomeIcon, Users, Calendar, ListTodo, Settings } from 'lucide-react';
import { useAuth } from '@/context/authProvider';
import axios from 'axios';

const menuItems = [
  { title: 'Dashboard', icon: <HomeIcon />, path: '/' },
  { title: 'Employees', icon: <Users />, path: '/employee' },
  { title: 'Attendance', icon: <Calendar />, path: '/attendance' },
  { title: 'Tasks', icon: <ListTodo />, path: '/tasks' },
  { title: 'Settings', icon: <Settings />, path: '/settings' },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, {
        withCredentials: true,
      });
      setUser(null);
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='flex h-screen'>
      <SideBar
        menuItems={menuItems}
        activePath={location.pathname}
        onSelect={(path) => navigate(path)}
        onLogout={handleLogout}
      />
      <div className='flex-1 bg-primary/5 p-6 overflow-auto'>
        <Outlet />
      </div>
    </div>
  );
}
