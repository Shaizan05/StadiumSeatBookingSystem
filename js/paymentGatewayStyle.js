/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

document.getElementById('submit').addEventListener('click', function () {
    // Basic validation for card number, expiry date, and CVV
    var cardNumber = document.getElementById('cardNumber').value;
    var expiryDate = document.getElementById('expiryDate').value;
    var cvv = document.getElementById('cvv').value;

    if (validateCardNumber(cardNumber) && validateExpiryDate(expiryDate) && validateCVV(cvv)) {
        // Perform further actions (e.g., send data to the server for payment processing)
        alert('Payment successful!');
    } else {
        alert('Invalid input. Please check your card details.');
    }
});

function validateCardNumber(cardNumber) {
    // Implement card number validation logic (e.g., Luhn algorithm)
    // For simplicity, this example only checks if the length is 16
    return cardNumber.length === 16;
}

function validateExpiryDate(expiryDate) {
    // Implement expiry date validation logic
    // For simplicity, this example only checks if the length is 7 (MM / YY format)
    return expiryDate.length === 7;
}

function validateCVV(cvv) {
    // Implement CVV validation logic
    // For simplicity, this example only checks if the length is between 3 and 4
    return cvv.length >= 3 && cvv.length <= 4;
}



