import { CONFIG } from "./config";

export async function request(payload?: any, headers: any = {}) {
  const options = {
    method: "POST",
    headers: {
      ...CONFIG.get("BRAINTREE_SECURE_HEADERS"),
      ...headers
    },
    body: JSON.stringify(payload)
  };
  return await fetch(`${CONFIG.get("BRAINTREE_HOSTNAME")}`, options);
}
