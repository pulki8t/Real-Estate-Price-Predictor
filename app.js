function getBathValue() {
  var idBathrooms = document.getElementsByName("idBathrooms");
  for(var i in idBathrooms) {
    if(idBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var idBHK = document.getElementsByName("idBHK");
  for(var i in idBHK) {
    if(idBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("idSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("idLocations");
  var estPrice = document.getElementById("idEstimatedPrice");

  // var url = "http://127.0.0.1:5000/predict_real_estate get_price"; //For non-nginx
  var url = "/api/predict_real_estate get_price"; //For nginx

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  // var url = "http://127.0.0.1:5000/location_names"; // For non-nginx
  var url = "/api/location_names"; // For nginx
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var idLocations = document.getElementById("idLocations");
          $('#idLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#idLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;
