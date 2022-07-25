export const cart = () => {

    const buttonCart = document.getElementById('cart-button');
    const modalCart = document.querySelector('.modal-cart');
    const body = modalCart.querySelector('.modal-body');
    const totalPrice = modalCart.querySelector('.modal-pricetag');


    const incrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'));

        cartArray.map((item) => {
            if (item.id === id) {
                item.count++
            }
        });

        localStorage.setItem('cart', JSON.stringify(cartArray));

        renderItems(cartArray);
    }

    const decrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'));

        cartArray.map((item) => {
            if (item.id === id) {
                item.count = item.count > 0 ? item.count - 1 : 0
            }
        });

        localStorage.setItem('cart', JSON.stringify(cartArray));

        renderItems(cartArray);
    }

    const resetCart = () => {
        body.innerHTML = '';

        modalCart.classList.remove('is-open');
        localStorage.removeItem('cart');
        buttonCart.style.display = 'none';
    }

    const renderItems = (data) => {
        const prices = [];
        body.innerHTML = '';

        data.forEach(({name, price, id, count}) => {
            
            const cartElem = document.createElement('div');

            cartElem.classList.add('food-row');

            cartElem.innerHTML = `
                <span class="food-name">${name}</span>
                <strong class="food-price">${price} ₽</strong>
                <div class="food-counter">
                    <button class="counter-button btn-dec" data-index="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button btn-inc" data-index="${id}">+</button>
                </div>
            `;

            body.append(cartElem);

            prices.push(price*count);
        });

        let priceTotal = prices.reduce((prev, current) => prev + current, 0);

        totalPrice.innerHTML = `${priceTotal} ₽`;
    }

    

    if (!localStorage.getItem('cart')) {
        buttonCart.style.display = 'none'
    }


    buttonCart.addEventListener('click', (e) => {
        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')));
        }

        modalCart.classList.add('is-open');
    });
    

    modalCart.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('btn-inc')) {
            
            incrementCount(e.target.dataset.index);
        }

        if (e.target.classList.contains('btn-dec')) {
            
            decrementCount(e.target.dataset.index);
        }

        if (e.target.classList.contains('button-primary')) {
            const cartArray = localStorage.getItem('cart');

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: cartArray
                })
                .then(res => {
                    if (res.ok) {
                        resetCart();
                    }
                })
                .catch(error => console.error(error))
        }

        if (e.target.classList.contains('close')) {
            modalCart.classList.remove('is-open');
        }

        if (e.target.classList.contains('clear-cart')) {
            resetCart();
        }
    });
}

