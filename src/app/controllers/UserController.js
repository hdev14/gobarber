import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const emailExists = User.findOne({ where: { email: req.body.email } });

    if (!emailExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);
    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const emailExists = User.findOne({ where: { email: req.body.email } });

      if (!emailExists) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const { id, name, provider, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
    });
    return res.json({
      id,
      name,
      email,
      provider,
      avatar,
    });
  }
}

export default new UserController();
