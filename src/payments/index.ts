import { request } from "../util";

export async function authorizePaymentMethod(
  paymentMethodId: string,
  transaction: any,
  headers?: any
) {
  const payload = {
    query: `mutation authorizePaymentMethod($input: AuthorizePaymentMethodInput!) {
      authorizePaymentMethod(input: $input) {
        transaction {
          id
          legacyId
          amount {
            value
            currencyIsoCode
          }
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
              amount {
                value
                currencyIsoCode
              }
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

export async function captureTransaction(
  transactionId: string,
  transaction: any,
  headers?: any
) {
  const payload = {
    query: `mutation captureTransaction($input: CaptureTransactionInput!) {
          captureTransaction(input: $input) {
            transaction {
                id
                legacyId
                status
                amount {
                  value
                  currencyIsoCode
                }
            }
        }
    }`,
    variables: {
      input: {
        transactionId,
        transaction
      }
    }
  };

  return await request(payload, headers);
}

export async function partialCaptureTransaction(
  transactionId: string,
  transaction: any,
  headers?: any
) {
  const payload = {
    query: `mutation partialCaptureTransaction($input: PartialCaptureTransactionInput!) {
      partialCaptureTransaction(input: $input) {
            capture {
                id
                legacyId
                status
                amount {
                  value
                  currencyIsoCode
                }
            }
        }
    }`,
    variables: {
      input: {
        transactionId,
        transaction
      }
    }
  };

  return await request(payload, headers);
}
