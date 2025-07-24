import { Routes, Route, useNavigate } from "react-router";
import { Budget, Transactions } from "./components";

const App = () => {
    return (
        <div className="h-full w-full bg-Light-Mode-Background">
            <Transactions/>
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
