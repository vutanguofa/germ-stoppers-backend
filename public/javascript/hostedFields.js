braintree.client.create({
  authorization: 'sandbox_24zhk5mm_4gsfhbct7jw5rp8w'
}, function(err, clientInstance) {
  if (err) {
    console.error(err);
    return;
  }

  braintree.hostedFields.create({
    client: clientInstance,
    styles: {
      'input': {
        'font-size': '16px',
        'font-family': 'roboto, verdana, sans-serif',
        'font-weight': 'lighter',
        'color': 'black'
      },
      ':focus': {
        'color': 'black'
      },
      '.valid': {
        'color': 'green'
      },
      '.invalid': {
        'color': 'red'
      }
    },
    fields: {
      number: {
        selector: '#card-number',
        placeholder: 'Use \"4111111111111111\"'
      },
      cvv: {
        selector: '#cvv',
        placeholder: '123'
      },
      expirationDate: {
        selector: '#expiration-date',
        placeholder: 'MM/YY'
      }
    }
  }, function(err, hostedFieldsInstance) {
    if (err) {
      console.error(err);
      return;
    }
    
    function findLabel(field) {
      return $('.hosted-field--label[for="' + field.container.id + '"]');
    }

    hostedFieldsInstance.on('focus', function (event) {
      var field = event.fields[event.emittedBy];
      
      findLabel(field).addClass('label-float').removeClass('filled');
    });
    
    // Emulates floating label pattern
    hostedFieldsInstance.on('blur', function (event) {
      var field = event.fields[event.emittedBy];
      var label = findLabel(field);
      
      if (field.isEmpty) {
        label.removeClass('label-float');
      } else if (field.isValid) {
        label.addClass('filled');
      } else {
        label.addClass('invalid');
      }
    });
    
    hostedFieldsInstance.on('empty', function (event) {
      var field = event.fields[event.emittedBy];

      findLabel(field).removeClass('filled').removeClass('invalid');
    });
    
    hostedFieldsInstance.on('validityChange', function (event) {
      var field = event.fields[event.emittedBy];
      var label = findLabel(field);

      if (field.isPotentiallyValid) {
        label.removeClass('invalid');
      } else {
        label.addClass('invalid');  
      }
    });

    $('#cardForm').submit(function (event) {
      event.preventDefault();
      //alert(event.target.cardholderName.value);
      // reset output
      $("#nonce").val('');
      $("#nonce-msg").text('');
      $("#output").val('');
      

      hostedFieldsInstance.tokenize({
        cardholderName: event.target.cardholderName.value
      },function (err, payload) {
        if (err) {
          $("#output").val(err);
          return;
        }

        // This is where you would submit payload.nonce to your server
        let json = JSON.stringify(payload, null ,1);
        $("#output").val(json);
        $("#nonce").val(payload.nonce);
        
        $("#nonce").focus();
        $("#nonce").select();
        try {
          var successful = document.execCommand('copy');
          if (successful)
            $("#nonce-msg").text('Nonce successfully copied to your clipboard');
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
      });
    });
  });
});