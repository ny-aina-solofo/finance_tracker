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
            <Card className="w-full max-w-sm shadow-md">
                <CardHeader >
                    <CardTitle className="text-xl text-center">Inscription</CardTitle>
                    <CardDescription>
                        Créez un compte pour gérer vos budgets en toutes sécurités 
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl >
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
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl >
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
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Mot de passe</FormLabel>
                                        <FormControl >
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
                                <div className="w-full flex flex-col gap-3">
                                    <Button
                                        disabled={isSubmitting}
                                        className="w-full"
                                        type="submit"
                                    >
                                        Créer
                                    </Button>
                                    <Button
                                        variant='secondary'
                                        onClick={handleReset}
                                        className="w-full"
                                        type="button"
                                    >
                                        Annuler
                                    </Button>
                                </div>
                            </div>
                            
                        </form>
                    </Form>
                </CardContent>                
                <CardFooter className="flex-col gap-2">
                    <div
                        className="text-center text-sm text-preset-4 inline-flex 
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
            </Card>
        </div>
    )
}

export default SignupForm;
