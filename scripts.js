map.on('load', () => {
  fetch('bookstores.geojson')
    .then(response => response.json())
    .then(data => {
      const storeLookup = {};
      data.features.forEach(feature => {
        storeLookup[feature.properties.id] = feature;
      });
      document.querySelectorAll('.store-btn').forEach(button => {
        button.addEventListener('click', () => {
          const storeId = button.getAttribute('data-store');
          const store = storeLookup[storeId];
          if (store) {
            const coords = store.geometry.coordinates;
            map.flyTo({
              center: coords,
              zoom: 14
            });
            new mapboxgl.Popup()
              .setLngLat(coords)
              .setHTML(`<h3>${store.properties.name}</h3><p>${store.properties.description}</p>`)
              .addTo(map);
          }
        });
      });
    });
});