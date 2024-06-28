var khodamData = {};

function generateKhodamName() {
  var name = document.getElementById("name").value;
  var notificationElement = document.getElementById("notification");

  if (name.trim() === "") {
    notificationElement.textContent = "Harap masukkan nama Anda.";
    notificationElement.style.display = "block";
    document.getElementById("result").style.display = "none";
    return;
  }

  if (name.trim().length < 3) {
    notificationElement.textContent = "Nama anda terlalu pendek untuk dicarikan (minimal 3 huruf).";
    notificationElement.style.display = "block";
    document.getElementById("result").style.display = "none";
    return;
  }

  if (/\d/.test(name)) {
    notificationElement.textContent = "Anda tidak bisa mamasukkan angka.";
    notificationElement.style.display = "block";
    document.getElementById("result").style.display = "none";
    return;
  }

  notificationElement.style.display = "none";

  name = name.charAt(0).toUpperCase() + name.slice(1);

  var khodamNames = [
    
  ];

  if (khodamData.hasOwnProperty(name)) {
    var khodamName = khodamData[name].khodamName;
    var khodamDescription = khodamData[name].khodamDescription;
    displayResult(name, khodamName, khodamDescription);
  } else {
    var randomNumber = Math.random();

    if (randomNumber < 0.1) {
      var khodamName = "Kosong";
      showFakeLoadingForEmptyKhodam(name);
    } else {
      var filteredKhodamNames = khodamNames.filter(function (name) {
        return name !== "Kosong";
      });

      var randomIndex = Math.floor(Math.random() * filteredKhodamNames.length);
      var khodamName = filteredKhodamNames[randomIndex];

      generateKhodamDescription(name, khodamName);
    }
  }
}

function showFakeLoadingForEmptyKhodam(name) {
  var emptyKhodamDescriptions = [
    "error",
    "server apdet.",
    "gagal",
    "coba lagi",
    "waduhh saya kurang tau dehhh heheh"
  ];

  Swal.fire({
    title: "Mohon Tunggu...",
    html: "Meminta si dzBot mencari informasi tentang kamu...",
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
    timer: 2000,
  }).then(() => {
    var randomIndex = Math.floor(Math.random() * emptyKhodamDescriptions.length);
    var khodamDescription = emptyKhodamDescriptions[randomIndex];
    khodamData[name] = {
      khodamName: "kurang tau",
      khodamDescription: khodamDescription,
    };
    displayResult(name, "kurang tau", khodamDescription);
  });
}

function generateKhodamDescription(name, khodamName) {
  var promptText =
    "Jawab pertanyaan " +
    khodamName +
    " menggunakan bahasa indonesia hanya 30 kata saja menggunakan rangkuman yang ada yang terkait dengan pertanyaan nya " +
    name +
    ", random sesuai dengan pertanyaan.";

  Swal.fire({
    title: "Mohon Tunggu...",
    html: "Meminta si udin petot mencari informasi...",
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  axios
    .post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        messages: [
          {
            role: "user",
            content: promptText,
          },
        ],
        model: "mixtral-8x7b-32768",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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",
        },
      }
    )
    .then(function (response) {
      var khodamDescription = response.data.choices[0].message.content.trim();
      khodamData[name] = {
        khodamName: khodamName,
        khodamDescription: khodamDescription,
      };
      displayResult(name, khodamName, khodamDescription);
      Swal.close();
    })
    .catch(function (error) {
      Swal.fire("Oops...", "Terjadi kesalahan saat meminta bantuan. Silakan coba lagi nanti.", "error");
    });
}

function displayResult(name, khodamName, khodamDescription) {
  document.getElementById("output-name").textContent = name;
  document.getElementById("khodam-name").textContent = khodamName;
  document.getElementById("khodam-description").textContent = khodamDescription;
  document.getElementById("result").style.display = "block";
}

alert('selamat menikmati kwkwkk😂🙏')
