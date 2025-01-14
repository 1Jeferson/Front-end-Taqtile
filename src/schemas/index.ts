import { z } from 'zod';

export const ValidationLoginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z
    .string()
    .nonempty({ message: 'Senha é obrigatória.' })
    .min(7, { message: 'A senha deve conter pelo menos 7 caracteres.' })
    .regex(/(?=.*[a-zA-Z])(?=.*\d)/, { message: 'A senha deve conter pelo menos um número e uma letra.' }),
});

export const ValidationCreateUserSchema = z.object({
  name: z.string().nonempty({ message: 'Nome é obrigatório.' }),
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z
    .string()
    .nonempty({ message: 'Senha é obrigatória.' })
    .min(7, { message: 'A senha deve conter pelo menos 7 caracteres.' })
    .regex(/(?=.*[a-zA-Z])(?=.*\d)/, { message: 'A senha deve conter pelo menos um número e uma letra.' }),
  phone: z
    .string()
    .nonempty({ message: 'Telefone é obrigatório.' })
    .regex(/^\d{10,11}$/, { message: 'Telefone deve conter entre 10 e 11 dígitos numéricos.' }),
  birthDate: z
    .string()
    .nonempty({ message: 'Data de nascimento é obrigatória.' })
    .refine(
      (dateStr) => {
        const date = new Date(dateStr);
        return !isNaN(date.getTime()) && date <= new Date();
      },
      { message: 'Data de nascimento inválida ou no futuro.' },
    ),
  role: z.string().nonempty({ message: 'Tipo de usuário é obrigatória.' }),
});
