import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context';
import { UserRole } from '@/types/auth.types';
import { LoadingFallback } from '@/components/common/LoadingFallback';
import { Card, Button, Badge } from '@/components/ui';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, profile, role, isLoading, isBackendConfigured, missingConfigKeys } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingFallback message="ਪ੍ਰਮਾਣੀਕਰਨ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ..." subMessage="Verifying authentication session..." />;
  }

  // If backend is not configured with real Supabase credentials, present clear developer setup guidance
  if (!isBackendConfigured) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto my-auto w-full">
        <Card className="text-center p-6 sm:p-8 border-amber-200 bg-amber-50/40">
          <Badge variant="warning" className="mb-3">
            ਬੈਕਐਂਡ ਕਨਫ਼ੀਗਰੇਸ਼ਨ ਲੋੜੀਂਦੀ ਹੈ • Configuration Required
          </Badge>
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            ਸੁਰੱਖਿਅਤ ਪਹੁੰਚ ਲਈ Supabase ਦੀ ਲੋੜ ਹੈ
          </h2>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            ਇਸ ਸੁਰੱਖਿਅਤ ਖੇਤਰ ਲਈ ਅਸਲ Supabase ਪ੍ਰਮਾਣੀਕਰਨ ਕਨੈਕਸ਼ਨ ਦੀ ਲੋੜ ਹੈ।
            ਹੇਠ ਦਿੱਤੇ ਵਾਤਾਵਰਣ ਵੇਰੀਏਬਲ ਗੁੰਮ ਹਨ ਜਾਂ ਪਲੇਸਹੋਲਡਰ ਹਨ:
          </p>
          <div className="bg-white p-3 rounded-xl border border-amber-200 text-xs font-mono text-left mb-6 text-amber-900 overflow-x-auto">
            {missingConfigKeys.map((key) => (
              <div key={key}>• {key}</div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mb-6">
            ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ <code className="bg-slate-200 px-1 py-0.5 rounded">.env</code> ਫਾਈਲ ਵਿੱਚ ਅਸਲ ਕੁੰਜੀਆਂ ਦਰਜ ਕਰੋ ਅਤੇ ਸਰਵਰ ਨੂੰ ਮੁੜ ਚਾਲੂ ਕਰੋ।
          </p>
          <Button variant="outline" size="sm" onClick={() => window.history.back()} icon={ArrowLeft}>
            ਪਿੱਛੇ ਜਾਓ • Go Back
          </Button>
        </Card>
      </div>
    );
  }

  // Not signed in -> redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check: if profile has not loaded or role is not in allowed list
  if (allowedRoles && allowedRoles.length > 0) {
    if (!profile || !role || !allowedRoles.includes(role)) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto my-auto">
          <Card className="text-center p-6 border-rose-200 bg-rose-50/30">
            <Badge variant="danger" className="mb-3">
              ਅਣ-ਅਧਿਕਾਰਤ ਪਹੁੰਚ • Access Denied
            </Badge>
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              ਤੁਹਾਡੇ ਕੋਲ ਇਜਾਜ਼ਤ ਨਹੀਂ ਹੈ
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              ਇਹ ਪੰਨਾ ਸਿਰਫ਼ <strong>{allowedRoles.join(', ')}</strong> ਭੂਮਿਕਾ ਵਾਲੇ ਉਪਭੋਗਤਾਵਾਂ ਲਈ ਉਪਲਬਧ ਹੈ।
              ਤੁਹਾਡੀ ਮੌਜੂਦਾ ਭੂਮਿਕਾ: <strong>{role || 'ਵਿਦਿਆਰਥੀ (ਅਣਪਛਾਤੀ)'}</strong>.
            </p>
            <Button variant="outline" size="sm" onClick={() => window.history.back()} icon={ArrowLeft}>
              ਪਿੱਛੇ ਜਾਓ • Return
            </Button>
          </Card>
        </div>
      );
    }
  }

  return <>{children}</>;
};
