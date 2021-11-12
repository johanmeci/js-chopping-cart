//Variables
const cart = document.querySelector('#div-cart');
const tableList = document.querySelector('#cart-list');
const txtEmpty = document.querySelector('#txt-empty');
const containerList = document.querySelector('#cart-list tbody');
const btnEmpty = document.querySelector('#empty-cart');
const courseList = document.querySelector('#course-list');

let cartList = [];

loadEventListeners();

function loadEventListeners() {

    //Add item
    courseList.addEventListener('click', addItem);

    //Delete item
    cart.addEventListener('click', deleteItem);

    //Empty cart
    btnEmpty.addEventListener('click', () => {
        cartList = [];
        addCartListHTML();
    });
}

//Functions
function addItem(e) {

    e.preventDefault();

    if (e.target.classList.contains('add-item')) {
        const selectedCourse = e.target.parentElement.parentElement;
        getCourse(selectedCourse);
    }

}

function deleteItem(e) {

    e.preventDefault();

    if (e.target.classList.contains('remove-item')) {

        const itemID = e.target.getAttribute('data-id');
        cartList = cartList.filter(item => item.id !== itemID);

        addCartListHTML();
    }
    
}

function getCourse(course) {
    
    const dataCourse = {
        id: course.querySelector('a').getAttribute('data-id'),
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        img: course.querySelector('img').src,
        qty: 1
    }

    //Validate existence of the item
    const exists = cartList.some(item => item.id === dataCourse.id);

    if (exists) {

        const addQty = cartList.map(item => {

            if (item.id === dataCourse.id) {
                item.qty++;
                return item;
            } else {
                return item;
            }

        });

        cartList = [...addQty];
        
    } else {

        //Add elements to cartList array
        cartList = [...cartList, dataCourse];
    }

    addCartListHTML();
}

//Add elements in cartList HTML container
function addCartListHTML() {

    if (cartList.length === 0) {
        tableList.classList.remove('active');
        txtEmpty.classList.add('active');
    } else if(cartList.length === 1) {
        tableList.classList.add('active');
        txtEmpty.classList.remove('active');
    }

    cleanContainerList();

    cartList.forEach(course => {

        const {img, title, price, qty, id} = course;
        const row = document.createElement('tr');
        row.innerHTML = `
                        <td>
                            <img class='img-td' src='${img}' />
                        </td>
                        <td>${title}</td>
                        <td>${price}</td>
                        <td>${qty}</td>
                        <td>
                            <a class='remove-item' data-id='${id}' href='#'> X </a>
                        </td>
                        `;

        containerList.appendChild(row);

    });
    
}

function cleanContainerList() {
    
    while (containerList.firstChild) {
        containerList.removeChild(containerList.firstChild)
    }

}