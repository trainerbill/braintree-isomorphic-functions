import { request } from "../util";

const TOKENIZE_CUSTOM_ACTIONS_PAYMENT_METHOD = `mutation TokenizeCustomActionsPaymentMethod($input: TokenizeCustomActionsPaymentMethodInput!) {
    tokenizeCustomActionsPaymentMethod(input: $input){
      paymentMethod {
        id
        usage
        details {
          ... on CustomActionsPaymentMethodDetails {
            actionName
            fields {
              name
              displayValue
            }
          }
        }
      }
    }
  }`;

export async function tokenize(
  actionName: string,
  fields: any[],
  headers?: any
) {
  const payload = {
    query: TOKENIZE_CUSTOM_ACTIONS_PAYMENT_METHOD,
    variables: {
      input: {
        customActionsPaymentMethod: {
          actionName,
          fields
        }
      }
    }
  };

  return await request(payload, headers);
}
