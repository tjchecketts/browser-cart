// how you access jquery $()
// example: $(selector).action

// $(document).ready(function() {
//   var header = $('h1').text();
//   console.log(header);
// })

// hide and change text
// $(document).ready(function() {
//   $('#title').text('This is the new text')
//   $('p').hide();
// })

$(document).ready(function() {
  $('#plan').on('change', function() {
    var priceText; 

    switch(this.value) {
      case 'monthly':
        priceText = "$10.00/mo";
        break;

      case 'quarterly':
        priceText = "$9.00/mo";
        break;

      case 'yearly':
        priceText = "$7.00/mo";
        break;

    }

    $('#price').text(priceText);

  });

  $('#add').on('click', function() {
    var plan = $('#plan');
    var installment = plan.val();
    var price = $('#price').text();
    var inCart = $('#in-cart');
    var numeric = price.replace(/[[A-Za-z$\/\s]/g, '');
    var data = 'data-price="' + numeric + '" data-plan="' + installment + '"';
    inCart.append('<li class="entry"' + data + '>' + installment + ' - ' + price + ' ' + '<button class="remove"> Remove </button></li>');
    // inCart.append(`<li class='entry' ${data}>${installment} - ${price}</li>`);
    updateTotal();
  });

  function updateTotal() {
    var total = 0
    var entries = $('.entry');

    if(entries.length)
      $('#empty').show();
    else
      $('#empty').hide();
    
    entries.each( function(index, entry) {
      var data = $(entry).data();
      var price = parseFloat(data.price);
      var installment = data.plan;
      switch(installment) {
        case 'monthly':
          total += price;
          break;
        case 'quarterly':
          total += price * 4;
          break;
        case 'yearly':
          total += price * 12;
          break;
      }

    });

    $('#total').text('$' + total);

  };

  $(document).on('click', '.remove', function() {
    // alert("Button Clicked");
    // ^ good for testing if something worked w/o going too far
    $(this).parents('li').remove();
    updateTotal();
  });

  $('#empty').on('click', function() {
    $('#in-cart').empty();
    updateTotal();
  });

  $('#display-cart').on('click', function() {
    var cart = $('#cart');
    var button = $(this);
    // this references the item it's in, ex: button in this case
    if(button.text() === 'Hide Cart')
      button.text('Show Cart');
    else
      button.text('Hide Cart');

    cart.slideToggle();

  })

});

