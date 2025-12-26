<form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
  <input name="amount" value="1200.00" />
  <input type="hidden" name="tax_amount" value="0" />
  <input name="total_amount" value="1200.00" />
  <input type="hidden" name="product_service_charge" value="0" />
  <input type="hidden" name="product_delivery_charge" value="0" />
  <input name="transaction_uuid" value="251225-101906515" />
  <input type="hidden" name="product_code" value="EPAYTEST" />
  <input
    type="hidden"
    name="success_url"
    value="http://localhost:5115/success.html"
  />
  <input
    type="hidden"
    name="failure_url"
    value="http://localhost:5115/failure.html"
  />
  <input
    type="hidden"
    name="signed_field_names"
    value="total_amount,transaction_uuid,product_code"
  />
  <input
    name="signature"
    value="xPAuYj/hRyXZ7Li0NS3FbLoXkMy7lJxjIPy5B6XBDMU="
  />

  <button type="submit">Pay with eSewa</button>
</form>;
