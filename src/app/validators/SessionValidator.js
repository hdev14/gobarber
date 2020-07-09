import * as Yup from 'yup';

class SessionValidator {
  async store(req, res, next) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .min(6)
          .required(),
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

export default new SessionValidator();
