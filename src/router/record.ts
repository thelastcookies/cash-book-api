import Router from '@koa/router';
import { recordController } from '../controller';

const router = new Router({
  prefix: '/record',
});

router.get('/', recordController.list);
router.get('/:id', recordController.detail);
router.post('/', recordController.save);
router.put('/:id', recordController.save);
router.delete('/:id', recordController.remove);

export default router;
