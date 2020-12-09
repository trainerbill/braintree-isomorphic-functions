import { Payments } from './src';

function randomAmount() {
    return Math.floor(Math.random() * 100) + 1;
}

async function authCapRefund() {
    const authResponse = await Payments.authorizePaymentMethod('fake-valid-nonce', { amount: randomAmount() });
    const auth = await authResponse.json();
    console.log(JSON.stringify(auth));
    const capResponse = await Payments.captureTransaction(auth.data.authorizePaymentMethod.transaction.id, {});
    const cap = await capResponse.json();
    console.log(JSON.stringify(cap));
    const refundResponse = await Payments.refundTransaction(cap.data.captureTransaction.transaction.id, {});
    const refund = await refundResponse.json();
    console.log(JSON.stringify(refund));

}

authCapRefund();