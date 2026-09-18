#include "readings.h"

#include <ArduinoJson.h>

namespace {
void set_as_tenths(JsonDocument& doc, const char* key, float value) {
    if (std::isnan(value)) {
        doc[key] = nullptr;
        return;
    }
    doc[key] = static_cast<double>(std::lround(value * 10.0f)) / 10.0;
}
} // namespace

std::string serialise_readings(const Readings& readings) {
    JsonDocument doc;
    set_as_tenths(doc, "temperature_c", readings.temperature_c);
    set_as_tenths(doc, "humidity_percent", readings.humidity_percent);
    doc["light_percent"] = readings.light_percent;
    doc["motion"] = readings.motion;
    if (readings.seconds_since_motion) {
        doc["seconds_since_motion"] = *readings.seconds_since_motion;
    } else {
        doc["seconds_since_motion"] = nullptr;
    }
    std::string json;
    serializeJson(doc, json);
    return json;
}
