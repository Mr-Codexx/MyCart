import React, { useState, useEffect } from 'react';

const GooglePayButton = () => {
  const [amount, setAmount] = useState('');
  const [googlePayLoaded, setGooglePayLoaded] = useState(false);

  useEffect(() => {
    // Function to load the Google Pay API script
    const loadGooglePayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://pay.google.com/gp/p/js/pay.js';
      script.async = true;
      script.onload = () => setGooglePayLoaded(true);
      script.onerror = () => console.error('Failed to load Google Pay API script');
      document.body.appendChild(script);
    };

    // Check if Google Pay API is already loaded
    if (!window.google || !window.google.payments || !window.google.payments.api) {
      loadGooglePayScript();
    } else {
      setGooglePayLoaded(true);
    }
  }, []);

  const handlePayment = () => {
    if (!amount) {
      alert('Please enter an amount.');
      return;
    }

    if (!googlePayLoaded) {
      alert('Google Pay API is not loaded.');
      return;
    }

    const paymentData = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedNetworks: ['MASTERCARD', 'VISA'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId',
            },
          },
        },
      ],
      merchantInfo: {
        merchantName: 'Example Merchant',
        merchantId: '01234567890123456789',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: amount,
        currencyCode: 'INR',
        countryCode: 'IN',
      },
      shippingAddressRequired: true,
      shippingAddressParameters: {
        allowedCountryCodes: ['IN'],
        phoneNumberRequired: true,
      },
    };

    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: 'TEST', // Use 'PRODUCTION' for live environment
    });

    paymentsClient.loadPaymentData(paymentData).then(function (paymentData) {
      // Handle the response here
      console.log('Payment successful:', paymentData);
    }).catch(function (err) {
      // Handle the error here
      console.error('Payment failed:', err);
    });
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        min="1"
      />
      <button onClick={handlePayment}>Pay with Google Pay</button>
    </div>
  );
};

export default GooglePayButton;
