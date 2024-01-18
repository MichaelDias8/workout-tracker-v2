import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier, CompositeIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerOrderedProgramList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderedProgramList, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly programOrder: (number | null)[];
  readonly programs?: (Program | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrderedProgramList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderedProgramList, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly programOrder: (number | null)[];
  readonly programs: AsyncCollection<Program>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OrderedProgramList = LazyLoading extends LazyLoadingDisabled ? EagerOrderedProgramList : LazyOrderedProgramList

export declare const OrderedProgramList: (new (init: ModelInit<OrderedProgramList>) => OrderedProgramList) & {
  copyOf(source: OrderedProgramList, mutator: (draft: MutableModel<OrderedProgramList>) => MutableModel<OrderedProgramList> | void): OrderedProgramList;
}

type EagerProgram = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<Program, ['id', 'orderedProgramListID']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly orderedProgramListID: string;
  readonly name: string;
  readonly trainingSessionOrder: (number | null)[];
  readonly trainingSessions?: (TrainingSession | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderedProgramListProgramsId?: string | null;
}

type LazyProgram = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<Program, ['id', 'orderedProgramListID']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly orderedProgramListID: string;
  readonly name: string;
  readonly trainingSessionOrder: (number | null)[];
  readonly trainingSessions: AsyncCollection<TrainingSession>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderedProgramListProgramsId?: string | null;
}

export declare type Program = LazyLoading extends LazyLoadingDisabled ? EagerProgram : LazyProgram

export declare const Program: (new (init: ModelInit<Program>) => Program) & {
  copyOf(source: Program, mutator: (draft: MutableModel<Program>) => MutableModel<Program> | void): Program;
}

type EagerTrainingSession = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<TrainingSession, ['id', 'orderedProgramListID', 'programID']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly programID: string;
  readonly orderedProgramListID: string;
  readonly name: string;
  readonly exerciseOrder: (number | null)[];
  readonly exercises?: (Exercise | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly programTrainingSessionsId?: string | null;
  readonly programTrainingSessionsOrderedProgramListID?: string | null;
}

type LazyTrainingSession = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<TrainingSession, ['id', 'orderedProgramListID', 'programID']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly programID: string;
  readonly orderedProgramListID: string;
  readonly name: string;
  readonly exerciseOrder: (number | null)[];
  readonly exercises: AsyncCollection<Exercise>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly programTrainingSessionsId?: string | null;
  readonly programTrainingSessionsOrderedProgramListID?: string | null;
}

export declare type TrainingSession = LazyLoading extends LazyLoadingDisabled ? EagerTrainingSession : LazyTrainingSession

export declare const TrainingSession: (new (init: ModelInit<TrainingSession>) => TrainingSession) & {
  copyOf(source: TrainingSession, mutator: (draft: MutableModel<TrainingSession>) => MutableModel<TrainingSession> | void): TrainingSession;
}

type EagerExercise = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<Exercise, ['id', 'orderedProgramListID', 'programID', 'trainingSessionID']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly trainingSessionID: string;
  readonly programID: string;
  readonly orderedProgramListID: string;
  readonly name: string;
  readonly numSets: number;
  readonly minReps: number;
  readonly maxReps: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly trainingSessionExercisesId?: string | null;
  readonly trainingSessionExercisesOrderedProgramListID?: string | null;
  readonly trainingSessionExercisesProgramID?: string | null;
}

type LazyExercise = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<Exercise, ['id', 'orderedProgramListID', 'programID', 'trainingSessionID']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly trainingSessionID: string;
  readonly programID: string;
  readonly orderedProgramListID: string;
  readonly name: string;
  readonly numSets: number;
  readonly minReps: number;
  readonly maxReps: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly trainingSessionExercisesId?: string | null;
  readonly trainingSessionExercisesOrderedProgramListID?: string | null;
  readonly trainingSessionExercisesProgramID?: string | null;
}

export declare type Exercise = LazyLoading extends LazyLoadingDisabled ? EagerExercise : LazyExercise

export declare const Exercise: (new (init: ModelInit<Exercise>) => Exercise) & {
  copyOf(source: Exercise, mutator: (draft: MutableModel<Exercise>) => MutableModel<Exercise> | void): Exercise;
}