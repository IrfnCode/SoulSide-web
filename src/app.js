//SCRIPT UNTUK MENGGUNAKAN DATA ALPINEJS SECARA GLOBAL
document.addEventListener('alpine:init', () => {
    
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Coffee Latte', img: '1.jpg',  price: 20000 },
            { id: 2, name: 'Cappuccino', img: '2.jpg',  price: 25000 },
            { id: 3, name: 'Espresso', img: '3.jpg',  price: 15000 },
            { id: 4, name: 'Macchiato', img: '4.jpg',  price: 18000 },
            { id: 5, name: 'Caramel Latte', img: '5.jpg',  price: 22000 },
            { id: 6, name: 'Mocha', img: '6.jpg',  price: 25000 },
            { id: 7, name: 'Americano', img: '7.jpg',  price: 20000 },
            { id: 8, name: 'Flat White', img: '8.jpg',  price: 25000 },
            { id: 9, name: 'Caffe Misto', img: '9.jpg',  price: 20000 },




        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        name: '',
        email: '',
        phone: '',
        add(newItem) {
            //cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);
            //Jika belum ada 
            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;

            } else {
                //jika barangnya udah ada, cek apakah barang beda atau sama di cart
                this.items = this.items.map((item) => {
                    //jika barang berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        //jika barang sudah ada, tambah quantity dan btotal nya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                })
            }



        },
        remove(id) {
            //ambil item yang mau diremove berdasarkan idny
            const cartItem = this.items.find((item) => item.id === id);

            //jika item lebih dari 1
            if (cartItem.quantity > 1) {

                //telusuri 1/1
                this.items = this.items.map((item) => {
                    //jika bukan barang di klik
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;

                    }

                })
            } else if (cartItem.quantity === 1) {
                //jika item tersisa hanya 1]
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
        checkout(event) {
            // Mencegah form dari submit dan refresh
            event.preventDefault();

            // Mendapatkan data dari form
            var name = this.name;
            var email = this.email;
            var phone = this.phone;
            var total = this.total;
            var orderedItems = this.items.map(item => item.quantity + ' ' + item.name).join(', ');

            // Membangun pesan untuk dikirim ke API Telegram
            var telegramMessage = "*Customer Order Detail*\n";
            telegramMessage += "> *Name:* " + name + "\n";
            telegramMessage += "> *Email:* " + email + "\n";
            telegramMessage += "> *Phone:* " + phone + "\n";
            telegramMessage += "> *Ordered Items:* " + orderedItems + "\n";
            telegramMessage += "> *Total Price:* " + rupiah(total) + "\n"; // Format total harga

            // Menjalankan HTTP POST request ke API Telegram
            fetch('https://api.telegram.org/bot7182226223:AAE7SqOOerBmOav9i7nEVtOnzcBsu5cRBJE/sendMessage', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                chat_id: '-1002055385293',
                text: telegramMessage,
                parse_mode: 'Markdown'
              })
            })
            .then(response => {
              if (response.ok) {
                Swal.fire({
                  icon: 'success',
                  title: 'Pesanan Telah Kami Terima',
                  text: 'Kami Akan Menghubungi Anda Secepatnya, Terima kasih!'
                }).then(() => {
                    // Refresh halaman setelah SweetAlert di-close
                    location.reload();
                });
                // Clear the form and cart
                this.name = '';
                this.email = '';
                this.phone = '';
                this.items = [];
                this.total = 0;
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Ada masalah saat memproses pesanan. Silakan coba lagi.'
                });
              }
            })
            .catch(error => {
              console.error('Error:', error);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ada masalah saat memproses pesanan. Silakan coba lagi.'
              });
            });
          }
        });

// Form Validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkout-form');

form.addEventListener('keyup', function() {
    for( let i = 0; i < form.elements.length; i++ ) {
        if(form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
    } else {
        return false;
    }
 }

 checkoutButton.disabled = false;
 checkoutButton.classList.remove('disabled');

});
//Kirim Data Ketika Checkout
// checkoutButton.addEventListener('click', function(e) {
//     e.preventDefault();
//     const formData = new FormData(form);
//     const data = new URLSearchParams(formData);
//     const objData = Object.fromEntries(data);
//     const message = formatMessage(objData);
//     window.open('https://wa.me/6285361093717?text=' + encodeURIComponent(message));
// })
});

//Format Pesan
// const formatMessage = (obj) => { 
//     return `Data Customer 
//     Nama : ${obj.name}
//     Email : ${obj.email}
//     Phone : ${obj.phone}
//     Total : ${rupiah(obj.total)}
// Data Pesanan
// ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}

// Total: ${rupiah(obj.total)}

// Terimakasih.`
// }


//Konversi Ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', 
        currency: 'IDR',
        // minimumFractionDigits: 0
    }).format(number);
}

