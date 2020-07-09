import * as Yup from 'yup';

class AppointmentValidator {
  async store(req, res, next) {
    try {
      const schema = Yup.object().shape({
        provider_id: Yup.number()
          .integer()
          .required(),
        date: Yup.date().required(),
      });

      await schema.validate(req.body);
      return next();
    } catch (err) {
      return res.status(400).json({
        error: 'Validation fails',
        message: err.message,
      });
    }
  }
}

export default new AppointmentValidator();
