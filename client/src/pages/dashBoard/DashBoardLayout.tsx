import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import SideBar from './components/SideBar';
import { HomeIcon, Users, Calendar, ListTodo, Settings } from 'lucide-react';

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

  return (
    <div className='flex h-screen'>
      <SideBar
        menuItems={menuItems}
        activePath={location.pathname}
        onSelect={(path) => navigate(path)}
      />
      <div className='flex-1 bg-primary/10 p-10'>
        <Outlet /> {/* shows the page for the active route */}
      </div>
    </div>
  );
}
