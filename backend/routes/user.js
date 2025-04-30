import { Router } from 'express';
import{getGithubUser} from '../controllers/userController';

Router.get('/:username',getGithubUser);

export default Router;
