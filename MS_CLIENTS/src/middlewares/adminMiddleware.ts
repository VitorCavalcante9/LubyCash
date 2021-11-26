import { NextFunction, Request, Response } from 'express';

export default function adminMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json({ message: 'Somente administradores tem acesso a esse serviço' });
  }

  const token = authorization.replace('Bearer', '').trim();

  if (token !== process.env.ADMIN_SECRET) {
    return response
      .status(401)
      .json({ message: 'Somente administradores tem acesso a esse serviço' });
  }

  next();
}
