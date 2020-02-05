import { CONFIG } from "../config";

export async function chargePaymentMethod(headers?: any) {
  const payload = {
    query: `mutation ExampleCharge($input: ChargePaymentMethodInput!) {
          chargePaymentMethod(input: $input) {
            transaction {
              id
              status
            }
          }
        }`,
    variables: {
      input: {
        paymentMethodId: "88p4vm",
        transaction: {
          amount: "11.23"
        }
      }
    }
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `Basic ${CONFIG.get("BRAINTREE_SECURE_KEY")}`,
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify(payload)
  };
  return await fetch(`${CONFIG.get("BRAINTREE_HOSTNAME")}`, options);
}
