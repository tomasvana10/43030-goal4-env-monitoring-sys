#include "conversions.h"

#include <algorithm>
#include <cmath>

namespace {
constexpr uint32_t SUPPLY_MILLIVOLTS = 3300;
constexpr uint32_t ADC_CEILING_MILLIVOLTS = 3000;
constexpr float SERIES_KILO_OHMS = 10.0f;
constexpr float NOMINAL_KILO_OHMS = 10.0f;
constexpr float NOMINAL_KELVIN = 298.15f;
constexpr float BETA = 3950.0f;
constexpr float KELVIN_OFFSET = 273.15f;
} // namespace

float calculate_temp_celsius(uint32_t millivolts) {
    if (millivolts == 0 || millivolts >= ADC_CEILING_MILLIVOLTS) {
        return NAN;
    }
    const float kilohms = SERIES_KILO_OHMS * static_cast<float>(millivolts) /
                          static_cast<float>(SUPPLY_MILLIVOLTS - millivolts);
    const float kelvin =
        1.0f / (1.0f / NOMINAL_KELVIN + std::log(kilohms / NOMINAL_KILO_OHMS) / BETA);
    return kelvin - KELVIN_OFFSET;
}

uint8_t calculate_light_percentage(uint32_t millivolts) {
    const uint32_t clamped = std::min(millivolts, ADC_CEILING_MILLIVOLTS);
    return static_cast<uint8_t>((clamped * 100 + ADC_CEILING_MILLIVOLTS / 2) /
                                ADC_CEILING_MILLIVOLTS);
}
