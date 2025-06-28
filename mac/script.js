document.addEventListener('DOMContentLoaded', () => {
    const macbookImage = document.getElementById('macbook-image');
    const selectedColorText = document.getElementById('selected-color');
    const productPriceElement = document.getElementById('product-price');
    const ssdOptions = document.querySelectorAll('.ssd-option input[type="radio"]');
    const colorButtons = document.querySelectorAll('.color-button');
    const ssdOptionLabels = document.querySelectorAll('.ssd-option');

    let currentBasePrice;

    function parsePrice(priceString) {
        return parseInt(priceString.replace('$', '').replace(/,/g, '').trim());
    }

    function updatePrice() {
        let selectedPriceAdd = 0;
        ssdOptions.forEach(option => {
            if (option.checked) {
                selectedPriceAdd = parseInt(option.dataset.priceAdd);
            }
        });

        if (isNaN(currentBasePrice)) {
            console.error("currentBasePrice is NaN. Cannot calculate price.");
            productPriceElement.textContent = "Error";
            return;
        }

        const newPrice = currentBasePrice + selectedPriceAdd;
        productPriceElement.textContent = `$${newPrice.toLocaleString('en-US')}`;
    }

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            colorButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const color = button.dataset.color;
            currentBasePrice = parsePrice(button.dataset.basePrice);

            if (color === 'white') {
                macbookImage.src = 'macbook-pro-white.png';
                selectedColorText.textContent = 'White';
            } else if (color === 'space-grey') {
                macbookImage.src = 'macbook-pro-space-grey.png';
                selectedColorText.textContent = 'Space Gray';
            }

            updatePrice();
        });
    });

    ssdOptions.forEach(option => {
        option.addEventListener('change', () => {
            ssdOptionLabels.forEach(label => {
                label.classList.remove('selected-ssd');
            });

            if (option.checked) {
                option.closest('.ssd-option').classList.add('selected-ssd');
            }
            updatePrice();
        });
    });

    const initialActiveColorButton = document.querySelector('.color-button.active');
    if (initialActiveColorButton) {
        initialActiveColorButton.click();
    } else {
        currentBasePrice = parsePrice(productPriceElement.textContent);
        updatePrice();
    }

    const initialSelectedSsd = document.querySelector('.ssd-option input[type="radio"]:checked');
    if (initialSelectedSsd) {
        initialSelectedSsd.closest('.ssd-option').classList.add('selected-ssd');
    }
});