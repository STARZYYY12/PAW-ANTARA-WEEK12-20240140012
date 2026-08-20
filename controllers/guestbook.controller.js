let guestbookEntries = [
  {
    id: 1,
    name: "Ahmad Rizky",
    email: "rizky@example.com",
    message: "Halo, websitenya sangat responsif dan aman!",
    createdAt: new Date().toLocaleDateString('id-ID')
  }
];

exports.renderGuestbookPage = (req, res) => {
  res.render('guestbook', {
    title: 'Buku Tamu - Secure App',
    entries: guestbookEntries,
    error: null,
    success: null
  });
};

exports.handleGuestbookSubmit = (req, res) => {
  let { name, email, message } = req.body;

  // 1. SANITASI INPUT (Trim space)
  name = typeof name === 'string' ? name.trim() : '';
  email = typeof email === 'string' ? email.trim().toLowerCase() : '';
  message = typeof message === 'string' ? message.trim() : '';

  // 2. VALIDASI SERVER-SIDE
  if (!name || !email || !message) {
    return res.status(400).render('guestbook', {
      title: 'Buku Tamu - Secure App',
      entries: guestbookEntries,
      error: 'Semua kolom (Nama, Email, Pesan) wajib diisi!',
      success: null
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).render('guestbook', {
      title: 'Buku Tamu - Secure App',
      entries: guestbookEntries,
      error: 'Format email tidak valid!',
      success: null
    });
  }

  if (message.length < 5 || message.length > 500) {
    return res.status(400).render('guestbook', {
      title: 'Buku Tamu - Secure App',
      entries: guestbookEntries,
      error: 'Pesan harus berisi 5 - 500 karakter!',
      success: null
    });
  }

  // 3. SIMPAN SECARA AMAN (Pencegahan SQLi & XSS)
  const newEntry = {
    id: guestbookEntries.length + 1,
    name,
    email,
    message,
    createdAt: new Date().toLocaleDateString('id-ID')
  };

  guestbookEntries.unshift(newEntry);

  res.render('guestbook', {
    title: 'Buku Tamu - Secure App',
    entries: guestbookEntries,
    error: null,
    success: 'Pesan Anda berhasil terkirim secara aman!'
  });
};