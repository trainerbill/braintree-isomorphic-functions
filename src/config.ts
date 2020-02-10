import btoa from "btoa";
import { isNode, isBrowser } from "browser-or-node";

export const CONFIG = new Map();

CONFIG.set("BRAINTREE_API_VERSION", "2019-01-01");

// Server Config
if (isNode) {
  CONFIG.set("BRAINTREE_PUBLIC_KEY", process.env.BRAINTREE_PUBLIC_KEY);
  CONFIG.set("BRAINTREE_PRIVATE_KEY", process.env.BRAINTREE_PRIVATE_KEY);
  CONFIG.set("BRAINTREE_GATEWAY_ID", process.env.PAYPAL_ENVIRONMENT);
  CONFIG.set(
    "BRAINTREE_TOKENIZATION_KEY",
    process.env.BRAINTREE_TOKENIZATION_KEY
  );
  CONFIG.set("BRAINTREE_ENVIRONMENT", process.env.BRAINTREE_ENVIRONMENT);
  CONFIG.set(
    "BRAINTREE_SECURE_KEY",
    btoa(
      `${process.env.BRAINTREE_PUBLIC_KEY}:${process.env.BRAINTREE_PRIVATE_KEY}`
    )
  );
} else if (isBrowser) {
  CONFIG.set(
    "BRAINTREE_PUBLIC_KEY",
    window.localStorage.getItem("BRAINTREE_PUBLIC_KEY")
  );
  CONFIG.set(
    "BRAINTREE_PRIVATE_KEY",
    window.localStorage.getItem("BRAINTREE_PRIVATE_KEY")
  );
  CONFIG.set(
    "BRAINTREE_GATEWAY_ID",
    window.localStorage.getItem("BRAINTREE_GATEWAY_ID")
  );
  CONFIG.set(
    "BRAINTREE_ENVIRONMENT",
    window.localStorage.getItem("BRAINTREE_ENVIRONMENT")
  );
  CONFIG.set(
    "BRAINTREE_TOKENIZATION_KEY",
    window.localStorage.getItem("BRAINTREE_TOKENIZATION_KEY")
  );
  CONFIG.set(
    "BRAINTREE_SECURE_KEY",
    window.btoa(
      `${window.localStorage.getItem(
        "BRAINTREE_PUBLIC_KEY"
      )}:${window.localStorage.getItem("BRAINTREE_PRIVATE_KEY")}`
    )
  );
}

CONFIG.set(
  "BRAINTREE_HOSTNAME",
  CONFIG.get("BRAINTREE_ENVIRONMENT") === "production"
    ? "https://payments.braintree-api.com/graphql"
    : "https://payments.sandbox.braintree-api.com/graphql"
);

CONFIG.set("BRAINTREE_SECURE_HEADERS", {
  Authorization: `Basic ${CONFIG.get("BRAINTREE_SECURE_KEY")}`,
  "Content-Type": "application/json",
  "Braintree-Version": CONFIG.get("BRAINTREE_API_VERSION")
});

CONFIG.set("BRAINTREE_PUBLIC_HEADERS", {
  Authorization: `Basic ${CONFIG.get("BRAINTREE_TOKENIZATION_KEY")}`,
  "Content-Type": "application/json",
  "Braintree-Version": CONFIG.get("BRAINTREE_API_VERSION")
});
