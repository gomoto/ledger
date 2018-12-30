import * as assert from 'assert';

export function getEnvironmentVariable(variableName: string): string {
  const variableValue = process.env[variableName];
  assert(variableValue, `Missing environment variable ${variableName}`);
  return variableValue;
}
