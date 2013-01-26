<?php
/**
 * Plugin Name: zM Weather
 * Plugin URI: --
 * Description: --
 * Version: 1.0.0
 * Author: Zane M. Kolnik, Pete S. Milkman
 * Author URI: http://zanematthew.com/
 * License: GPL
 */

define( 'ZM_WEATHER_VERSION', '1' );
define( 'ZM_WEATHER_OPTION', 'zm_weather_version' );

require_once 'functions.php';

/**
 * Add the version number to the options table when
 * the plugin is installed.
 *
 * @note Our version number is used in Themes to check
 * if the plugin is installed!
 */
function zm_weather_activation() {

    if ( get_option( ZM_WEATHER_OPTION ) &&
         get_option( ZM_WEATHER_OPTION ) > ZM_WEATHER_VERSION )
        return;

    update_option( ZM_WEATHER_OPTION, ZM_WEATHER_VERSION );
}
register_activation_hook( __FILE__, 'zm_weather_activation' );


/**
 * Delete our version number from the database
 */
function zm_weather_deactivation(){
    delete_option( ZM_WEATHER_OPTION );
}
register_deactivation_hook( __FILE__, 'zm_weather_deactivation' );