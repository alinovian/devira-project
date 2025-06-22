// Ganti dengan API Key dan Secret dari akun Piñata Anda
const PINATA_API_KEY = "f5698a59951c7849f8f2";
const PINATA_SECRET_API_KEY = "b2fbbca49f04ebd142a0da7d95ab1db0b9ee11af5f0e628170b346845a4163ae";

// Gateway IPFS publik Piñata
const IPFS_GATEWAY = "https://bronze-tropical-quokka-65.mypinata.cloud/ipfs/";

window.CONTRACT = {
    address: "0x1f4EBE456b4c42080BD2e8a3Cdab1a4F0997AB33",
    network: "https://sepolia.infura.io/v3/89aee58194b540138a3c2cba9f423fe3",
    networkpublic: "https://ethereum-sepolia.publicnode.com",
    explore: "https://sepolia.etherscan.io",

    // address: "0xEdB7C66d41749420760CA9bdD2C954631C73007f",
    // network: "https://rpc-amoy.polygon.technology",
    // explore: "https://amoy.polygonscan.com",
    // Your Contract ABI
    abi: [{
        "inputs": [{
            "internalType": "address",
            "name": "_add",
            "type": "address"
        },
        {
            "internalType": "string",
            "name": "_info",
            "type": "string"
        }
        ],
        "name": "add_Exporter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "bytes32",
            "name": "hash",
            "type": "bytes32"
        },
        {
            "internalType": "string",
            "name": "_ipfs",
            "type": "string"
        }
        ],
        "name": "addDocHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_add",
            "type": "address"
        },
        {
            "internalType": "string",
            "name": "_newInfo",
            "type": "string"
        }
        ],
        "name": "alter_Exporter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "_exporter",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "_ipfsHash",
            "type": "string"
        }
        ],
        "name": "addHash",
        "type": "event"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_newOwner",
            "type": "address"
        }],
        "name": "changeOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_add",
            "type": "address"
        }],
        "name": "delete_Exporter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "bytes32",
            "name": "_hash",
            "type": "bytes32"
        }],
        "name": "deleteHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "count_Exporters",
        "outputs": [{
            "internalType": "uint16",
            "name": "",
            "type": "uint16"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "count_hashes",
        "outputs": [{
            "internalType": "uint16",
            "name": "",
            "type": "uint16"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "bytes32",
            "name": "_hash",
            "type": "bytes32"
        }],
        "name": "findDocHash",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_add",
            "type": "address"
        }],
        "name": "getExporterInfo",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    }
    ],
};

async function connect() {
    if (window.ethereum) {
        try {
            const selectedAccount = await window.ethereum
                .request({
                    method: "eth_requestAccounts",
                })
                .then((accounts) => {
                    return accounts[0];
                })
                .catch(() => {
                    throw Error("Tidak ada akun yang dipilih");
                });

            window.userAddress = selectedAccount;
            console.log("Akun yang terhubung:", selectedAccount); // Log untuk debugging
            window.localStorage.setItem("userAddress", window.userAddress);
            window.location.reload();
        } catch (error) {
            console.error("Gagal terhubung ke MetaMask:", error);
        }
    } else {
        // Ini hanya dipicu saat tombol 'Masuk' diklik dan MetaMask tidak ditemukan
        $("#upload_file_button").attr("disabled", true);
        $("#doc-file").attr("disabled", true); // Menonaktifkan input file
        // Show The Warning for not detecting wallet
        document.querySelector(".alert").classList.remove("d-none");
    }
}

// Tambahkan event listener untuk DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes("/verify")) {
        $("#doc-file").attr("disabled", false);
        $("#upload_file_button").attr("disabled", false);
        console.log("DOMContentLoaded: Input 'doc-file' dan tombol 'Verifikasi Dokumen' diaktifkan.");
        console.log("DOMContentLoaded: Status #doc-file disabled:", $("#doc-file").is(":disabled"));
        console.log("DOMContentLoaded: Status #upload_file_button disabled:", $("#upload_file_button").is(":disabled"));
    }
});


window.onload = async () => {
    try {
        window.web3 = new Web3(window.CONTRACT.networkpublic);
        window.contract = new window.web3.eth.Contract(
            window.CONTRACT.abi,
            window.CONTRACT.address
        );
        console.log(`Provider publik berhasil diinisialisasi menggunakan network: ${window.CONTRACT.networkpublic}`);
    } catch (error) {
        console.error("Gagal menginisialisasi Web3 atau Contract:", error);
        $("#upload_file_button").attr("disabled", true);
        $("#doc-file").attr("disabled", true);
        console.log("Web3 atau Contract gagal diinisialisasi. Tombol dan input file dinonaktifkan.");
        return;
    }

    $(".loader-wraper").fadeOut("slow");
    hide_txInfo();

    if (window.location.pathname.includes("/verify")) {
        $("#doc-file").attr("disabled", false);
        $("#upload_file_button").attr("disabled", false);
        console.log("Window.onload: Input 'doc-file' dan tombol 'Verifikasi Dokumen' diaktifkan (redudansi).");
        console.log("Window.onload: Status #doc-file disabled:", $("#doc-file").is(":disabled"));
        console.log("Window.onload: Status #upload_file_button disabled:", $("#upload_file_button").is(":disabled"));

        checkURL();
    } else {
        $("#upload_file_button").attr("disabled", true);
    }

    window.userAddress = window.localStorage.getItem("userAddress");

    if (window.userAddress && window.userAddress.length > 10) {
        $("#logoutButton, #logoutButtonMobile").show();
        $("#loginButton, #loginButtonMobile").hide();
        $("#userAddress")
            .html(`<i class="fa-solid fa-address-card mx-2 text-primary"></i>${truncateAddress(
                window.userAddress
            )} <a class="text-info" href="${window.CONTRACT.explore}/address/${window.userAddress}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-square-arrow-up-right text-warning"></i></a>`);

        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.contract = new window.web3.eth.Contract(window.CONTRACT.abi, window.CONTRACT.address);
            console.log(`Provider berhasil diganti dan sekarang menggunakan network: ${window.CONTRACT.network}`);
            console.log("Status: Login terdeteksi. Menggunakan network privat (RPC dari MetaMask) untuk semua transaksi.");
        }

        await getExporterInfo();
        await get_ChainID();
        await get_ethBalance();
        $("#Exporter-info").html(`<i class="fa-solid fa-building-columns mx-2 text-warning"></i>${window.info}`);

        if (window.location.pathname.includes("/admin")) await getCounters();
        if (window.location.pathname.includes("/upload")) listen();

    } else {
        $("#logoutButton, #logoutButtonMobile").hide();
        $("#loginButton, #loginButtonMobile").show();
        $(".box").addClass("d-none");
        $(".loading-tx").addClass("d-none");

        if (!window.location.pathname.includes("/verify")) {
            $("#doc-file").attr("disabled", true);
            console.log("Input 'doc-file' dinonaktifkan di halaman non-verifikasi (karena belum login)."); // Debugging
        }
    }
};

async function verify_Hash() {
    $("#loader").show();
    hide_txInfo();

    if (window.hashedfile) {
        try {
            const readonlyWeb3 = new Web3(window.CONTRACT.networkpublic);
            const readonlyContract = new readonlyWeb3.eth.Contract(
                window.CONTRACT.abi,
                window.CONTRACT.address
            );

            console.log(`Memverifikasi hash menggunakan node publik: ${window.CONTRACT.networkpublic}`);
            const result = await readonlyContract.methods
                .findDocHash(window.hashedfile)
                .call();

            $(".transaction-status").removeClass("d-none");
            window.newHash = result;
            if (result[0] != 0 && result[1] != 0) {
                print_verification_info(result, true);
            } else {
                print_verification_info(result, false);
            }
        } catch (error) {
            console.error("Error verifying hash:", error);
            $("#loader").hide();
            $("#doc-status").html(`<h3 class="text-danger">
                Error saat verifikasi: ${error.message || 'Terjadi kesalahan tidak dikenal.'}
            </h3>`);
            show_txInfo();
        }
    } else {
        $("#loader").hide();
        $("#doc-status").html(`<h3 class="text-warning">
            Pilih file terlebih dahulu untuk verifikasi.
        </h3>`);
        show_txInfo();
    }
}

function checkURL() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    window.hashedfile = url.searchParams.get("hash");
    if (!window.hashedfile) {
        // Jika tidak ada hash di URL, pastikan tombol tetap aktif
        $("#upload_file_button").attr("disabled", false);
        return;
    }
    verify_Hash();
}

async function get_Sha3() {
    $("#note").html(`<h5 class="text-warning">Proses Hash Dokumen...</h5>`);
    $("#upload_file_button").attr("disabled", true);
    console.log("File berubah, mulai hashing...");

    var fileInput = document.getElementById("doc-file");
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = async function (evt) {
            try {
                window.hashedfile = await web3.utils.soliditySha3(evt.target.result);
                console.log(`Document Hash : ${window.hashedfile}`);
                $("#note").html(
                    `<h5 class="text-center text-info">Dokumen Berhasil di Hash</h5>`
                );
                $("#upload_file_button").attr("disabled", false);
            } catch (hashError) {
                console.error("Error hashing file:", hashError);
                $("#note").html(
                    `<h5 class="text-center text-danger">Error hashing file: ${hashError.message}</h5>`
                );
                $("#upload_file_button").attr("disabled", true);
                window.hashedfile = null;
            }
        };
        reader.onerror = function (evt) {
            console.error("Error reading file:", evt);
            $("#note").html(`<h5 class="text-center text-danger">Error membaca file.</h5>`);
            $("#upload_file_button").attr("disabled", true);
            window.hashedfile = null;
        };
    } else {
        window.hashedfile = null;
        $("#upload_file_button").attr("disabled", true);
        $("#note").html(`<span class="text-red-500 text-sm mt-1">Belum ada file dipilih</span>`);
    }
}

function print_verification_info(result, is_verified) {
    const studentDocumentObject = document.getElementById("student-document");
    const notFoundImage = document.getElementById("not-found-image");
    const fallbackLink = document.getElementById("fallback-download-link");

    $("#loader").hide();

    if (!is_verified) {
        studentDocumentObject.style.display = 'none';
        if (notFoundImage) {
            notFoundImage.style.display = 'block';
        }

        $("#download-document").hide();
        $("#doc-status").html(`<h3 class="text-danger">
        Dokumen Tidak Terdaftar
        <i class="text-danger  fa fa-times-circle" aria-hidden="true"></i>
        </h3>`);
        $("#file-hash").html(
            `<span class="text-info"><i class="fa-solid fa-hashtag"></i></span> ${truncateAddress(
                window.hashedfile
            )}`
        );
        $("#college-name").hide();
        $("#contract-address").hide();
        $("#time-stamps").hide();
        $("#blockNumber").hide();
        $(".transaction-status").show();

    } else {
        studentDocumentObject.style.display = 'block';
        if (notFoundImage) {
            notFoundImage.style.display = 'none';
        }

        $("#download-document").show();
        $("#college-name").show();
        $("#contract-address").show();
        $("#time-stamps").show();
        $("#blockNumber").show();

        var t = new Date(1970, 0, 1);
        t.setSeconds(result[1]);
        t.setHours(t.getHours() + 7); // Adjust for WIB (GMT+7)

        $("#doc-status").html(`<h3 class="text-info">
        Dokumen Tervalidasi dengan Sukses 
        <i class="text-info fa fa-check-circle" aria-hidden="true"></i>
        </h3>`);
        $("#file-hash").html(
            `<span class="text-info"><i class="fa-solid fa-hashtag"></i></span> ${truncateAddress(
                window.hashedfile
            )}`
        );
        $("#college-name").html(
            `<span class="text-info"><i class="fa-solid fa-graduation-cap"></i></span> ${result[2]}`
        );
        $("#contract-address").html(
            `<span class="text-info"><i class="fa-solid fa-file-contract"></i> </span>${truncateAddress(
                window.CONTRACT.address
            )}`
        );
        $("#time-stamps").html(
            `<span class="text-info"><i class="fa-solid fa-clock"></i> </span>${t}`
        );
        $("#blockNumber").html(
            `<span class="text-info"><i class="fa-solid fa-cube"></i></span> ${result[0]}`
        );

        const docUrl = `${IPFS_GATEWAY}${result[3]}#view=FitH`;

        studentDocumentObject.data = docUrl;
        document.getElementById("download-document").href = docUrl;
        if (fallbackLink) {
            fallbackLink.href = docUrl;
        }

        $(".transaction-status").show();
    }
}

function hide_txInfo() {
    $(".transaction-status").addClass("d-none");
}

function show_txInfo() {
    $(".transaction-status").removeClass("d-none");
}

async function get_ethBalance() {
    if (!window.userAddress) { // Add check for userAddress
        console.warn("Cannot get ETH balance: User address not set.");
        $("#userBalance").html("n/a");
        return;
    }
    await web3.eth.getBalance(window.userAddress, function (err, balance) {
        if (err === null) {
            $("#userBalance").html(
                "<i class='fa-brands fa-gg-circle mx-2 text-danger'></i>" +
                web3.utils.fromWei(balance).substr(0, 6) +
                ""
            );
        } else {
            console.error("Error getting ETH balance:", err);
            $("#userBalance").html("n/a");
        }
    });
}

if (window.ethereum) {
    window.ethereum.on("accountsChanged", function (accounts) {
        connect();
    });
}

function printUploadInfo(result) {
    $("#transaction-hash").html(
        `<a target="_blank" title="Lihat Transaksi di Ethereum Scan" href="${window.CONTRACT.explore}/tx/` +
        result.transactionHash +
        '"+><i class="fa-solid fa-check-circle font-size-2 mx-1 text-black mx-1"></i></a>' +
        truncateAddress(result.transactionHash)
    );
    $("#file-hash").html(
        `<i class="fa-solid fa-hashtag mx-1"></i> ${truncateAddress(
            window.hashedfile
        )}`
    );
    $("#contract-address").html(
        `<i class="fa-solid fa-file-contract mx-1"></i> ${truncateAddress(
            result.to
        )}`
    );
    $("#time-stamps").html('<i class="fa-solid fa-clock mx-1"></i>' + getTime());
    $("#blockNumber").html(
        `<i class="fa-solid fa-link mx-1"></i>${result.blockNumber}`
    );
    $("#blockHash").html(
        `<i class="fa-solid fa-shield mx-1"></i> ${truncateAddress(
            result.blockHash
        )}`
    );
    $("#to-netowrk").html(
        `<i class="fa-solid fa-chart-network"></i> ${window.chainID}`
    );
    $("#gas-used").html(
        `<i class="fa-solid fa-gas-pump mx-1"></i> ${result.gasUsed} Gwei`
    );
    $("#loader").addClass("d-none");
    $("#upload_file_button").slideDown();
    show_txInfo();
    get_ethBalance();

    $("#note").html(`<h5 class="text-info">
    Transaksi Dikonfirmasi ke BlockChain<i class="mx-2 text-info fa-solid fa-check-circle" aria-hidden="true"></i>
    </h5>`);
    listen();
}

async function getFilebinInfo(filebinUrl, filebinId) {
    try {
        const response = await fetch(
            `https://api.pdfrest.com/resource/${window.hashedfile}?format=url`, {
            method: "GET",
            headers: {},
        }
        );

        if (!response.ok) {
            throw new Error(
                "Gagal mengambil informasi berkas:",
                await response.text()
            );
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil informasi berkas:", error);
        throw error;
    }
}

async function uploadFileToIpfs() {
    const fileInput = document.getElementById("doc-file");
    const file = fileInput.files[0];
    if (!file) {
        throw new Error("Tidak ada file yang dipilih");
    }

    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
        name: file.name,
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
        cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try {
        const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            body: formData,
            headers: {
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_SECRET_API_KEY
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Pengunggahan berkas gagal: ${errorData.error.reason}`);
        }

        const data = await response.json();
        console.log("Berkas diunggah ke Pinata:", data);

        return data.IpfsHash;

    } catch (error) {
        console.error("Terjadi kesalahan saat mengunggah berkas ke Pinata:", error);
        throw error;
    }
}

async function sendHash() {
    $("#loader").removeClass("d-none");
    $("#upload_file_button").slideUp();
    $("#note").html(
        `<h5 class="text-info">Langkah 1: Mengunggah berkas ke IPFS...</h5>`
    );
    $("#upload_file_button").attr("disabled", true);
    get_ChainID();

    try {
        const CID = await uploadFileToIpfs();
        console.log("Berhasil diunggah ke IPFS dengan CID:", CID);

        $("#note").html(
            `<h5 class="text-info">Langkah 2: Harap konfirmasi transaksi</h5>`
        );

        if (window.hashedfile.length > 4) {
            await window.contract.methods
                .addDocHash(window.hashedfile, CID)
                .send({
                    from: window.userAddress
                })
                .on("transactionHash", function (_hash) {
                    $("#note").html(
                        `<h5 class="text-info p-1 text-center">Harap tunggu transaksi untuk di mined...</h5>`
                    );
                })
                .on("receipt", function (receipt) {
                    printUploadInfo(receipt);
                    generateQRCode();
                })
                .on("confirmation", function (confirmationNr) { })
                .on("error", function (error) {
                    console.log(error.message);
                    $("#note").html(`<h5 class="text-center text-danger">${error.message}</h5>`);
                    $("#loader").addClass("d-none");
                    $("#upload_file_button").slideDown();
                });
        }
    } catch (error) {
        console.error("Gagal selama pengunggahan IPFS:", error);
        $("#note").html(`<h5 class="text-center text-danger">Error: ${error.message}</h5>`);
        $("#loader").addClass("d-none");
        $("#upload_file_button").slideDown();
    }
}

async function deleteHash() {
    $("#loader").removeClass("d-none");
    $("#upload_file_button").slideUp();
    $("#note").html(
        `<h5 class="text-info">Mohon konfirmasi transaksi</h5>`
    );
    $("#upload_file_button").attr("disabled", true);
    get_ChainID();

    if (window.hashedfile) {
        await window.contract.methods
            .deleteHash(window.hashedfile)
            .send({
                from: window.userAddress
            })
            .on("transactionHash", function (hash) {
                $("#note").html(
                    `<h5 class="text-info p-1 text-center">Harap tunggu transaksi untuk di mined</h5>`
                );
            })

            .on("receipt", function (receipt) {
                $("#note").html(
                    `<h5 class="text-info p-1 text-center">Dokumen Dihapus</h5>`
                );

                $("#loader").addClass("d-none");
                $("#upload_file_button").slideDown();
            })

            .on("confirmation", function (confirmationNr) {
                console.log(confirmationNr);
            })
            .on("error", function (error) {
                console.log(error.message);
                $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
                $("#loader").addClass("d-none");
                $("#upload_file_button").slideDown();
            });
    }
}

function getTime() {
    let d = new Date();
    a =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " - " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
    return a;
}

async function get_ChainID() {
    let a;
    try {
        if (window.ethereum && window.ethereum.selectedAddress) {
            a = await window.ethereum.request({ method: 'eth_chainId' });
            a = parseInt(a, 16); // Convert hex to decimal
        } else {
            a = await window.web3.eth.getChainId(); // Use public web3 if no user wallet
        }
    } catch (error) {
        console.error("Error getting ChainID:", error);
        window.chainID = "Gagal mengambil ChainID";
        let network = document.getElementById("network");
        if (network) {
            network.innerHTML = `<i class="text-danger fa-solid fa-circle-nodes mx-2"></i>${window.chainID}`;
        }
        return;
    }

    switch (a) {
        case 1:
            window.chainID = "Ethereum Main Network (Mainnet)";
            break;
        case 11155111:
            window.chainID = "Ethereum Test Network (Sepolia)";
            break;
        case 80001:
            window.chainID = "Polygon Test Network";
            break;
        case 80002:
            window.chainID = "Polygon Amoy Test Network";
            break;
        case 137:
            window.chainID = "Polygon Mainnet";
            break;
        case 3:
            window.chainID = "Ropsten Test Network";
            break;
        case 4:
            window.chainID = "Rinkeby Test Network";
            break;
        case 5:
            window.chainID = "Goerli Test Network";
            break;
        case 42:
            window.chainID = "Kovan Test Network";
            break;
        default:
            window.chainID = `Jaringan Tidak Dikenal (ID: ${a})`;
            break;
    }
    let network = document.getElementById("network");
    if (network) {
        document.getElementById(
            "network"
        ).innerHTML = `<i class="text-info fa-solid fa-circle-nodes mx-2"></i>${window.chainID}`;
    }
}

function get_Sha3() {
    hide_txInfo();
    $("#note").html(`<h5 class="text-warning">Proses Hash Dokumen...</h5>`);

    $("#upload_file_button").attr("disabled", true); // Nonaktifkan sementara saat menghitung hash
    console.log("File berubah, mulai hashing...");

    var fileInput = document.getElementById("doc-file");
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = async function (evt) {
            try {
                window.hashedfile = await web3.utils.soliditySha3(evt.target.result);
                console.log(`Document Hash : ${window.hashedfile}`);
                $("#note").html(
                    `<h5 class="text-center text-info">Dokumen Berhasil di Hash</h5>`
                );
                $("#upload_file_button").attr("disabled", false); // Aktifkan tombol setelah hash berhasil
            } catch (hashError) {
                console.error("Error hashing file:", hashError);
                $("#note").html(
                    `<h5 class="text-center text-danger">Error hashing file: ${hashError.message}</h5>`
                );
                $("#upload_file_button").attr("disabled", true); // Tetap nonaktif jika ada error hash
                window.hashedfile = null;
            }
        };
        reader.onerror = function (evt) {
            console.error("Error reading file:", evt);
            $("#note").html(`<h5 class="text-center text-danger">Error membaca file.</h5>`);
            $("#upload_file_button").attr("disabled", true); // Nonaktifkan tombol
            window.hashedfile = null;
        };
    } else {
        window.hashedfile = null;
        $("#upload_file_button").attr("disabled", true); // Nonaktifkan tombol jika tidak ada file
        $("#note").html(`<span class="text-red-500 text-sm mt-1">Belum ada file dipilih</span>`);
    }
}

function disconnect() {
    $("#logoutButton").hide();
    $("#loginButton").show();
    window.userAddress = null;
    $(".wallet-status").addClass("d-none");
    window.localStorage.setItem("userAddress", null);
    // Di halaman verifikasi, jangan menonaktifkan tombol verifikasi jika disconnect
    if (window.location.href.indexOf("verify.html") === -1) {
        $("#upload_file_button").addClass("disabled");
    }
    window.location.reload(); // Refresh halaman untuk membersihkan state
}

function truncateAddress(address) {
    if (!address) {
        return ""; // Mengembalikan string kosong jika address null/undefined
    }
    return `${address.substr(0, 7)}...${address.substr(
        address.length - 8,
        address.length
    )}`;
}

async function addExporter() {
    const address = document.getElementById("Exporter-address").value;
    const info = document.getElementById("info").value;

    if (info && address) {
        $("#loader").removeClass("d-none");
        $("#ExporterBtn").slideUp();
        $("#edit").slideUp();
        $("#delete").slideUp();
        $("#note").html(
            `<h5 class="text-info">Harap konfirmasi transaksi...</h5>`
        );
        $("#ExporterBtn").attr("disabled", true);
        $("#delete").attr("disabled", true);
        $("#edit").attr("disabled", true);
        get_ChainID();

        try {
            await window.contract.methods
                .add_Exporter(address, info)
                .send({
                    from: window.userAddress
                })

                .on("transactionHash", function (hash) {
                    $("#note").html(
                        `<h5 class="text-info p-1 text-center">Harap tunggu transaksi untuk di mined</h5>`
                    );
                })

                .on("receipt", function (receipt) {
                    $("#loader").addClass("d-none");
                    $("#ExporterBtn").slideDown();
                    $("#edit").slideDown();
                    $("#delete").slideDown();
                    console.log(receipt);
                    $("#note").html(
                        `<h5 class="text-info">Eksportir Ditambahkan ke Blockchain</h5>`
                    );
                })

                .on("confirmation", function (confirmationNr) { })
                .on("error", function (error) {
                    console.log(error.message);
                    $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
                    $("#loader").addClass("d-none");
                    $("#ExporterBtn").slideDown();
                });
        } catch (error) {
            $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
            $("#loader").addClass("d-none");
            $("#ExporterBtn").slideDown();
            $("#edit").slideDown();
            $("#delete").slideDown();
        }
    } else {
        $("#note").html(
            `<h5 class="text-center text-warning">Anda perlu memberikan alamat & informasi untuk menambahkan</h5>`
        );
    }
}

async function getExporterInfo() {
    if (!window.userAddress) { // Tambahkan pengecekan
        console.warn("getExporterInfo: window.userAddress tidak terdefinisi.");
        window.info = "Informasi Eksportir Tidak Tersedia (Belum Login)";
        return;
    }
    await window.contract.methods
        .getExporterInfo(window.userAddress)
        .call({
            from: window.userAddress
        })
        .then((result) => {
            window.info = result;
        }).catch(error => {
            console.error("Error getting exporter info:", error);
            window.info = "Gagal mengambil info eksportir.";
        });
}

async function getCounters() {
    if (!window.userAddress) { // Tambahkan pengecekan
        console.warn("getCounters: window.userAddress tidak terdefinisi.");
        return;
    }
    await window.contract.methods
        .count_Exporters()
        .call({
            from: window.userAddress
        })

        .then((result) => {
            $("#num-exporters").html(
                `<i class="fa-solid fa-building-columns mx-2 text-info"></i>${result}`
            );
        }).catch(error => { console.error("Error counting exporters:", error); });
    await window.contract.methods
        .count_hashes()
        .call({
            from: window.userAddress
        })

        .then((result) => {
            $("#num-hashes").html(
                `<i class="fa-solid fa-file mx-2 text-warning"></i>${result}`
            );
        }).catch(error => { console.error("Error counting hashes:", error); });
}

async function editExporter() {
    const address = document.getElementById("Exporter-address").value;
    const info = document.getElementById("info").value;

    if (info && address) {
        $("#loader").removeClass("d-none");
        $("#ExporterBtn").slideUp();
        $("#edit").slideUp();
        $("#delete").slideUp();
        $("#note").html(
            `<h5 class="text-info">Harap konfirmasikan transaksi...</h5>`
        );
        $("#ExporterBtn").attr("disabled", true);
        get_ChainID();

        try {
            await window.contract.methods
                .alter_Exporter(address, info)
                .send({
                    from: window.userAddress
                })

                .on("transactionHash", function (hash) {
                    $("#note").html(
                        `<h5 class="text-info p-1 text-center">Harap tunggu transaksi untuk di mined</h5>`
                    );
                })

                .on("receipt", function (receipt) {
                    $("#loader").addClass("d-none");
                    $("#ExporterBtn").slideDown();
                    console.log(receipt);
                    $("#note").html(
                        `<h5 class="text-info">Eksportir Berhasil Diperbarui</h5>`
                    );
                })

                .on("confirmation", function (confirmationNr) { })
                .on("error", function (error) {
                    console.log(error.message);
                    $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
                    $("#loader").addClass("d-none");
                    $("#ExporterBtn").slideDown();
                });
        } catch (error) {
            $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
            $("#loader").addClass("d-none");
            $("#ExporterBtn").slideDown();
            $("#edit").slideDown();
            $("#delete").slideDown();
        }
    } else {
        $("#note").html(
            `<h5 class="text-center text-warning">Anda perlu memberikan alamat & informasi untuk memperbarui</h5>`
        );
    }
}

async function deleteExporter() {
    const address = document.getElementById("Exporter-address").value;

    if (address) {
        $("#loader").removeClass("d-none");
        $("#ExporterBtn").slideUp();
        $("#edit").slideUp();
        $("#delete").slideUp();
        $("#note").html(
            `<h5 class="text-info">Harap konfirmasikan transaksi...</h5>`
        );
        $("#ExporterBtn").attr("disabled", true);
        get_ChainID();

        try {
            await window.contract.methods
                .delete_Exporter(address)
                .send({
                    from: window.userAddress
                })

                .on("transactionHash", function (hash) {
                    $("#note").html(
                        `<h5 class="text-info p-1 text-center">Harap tunggu transaksi untuk di mined</h5>`
                    );
                })

                .on("receipt", function (receipt) {
                    $("#note").html(
                        `<h5 class="text-info p-1 text-center">Dokumen Dihapus</h5>`
                    );

                    $("#loader").addClass("d-none");
                    $("#ExporterBtn").slideDown();
                    $("#edit").slideDown();
                    $("#delete").slideDown();
                    console.log(receipt);
                })
                .on("error", function (error) {
                    console.log(error.message);
                    $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
                    $("#loader").addClass("d-none");
                    $("#ExporterBtn").slideDown();
                    $("#edit").slideDown();
                    $("#delete").slideDown();
                });
        } catch (error) {
            $("#note").html(`<h5 class="text-center">${error.message}</h5>`);
            $("#loader").addClass("d-none");
            $("#ExporterBtn").slideDown();
            $("#edit").slideDown();
            $("#delete").slideDown();
        }
    } else {
        $("#note").html(
            `<h5 class="text-center text-warning">Anda perlu memberikan alamat untuk menghapus</h5>`
        );
    }
}

function generateQRCode() {
    document.getElementById("qrcode").innerHTML = "";
    console.log("making qr-code...");
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H,
    });
    if (!window.hashedfile) {
        console.warn("No hashed file available for QR code generation.");
        return;
    }
    let url = `${window.location.protocol}//${window.location.host}/verify.html?hash=${window.hashedfile}`;
    qrcode.makeCode(url);

    // Pastikan doc-file input ada sebelum mencoba mengakses files[0].name
    const docFileElement = document.getElementById("doc-file");
    if (docFileElement && docFileElement.files && docFileElement.files[0]) {
        document.getElementById("download-link").download = docFileElement.files[0].name;
    } else {
        console.warn("Document file input not found or no file selected for download name.");
        document.getElementById("download-link").download = "document_hash.png"; // Fallback name
    }

    document.getElementById("verfiy").href = url;

    function makeDownload() {
        const qrCodeImg = document.querySelector("#qrcode img");
        if (qrCodeImg) {
            document.getElementById("download-link").href = qrCodeImg.src;
        } else {
            console.warn("QR code image not found for download link.");
        }
    }
    setTimeout(makeDownload, 500);
}

async function listen() {
    console.log("started...");
    if (!window.location.pathname.includes("/upload")) return;
    document.querySelector(".loading-tx").classList.remove("d-none");

    // Pastikan window.ethereum tersedia sebelum menggunakan web3 dari window.ethereum
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.contract = new window.web3.eth.Contract(
            window.CONTRACT.abi,
            window.CONTRACT.address
        );
    } else {
        console.warn("MetaMask (window.ethereum) not detected. Cannot listen for user-specific events.");
        document.querySelector(".loading-tx").classList.add("d-none");
        // Mungkin tampilkan pesan kepada pengguna
        return;
    }

    if (!window.userAddress) {
        console.warn("No user address. Cannot listen for user-specific events.");
        document.querySelector(".loading-tx").classList.add("d-none");
        return;
    }

    try {
        const blockNumber = await window.web3.eth.getBlockNumber();
        await window.contract.getPastEvents(
            "addHash", {
            filter: {
                _exporter: window.userAddress,
            },
            fromBlock: Math.max(0, blockNumber - 999), // Mencegah fromBlock negatif
            toBlock: "latest",
        },
            function (error, events) {
                if (error) {
                    console.error("Error getting past events:", error);
                    document.querySelector(".loading-tx").classList.add("d-none");
                    return;
                }
                printTransactions(events);
                console.log("Past events:", events);
            }
        );
    } catch (error) {
        console.error("Error in listen function:", error);
        document.querySelector(".loading-tx").classList.add("d-none");
    }
}

function printTransactions(data) {
    document.querySelector(".transactions").innerHTML = "";
    document.querySelector(".loading-tx").classList.add("d-none");
    if (!data.length) {
        $("#recent-header").show();
        return;
    }
    const main = document.querySelector(".transactions");
    for (let i = 0; i < data.length; i++) {
        const a = document.createElement("a");
        a.href = `${window.CONTRACT.explore}` + "/tx/" + data[i].transactionHash;
        a.setAttribute("target", "_blank");
        a.className = "transaction-card col-lg-3 col-md-4 col-sm-5 m-2 bg-dark text-light rounded position-relative";
        a.style = "overflow:hidden; display:block; height:200px;";

        const image = document.createElement("object");
        image.style = "width:100%; height:100%; transition: all 0.3s ease;";
        image.className = "transaction-image";
        image.data = `${IPFS_GATEWAY}${data[i].returnValues[1]}`;

        const num = document.createElement("div");
        num.className = "transaction-number";
        num.append(document.createTextNode(i + 1));
        num.style = "position:absolute; left:10px; bottom:10px; font-size:1.5rem; color:white; z-index:2; transition: all 0.3s ease;";

        a.appendChild(image);
        a.appendChild(num);
        main.prepend(a);
    }
    $("#recent-header").show();
}
