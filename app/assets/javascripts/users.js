$(document).ready(function() {
    // this line lets stripe know who we are.
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
  // Watch for a form submission:
  $("#form-submit-btn").click(function(event) {
    //   hijack the button saying dont send to server just yet
    event.preventDefault();
    // next disables button and stops people from being able to click it twice
    $('input[type=submit]').prop('disabled', true);
    // establishing a variable error so that we can use it after
    var error = false;
    // these are values from the form fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    if (!error) {
      // Get the Stripe token:
    //   if no errors ship off this data:
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, 
    //   once stripe comes back with a card token run a token:
      stripeResponseHandler);
    }
    return false;
  }); // form submission
  function stripeResponseHandler(status, response) {
    // Get a reference to the form:
    var f = $("#new_user");
    // Get the token from the response:
    var token = response.id;
    // Add the token to the form:
    f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
    // Submit the form,first form incase there is more than 1:
    f.get(0).submit(); 
  }
});