import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Admin from 'App/Models/Admin';

export default class AdminsController {
  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['full_name', 'email', 'password']);

    const verifyIfAdminExists = await Admin.findBy('email', data.email);
    if (verifyIfAdminExists) {
      return response.status(400).json({ message: 'Email já existente' });
    }

    const admin = await Admin.create(data);

    return admin;
  }

  public async show({ auth }: HttpContextContract) {
    const admin = await Admin.findOrFail(auth.user?.id);
    return admin;
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const admin = await Admin.findOrFail(auth.user?.id);
    const {
      full_name: fullName,
      email,
      password,
    } = request.only(['full_name', 'email', 'password']);

    const verifyIfEmailExists = await Admin.findBy('email', email);

    if (verifyIfEmailExists && verifyIfEmailExists.id !== auth.user?.id) {
      return response.status(400).json({ message: 'Email já existente' });
    }

    admin.merge({ full_name: fullName, email });
    if (password) admin.merge({ password });
    await admin.save();

    return admin;
  }

  public async destroy({ auth }: HttpContextContract) {
    const admin = await Admin.findOrFail(auth.user?.id);
    await admin.delete();
  }
}
