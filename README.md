# Devira Chain

Devira Chain adalah website portofolio modern yang menampilkan karya, profil, dan fitur verifikasi berbasis smart contract. Proyek ini menggabungkan teknologi web modern dengan integrasi blockchain sederhana.

## Fitur Utama
- Landing Page & Profil
- Verifikasi berbasis smart contract (Solidity)
- Upload & Delete file portofolio
- Admin Panel
- QR Code generator
- Dark Mode & animasi AOS

## Struktur Direktori
```
├── about.html
├── admin.html
├── cdn.html
├── delete.html
├── index.html
├── upload.html
├── verify.html
├── assets/
│   └── images/
├── contract/
│   └── verfication.sol
├── css/
├── files/
├── js/
├── qrcode/
├── useless/
```

## Teknologi yang Digunakan
- HTML5, CSS3, JavaScript
- Bootstrap
- AOS (Animate On Scroll)
- Solidity (Smart Contract)
- Netlify (deployment)

## Cara Menjalankan
1. Clone repository:
	```
	git clone https://github.com/alinovian/devira.git
	cd "Devira Chain"
	```
2. Instalasi dependensi (jika ada):
	```
	npm install
	```
3. Jalankan project:
	```
	npm start
	```
4. Buka di browser: `http://localhost:3000` (atau sesuai konfigurasi)

## Konfigurasi Smart Contract
- File smart contract: `contract/verfication.sol`
- Deploy menggunakan Remix IDE atau Hardhat

## Kontribusi
Kontribusi sangat terbuka! Silakan fork repo ini dan buat pull request.

## Lisensi
MIT License

---
> Website portofolio modern dengan sentuhan blockchain.
