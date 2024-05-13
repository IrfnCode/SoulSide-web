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
        checkout() {
            // Logika checkout untuk mengirim pesan WhatsApp
            // Mendapatkan data dari form
            var name = this.name;
            var email = this.email;
            var phone = this.phone;
            var total = this.total;
            var orderedItems = this.items.map(item => item.quantity + ' ' + item.name).join(', ');
            // Membangun pesan WhatsApp
            var whatsappMessage = "*Costumer Order Detail*\n";
            whatsappMessage += "> _Name: " + name + "_\n";
            whatsappMessage += "> _Email: " + email + "_\n";
            whatsappMessage += "> _Phone: " + phone + "_\n";
            whatsappMessage += "> _Ordered Items: " + orderedItems + "_\n";
            whatsappMessage += "> _Total Price: " + rupiah(total) + "_\n"; // Format total harga
            whatsappMessage += "Berikut Pesanan Saya Mohon Konfirmasi Untuk Memproses Pesanan Saya\n";

            // Membuka WhatsApp dengan pesan yang dibangun
            window.open("https://wa.me/+6285361093717?text=" + encodeURIComponent(whatsappMessage), '_blank');
        }
    })
});

//Konversi Ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', 
        currency: 'IDR',
        // minimumFractionDigits: 0
}).format(number);
}

