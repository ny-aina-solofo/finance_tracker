import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { SignUpFormSchema, signUpSchema } from '@/lib/validations'
import usersService from "@/services/users/users.service";
import { toast } from "sonner"
import { useNavigate } from "react-router";

const SignupForm = () => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);    
    const navigate = useNavigate();

    const form = useForm<SignUpFormSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })
    const togglePassword = () => {
        setShowPassword((prev) => !prev)
    }
    const { reset, formState: { isSubmitting }} = form
    
    async function onSubmit(values: SignUpFormSchema) {
        try {
            await usersService.signUp(values.name,values.password,values.email);
            toast.success("Compte créé avec succès, vous pouvez maintenant vous connecter.");
            reset({
                name: '',
                email: '',
                password: '',
            })
            navigate('/');
        } catch (error){
            console.error(error);
            toast.error("Erreur lors de la création du compte");
        };
        
    }
    const handleReset = ()=> {
        reset({
            name: '',
            email: '',
            password: '',
        })
        navigate('/');
    }
    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card className="w-full max-w-sm">
                <CardHeader >
                    <CardTitle className="text-xl text-center">Bienvenue</CardTitle>
                    <CardDescription>
                        Créez un compte pour gérer vos budgets en toutes sécurités 
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl className="grid gap-3">
                                        <Input placeholder="Entrez un nom" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
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
                                Créer
                            </Button>
                            <Button
                                variant='outline'
                                onClick={handleReset}
                                className="w-full"
                                type="button"
                            >
                                Annuler
                            </Button>
                            <div
                                className=" mt-4 text-center text-sm text-preset-4 inline-flex 
                                items-center gap-2 truncate text-center font-normal text-grey-500"
                            >
                                Avez vous déjà un compte?{' '}
                                <span 
                                    className="cursor-pointer font-bold text-grey-900 underline"
                                    onClick={()=>navigate('/')}
                                >
                                    Se connecter
                                </span>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
            {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div> */}
        </div>
    )
}

export default SignupForm;
