import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ ...props }: React.ComponentProps<typeof Input>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative w-full'>
      <Input
        type={showPassword ? 'text' : 'password'}
        {...props}
        className='pr-10' // space for the icon
      />
      <div
        onClick={() => setShowPassword(!showPassword)}
        className='absolute right-3 top-1/2 -translate-y-1/2'
      >
        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
      </div>
    </div>
  );
};

export default PasswordInput;
