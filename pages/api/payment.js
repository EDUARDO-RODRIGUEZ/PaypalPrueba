import paypal from "@paypal/checkout-server-sdk";

let clientId = "AWt58x-Hh7UieuvxWuAz6tSJP5m_a1hunFdPPkUK9pyZjBejI4CtFEGQ3AAUxq4TepJMDkKPiV9xYg4n";
let clientSecret = "ELYlQsCK-AVimSCTJKVKE2jZI0U6Ld4hRFYg-EnO3GqOFHYwZH00OwH5wLNzj7w0DitWDFus8ejfT8du";

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00",
          },
        },
      ],
    });
    const response = await client.execute(request);

    return res.json({ id: response.result.id });
  }
}
