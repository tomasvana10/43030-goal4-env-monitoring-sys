#include <Arduino.h>
#include <WiFi.h>

#include "api_server.h"
#include "config.h"
#include "secrets.h"
#include "sensors.h"

namespace {
Sensors sensors;
} // namespace

void setup() {
    Serial.begin(115200);
    sensors.begin();

    Serial.printf("Connecting to Wifi Network \"%s\"", WIFI_SSID);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        delay(250);
        Serial.print(".");
    }
    Serial.println();
    Serial.printf("Connected to WiFi network \"%s\" with IP %s\n", WIFI_SSID,
                  WiFi.localIP().toString().c_str());

    const esp_err_t err = api_server::begin();
    if (err != ESP_OK) {
        Serial.printf("An error occurred while starting the HTTP server: %s\n",
                      esp_err_to_name(err));
        return;
    }
    Serial.println("HTTP server is ready");
}

void loop() {
    api_server::publish(sensors.read(millis()));
    delay(READ_INTERVAL_MS);
}
