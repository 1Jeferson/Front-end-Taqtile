import { z } from 'zod';

export const ValidationLoginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z
    .string()
    .nonempty({ message: 'Senha é obrigatória.' })
    .min(7, { message: 'A senha deve conter pelo menos 7 caracteres.' })
    .regex(/(?=.*[a-zA-Z])(?=.*\d)/, { message: 'A senha deve conter pelo menos um número e uma letra.' }),
});
