(function ($, L) {
  'use strict';

  var fishing = function (fishingJson) {

    var that = this,
      isInEdit = false,
      map,
      userPoint,
      drawingLayer;

    that.init = function () {

      that.fishingJson = fishingJson;

      if (window.location.search.indexOf("edit") > -1) {
        that.isInEdit = true;
      }

      that.initBoundaryList();
      that.initMap();
      that.registerMapEvents();
      that.getUserLocation();

      if (that.isInEdit) {
        $('#exportButton').show().on('click', that.exportClick);
      }
    };
    
    that.initBoundaryList = function () {
      
      var toggleElement = $('#nav-toggle'),
        listElement = $('#sidebar'),
        itemElement,
        itemTemplate = '<div data-boundary-id="{id}" class="boundary-item">{name} <span class="glyphicon glyphicon-chevron-right"></span></div>',
        notesTemplate = '<a href="#" class="boundary-more-link"><span class="glyphicon glyphicon-info-sign"></span> more</a><div class="boundary-notes">{notes}</div>';
      
      //Hook up the nav toggle button in the header
      toggleElement.on('click', function (event) {
        if (listElement.css('display') !== 'none') {
          listElement.css({ display: 'none' });
        } else {
          listElement.css({ display: 'block' });
        }
        
        that.map.invalidateSize(false);
      });
      
      //Add all boundary items to the list
      $.each(that.fishingJson.features, function (index, boundary) {
        boundary.properties.id = index + 1;
        
        itemElement = $(itemTemplate.replace('{id}', boundary.properties.id)
                               .replace('{name}', boundary.properties.name));
        
        if (boundary.properties.notes != null) {
          itemElement.append(notesTemplate.replace('{notes}', boundary.properties.notes));
        }                       
        
        listElement.append(itemElement);
      });
      
      //Zoom to boundary on the map
      listElement.on('click', '.boundary-item', function (event) {
        var boundaryItem = $(event.currentTarget),
          boundaryId = boundaryItem.data('boundaryId');
          
        that.drawingLayer.eachLayer(function (layer) {
          if (layer.feature.properties.id === boundaryId) {
            that.map.fitBounds(layer.getBounds(), { animate: true });;
            return false;
          }
        });
      });
      
      //Display "more" notes
      listElement.on('click', '.boundary-more-link', function (event) {
        var moreLink = $(event.currentTarget),
          boundaryItem = moreLink.closest('.boundary-item');
        
        if (boundaryItem.hasClass('expanded')) {
          moreLink.html(moreLink.html().replace('less', 'more'));
          boundaryItem.removeClass('expanded');
        } else {
          moreLink.html(moreLink.html().replace('more', 'less'));
          boundaryItem.addClass('expanded');
        }
        
        event.stopPropagation();
      });
    };
    
    that.initMap = function () {
      that.map = L.map('map').setView([52.654200, -7.254123], 11);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(that.map);

      //add any JSON
      if (fishingJson) {

        that.drawingLayer = new L.FeatureGroup(L.geoJson(fishingJson, {
          style: function (feature) {
            return {
              color: 'red'
            };
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup('<div class="popup-name">' + feature.properties.name + '</div><div class="popup-notes">' + feature.properties.notes + '</div>');
          }
        }).getLayers());

      } else {
        that.drawingLayer = new L.FeatureGroup();
      }

      that.map.addLayer(that.drawingLayer);

      if (that.isInEdit) {
        // Initialise the draw control and pass it the FeatureGroup of editable layers
        var drawControl = new L.Control.Draw({
          edit: {
            featureGroup: that.drawingLayer
          }
        });
        that.map.addControl(drawControl);
      }
    };

    that.registerMapEvents = function () {
      that.map.on('draw:created', function (e) {
        var type = e.layerType,
          layer = e.layer,
          popup;

        popup = L.popup().setContent('Hi There');

        layer.bindPopup(popup);

        // Do whatever else you need to. (save to db, add to map etc)
        that.drawingLayer.addLayer(layer);
      });
    };

    that.getUserLocation = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(that.userPositionUpdated);
        navigator.geolocation.watchPosition(that.userPositionUpdated);
      }
    };

    that.userPositionUpdated = function (position) {

      var myIcon = L.icon({
        iconUrl: 'images/fishIcon.png',
        iconRetinaUrl: 'images/fishIcon@2x.png',
        iconSize: [25, 25],
        iconAnchor: [0, 0],
        popupAnchor: [13, 13]
      });

      if (that.userPoint) {
        that.map.removeLayer(that.userPoint);
      }

      that.userPoint = L.marker([position.coords.latitude, position.coords.longitude], {
        icon: myIcon
      });
      that.userPoint.bindPopup("Your Location");
      that.userPoint.addTo(that.map);
    };

    that.exportClick = function (event) {
      var panel = $('#exportPanel');

      panel.empty();
      panel.append(JSON.stringify(that.drawingLayer.toGeoJSON()));
      panel.show();
    };
    
    that.init();
  };

  window.Fishing = fishing;

}(window.jQuery, window.L));