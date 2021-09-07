import { request } from "../util";
import { ICallOptions } from "../interfaces";

export async function vaultPaymentMethod(options: ICallOptions, headers?: any) {
  const response =
    options.response ||
    `
      paymentMethod {
        id
        legacyId
        usage
        details {
            __typename
        }
        customer {
          id
          legacyId
        }
    }
    verification {
        status
    }
    `;

  const query = `mutation vaultPaymentMethod($input: VaultPaymentMethodInput!) {
      vaultPaymentMethod(input: $input) {
        ${response}
      }
    }`;

  const payload = {
    query: query,
    variables: {
      input: options.data
    }
  };

  return await request(payload, headers);
}
