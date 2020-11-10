import * as expresss from 'express';

import orgRoutes from './organization.route';
import userRoutes from './user.routes';
import roleRoutes from './role.routes';

const router = expresss.Router();

router.use('/org', orgRoutes);
router.use('/user', userRoutes);
router.use('/role', roleRoutes);

export default router;
