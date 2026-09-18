#pragma once

#include <cstdint>
#include <optional>

class MotionTracker {
  public:
    void update(bool pin_high, uint32_t current_time_ms);
    bool is_active() const;
    std::optional<uint32_t> get_seconds_since_last_motion(uint32_t current_time_ms) const;

  private:
    bool is_active_ = false;
    std::optional<uint32_t> last_seen_ms_;
};
