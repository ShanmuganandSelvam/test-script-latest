import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, Eye, EyeOff, ArrowRight, LogIn } from 'lucide-react';
import { bayerSansClasses } from '../lib/bayer-sans';
import { useThemeColors } from '../hooks/use-cloudfront-theme';

// Form validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const colors = useThemeColors();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    console.log('Login data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 lg:p-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h1 className={`${bayerSansClasses.heading.h2} mb-2`}>Welcome back</h1>
            <p className={`${bayerSansClasses.body.base} text-gray-600`}>
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
            <div className="space-y-4">
              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent`}
                    style={{ 
                      borderColor: errors.email ? colors.danger('400') : 'rgb(209 213 219)',
                      boxShadow: errors.email ? `0 0 0 1px ${colors.danger('400')}` : 'none'
                    }}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm" style={{ color: colors.danger('600') }}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a 
                    href="#" 
                    className="text-sm font-medium hover:underline"
                    style={{ color: colors.primary('600') }}
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    {...register('password')}
                    className={`block w-full pl-10 pr-10 py-2.5 border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent`}
                    style={{ 
                      borderColor: errors.password ? colors.danger('400') : 'rgb(209 213 219)',
                      boxShadow: errors.password ? `0 0 0 1px ${colors.danger('400')}` : 'none'
                    }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-400" />
                    ) : (
                      <Eye size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm" style={{ color: colors.danger('600') }}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register('rememberMe')}
                  className="h-4 w-4 rounded"
                  style={{ 
                    color: colors.primary('600'),
                    borderColor: 'rgb(209 213 219)'
                  }}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me for 30 days
                </label>
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-white font-medium transition-all duration-200 relative overflow-hidden"
                style={{ 
                  backgroundColor: colors.primary('600'),
                  boxShadow: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`,
                }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a 
                href="#" 
                className="font-medium hover:underline"
                style={{ color: colors.primary('600') }}
              >
                Sign up
              </a>
            </p>
          </div>

          {/* Social login options */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4383 21.879V14.89H7.89831V12H10.4383V9.797C10.4383 7.291 11.9323 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1923C13.9503 8.562 13.5623 9.333 13.5623 10.124V12H16.3363L15.8933 14.89H13.5623V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z" />
                </svg>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 17.523 6.47731 22 12.0003 22C17.5233 22 22.0003 17.523 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2ZM18.9363 9.04C18.9493 9.2 18.9493 9.36 18.9493 9.52C18.9493 13.845 15.8323 18.785 9.95131 18.785C8.27131 18.785 6.70731 18.317 5.36731 17.505C5.61531 17.534 5.85231 17.544 6.10931 17.544C7.49931 17.544 8.78531 17.095 9.80931 16.325C8.50531 16.295 7.39931 15.435 7.04931 14.257C7.24031 14.286 7.43131 14.306 7.63131 14.306C7.91131 14.306 8.19131 14.267 8.45731 14.198C7.10131 13.926 6.08631 12.731 6.08631 11.286V11.247C6.45531 11.451 6.88631 11.573 7.34031 11.592C6.55131 11.066 6.02931 10.171 6.02931 9.157C6.02931 8.611 6.17031 8.113 6.42731 7.682C7.88031 9.468 10.0153 10.622 12.3813 10.757C12.3293 10.553 12.3033 10.339 12.3033 10.125C12.3033 8.511 13.6173 7.197 15.2313 7.197C16.0763 7.197 16.8393 7.548 17.3793 8.113C18.0473 7.977 18.6893 7.728 19.2643 7.394C19.0603 8.084 18.6113 8.669 18.0213 9.04C18.5923 8.972 19.1443 8.805 19.6583 8.571C19.2653 9.166 18.7643 9.689 18.1893 10.115C18.9363 10.04 18.9363 9.04 18.9363 9.04Z" />
                </svg>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4383 21.879V14.89H7.89831V12H10.4383V9.797C10.4383 7.291 11.9323 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1923C13.9503 8.562 13.5623 9.333 13.5623 10.124V12H16.3363L15.8933 14.89H13.5623V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ 
        backgroundImage: `url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)'
      }}>
        <div className="h-full flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md text-center">
            <LogIn size={48} className="mx-auto mb-6" />
            <h2 className={`${bayerSansClasses.heading.h2} mb-4`}>Secure Access Portal</h2>
            <p className={`${bayerSansClasses.body.large} mb-6`}>
              Access your dashboard and manage your projects with our secure login system.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                <span className="text-sm">Enhanced Security</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                <span className="text-sm">Data Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
