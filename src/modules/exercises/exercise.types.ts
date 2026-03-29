

export type CreateExerciseData = {
    name: string;
    notes?: string;
    workoutId: number;
    sets: number;
    reps?: number;
    weight?: number;
};
export type UpdateExerciseData = {
    name?: string;
    sets?: number;
    reps?: number;
    weight?: number;
    notes?: string;
};