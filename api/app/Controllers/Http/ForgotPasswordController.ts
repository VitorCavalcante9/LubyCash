import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Admin from 'App/Models/Admin';
import crypto from 'crypto';
import moment from 'moment';
import Bull from '@ioc:Rocketseat/Bull';
import Job from 'App/Jobs/ForgotPasswordMail';

export default class ForgotPasswordsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const email = request.input('email');

      const admin = await Admin.findByOrFail('email', email);
      admin.token = crypto.randomBytes(10).toString('hex');
      admin.token_created_at = new Date();

      await admin.save();

      Bull.add(new Job().key, {
        email,
        token: admin.token,
        redirect_url: request.input('redirect_url'),
      });
    } catch (err) {
      console.log(err);
      return response.status(err.status).send({
        error: { message: 'Algo não deu certo, esse email existe?' },
      });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const { token, password } = request.only(['token', 'password']);

      const admin = await Admin.findByOrFail('token', token);
      const tokenExpired = moment().subtract('2', 'days').isAfter(admin.token_created_at);

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'O token de recuperação está expirado' } });
      }

      admin.token = null;
      admin.token_created_at = null;
      admin.password = password;

      await admin.save();
    } catch (err) {
      console.log(err);
      return response
        .status(err.status)
        .send({ error: { message: 'Algo deu errado ao resetar sua senha' } });
    }
  }
}
