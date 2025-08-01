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

const SignupForm = () => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);    
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
            // router.push('/login')
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
    }
    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Bienvenue</CardTitle>
                    <CardDescription>
                        Créez un compte pour gérer vos budgets en toutes sécurités 
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-6"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem className="grid gap-3">
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
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
                                <FormItem className="relative grid gap-3">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl className="">
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
                                        Le mot de passe doit comporter au moins 8 caractères
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <CardFooter className="flex-col gap-2">
                                <Button
                                    disabled={isSubmitting}
                                    className="w-full"
                                    type="submit"
                                    loading={isSubmitting}
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
                                    <span className="font-bold text-grey-900 underline">Se connecter</span>
                                </div>
                            </CardFooter>        
                        </form>
                    </Form>
                </CardContent>
                
            </Card>
            {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div> */}
        </div>
    )
}

export default SignupForm;
