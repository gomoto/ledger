import { AppSync }  from 'aws-sdk';
import { promisify } from 'util';

const appsync = new AppSync({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const startSchemaCreation = promisify<AppSync.StartSchemaCreationRequest, AppSync.StartSchemaCreationResponse>(appsync.startSchemaCreation.bind(appsync));
const getSchemaCreationStatus = promisify<AppSync.GetSchemaCreationStatusRequest, AppSync.GetSchemaCreationStatusResponse>(appsync.getSchemaCreationStatus.bind(appsync));
const getResolver = promisify<AppSync.GetResolverRequest, AppSync.GetResolverResponse>(appsync.getResolver.bind(appsync));
const createResolver = promisify<AppSync.CreateResolverRequest, AppSync.CreateResolverResponse>(appsync.createResolver.bind(appsync));
const updateResolver = promisify<AppSync.UpdateResolverRequest, AppSync.UpdateResolverResponse>(appsync.updateResolver.bind(appsync));

export const configuredAppSync = {
  getResolver,
  createResolver,
  updateResolver,
  startSchemaCreation,
  getSchemaCreationStatus,
}
