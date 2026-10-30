
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const callback = payload?.Body?.stkCallback;

    if (!callback?.CheckoutRequestID) {
      return Response.json(
        { ResultCode: 1, ResultDesc: "Invalid callback" },
        { status: 400 }
      );
    }

    const checkoutRequestId = callback.CheckoutRequestID;
    const resultCode = Number(callback.ResultCode);
    const successful = resultCode === 0;

    let receiptNumber: string | null = null;
    let amount: number | null = null;
    let phoneNumber: string | null = null;

    const items = callback.CallbackMetadata?.Item ?? [];

    for (const item of items) {
      if (item.Name === "MpesaReceiptNumber") {
        receiptNumber = String(item.Value);
      }

      if (item.Name === "Amount") {
        amount = Number(item.Value);
      }

      if (item.Name === "PhoneNumber") {
        phoneNumber = String(item.Value);
      }
    }

    console.log("M-Pesa callback:", {
      checkoutRequestId,
      successful,
      resultCode,
      receiptNumber,
      amount,
      phoneNumber,
    });

    // Payment must not be credited from this log alone.
    // We will connect verified payment records to Supabase next.

    return Response.json({
      ResultCode: 0,
      ResultDesc: "Callback received successfully",
    });
  } catch {
    return Response.json(
      { ResultCode: 1, ResultDesc: "Callback processing failed" },
      { status: 400 }
    );
  }
}
