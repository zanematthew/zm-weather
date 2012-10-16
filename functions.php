<?php

function zm_weather_head(){
    print '<script type="text/javascript">var _zm_weather_default_location = "'.get_option('zm_weather_default_location').'";</script>';
}
add_action('wp_head', 'zm_weather_head' );

function zm_weather_admin_init(){
    global $_zm_setting_fields;
    $_zm_setting_fields[] = 'zm_weather_default_location';
}
add_action('admin_init','zm_weather_admin_init');

function zm_weather_styles() {

    $dependencies[] = 'jquery';

    wp_enqueue_script( 'zm-weather-script', plugin_dir_url( __FILE__ ) . 'scripts.js', $dependencies  );
    wp_enqueue_style( 'zm-weather-style', plugin_dir_url( __FILE__ ) . 'styles.css' );
}
add_action( 'wp_enqueue_scripts', 'zm_weather_styles' );

function zm_weather_target(){?>
    <div id="zm_weather_target"><div class="zm-loading">Loading weather...</div></div>​
<?php }

function zm_weather_venue_target( $location=null, $title=null ){
    if ( ! is_null( $title ) ) $title = '<h2 class="title">Venue Forecast</h2>';?>
<div id="zm_weather_forecast_target" data-location="<?php print $location; ?>"><div class="zm-loading">Loading weather...</div></div>
<?php }

function zm_weather_settings(){?>
    <fieldset>
        <legend>zM Weather</legend>
        <div class="row">
            <label>Default Location</label>
            <input name="zm_weather_default_location" id="zm_weather_default_location" type="text" value="<?php print get_option('zm_weather_default_location'); ?>">
        </div>
    </fieldset>
<?php }
add_action( 'zm_weather_settings', 'zm_weather_settings' );