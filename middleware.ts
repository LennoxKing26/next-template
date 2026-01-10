// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 只匹配应用路由，排除 api、静态资源等
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
