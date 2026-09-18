#include "motion_tracker.h"

void MotionTracker::update(bool pin_high, uint32_t current_time_ms) {
    is_active_ = pin_high;
    if (pin_high) {
        last_seen_ms_ = current_time_ms;
    }
}

bool MotionTracker::is_active() const {
    return is_active_;
}

std::optional<uint32_t>
MotionTracker::get_seconds_since_last_motion(uint32_t current_time_ms) const {
    if (!last_seen_ms_) {
        return std::nullopt;
    }

    return (current_time_ms - *last_seen_ms_) / 1000;
}
