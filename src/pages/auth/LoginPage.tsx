import React, { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context';
import { Card, Input, Button, Alert, Badge } from '@/components/ui';
import { LogIn, Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { signIn, isBackendConfigured, missingConfigKeys, user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Where to redirect after login
  const fromLocation = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('ਕਿਰਪਾ ਕਰਕੇ ਈਮੇਲ ਅਤੇ ਪਾਸਵਰਡ ਦੋਵੇਂ ਦਰਜ ਕਰੋ (Please enter both email and password).');
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(email.trim(), password);
    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || 'ਲਾਗਇਨ ਅਸਫਲ ਰਿਹਾ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਵੇਰਵਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ।');
    } else {
      navigate(fromLocation, { replace: true });
    }
  };

  // If already logged in, show current session status
  if (user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-md mx-auto my-auto w-full">
        <Card className="text-center p-6 sm:p-8 w-full">
          <Badge variant="success" className="mb-4">
            ਲਾਗਇਨ ਸਰਗਰਮ • Session Active
          </Badge>
          <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">ਤੁਸੀਂ ਪਹਿਲਾਂ ਹੀ ਲਾਗਇਨ ਹੋ</h2>
          <p className="text-xs text-slate-500 mb-4">{user.email}</p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 mb-6">
            ਭੂਮਿਕਾ (Role): <strong className="text-brand-700 uppercase">{role || 'Student'}</strong>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="primary" onClick={() => navigate('/')}>
              ਮੁੱਖ ਪੰਨਾ • Go to Home
            </Button>
            <Button variant="outline" onClick={() => signOut()}>
              ਸਾਈਨ ਆਊਟ • Sign Out
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-md mx-auto my-auto w-full">
      <Card className="p-6 sm:p-8 w-full shadow-lg border-slate-200">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            ਖਾਤੇ ਵਿੱਚ ਲਾਗਇਨ ਕਰੋ
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to Project Udaan with your school credentials
          </p>
        </div>

        {!isBackendConfigured && (
          <Alert variant="warning" className="mb-6" title="ਸੁਚੇਤਨਾ: ਬੈਕਐਂਡ ਕਨਫ਼ੀਗਰੇਸ਼ਨ">
            <span className="block mb-1">
              Supabase ਕਨੈਕਸ਼ਨ ਕੁੰਜੀਆਂ ਅਜੇ ਸੈੱਟ ਨਹੀਂ ਹਨ।
            </span>
            <span className="text-[11px] text-amber-800 block">
              ਗੁੰਮ ਕੁੰਜੀਆਂ: {missingConfigKeys.join(', ')}. ਲਾਗਇਨ ਚਾਲੂ ਕਰਨ ਲਈ .env ਵਿੱਚ ਅਸਲ ਕੁੰਜੀਆਂ ਦਰਜ ਕਰੋ।
            </span>
          </Alert>
        )}

        {errorMessage && (
          <Alert variant="error" className="mb-6" title="ਲਾਗਇਨ ਗਲਤੀ">
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="ਈਮੇਲ ਪਤਾ"
            subLabel="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@school.edu.in"
            icon={Mail}
            autoComplete="email"
            required
          />

          <Input
            label="ਪਾਸਵਰਡ"
            subLabel="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={Lock}
            autoComplete="current-password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            disabled={!isBackendConfigured}
            className="mt-2"
          >
            ਸਾਈਨ ਇਨ ਕਰੋ • Sign In
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>ਨਵਾਂ ਖਾਤਾ ਬਣਾਉਣ ਲਈ ਆਪਣੇ ਸਕੂਲ ਅਧਿਆਪਕ ਜਾਂ ਪ੍ਰਬੰਧਕ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।</span>
          </p>
        </div>
      </Card>
    </div>
  );
};
