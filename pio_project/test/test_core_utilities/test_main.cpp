#include <cmath>
#include <unity.h>

#include "conversions.h"
#include "motion_tracker.h"
#include "readings.h"

void setUp() {}
void tearDown() {}

void test_calculates_celsius() {
    TEST_ASSERT_FLOAT_WITHIN(0.01f, 25.0f, calculate_temp_celsius(1650));
    TEST_ASSERT_FLOAT_WITHIN(0.01f, 45.0f, calculate_temp_celsius(1000));
    TEST_ASSERT_TRUE(std::isnan(calculate_temp_celsius(0)));
    TEST_ASSERT_TRUE(std::isnan(calculate_temp_celsius(3100)));
}

void test_calculates_light_percent() {
    TEST_ASSERT_EQUAL_UINT8(50, calculate_light_percentage(1500));
    TEST_ASSERT_EQUAL_UINT8(100, calculate_light_percentage(4000));
}

void test_measures_seconds_since_motion() {
    MotionTracker tracker;
    TEST_ASSERT_FALSE(tracker.get_seconds_since_last_motion(5000).has_value());

    tracker.update(true, UINT32_MAX - 999);
    TEST_ASSERT_TRUE(tracker.is_active());
    tracker.update(false, 1000);
    TEST_ASSERT_FALSE(tracker.is_active());
    TEST_ASSERT_EQUAL_UINT32(12, *tracker.get_seconds_since_last_motion(11000));
}

void test_serialises_readings() {
    Readings readings;
    readings.light_percent = 62;
    readings.seconds_since_motion = 125;
    TEST_ASSERT_EQUAL_STRING(
        "{\"temperature_c\":null,\"humidity_percent\":null,\"light_percent\":62,"
        "\"motion\":false,\"seconds_since_motion\":125}",
        serialise_readings(readings).c_str());

    readings.temperature_c = 23.44f;
    readings.humidity_percent = 45.0f;
    TEST_ASSERT_EQUAL_STRING("{\"temperature_c\":23.4,\"humidity_percent\":45,\"light_percent\":62,"
                             "\"motion\":false,\"seconds_since_motion\":125}",
                             serialise_readings(readings).c_str());
}

int main() {
    UNITY_BEGIN();
    RUN_TEST(test_calculates_celsius);
    RUN_TEST(test_calculates_light_percent);
    RUN_TEST(test_measures_seconds_since_motion);
    RUN_TEST(test_serialises_readings);
    return UNITY_END();
}
