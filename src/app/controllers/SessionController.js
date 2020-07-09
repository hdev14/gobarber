import jwt from 'jsonwebtoken';

import auth from '../../config/auth';
import User from '../models/User';
import File from '../models/File';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider, avatar } = user;
    const token = jwt.sign({ id }, auth.secretKey, {
      expiresIn: auth.expiresIn,
    });

    return res.json({
      user: { id, name, email, provider, avatar },
      token,
    });
  }
}

export default new SessionController();
