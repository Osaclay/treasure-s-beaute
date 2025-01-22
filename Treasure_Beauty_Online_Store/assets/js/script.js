document.addEventListener("DOMContentLoaded", () => {
    // Function to parse URL parameters
    function getURLParameter(name) {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    }
  
    // Extract product details from URL parameters
    const product = {
      id: getURLParameter("id"),
      name: getURLParameter("name"),
      price: getURLParameter("price"),
      image: getURLParameter("image"),
      category: getURLParameter("category"),
      details: getURLParameter("details"),
    };
  
    // Check if all required details are available
    if (product.name && product.price && product.image) {
      // Populate the single product page
      document.getElementById("mainImg").src = decodeURIComponent(product.image);
      document.getElementById("product-category").textContent = decodeURIComponent(
        product.category
      );
      document.getElementById("product-name").textContent = decodeURIComponent(product.name);
      document.getElementById("product-price").textContent = `$${product.price}`;
      document.getElementById("product-details").textContent = decodeURIComponent(
        product.details
      );
    }  
  });

//paypal chechout
//document.addEventListener("DOMContentLoaded", () => {
//    const productName = document.getElementById("product-name").innerText;
//    const productPrice = document.getElementById("product-price").innerText.replace("$", "");
//    const quantity = document.getElementById("quantity").value;
//
//    paypal.Buttons({
//        createOrder: function (data, actions) {
//            // Set up the transaction
//            return actions.order.create({
//                purchase_units: [{
//                    description: productName,
//                    amount: {
//                        value: (productPrice * quantity).toFixed(2) // Total price
//                    }
//                }]
//            });
//        },
//        onApprove: function (data, actions) {
//            // Capture the transaction
//            return actions.order.capture().then(function (details) {
//                alert(`Transaction completed by ${details.payer.name.given_name}`);
//                console.log(details); // View transaction details in the console
//            });
//        },
//        onError: function (err) {
//            console.error(err);
//            alert("Something went wrong. Please try again.");
//        }
//    }).render('#paypal-button-container');
//});




 // JavaScript to dynamically load product details and connect to PayPal link
 document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  // Extract product details from the URL
  const productId = urlParams.get("id");
  const productName = urlParams.get("name");
  const productPrice = urlParams.get("price");
  const productImage = urlParams.get("image");
  const productCategory = urlParams.get("category");
  const productDetails = urlParams.get("details");

  // PayPal payment links mapped to product IDs
  const paypalLinks = {
      "1": "https://www.paypal.com/ncp/payment/Z8Y7PTKQHS3H4", // Kids Hair Bonnet
      "2": "https://www.paypal.com/ncp/payment/AGE4GVULYNGKE", // Adult Hair Bonnet
      "3": "https://www.paypal.com/ncp/payment/JV92QXJY4Q82E", // Body Shower Net
      "4": "https://www.paypal.com/ncp/payment/PA2TALZKUXULA", // Foaming Mousse
      "5": "https://www.paypal.com/ncp/payment/PAZQWHB9MGASE", // Papaya Conditioner
      "6": "https://www.paypal.com/ncp/payment/GKLNC2ZR58AZA", // Papaya Hair Oil
      "7": "https://www.paypal.com/ncp/payment/BCHXZGWEC52LG", // Detangler
      "8": "https://www.paypal.com/ncp/payment/7FTDYNQ93FJ7Q", // Complete Pack
      "9": "https://www.paypal.com/ncp/payment/SJKMX9GRVTRRY", // Strawberry Edge Control 
     "10": "https://www.paypal.com/ncp/payment/L6MXXMT87NRD2", // Makeup Bag
     "11": "https://www.paypal.com/ncp/payment/WKRKYDL62U2BW", // Hot Cocoa Lipgloss
     "12": "https://www.paypal.com/ncp/payment/SKRSJGG7P4J7G", // Miss Red Lipgloss
     "13": "https://www.paypal.com/ncp/payment/5M4R7RVSUZ9RY", // Bossy Pink Lipgloss
     "14": "https://www.paypal.com/ncp/payment/75NDFFXUJU2VN", // Kids & Adult Strawberry Lipgloss
     "15": "https://www.paypal.com/ncp/payment/WN8SY6TSLRDMU", // Kids & Adult Clear Lipgloss
     "16": "https://www.paypal.com/ncp/payment/PFBW244W9UQ7A", // Kids & Adult Coconut Lipgloss
     "17": "https://www.paypal.com/ncp/payment/8DZ6VJL4CT2CQ", // Kids & Adult Glitter Lipgloss
  };

  // Validate if all required parameters are present
  if (productId && productName && productPrice && productImage && productCategory && productDetails) {
      // Populate the product details on the page
      document.getElementById("product-name").innerText = decodeURIComponent(productName);
      document.getElementById("product-price").innerText = `$${decodeURIComponent(productPrice)}`;
      document.getElementById("product-category").innerText = decodeURIComponent(productCategory);
      document.getElementById("product-details").innerText = decodeURIComponent(productDetails);
      document.getElementById("mainImg").src = decodeURIComponent(productImage);

      // Attach PayPal link to the checkout button
      document.getElementById("checkout-btn").addEventListener("click", () => {
          const paypalLink = paypalLinks[productId];
          if (paypalLink) {
              window.location.href = paypalLink; // Redirect to the PayPal payment link
          } else {
              alert("PayPal payment link not found for this product.");
          }
      });
  } 
});



