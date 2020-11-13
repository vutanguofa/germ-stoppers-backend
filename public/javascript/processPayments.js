var button = document.querySelector('#submit-button');

braintree.dropin.create({
  // Insert your tokenization key here
  authorization: 'sandbox_24zhk5mm_4gsfhbct7jw5rp8w',
  container: '#dropin-container',
  card: {
    cardholderName: {
      required: true
    },
    overrides: {
      fields: {
        number: {
          placeholder: '4111-1111-1111-1111',
          formatInput: true // Turn off automatic formatting
        }
      }
    }
  }
}, function (createErr, instance) {
  button.addEventListener('click', function () {
    instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
      // When the user clicks on the 'Submit payment' button this code will send the
      // encrypted payment information in a variable called a payment method nonce
      $.ajax({
        type: 'POST',
        url: '/checkout',
        data: {
          'paymentMethodNonce': payload.nonce,
          'amount': $('#amount').val(),
        }
      }).done(function (result) {
        // Tear down the Drop-in UI
        instance.teardown(function (teardownErr) {
          if (teardownErr) {
            console.error('Could not tear down Drop-in UI!');
          } else {
            // Remove the 'Submit payment' button
            $('#submit-button').remove();
            $('#amountLabel').remove();
            $('#amount').remove();
          }
        });

        if (result.success) {
          console.log(result);
          $('#checkout-message').html('<h1>Approved!</h1><p>Card holder name: ' + result.transaction.creditCard.cardholderName + '<br />Transaction amount: ' + result.transaction.amount + '<br />Transaction ID: ' + result.transaction.id + '</p>');
          $('#retry').html('<a href="/processPayments">Process New Payment</a>');
        } else {
          console.log(result);
          $('#checkout-message').html('<h1>Error</h1><p>' + result.message + '</p>');
          $('#retry').html('<a href="/processPayments">Retry</a>');
        }
      });
    });
  });
});