document.getElementById('creditCardForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const balance = parseFloat(document.getElementById('balance').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const monthlyPayment = parseFloat(document.getElementById('monthlyPayment').value);

    if (isNaN(balance) || isNaN(interestRate) || isNaN(monthlyPayment) || balance <= 0 || interestRate <= 0 || monthlyPayment <= 0) {
        alert('Please enter valid values for all fields.');
        return;
    }

    const monthlyInterestRate = interestRate / 12 / 100;
    let currentBalance = balance;
    let totalInterest = 0;
    let monthNumber = 0;
    const resultElement = document.getElementById('result');

    resultElement.innerHTML = '<h2>Payment Schedule</h2><ol>';

    while (currentBalance > 0) {
        monthNumber++;
        const interestCharge = currentBalance * monthlyInterestRate;
        let payment = monthlyPayment;

        if (currentBalance + interestCharge < monthlyPayment) {
            // If remaining balance + interest is less than the monthly payment,
            // set the payment to the total remaining balance + interest.
            payment = currentBalance + interestCharge;
        }

        const endingBalance = currentBalance + interestCharge - payment;

        if (endingBalance > currentBalance) {
            alert('Your monthly payment is not sufficient to cover the monthly interest. You will never pay off the card.');
            resultElement.innerHTML = '';
            return;
        }

        resultElement.innerHTML += `<li><span class="month-number">Month ${monthNumber}</span><span class="payment-info">Beginning Balance: $${currentBalance.toFixed(2)}, Interest Charge: $${interestCharge.toFixed(2)}, Payment: $${payment.toFixed(2)}, Ending Balance: $${endingBalance.toFixed(2)}</span></li>`;

        totalInterest += interestCharge;
        currentBalance = endingBalance;
    }

    const totalAmountPaid = balance + totalInterest;
    resultElement.innerHTML += '</ol>';
    resultElement.innerHTML += `<p>Number of months to pay off the card: ${monthNumber}</p>`;
    resultElement.innerHTML += `<p>Total amount of interest paid: $${totalInterest.toFixed(2)}</p>`;
    resultElement.innerHTML += `<p>Grand total amount paid (original balance + interest): $${totalAmountPaid.toFixed(2)}</p>`;
});