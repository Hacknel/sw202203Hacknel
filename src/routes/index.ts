import { Router} from 'express';

import CashFlowRouter  from './CashFlows';
import UserRouter  from './Users';

const router  = Router();

// http://localhost:3001/cashflow/byindex/1
router.use('/cashflow', CashFlowRouter);
router.use('/user', UserRouter);

export default router;
