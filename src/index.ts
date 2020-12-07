import * as Payments from "./payments";
import * as Customers from "./customers";
import * as ClientToken from "./clientToken";
import * as CustomActions from "./customActions";
import { request } from "./util";

export async function Batch(payload: any) {
  return await request(payload, {
    "Content-Type": "application/vnd+braintree.graphql.batch.v0+json"
  });
}

export { Payments, Customers, ClientToken, CustomActions };
