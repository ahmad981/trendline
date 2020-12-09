import * as expresss from 'express';

import orgRoutes from './organization.route';
import userRoutes from './user.routes';
import roleRoutes from './role.routes';
import userProfRoute from './userprofile.routes';
import companyRoute from './company.route';
import industryRoute from './industry.routes';
import mediaUploadRoute from './mediaupload.route';
import jobRoutes from './job/job.routes';
import skillRoutes from './skill.routes';
import quizRoutes from './quiz.routes';
import applicationRoutes from './jobApplication.route';

const router = expresss.Router();

router.use('/org', orgRoutes);
router.use('/user', userRoutes);
router.use('/role', roleRoutes);
router.use('/userprofile', userProfRoute);
router.use('/company', companyRoute);
router.use('/industry', industryRoute);
router.use('/media', mediaUploadRoute);
router.use('/jobs', jobRoutes);
router.use('/skill', skillRoutes);
router.use('/quiz', quizRoutes);
router.use('/application', applicationRoutes);

export default router;
