#include "sensors.h"

#include <Arduino.h>

#include "config.h"
#include "conversions.h"

void Sensors::begin() {
    pinMode(PIR_PIN, INPUT);
    dht_.setup(DHT_PIN, DHTesp::DHT11);
}

Readings Sensors::read(uint32_t current_time_ms) {
    motion_.update(digitalRead(PIR_PIN) == HIGH, current_time_ms);

    Readings readings;
    readings.temperature_c = calculate_temp_celsius(analogReadMilliVolts(THERMISTOR_PIN));
    readings.humidity_percent = dht_.getHumidity();
    readings.light_percent = calculate_light_percentage(analogReadMilliVolts(LIGHT_PIN));
    readings.motion = motion_.is_active();
    readings.seconds_since_motion = motion_.get_seconds_since_last_motion(current_time_ms);

    return readings;
}
