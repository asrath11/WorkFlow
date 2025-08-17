import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/passwordInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MailIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/api/auth';
import AuthButtons from '@/components/AuthButtons';
import { useAuth } from '@/context/authProvider';

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['admin', 'user', 'intern']),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: '',
      role: 'user',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const user = await signIn(data);
      if (user) {
        setUser(user);
        navigate('/');
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-full h-full grid lg:grid-cols-2'>
        <div className='max-w-xs m-auto w-full flex flex-col items-center'>
          <Form {...form}>
            <form
              className='w-full space-y-4'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Email'
                        className='w-full'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='Password'
                        className='w-full'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className='flex flex-row space-x-4' // row layout
                      >
                        <FormItem className='flex items-center space-x-2'>
                          <RadioGroupItem value='admin' id='admin' />
                          <FormLabel htmlFor='admin'>Admin</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-2'>
                          <RadioGroupItem value='user' id='user' />
                          <FormLabel htmlFor='user'>User</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-2'>
                          <RadioGroupItem value='intern' id='intern' />
                          <FormLabel htmlFor='intern'>Intern</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='mt-4 w-full'>
                Login
              </Button>
            </form>
          </Form>
        </div>
        <div className='bg-muted hidden lg:block'>
          <div className='max-w-xs m-auto w-full flex flex-col items-center justify-center h-full space-y-2'>
            <p className='text-muted-foreground'>Don't have an account?</p>
            <Button onClick={() => navigate('/signup')}>
              <MailIcon className='mr-2 h-4 w-4' />
              Sign Up with Email
            </Button>
            <AuthButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
