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
          paymentMethod {
            id
            legacyId
          }
          customer {
            id
            legacyId
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

export async function chargePaymentMethod(options: ICallOptions) {
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
      paymentMethod {
        id
        legacyId
      }
      customer {
        id
        legacyId
      }
    }
    `;
  const query = `mutation chargePaymentMethod($input: ChargePaymentMethodInput!) {
    chargePaymentMethod(input: $input) {
      ${response}
    }
  }`;
  const payload = {
    query: query,
    variables: {
      input: {
        paymentMethodId: options.id,
        transaction: options.data
      }
    }
  };

  return await request(payload, options.headers);
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
        paymentMethod {
          id
          legacyId
        }
        customer {
          id
          legacyId
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
        paymentMethod {
          id
          legacyId
        }
        customer {
          id
          legacyId
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

export async function chargeCreditCard(options: ICallOptions) {
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
        paymentMethod {
          id
          legacyId
        }
        customer {
          id
          legacyId
        }
      }`;

  const query = `mutation chargeCreditCard($input: ChargeCreditCardInput!) {
    chargeCreditCard(input: $input) {
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

export async function ceateTransactionRiskContext(options: ICallOptions) {
  const query = `mutation CreateTransactionRiskContext($input: CreateTransactionRiskContextInput!) {
    createTransactionRiskContext(input: $input) {
      clientMetadataId
  }
  }`;

  const payload = {
    query,
    variables: {
      input: {
        riskContext: {
          fields: options.data
        }
      }
    }
  };

  return await request(payload, options.headers);
}
