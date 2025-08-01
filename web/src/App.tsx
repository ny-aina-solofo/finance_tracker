import { Routes, Route, useNavigate } from "react-router";
import { Budget, Transactions } from "./components";
import SignupForm from "./components/Form/SignUpForm";
import { Toaster } from "sonner";


const App = () => {
    return (
        <div className="h-full w-full bg-Light-Mode-Background">
            <SignupForm/>
            <Toaster position="bottom-center" richColors/>
            {/* <Transactions/> */}
            {/* <Budget/> */}
        </div>
        // <Routes>
        //     <Route  
        //         path="/"
        //         element= {    
        //             <Board/>
        //         }
        //     />
        //     <Route
        //         path="/view-task/:id_task"
        //         element= {
        //             <ViewTask />
        //         }
        //     />
        // </Routes>
    )
}

export default App;
