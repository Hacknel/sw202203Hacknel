import {Router} from 'express';
import { IUser, User } from '@libs/User';
import { commonValidator, validateInput } from '@server/utils/validator';

const router = Router();
const userInstance = new User();

router.get('/', async (_req, res)=>{
  try {
    res.json(await userInstance.getAllUsers());
  } catch (ex) {
    console.error(ex);
    res.status(503).json({error:ex});
  }
});

router.get('/byindex/:index', async (req, res) => {
  try {
    const { index } = req.params;
    res.json(await userInstance.getUserByIndex(+index));
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al obtener Registro'});
  }
});

router.post('/new', async (req, res)=>{
  try {
    const newUser = req.body as unknown as IUser;
    const { email } = req.body;
    const validateEmailSchema = commonValidator.email;
    validateEmailSchema.param="email";
    validateEmailSchema.required =true;
    const errors = validateInput({email}, [validateEmailSchema]);
    if(errors.length > 0){
      res.status(400).json(errors);
    }else{
      const newUserIndex = await userInstance.addUser(newUser);
      res.json({newIndex: newUserIndex});
    }
    
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.put('/update/:index', async (req, res)=>{
  try {
    const { index } = req.params;
    const userFromForm = req.body as IUser;
    await userInstance.updateUser(+index, userFromForm);
    res.status(200).json({"msg":"Registro Actualizado"});
  } catch(error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.delete('/delete/:index', (req, res)=>{
  try {
    const { index } = req.params;
    if (userInstance.deleteUser(+index)) {
      res.status(200).json({"msg": "Registro Eliminado"});
    } else {
      res.status(500).json({'msg': 'Error al eliminar Registro'});
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al eliminar Registro'});
  }
});



export default router;
