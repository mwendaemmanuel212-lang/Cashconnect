
export const runtime = "nodejs";

function getTimestamp() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const value = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return (
    value("year") +
    value("month") +
    value("day") +
    value("hour") +
    value("minute") +
    value("second")
  );
}

export async function POST(request: Request) {
  try {
    const {
      phone,
      amount,
    }: { phone?: string; amount?: number } = await request.json();

    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;

    if (
      !consumerKey ||
      !consumerSecret ||
      !shortcode ||
      !passkey ||
      !callbackUrl
    ) {
      return Response.json(
        { error: "M-Pesa configuration is incomplete." },
        { status: 500 }
      );
    }

    const phoneNumber = (phone ?? "").replace(/\D/g, "");
    const normalizedPhone = phoneNumber.startsWith("0")
      ? "254" + phoneNumber.slice(1)
      : phoneNumber.startsWith("254")
        ? phoneNumber
        : "";

    if (!/^254[17]\d{8}$/.test(normalizedPhone)) {
      return Response.json(
        { error: "Enter a valid Kenyan mobile number." },
        { status: 400 }
      );
    }

    if (
      typeof amount !== "number" ||
      !Number.isInteger(amount) ||
      amount < 1 ||
      amount > 250000
    ) {
      return Response.json(
        { error: "Enter a valid amount in KES." },
        { status: 400 }
      );
    }

    const baseUrl = "https://sandbox.safaricom.co.ke";

    const auth = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

    const tokenResponse = await fetch(
      `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        cache: "no-store",
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      return Response.json(
        { error: "Could not authenticate with Safaricom." },
        { status: 502 }
      );
    }

    const timestamp = getTimestamp();

    const password = Buffer.from(
      shortcode + passkey + timestamp
    ).toString("base64");

    const stkResponse = await fetch(
      `${baseUrl}/mpesa/stkpush/v1/processrequest`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: normalizedPhone,
          PartyB: shortcode,
          PhoneNumber: normalizedPhone,
          CallBackURL: callbackUrl,
          AccountReference: "CashConnect",
          TransactionDesc: "Cash Connect deposit",
        }),
      }
    );

    const result = await stkResponse.json();

    if (!stkResponse.ok || result.ResponseCode !== "0") {
      return Response.json(
        { error: result.errorMessage || "M-Pesa request failed." },
        { status: 502 }
      );
    }

    return Response.json({
      success: true,
      message: "Payment prompt requested successfully.",
      checkoutRequestID: result.CheckoutRequestID,
      customerMessage: result.CustomerMessage,
    });
  } catch {
    return Response.json(
      { error: "Unable to process the payment request." },
      { status: 500 }
    );
  }
}
