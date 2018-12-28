import { AppSync }  from 'aws-sdk';
import { appsync } from './aws-appsync';

export interface ISaveResolverOptions {
  typeName: string;
  fieldName: string;
  dataSourceName: string;
  requestMappingTemplate: string;
  responseMappingTemplate: string;
}

// Create or update resolver
export async function saveResolver(options: ISaveResolverOptions) {
  // First, does resolver already exist?
  let doesResolverExist: boolean;
  try {
    const getResolverRequest = {
      apiId: process.env.APPSYNC_API_ID,
      typeName: options.typeName,
      fieldName: options.fieldName,
    };
    await appsync.getResolver(getResolverRequest);
    doesResolverExist = true;
  } catch (e) {
    doesResolverExist = false;
  }
  const createOrUpdateResolverRequest = {
    apiId: process.env.APPSYNC_API_ID,
    typeName: options.typeName,
    fieldName: options.fieldName,
    dataSourceName: options.dataSourceName,
    requestMappingTemplate: options.requestMappingTemplate,
    responseMappingTemplate: options.responseMappingTemplate,
    kind: 'UNIT',
  };
  let response: AppSync.CreateResolverResponse | AppSync.UpdateResolverResponse;
  if (doesResolverExist) {
    response = await appsync.updateResolver(createOrUpdateResolverRequest);
  } else {
    response = await appsync.createResolver(createOrUpdateResolverRequest);
  }
  return response;
}
