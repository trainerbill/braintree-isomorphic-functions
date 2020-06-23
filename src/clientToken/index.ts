import { request } from "../util";

export async function create(data: any, headers?: any) {
  const payload = {
    query: `mutation createClientToken($input: CreateClientTokenInput!) {
        createClientToken(input: $input) {
            clientToken
        }
    }`,
    variables: {
      input: {
        clientToken: {
          ...data
        }
      }
    }
  };

  return await request(payload);
}
