import { appsync } from './aws-appsync';

export interface IDeleteResolverOptions {
  typeName: string;
  fieldName: string;
}

// Delete resolver
export async function deleteResolver(options: IDeleteResolverOptions) {
  const response = await appsync.deleteResolver({
    apiId: process.env.APPSYNC_API_ID,
    typeName: options.typeName,
    fieldName: options.fieldName,
  });
  return response;
}
