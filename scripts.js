jQuery(document ).ready(function( $ ){
    function get_weather( loc, target ) {

        if ( jQuery( target ).attr('data-location') != "undefined" ){
            loc = jQuery( target ).attr('data-location');
        }

        var u = 'f';

        // using bylocation table
        var query = "SELECT * FROM weather.bylocation WHERE location='"+loc+"'";

        var query = encodeURIComponent( query );
        var env = encodeURIComponent('store://datatables.org/alltableswithkeys');
        var format = 'json';
        var cacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
        var callback = 'weatherCallback';

        var url = 'http://query.yahooapis.com/v1/public/yql?q=' + query + '&env=' + env + '&format=' + format + '&callback=' + callback + '&_nocache=' + cacheBuster;

        window.weatherCallback = function(data) {
            var selector = '';

            if ( data.query.results == null ){
                html = '<div>Unable to determine<br /> weather conditions.</div>';
            } else {

                var info = data.query.results.weather.rss.channel;
                var html = '';

                html =  '<div class="zm-weather-container">';
                for ( var i in info.item.forecast ) {
                    html += '<div class="item '+i+'">';
                        html += '<div class="left">';
                            html += '<span class="meta day-of-week">'+info.item.forecast[i].day+'</span>';
                            html += '<div class="icon">';
                                html += '<img src="http://l.yimg.com/a/i/us/we/52/' + info.item.forecast[i].code + '.gif" />';
                            html += '</div>';
                        html += '</div>';
                        html += '<div class="right">';
                            html += '<span class="temperature">'+info.item.condition.temp+'&deg;</span>';
                        html += '</div>';
                        html += '<div class="clear"></div>';
                        html += '<span class="meta weather-high"><span class="text">High</span>'+info.item.forecast[i].high+'&deg;</span>';
                        html += '<span class="meta weather-low"><span class="text">Low</span> '+info.item.forecast[i].low+'&deg;</span>';
                        html += '<span class="meta weather-wind"><span class="text">Wind</span> '+info.wind.speed + info.units.speed+'</span>';
                    html += '</div>';
                }
                html += '</div>';
            }
            jQuery( target ).html(html);
        }

        jQuery.ajax({
            url: url,
            dataType: 'jsonp',
            cache: true,
            jsonpCallback: 'weatherCallback'
        });
    }

    if ( typeof( _user ) !== 'undefined' ){
        local = _user.city +','+_user.region;
    } else {
        local = _zm_weather_default_location;
    }

// console.log( _zm_weather_default_location );
// console.log( local );
    // get_weather( local, "#zm_weather_local_target" );
    get_weather( local, "#zm_weather_forecast_target" );
});