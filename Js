
// ===================================
// NAVIGASI HALAMAN
// ===================================

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.querySelectorAll(".nav").forEach(button => {
    button.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  const activeButton = document.querySelector(
    `.nav[data-page="${pageId}"]`
  );

  if (activeButton) {
    activeButton.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

// ===================================
// IDENTITAS SISWA
// ===================================

let namaSiswa = "";

function simpanNama() {
  const inputNama = document.getElementById("nama").value.trim();

  if (inputNama === "") {
    alert("Silakan masukkan nama terlebih dahulu!");
    return;
  }

  namaSiswa = inputNama;

  document.getElementById("pesan").textContent =
    "Identitas berhasil disimpan. Selamat belajar, " + namaSiswa + "!";

  document.getElementById("namaHasil").textContent = namaSiswa;
}

// ===================================
// BANK SOAL KUIS
// ===================================

const soal = [
  {
    tanya: "Apa pengertian zakat?",
    pilihan: [
      "Memberikan hadiah kepada teman",
      "Mengeluarkan harta tertentu sesuai ketentuan Islam",
      "Membeli barang kebutuhan",
      "Menyimpan seluruh harta"
    ],
    benar: 1,
    bahas: "Zakat adalah mengeluarkan sebagian harta tertentu sesuai syarat dan ketentuan Islam."
  },
  {
    tanya: "Zakat merupakan rukun Islam yang ke berapa?",
    pilihan: ["Pertama", "Kedua", "Ketiga", "Kelima"],
    benar: 2,
    bahas: "Zakat merupakan rukun Islam yang ketiga."
  },
  {
    tanya: "Zakat yang dikeluarkan pada bulan Ramadan disebut...",
    pilihan: ["Zakat mal", "Zakat fitrah", "Infak", "Sedekah"],
    benar: 1,
    bahas: "Zakat fitrah wajib ditunaikan oleh muslim yang memenuhi syarat pada bulan Ramadan sebelum salat Idulfitri."
  },
  {
    tanya: "Orang yang berhak menerima zakat disebut...",
    pilihan: ["Muzaki", "Mustahik", "Musafir", "Mualim"],
    benar: 1,
    bahas: "Mustahik adalah orang yang berhak menerima zakat."
  },
  {
    tanya: "Jumlah golongan penerima zakat adalah...",
    pilihan: ["Empat", "Enam", "Delapan", "Sepuluh"],
    benar: 2,
    bahas: "Ada delapan golongan penerima zakat atau asnaf."
  },
  {
    tanya: "Mengeluarkan harta untuk kepentingan kebaikan disebut...",
    pilihan: ["Riba", "Infak", "Utang", "Jual beli"],
    benar: 1,
    bahas: "Infak adalah membelanjakan atau mengeluarkan harta untuk kebaikan."
  },
  {
    tanya: "Berikut ini contoh sedekah adalah...",
    pilihan: [
      "Mengejek teman",
      "Berbohong",
      "Tersenyum kepada orang lain",
      "Mengambil barang teman"
    ],
    benar: 2,
    bahas: "Tersenyum kepada orang lain merupakan salah satu bentuk sedekah."
  },
  {
    tanya: "Zakat mal berkaitan dengan...",
    pilihan: [
      "Harta yang memenuhi syarat",
      "Hadiah ulang tahun",
      "Pakaian sekolah",
      "Mainan anak"
    ],
    benar: 0,
    bahas: "Zakat mal adalah zakat atas harta yang memenuhi syarat tertentu."
  },
  {
    tanya: "Salah satu hikmah zakat adalah...",
    pilihan: [
      "Menambah kesombongan",
      "Membersihkan harta dan membantu sesama",
      "Membuat orang malas",
      "Mengurangi persaudaraan"
    ],
    benar: 1,
    bahas: "Zakat membantu membersihkan harta dan meningkatkan kepedulian sosial."
  },
  {
    tanya: "Sikap yang sesuai dengan ajaran infak dan sedekah adalah...",
    pilihan: [
      "Kikir",
      "Sombong",
      "Peduli kepada sesama",
      "Tidak mau membantu"
    ],
    benar: 2,
    bahas: "Infak dan sedekah mengajarkan kita untuk peduli dan membantu sesama."
  }
];

// ===================================
// MENAMPILKAN KUIS
// ===================================

let nilaiTerakhir = 0;
let jumlahBenar = 0;
let sudahDikerjakan = false;

function tampilkanKuis() {
  const area = document.getElementById("quizArea");

  area.innerHTML = "";

  soal.forEach((item, index) => {
    const div = document.createElement("div");

    div.className = "quiz-question";

    let html = `
      <h3>${index + 1}. ${item.tanya}</h3>
    `;

    item.pilihan.forEach((pilihan, nomor) => {
      html += `
        <label class="option">
          <input
            type="radio"
            name="soal${index}"
            value="${nomor}"
          >
          <span>${String.fromCharCode(65 + nomor)}. ${pilihan}</span>
        </label>
      `;
    });

    html += `<div id="review${index}"></div>`;

    div.innerHTML = html;
    area.appendChild(div);
  });
}

// ===================================
// MEMERIKSA JAWABAN
// ===================================

function periksaKuis() {
  if (!namaSiswa) {
    alert("Silakan isi identitas nama di halaman beranda!");
    showPage("home");
    return;
  }

  if (sudahDikerjakan) {
    alert("Kuis sudah selesai. Tekan Ulangi Kuis untuk mencoba lagi.");
    return;
  }

  const jawaban = [];

  for (let i = 0; i < soal.length; i++) {
    const dipilih = document.querySelector(
      `input[name="soal${i}"]:checked`
    );

    if (!dipilih) {
      alert("Silakan jawab semua soal terlebih dahulu!");
      return;
    }

    jawaban.push(Number(dipilih.value));
  }

  jumlahBenar = 0;

  soal.forEach((item, index) => {
    const review = document.getElementById(`review${index}`);

    const benar = jawaban[index] === item.benar;

    if (benar) {
      jumlahBenar++;
    }

    review.innerHTML = `
      <div class="answer-review">
        <strong class="${benar ? "correct-answer" : "wrong-answer"}">
          ${benar ? "✓ Jawaban Benar" : "✗ Jawaban Salah"}
        </strong>
        <p>Jawaban benar: ${item.pilihan[item.benar]}</p>
        <p>Pembahasan: ${item.bahas}</p>
      </div>
    `;
  });

  nilaiTerakhir = jumlahBenar * 10;
  sudahDikerjakan = true;

  tampilkanHasil();

  document.getElementById("submitQuiz").disabled = true;
  document.getElementById("submitQuiz").textContent = "Kuis Selesai";

  document.getElementById("quizResult").innerHTML = `
    <div class="info">
      <h2>🎉 Kuis Berhasil Diselesaikan!</h2>
      <p>Nama: ${namaSiswa}</p>
      <p>Jawaban benar: ${jumlahBenar} dari 10 soal</p>
      <h2>Nilai: ${nilaiTerakhir}</h2>
      <button class="btn" onclick="showPage('hasil')">
        Lihat Hasil Belajar
      </button>
    </div>
  `;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===================================
// HASIL BELAJAR
// ===================================

function tampilkanHasil() {
  document.getElementById("namaHasil").textContent = namaSiswa;

  document.getElementById("nilaiAkhir").textContent =
    nilaiTerakhir;

  let predikat = "";

  if (nilaiTerakhir >= 90) {
    predikat = "🌟 Sangat Baik!";
  } else if (nilaiTerakhir >= 80) {
    predikat = "👏 Baik Sekali!";
  } else if (nilaiTerakhir >= 70) {
    predikat = "😊 Baik!";
  } else if (nilaiTerakhir >= 60) {
    predikat = "📖 Cukup, Terus Belajar!";
  } else {
    predikat = "💪 Ayo Belajar Lebih Rajin!";
  }

  document.getElementById("predikat").textContent = predikat;

  document.getElementById("detailHasil").textContent =
    "Kamu menjawab " + jumlahBenar +
    " soal dengan benar dari 10 pertanyaan.";
}

// ===================================
// MENGULANGI KUIS
// ===================================

function ulangiKuis() {
  nilaiTerakhir = 0;
  jumlahBenar = 0;
  sudahDikerjakan = false;

  document.getElementById("submitQuiz").disabled = false;
  document.getElementById("submitQuiz").textContent =
    "Periksa Jawaban";

  document.getElementById("quizResult").innerHTML = "";

  tampilkanKuis();
  showPage("kuis");
}

// ===================================
// INISIALISASI
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  tampilkanKuis();

  document.querySelector(".result .btn").addEventListener(
    "click",
    ulangiKuis
  );
});
