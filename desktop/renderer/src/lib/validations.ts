import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Email invalide"),
    password: z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères"),
});
export const signUpSchema = z.object({
    name : z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
    email : z.email("Email invalide"),
    password : z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères"),
});

export type SignUpFormSchema = z.infer<typeof signUpSchema>;
export type LoginFormSchema = z.infer<typeof loginSchema>;
