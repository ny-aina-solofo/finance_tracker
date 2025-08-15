import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Eye } from "lucide-react";
import { LoginFormSchema, loginSchema } from '@/lib/validations'
import usersService from "@/services/users/users.service";
import { toast } from "sonner"

const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);    
    const navigate = useNavigate();
    
    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const togglePassword = () => {
        setShowPassword((prev) => !prev)
    }
    const { reset, formState: { isSubmitting }} = form
    
    async function onSubmit(values: LoginFormSchema) {
        try {
            await usersService.signIn(values.email,values.password);
            toast.success("connexion réussie");
            reset({
                email: '',
                password: '',
            })
            navigate('/dashboard');
        } catch (error){
            console.error(error);
            toast.error("Erreur lors de la connexion");
        };
        
    }
    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card className="">
                <CardHeader className="">
                    <CardTitle className="text-xl text-center">Login</CardTitle>
                    <CardDescription>
                        Connectez-vous afin d'accéder à l'application en toutes sécurités 
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem className="relative ">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl className="grid gap-3">
                                        <Input type="email" placeholder="Entrez votre email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl className="grid gap-3">
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Entrez votre mot de passe"
                                                {...field}
                                            />
                                            <button
                                                onClick={togglePassword}
                                                type="button"
                                                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                                            >
                                                <Eye />
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        au moins 8 caractères
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />        
                        </CardContent>
                        <CardFooter className="mt-4 flex-col gap-2">    
                            <Button
                                disabled={isSubmitting}
                                className="w-full"
                                type="submit"
                            >
                                Se connecter
                            </Button>
                            <div
                                className=" mt-4 text-center text-sm text-preset-4 inline-flex 
                                items-center gap-2 truncate text-center font-normal text-grey-500"
                            >
                                vous n'avez pas de compte?{' '}
                                <span 
                                    className="cursor-pointer font-bold text-grey-900 underline"
                                    onClick={()=>navigate('/signup')}
                                >
                                    S'inscrire
                                </span>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

export default LoginForm;
