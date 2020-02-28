import { request } from "../util";

export async function chargePaymentMethod(
    paymentMethodId: string,
    transaction: any,
    headers?: any
) {
    const payload = {
        query: `mutation chargePaymentMethod($input: ChargePaymentMethodInput!) {
          chargePaymentMethod(input: $input) {
            transaction {
              id
              legacyId
              status
              statusHistory {
                ... on GatewayRejectedEvent {
                  gatewayRejectionReason
                }
              }
            }
          }
        }`,
        variables: {
            input: {
                paymentMethodId,
                transaction
            }
        }
    };

    return await request(payload, headers);
}

export async function vaultPaymentMethod(
    paymentMethodId: string,
    customerId?: string,
    headers?: any
) {
    const payload = {
        query: `mutation vaultPaymentMethod($input: VaultPaymentMethodInput!) {
          vaultPaymentMethod(input: $input) {
            paymentMethod {
                id
                legacyId
                usage
                details {
                    __typename
                }
            }
            verification {
                status
            }
        }
    }`,
        variables: {
            input: {
                paymentMethodId,
                customerId
            }
        }
    };

    return await request(payload, headers);
}
