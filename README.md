Front-end: React.js
Back-end : Node.js

Pertama-tama, saya menyiapkan server dengan Node.js untuk menyimpan dan membaca file .csv. Ada 2 route yang tersedia yaitu, 
    1. /api/report, untuk mengubah data csv menjadi JSON agar dapat diakses oleh client

kemudian untuk aplikasi client, saya menggunakan React.js. Terdapat 3 komponen pada aplikasi client, yaitu
    1. Container, komponen dasar tempat untuk meletakkan diagram dan juga tabel. Komponen ini bertugas menyediakan data bagi 
       komponen Tabel dan Diagram
        - variabel 'data', berisi JSON object dari csv yang akan digunakan oleh komponen DataList
        - variabel 'chartData', berisi JSON Object yang akan digunakan oleh komponen Diagram
    2. DataList, komponen ini digunakan untuk menampilkan data report per baris. 
        - Komponen ini mendapatkan data (props) per baris dari Container. 
        - Interaksi yang terjadi dalam komponen ini meliputi buka/tutup Accordion, editable column, dan pengiriman data untuk  kalkulasi total harga di server.
        - Komponen ini juga berkomunikasi dengan Container melalui callback (props.onChart) untuk mengupdate chartData
    3. Diagram, komponen ini digunakan untuk visualisasi data. Komponen ini mendapatkan data berupa props dari Container untuk
       ditampilkan dalam bentuk Barchart.

Projek ini tidak menggunakan Redux dikarenakan komponen yang saling berinteraksi menurut saya masih terlalu sedikit

Petunjuk pemasangan aplikasi
1. Buka command-line lalu akses folder projek
2. ketikkan 'npm run build-and-run', lalu tekan enter. Proses instalasi akan berlangsung dan aplikasi akan terbuka saat selesai
   pada http://localhost:5000
3. Daftar perintah command-line yang dapat digunakan di folder  projek
    - npm run build-and-run, instalasi server dan client sekaligus menjalankan server dan build client
    - npm run server-install-run, instalasi dependency server kemudian dilanjutkan dengan menjalankan server
    - npm run client-install, instalasi dependecy client(aplikasi)
    - npm run client-build, build client(aplikasi)
    - npm run client, menjalankan aplikasi client(aplikasi)
    - npm run dev, menjalankan server dan client(aplikasi) secara paralel

