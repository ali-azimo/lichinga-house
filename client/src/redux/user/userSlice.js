import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Sign In
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signIFailure: (state, action) => {  // Mantido como signIFailure com I maiúsculo
            state.error = action.payload;
            state.loading = false;
        },

        // Update User
        updateUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Delete User
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Sign Out
        signOutUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Forgot Password
        forgotStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        forgotSuccess: (state) => {
            state.currentUser = null;  // Limpa usuário atual durante recuperação de senha
            state.loading = false;
            state.error = null;
        },
        forgotFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Clear Error (utilidade para limpar erros manualmente)
        clearError: (state) => {
            state.error = null;
        },

        // Reset State (logout completo ou reinicialização)
        resetState: () => initialState
    },
});

// Exportando todas as actions
export const {
    // Sign In
    signInStart,
    signInSuccess,
    signIFailure,  // Exportado com I maiúsculo

    // Update User
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,

    // Delete User
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,

    // Sign Out
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,

    // Forgot Password
    forgotStart,
    forgotSuccess,
    forgotFailure,

    // Utilities
    clearError,
    resetState
} = userSlice.actions;

export default userSlice.reducer;