#pragma once

#include <DHTesp.h>

#include "motion_tracker.h"
#include "readings.h"

class Sensors {
  public:
    void begin();
    Readings read(uint32_t current_time_ms);

  private:
    DHTesp dht_;
    MotionTracker motion_;
};
