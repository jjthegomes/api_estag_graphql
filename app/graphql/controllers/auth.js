import bcrypt from "bcryptjs";
import Usuario from "../../models/usuario";

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await Usuario.findOne({
        email: args.userInput.email
      });

      if (existingUser) throw new Error("Usuario exists already.");

      const hashedPassword = await bcrypt.hash(args.userInput.senha, 12);
      const usuario = new Usuario({
        nome: args.userInput.nome,
        email: args.userInput.email,
        senha: hashedPassword
      });
      const result = await usuario.save();
      return { ...result._doc, senha: null, _id: result.id };
    } catch (error) {
      throw error;
    }
  }
};
