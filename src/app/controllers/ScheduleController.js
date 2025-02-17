import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const isUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!isUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const passedDate = parseISO(req.query.date);
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(passedDate), endOfDay(passedDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
