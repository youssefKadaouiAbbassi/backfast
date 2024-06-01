import { withLocaleMiddleware } from '@/middlewares/localeMiddleware';
import { chain } from '@/middlewares/chain';

export default chain([withLocaleMiddleware]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
