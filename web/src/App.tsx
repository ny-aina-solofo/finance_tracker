import { Routes, Route, useNavigate } from "react-router";
import { Budget } from "./components";

const App = () => {
    return (
        <div className="h-full w-full bg-Light-Mode-Background">

            <Budget/>
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
