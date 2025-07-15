/*import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
// import boardsData from "../data.json";
// import { BoardType,TaskType,SubtaskType,ColumnType, BoardState } from "@/types";

const initialState: BoardState = {
    // boards: [{id_board: -1, board_name: "",column: []}],
    boards: boardsData.boards,
    // activeBoardId: null,
    activeBoardId: boardsData.boards[0].id_board,
    selectedBoard: null,
    selectedTask: {},
    status: "idle",
    error: null,
};

const bookingSlice = createSlice({
    name: "boards",
    initialState,
    // extraReducers: (builder) => {
    //     builder
    //       .addCase(fetchBoards.pending, (state) => {
    //         state.status = 'loading';
    //         state.error = null;
    //       })
    //       .addCase(fetchBoards.fulfilled, (state, action) => {
    //         state.status = "received";
    //         state.boards = action.payload;
    //         if (state.activeBoardId === null && state.boards.length > 0) {
    //             state.activeBoardId = state.boards[0].id_board;
    //         }
    //       })
    //       .addCase(fetchBoards.rejected, (state, action) => {
    //         state.status = "rejected";
    //         state.error = action.payload || "Cannot load data";
    //       });
    // },
    reducers: {
        // setActiveBoard: (state, action: PayloadAction<number | null>) => {
        //     state.activeBoardId = action.payload;
        // }
    }
});

export const {
    
} = bookingSlice.actions;

export default bookingSlice.reducer;
*/