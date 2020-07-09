import * as Yup from 'yup';

class UserValidator {
  async store(req, res, next) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .required()
          .email(),
        password: Yup.string()
          .min(6)
          .required(),
      });

      await schema.validate(req.body);
      return next();
    } catch (err) {
      return res.status(400).json({
        error: 'Validations fails',
        message: err.message,
      });
    }
  }

  async update(req, res, next) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string(),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
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

export default new UserValidator();
