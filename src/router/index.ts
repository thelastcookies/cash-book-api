import Router from '@koa/router';

const router = new Router({
  prefix: '/api',
});

router.get('/', async (ctx) => {
  ctx.type = 'html';
  ctx.body = '<h1>hello world!</h1>';
});

export default router;
