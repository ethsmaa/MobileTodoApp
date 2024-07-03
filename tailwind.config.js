module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bridalWhite: '#ffffff',        // Beyaz (Genel arka plan rengi)
        softBlue: '#f1f5ff',           // Açık Mavi (Butonlar ve kart arka planları)
        blushPink: '#ffecf1',          // Açık Pembe (Kart ve buton arka planları)
        mistGray: '#ecf1f5',           // Açık Gri (Kart kenarları ve arka planlar)
        springGreen: '#f5ffec',        // Açık Yeşil (Bildirim ve onay ikonları)
        skyBlue: '#fefeff',            // Çok Açık Mavi (Sekmeler ve başlık arka planları)
        softBlush: '#fffeff',          // Çok Açık Pembe (Butonlar ve kart arka planları)
        cherryRed: '#ff6666',          // Kırmızı (Uyarı ve hata metinleri)
        mintGreen: '#66ff66',          // Yeşil (Başarı ve onay metinleri)
        disabledButtonBg: '#D3DCF5',
        buttonBg: '#748df7',
        buttonText: '#f7f8ff',
        titleColor: '#898baa',
        completedText: '#c4c5ca',
        unCompletedText: '#7b7b89',
      },
    },
  },
  plugins: [],
}
