import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Users,
  WifiOff,
  Sparkles,
  ArrowRight,
  FileQuestion,
  GraduationCap,
} from 'lucide-react';
import { config } from '@/config/env';
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui';

export const StudentHomePage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
      {/* Welcome Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-emerald-800 text-white p-6 sm:p-8 shadow-md mb-8">
        <div className="relative z-10 max-w-xl">
          <Badge variant="brand" className="bg-white/20 text-white border-white/30 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 mr-1 inline" />
            <span>ਡਿਜੀਟਲ ਸਾਖਰਤਾ ਮਿਸ਼ਨ • Rural Digital Literacy</span>
          </Badge>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            ਜੀ ਆਇਆਂ ਨੂੰ, ਵਿਦਿਆਰਥੀਓ!
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6">
            ਕੰਪਿਊਟਰ ਚਲਾਉਣਾ ਸਿੱਖੋ, ਇੰਟਰਨੈੱਟ ਸੁਰੱਖਿਆ ਬਾਰੇ ਜਾਣੋ ਅਤੇ ਮਜ਼ੇਦਾਰ ਕੁਇਜ਼ ਹੱਲ ਕਰੋ।
            ਬਿਨਾਂ ਇੰਟਰਨੈੱਟ ਦੇ ਵੀ ਪੜ੍ਹੋ!
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/lessons">
              <Button
                variant="primary"
                size="md"
                className="bg-white text-brand-800 hover:bg-emerald-50 active:bg-emerald-100 font-bold border-transparent"
                icon={BookOpen}
                iconPosition="left"
              >
                ਪਾਠ ਸ਼ੁਰੂ ਕਰੋ • Start Lessons
              </Button>
            </Link>
            <Link to="/quizzes">
              <Button
                variant="outline"
                size="md"
                className="bg-brand-800/40 hover:bg-brand-800/70 text-white border-white/30"
                icon={FileQuestion}
                iconPosition="left"
              >
                ਕੁਇਜ਼ ਲਓ • Take Quiz
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background visual */}
        <div className="absolute -right-8 -bottom-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </section>

      {/* Quick Action Cards Grid */}
      <section aria-labelledby="quick-actions-heading" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 id="quick-actions-heading" className="text-lg font-bold text-slate-800">
            ਤੁਰੰਤ ਪਹੁੰਚ • Quick Navigation
          </h2>
          <span className="text-xs text-slate-500 font-normal">{config.appTitle}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/lessons" className="block focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-2xl">
            <Card interactive className="h-full flex flex-col justify-between group">
              <div>
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <Badge variant="brand" size="sm">ਮੁਫ਼ਤ • Free</Badge>
                </CardHeader>
                <CardTitle className="group-hover:text-brand-700 transition-colors">
                  ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ
                </CardTitle>
                <CardDescription>
                  ਕੰਪਿਊਟਰ ਬੁਨਿਆਦ, ਕੀਬੋਰਡ, ਮਾਊਸ, ਅਤੇ ਇੰਟਰਨੈੱਟ ਸੁਰੱਖਿਆ ਦੇ ਪਾਠ।
                </CardDescription>
              </div>
              <CardFooter className="text-xs font-semibold text-brand-600">
                <span>ਪਾਠ ਵੇਖੋ</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </CardFooter>
            </Card>
          </Link>

          <Link to="/progress" className="block focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-2xl">
            <Card interactive className="h-full flex flex-col justify-between group">
              <div>
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <Badge variant="warning" size="sm">ਲੋਕਲ • Offline</Badge>
                </CardHeader>
                <CardTitle className="group-hover:text-amber-700 transition-colors">
                  ਮੇਰੀ ਤਰੱਕੀ ਅਤੇ ਸਕੋਰ
                </CardTitle>
                <CardDescription>
                  ਤੁਹਾਡੇ ਮੁਕੰਮਲ ਕੀਤੇ ਪਾਠ ਅਤੇ ਕੁਇਜ਼ਾਂ ਦੇ ਅੰਕੜੇ ਇੱਥੇ ਦਿਖਾਈ ਦਿੰਦੇ ਹਨ।
                </CardDescription>
              </div>
              <CardFooter className="text-xs font-semibold text-amber-700">
                <span>ਤਰੱਕੀ ਦੇਖੋ</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </CardFooter>
            </Card>
          </Link>

          <Link to="/teacher" className="block focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-2xl">
            <Card interactive className="h-full flex flex-col justify-between group">
              <div>
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <Badge variant="info" size="sm">ਜਮਾਤ • Class</Badge>
                </CardHeader>
                <CardTitle className="group-hover:text-sky-700 transition-colors">
                  ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ
                </CardTitle>
                <CardDescription>
                  ਜਮਾਤ ਦੀ ਸਮੁੱਚੀ ਕਾਰਗੁਜ਼ਾਰੀ ਅਤੇ ਲੋੜਵੰਦ ਵਿਦਿਆਰਥੀਆਂ ਦੀ ਜਾਣਕਾਰੀ।
                </CardDescription>
              </div>
              <CardFooter className="text-xs font-semibold text-sky-700">
                <span>ਡੈਸ਼ਬੋਰਡ ਖੋਲ੍ਹੋ</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </CardFooter>
            </Card>
          </Link>
        </div>
      </section>

      {/* Offline Feature Callout */}
      <section className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
        <div className="p-3 rounded-xl bg-brand-50 text-brand-700 shrink-0">
          <WifiOff className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-slate-900 text-sm">
              ਆਫ਼ਲਾਈਨ ਪੜ੍ਹਾਈ ਦੀ ਸਹੂਲਤ (Offline Learning Enabled)
            </h3>
            <Badge variant="success" size="sm">
              <GraduationCap className="w-3 h-3 inline mr-1" />
              ਸਰਗਰਮ
            </Badge>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            ਇੰਟਰਨੈੱਟ ਬੰਦ ਹੋਣ ’ਤੇ ਵੀ ਤੁਸੀਂ ਪਾਠ ਪੜ੍ਹ ਸਕਦੇ ਹੋ ਅਤੇ ਕੁਇਜ਼ ਹੱਲ ਕਰ ਸਕਦੇ ਹੋ। ਨੈੱਟ ਆਉਣ ’ਤੇ ਨਤੀਜੇ ਆਪਣੇ ਆਪ ਸਿੰਕ ਹੋ ਜਾਣਗੇ।
          </p>
        </div>
      </section>
    </div>
  );
};
