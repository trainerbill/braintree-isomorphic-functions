# braintree-isomorphic-functions
Library of useful Braintree functions that can be run in browser or server built on the GraphQL Apis.

### Browser Configuration
```
localStorage.setItem('BRAINTREE_PUBLIC_KEY', '');
localStorage.setItem('BRAINTREE_PRIVATE_KEY', '');
localStorage.setItem('BRAINTREE_ENVIRONMENT', 'sandbox');
localStorage.setItem('BRAINTREE_TOKENIZATION_KEY', '');
```

## Examples

### Create Customer, Vault Payment Method to Customer, Charge Method.
```
braintreeFunctions.Customers.create({ firstName: 'Fred', lastName: 'Flintstone' })
    .then(res => res.json())
    .then(data => braintreeFunctions.Payments.vaultPaymentMethod('fake-valid-nonce', data.data.createCustomer.customer.id))
    .then(res => res.json())
    .then(data => braintreeFunctions.Payments.chargePaymentMethod(data.data.vaultPaymentMethod.paymentMethod.id, { amount: '15.60' }))
    .then(res => res.json())
    .then(data => document.getElementById('result').innerHTML = JSON.stringify(data))
    .catch(err => console.log(err));
```
