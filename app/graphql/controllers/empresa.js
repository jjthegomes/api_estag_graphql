import bcrypt from "bcryptjs";
import Empresa from "../../models/empresa";

module.exports = {
  createEmpresa: async args => {
    console.log(args);

    try {
      const existingEmpresa = await Empresa.findOne({
        email: args.empresaInput.email
      });

      if (existingEmpresa) throw new Error("Empresa already exists.");

      const hashedPassword = await bcrypt.hash(args.empresaInput.senha, 12);
      const empresa = new Empresa({
        ...args.empresaInput,
        email: args.empresaInput.email,
        senha: hashedPassword
      });
      const result = await empresa.save();
      return { ...result._doc, senha: null, _id: result.id };
    } catch (error) {
      throw error;
    }
  }
};
