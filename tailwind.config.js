module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bridalWhite: '#ffffff',        // Beyaz (Genel arka plan rengi)
        softBlue: '#f1f5ff',           // Açık Mavi (Butonlar ve kart arka planları)
        mistGray: '#ecf1f5',           // Açık Gri (Kart kenarları ve arka planlar)
        skyBlue: '#fefeff',            // Çok Açık Mavi (Sekmeler ve başlık arka planları)
        softBlush: '#fffeff',          // Çok Açık Pembe (Butonlar ve kart arka planları)
        disabledButtonBg: '#D3DCF5',
        buttonText: '#f7f8ff',
        titleColor: '#898baa',
        completedText: '#c4c5ca',
        unCompletedText: '#7b7b89',
        button : '#898baa',
        enterTask : '#EBF1F5',
        primaryHeadline : '#474787',
        secondaryHeadline : '#2B2B5B',
      },
    },
  },
  plugins: [],
}