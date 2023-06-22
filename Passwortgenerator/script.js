document.addEventListener('DOMContentLoaded', () => {
    const savedCard = localStorage.getItem('passwordCard');
    if (savedCard) {
        document.getElementById('passwordCard').innerHTML = savedCard;
    } else {
        createPasswordCard();
    }
});

function createPasswordCard() {
    const numberOfRows = document.getElementById('rows') ? parseInt(document.getElementById('rows').value) : 15;

    const existingCard = document.getElementById('passwordCard').querySelector('tr');
    if (existingCard && !confirm('Sind Sie sicher, dass die Karte überschrieben werden soll?')) {
        return;
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]};:\'",<.>/?`~';
    const passwordCard = document.getElementById('passwordCard');
    passwordCard.innerHTML = '';

    for (let i = 0; i <= numberOfRows; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j <= 26; j++) {
            const cell = (i === 0 || j === 0) ? document.createElement('th') : document.createElement('td');
            
            if (i === 0 && j > 0) {
                cell.textContent = String.fromCharCode(64 + j);
            } else if (j === 0 && i > 0) {
                cell.textContent = i;
            } else if (i > 0 && j > 0) {
                cell.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
            }

            row.appendChild(cell);
        }

        passwordCard.appendChild(row);
    }

    localStorage.setItem('passwordCard', passwordCard.innerHTML);
}

function printPasswordCard() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Passwortkarte</title></head><body>');
    printWindow.document.write('<h1>Passwortkarte</h1>');
    printWindow.document.write(document.getElementById('passwordCard').outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
