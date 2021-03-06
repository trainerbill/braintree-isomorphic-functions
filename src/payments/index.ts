import { request } from "../util";
import { ICallOptions } from "../interfaces";

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
  schema: string,
  headers?: any
) {
  const query =
    schema ||
    `mutation chargePaymentMethod($input: ChargePaymentMethodInput!) {
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
  }`;
  const payload = {
    query: query,
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
                customer {
                  id
                  legacyId
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

export async function refundTransaction(
  transactionId: string,
  refund: any,
  headers?: any
) {
  const payload = {
    query: `mutation refundTransaction($input: RefundTransactionInput!) {
      refundTransaction(input: $input) {
            refund {
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
        refund
      }
    }
  };

  return await request(payload, headers);
}

export async function chargePayPalAccount(options: ICallOptions) {
  const response =
    options.response ||
    `
    billingAgreementWithPurchasePaymentMethod {
      id
      legacyId
      customer {
        id
      }
      details {
        ... on PayPalAccountDetails {
          email
        }
      }
    }
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
      }`;

  const query = `mutation chargePayPalAccount($input: ChargePayPalAccountInput!) {
    chargePayPalAccount(input: $input) {
          ${response}
      }
  }`;

  const payload = {
    query,
    variables: {
      input: {
        paymentMethodId: options.id,
        transaction: options.data
      }
    }
  };

  return await request(payload, options.headers);
}

export async function chargeVenmoAccount(options: ICallOptions) {
  const response =
    options.response ||
    `
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
      }`;

  const query = `mutation chargeVenmoAccount($input: ChargeVenmoAccountInput!) {
    chargeVenmoAccount(input: $input) {
          ${response}
      }
  }`;

  const payload = {
    query,
    variables: {
      input: {
        paymentMethodId: options.id,
        transaction: options.data
      }
    }
  };

  return await request(payload, options.headers);
}
