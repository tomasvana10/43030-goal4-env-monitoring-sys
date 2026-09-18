#pragma once

#include <cmath>
#include <cstdint>
#include <optional>
#include <string>

struct Readings {
    float temperature_c = NAN;
    float humidity_percent = NAN;
    uint8_t light_percent = 0;
    bool motion = false;
    std::optional<uint32_t> seconds_since_motion;
};

std::string serialise_readings(const Readings& readings);
