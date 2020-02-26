import { request } from "../util";

export async function create(data: any, headers?: any) {
  const payload = {
    query: `mutation createCustomer($input: CreateCustomerInput!) {
            createCustomer(input: $input) {
            customer {
                id
                legacyId
            }
        }
    }`,
    variables: {
      input: {
        customer: {
          ...data
        }
      }
    }
  };

  return await request(payload);
}
