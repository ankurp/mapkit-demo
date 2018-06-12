const mapkit = window.mapkit;

mapkit.init({
  authorizationCallback: (done) => {
    fetch('/token')
      .then(res => res.text())
      .then(token => done(token))
      .catch(error => {});
  }
});

const coordinate = new mapkit.Coordinate(39.871287, -75.674710);
const span = new mapkit.CoordinateSpan(1, 1);
const region = new mapkit.CoordinateRegion(coordinate, span);
const map = new mapkit.Map('map', {
  region: region,
  showsUserLocationControl: true,
  showsScale: mapkit.FeatureVisibility.Visible
});

const annotation = new mapkit.MarkerAnnotation(coordinate, {
  title: "Longwood Gardens",
  subtitle: "Botanical Garden"
});
map.addAnnotation(annotation);
