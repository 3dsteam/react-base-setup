import {createSlice} from '@reduxjs/toolkit';

export interface FeedbackState {
    data: FeedbackDataState | null
}

export interface FeedbackDataState {
    /**
     * Title of the feedback
     */
    title: string
    /**
     * Feedback detail
     */
    content?: string
    /**
     * Type (default: 'info')
     */
    type?: FeedbackType
    /**
     * Duration (default: 3.5s)
     */
    timeout?: number
}

const slice = createSlice({
    name: 'feedback',
    initialState: {
        data: null
    } as FeedbackState,
    reducers: {
        showFeedback: (state: FeedbackState, action?) => {
            state.data = action?.payload;
        }
    }
});

export default slice.reducer;
export const {showFeedback} = slice.actions;
export enum FeedbackType {
    SUCCESS = 'e-toast-success',
    INFO = 'e-toast-info',
    WARNING = 'e-toast-warning',
    ERROR = 'e-toast-error'
}