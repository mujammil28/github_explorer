import { Router } from 'express';
import{getGithubUser} from '../controllers/userController';

const router=Router();
router.get('/:username',getGithubUser);

export default Router;
