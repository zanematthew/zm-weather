jQuery(document ).ready(function( $ ){
    function get_weather( loc, target ) {

        var u = 'f';

        // using bylocation table
        var query = "SELECT * FROM weather.bylocation WHERE location='"+loc+"'";
        var query = encodeURIComponent( query );
        var env = encodeURIComponent('store://datatables.org/alltableswithkeys');
        var format = 'json';
        var cacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
        var callback = 'weatherCallback';

        var url = 'http://query.yahooapis.com/v1/public/yql?q=' + query + '&env=' + env + '&format=' + format + '&callback=' + callback + '&_nocache=' + cacheBuster;

        weatherCallback = function(data) {
            var selector = '';
            if ( data.query.results == null ){
                html = '<div>Unable to determine<br /> weather conditions.</div>';
            } else {

                var info = data.query.results.weather.rss.channel;
                var html = '';
                var css_class;

                html =  '<div class="zm-weather-container">';
                for ( var i in info.item.forecast ) {
                    html += '<div class="item ' + i + '">';
                        html += '<div class="icon">';
                                html += '<img src="http://l.yimg.com/a/i/us/we/52/' + info.item.forecast[i].code + '.gif" />';
                        html += '</div>';
                        html += '<div class="meta-container">';
                            html += '<span class="meta day-of-week">'+info.item.forecast[i].day+' </span>';
                            html += '<span class="meta temperature">'+info.item.condition.temp+'&deg; </span>';
                            html += '<span class="meta weather-high-low">';
                                html += info.item.forecast[i].high+'&deg;';
                                html += '\/';
                                html += info.item.forecast[i].low+'&deg;';
                            html += '</span>';
                            html += '<span class="meta weather-wind"> '+info.wind.speed + info.units.speed+'</span>';
                        html += '</div>';
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

    get_weather( _user.location.zip, "#zm_weather_local_target" );

    get_weather( $('.zip').text(), "#zm_weather_forecast_target" );
});