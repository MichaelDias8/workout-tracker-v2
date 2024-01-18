// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { OrderedProgramList, Program, TrainingSession, Exercise } = initSchema(schema);

export {
  OrderedProgramList,
  Program,
  TrainingSession,
  Exercise
};