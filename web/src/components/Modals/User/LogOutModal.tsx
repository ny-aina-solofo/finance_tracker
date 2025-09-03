import React, { useState,useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useNavigate } from "react-router";
import userService from "@/services/users/users.service";
import { IconLogout } from "@tabler/icons-react";


interface Props {
    setIsDropdownOpen:(data:boolean) => void; 
}

const LogOutModal = ({setIsDropdownOpen}:Props)=> {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const logout = ()=>{
        try {
            userService.logout();
            navigate('/');
        } catch (error){
            console.error(error);
        };
        setIsModalOpen(false);
    }    
    const handleReset = ()=>{
        setIsModalOpen(false);
        setIsDropdownOpen(false);
    }
    return (
        <Dialog  open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger>
                <div className="flex cursor-pointer">
                    <IconLogout className="!size-5"  />
                    <span className="ms-4">Se déconnecter</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <p>
                    Tu es sûr de vouloir quitter l'application ? 
                </p>
                <DialogFooter>
                    <Button 
                        type="button"
                        onClick={logout}
                    >
                        Se déconnecter
                    </Button>
                    <Button 
                        variant="secondary"
                        type="button"
                        onClick={handleReset}
                    >
                        Annuler
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
    )
}
export default LogOutModal;