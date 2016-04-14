/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $(".button-collapse").sideNav();
    $(".dropdown-button").dropdown();
    displayRouteCode();
    displayStatusOfBus();
    displayBusNames();

    $('.modal-trigger').leanModal();
    $('.collapsible').collapsible({
        accordion: true
    });
});

/*$(function(){
 $(".modal-close").on('click',function(){
 $("#AccidentModal").modal('hide');
 });
 });*/



/**
 * function to initialize datepicker
 */
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 30 // Creates a dropdown of 15 years to control year
});

/*
 * function to send request
 * @param {type} directionsService
 * @param {type} directionsDisplay
 * @returns {undefined}
 */

function sendRequest(u) {

    console.log(u);
    var obj = $.ajax({url: u, async: false});
    var result = $.parseJSON(obj.responseText);
    return result;
}
function setAttribute(element, attributes) {
    Object.keys(attributes).forEach(function (name) {
        element.setAttribute(name, attributes[name]);
    });
}

/**
 * function to display the bus stops
 * @returns {undefined}
 */
function displayStops() {
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=5";
    var object = sendRequest(theUrl);
    if (object.result === 1) {
        var listStops;
        $.each(object.busStops, function (i, busStops) {
            var stopName = busStops.Bus_Stop_Name;
            listStops = '<li style="list-style-type:none;"><div class="collapsible-header data" id="' + busStops.Bus_Stop_Name + '"><i class="material-icons">keyboard_arrow_right</i>' + stopName + '</div><div class="collapsible-body "><ul id="first' + busStops.Bus_Stop_Id + '"></ul></div>';
            $("#stopsAvailable").append(listStops);
            var theUrl2 = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=12&Bus_Stop_Name=" + busStops.Bus_Stop_Name;
            var obj2 = sendRequest(theUrl2);
            if (obj2.result === 1) {
                var idUSed = "#first" + busStops.Bus_Stop_Id;
                $.each(obj2.stops, function (i, stops) {
                    var busNode = document.createElement("Li");
                    busNode.innerHTML = stops.Bus_Name;
                    $(idUSed).append(busNode);
                });
            }
        });

    }
}


/**
 * function to add data to the database
 * @returns {undefined}
 */
/*function addBus() {
    var busId = $("#Busid").val();
    var busName = $("#BusName").val();
    var gpsDeviceId = $("#GPSDevice_ID").val();
    var driverId = $("#Bus_DriverId").val();
    var routeCode = $("#Bus_RouteCode").val();
    var Agency = $("#Bus_Agency").val();
    var numberofSeats = parseInt($("#number_of_seats").val());

    var stringval = "Bus_id=" + busId + "&Bus_Name=" + busName + "&GPSDevice_ID=" + gpsDeviceId + "&Bus_DriverId=" + driverId + "&Bus_RouteCode=" + routeCode + "&Bus_Agency=" + Agency + "&Number_of_seats=" + numberofSeats;
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=3&" + stringval;
    console.log(theUrl);
    var object = sendRequest(theUrl);

    if (object.result === 1) {
        Materialize.toast(object.message, 5000, 'rounded');
    }
    else {
        Materialize.toast(object.message, 5000, 'rounded');
    }

}*/

/**
 * function to add a driver to the system 
 * @returns {undefined}
 */
function adddriver() {
    var driverId = $("#driverID").val();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var assignedBus = $("#assignedBusId").val();


    var stringval = "DriverId=" + driverId + "&firstName=" + firstName + "&lastName=" + lastName + "&AssignedBus_ID=" + assignedBus;
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=4&" + stringval;
    console.log(theUrl);
    var object = sendRequest(theUrl);

    if (object.result == 1) {
        Materialize.toast(object.message, 4000, 'rounded');
    }
    else {
        Materialize.toast(object.message, 4000, 'rounded');
    }
}

/**
 * function to add a new bus stop
 * @returns {undefined}
 */

function addBusStop() {
    var name = $("#Bus_Stop_Name").val();
    var lon = $("#longitude").val();
    var lat = $("#latitude").val();
    var RouteId = $("#routecode").val();

    var stringVal = "Bus_Stop_Name=" + name + "&Longitude=" + lon + "&Latitude=" + lat + "&RouteId=" + RouteId;
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=5&" + stringVal;


    var obj = sendRequest(theUrl);

    if (obj.result == 1) {
        Materialize.toast(object.message, 4000, 'rounded');
    }
    else {
        Materialize.toast(object.message, 4000, 'rounded');
    }
}


/**
 * function to add a new GPS device
 * @returns {undefined}
 */
function addNewGPSDevice() {
    var deviceId = $("#Device_Id").val();
    var description = $("#Description").val();

    var stringVal = "Device_Id=" + deviceId + "&Description=" + description;

    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=6&" + stringVal;

    var obj = sendRequest(theUrl);

    if (obj.result == 1) {
        Materialize.toast(object.message, 4000, 'rounded');
    }
    else {
        Materialize.toast(object.message, 4000, 'rounded');
    }
}

/**
 * function to add route
 * @returns {undefined}
 */
function addRoute() {
    var routeCode = $("#Route_Code").val();
    var starLong = $("#StartRoute_longitude").val();
    var startLat = $("#StartRoute_Latitude").val();
    var endLong = $("#EndLongitude").val();
    var endLat = $("#EndLatitude").val();

    var stringVal = "Route_Code=" + routeCode + "&StartRoute_longitude=" + starLong + "&StartRoute_Latitude=" + startLat + "&EndLongitude=" + endLong + "&EndLatitude=" + endLat;
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=8&" + stringVal;

    var object = sendRequest(theUrl);

    if (object.result == 1) {
        Materialize.toast(object.message, 4000, 'rounded');
    }
    else {
        Materialize.toast(object.message, 4000, 'rounded');
    }

}

/**
 * function to register the management
 * @returns {undefined}
 */
function managementSignUp() {
    var agence = $("#companyName").val();
    var companyEmail = $("#email").val();
    var phoneNumber = $("#phoneNumber").val();
    var location = $("#location").val();

    var stringVal = "AgencyName=" + agence + "&email=" + companyEmail + "&PhoneNumber=" + phoneNumber + "&location=" + location;
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=10&" + stringVal;
    var object = sendRequest(theUrl);
    //alert(theUrl);
    if (object.result === 1) {
        Materialize.toast(object.message, 20000, 'rounded');
    }
    else {
        Materialize.toast(object.message, 4000, 'rounded');
    }
}


/**
 * function to display the route details
 */
function displayRouteCode() {
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=9";
    var object = sendRequest(theUrl);

    if (object.result === 1) {
        //alert("here");
        $.each(object.routes, function (i, routes) {
            var optionElement = document.createElement('option');
            optionElement.value = routes.Route_Code;
            optionElement.innerHTML = routes.Route_Code;
            $("#routecode").append(optionElement);
            //var routeElement = $('<select></select>');
            //routeElement.html('<option value="'+i+'">'+routes.Route_Code+'</option>');
            //$("#routecode").append('<option value="'+i+'">'+routes.Route_Code+'</option>');
        });
    }
    else {
        Materialize.toast(object.message, 4000, 'rounded');
    }
}

/**
 * function to validate email input
 * @param {type} e
 * @returns {undefined}
 */
function validateInput(e) {
    var email = document.SignUpForm.email;
    if (email.value === " ") {
        e.preventDefault();
    }
    if (email.value.indexOf("@", 0) < 0) {
        e.preventDefault();
    }
    if (email.value.indexOf(".", 0) < 0) {
        e.preventDefault();
    }
}

$("#email").bind("input propertychange", function () {
    if (this.value.length === 0) {
        Materialize.toast("You have not entered an email address", 4000, 'rounded');
    }
    if ((this.value.indexOf("@", 0) < 0) || (this.value.indexOf(".", 0) < 0)) {
        Materialize.toast("You entered invalid email address", 4000, 'rounded');
    }
});


/**
 * function to login the bus management
 * @returns {undefined}
 */
function managementLogin() {
    var email = $("#email").val();
    var password = $("#password").val();

    var stringVal = "email=" + email + "&Assigned_Pass=" + password;
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=11&" + stringVal;

    var object = sendRequest(theUrl);

    if (object.result === 1) {
        //window.location="/";
        window.location = "/DashBoard.html";

    }
    else {
        Materialize.toast(object.message, 4000, 'rounded');
    }
}



function add_bus_status() {
    var status = $("#latestStatus").val();
 
    var priority = "";
    var bus_name = $("#busNameId").val();
    if (document.getElementById("high").checked) {
        priority = "HIGH";
    }
    else if (document.getElementById("medium").checked) {
        priority = "MEDIUM";
    }
    else if (document.getElementById("low").checked) {
        priority = "LOW";
    }


    var stringVal = "Status=" + status + "&Importance=" + priority + "&BusName=" + bus_name;
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=14&" + stringVal;
   
    var object = sendRequest(theUrl);
    if (object.result === 1) {
        Materialize.toast(object.message, 4000, 'rounded');
    }
    else {
        Materialize.toast(object.message, 4000, 'rounded');
    }
}


function  displayStatusOfBus() {
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=15";
    var object = sendRequest(theUrl);
    var marquee = "";
    if (object.result === 1) {
        $.each(object.status, function (i, status) {
            marquee = '<marquee>' +"<b>Importance:</b> " +status.Importance +"<b> Bus Name:</b> "+ status.BusName +"<b> Status: </b>" +status.Status + '</marquee>';
        });

    }

    $("#marqueesValues").replaceWith(marquee);

}

/**
 * function to display the bus Names in the select options 
 * while updating the bus status
 * @returns {undefined}
 */
function displayBusNames() {
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=13";
    var object = sendRequest(theUrl);

    if (object.result === 1) {
        $.each(object.busNames, function (i, busNames) {
            var optionElement = document.createElement('option');
            optionElement.value = busNames.Bus_Name;
            optionElement.innerHTML = busNames.Bus_Name;
            $("#busNameId").append(optionElement);
            //var routeElement = $('<select></select>');
            //routeElement.html('<option value="'+i+'">'+routes.Route_Code+'</option>');
            //$("#routecode").append('<option value="'+i+'">'+routes.Route_Code+'</option>');
        });
    }
}

/**
 * fucntion to pick the current cordinate and pass to the database
 * @returns {undefined}
 */
function trafficStatus() {
    navigator.geolocation.getCurrentPosition(addTrafficJamStatus);
}

/**
 * function to add trafic jam status to database
 * @param {type} position
 * @returns {undefined}
 */
function addTrafficJamStatus(position) {
    var level = "";

    var jamStatus = $("#textarea1Jam").val();
    if (document.getElementById("heavy").checked) {
        level = "HEAVY";
    }
    else if (document.getElementById("moderate").checked) {
        level = "MODERATE";
    }
    else if (document.getElementById("standstill").checked) {
        level = "STANDSTILL";
    }

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;


    var stringVal = "level_of_traffic=" + level + "&jam_statement=" + jamStatus + "&latitude=" + latitude + "&longitude=" + longitude;
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=16&" + stringVal;
    var object = sendRequest(theUrl);
     prompt("urls is: ", theUrl);
    if (object.result === 1) {
        Materialize.toast(object.message, 4000, 'rounded');
    }
    else {
        Materialize.toast(object.message, 4000, 'rounded');
    }
}

/**
 * fucntion to pick the current cordinate and pass to the database
 * @returns {undefined}
 */
function accidentStatus() {
 
    navigator.geolocation.getCurrentPosition(addAcciddentStatus);
}

/**
 * function to insert the accident ocuurance on the database
 * @param {type} position
 * @returns {undefined}
 */
function addAcciddentStatus(position) {
   
    var update = $("#textarea1Accident").val();
    
    var accidentLevel = "";
    
    if(document.getElementById("minorA").checked){
        accidentLevel = "MINOR";
    }
    else if(document.getElementById("majorA")){
        accidentLevel = "MAJOR";
    }
    
    
     var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
   
    
    var stringVal = "Update_Statement="+update+"&longitude="+longitude + "&Latitude="+latitude+"&accidentLevel="+accidentLevel;
    var theUrl = "http://166.62.103.147/~ashesics/class2016/beatrice_migaliza/MyRide/public_html/PHP/request.php?cmd=17&"+stringVal;
    var object = sendRequest(theUrl);
    //alert(object.result);
    if(object.result===1){
           Materialize.toast(object.message, 4000, 'rounded');
    }
    else{
           Materialize.toast(object.message, 4000, 'rounded');
    }


    
    
}