import Router from '@koa/router';
import record from './record.ts';

const router = new Router({
  prefix: '/api',
});

router.get('/', async (ctx) => {
  ctx.type = 'html';
  ctx.body = '<h1>hello world!</h1>';
});

router.use(record.routes(), record.allowedMethods());

export default router;
