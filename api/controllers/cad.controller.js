import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import { errorHandler } from "../utils/erros.js";
import jwt from 'jsonwebtoken';


export const cadastro = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    try {
        await newUser.save();
        res.status(201).json('Usuario criado com sucesso!');
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'Usuário não encontrado!'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Senha ou email inválidos!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    // ✅ CONFIGURAÇÃO CORRIGIDA PARA DESENVOLVIMENTO
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: false, // MUDAR para false em desenvolvimento
        sameSite: 'Lax', // MUDAR de 'None' para 'Lax'
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/', // Adicionar path explícito
      })
      .status(200)
      .json(rest);

     // Detectar se está em produção
const isProduction = process.env.NODE_ENV === 'production';

res
  .cookie('access_token', token, {
    httpOnly: true,
    secure: isProduction, // Só true em produção (HTTPS)
    sameSite: isProduction ? 'None' : 'Lax', // 'None' exige HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  })
  .status(200)
  .json(rest);
   
  } catch (error) {
    next(error);
  }
};
//Cadastar um usuario com o google
export const google = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: req.body.hashedPassword,
                avatar: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error)
    }
}