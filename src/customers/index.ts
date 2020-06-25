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

export async function search(data: any, headers?: any) {
  const payload = {
    query: `query Search($input: CustomerSearchInput!) {
      search {
        customers(input: $input) {
          pageInfo {
            hasNextPage
            startCursor
            endCursor
          },
          edges {
            node {
              id
              firstName
              lastName
              email
              legacyId
            }
          }
        }
      }
    }`,
    variables: {
      input: {
        ...data
      }
    }
  };

  return await request(payload);
}
