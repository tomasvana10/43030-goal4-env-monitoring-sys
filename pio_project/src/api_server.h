#pragma once

#include <esp_err.h>

#include "readings.h"

namespace api_server {
esp_err_t begin();
void publish(const Readings& readings);
} // namespace api_server
