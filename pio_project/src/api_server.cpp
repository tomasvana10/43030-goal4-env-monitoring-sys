#include "api_server.h"

#include <cstring>
#include <esp_https_server.h>
#include <mutex>

extern const uint8_t FULLCHAIN_PEM[] asm("_binary_certs_fullchain_pem_start");
extern const uint8_t PRIVKEY_PEM[] asm("_binary_certs_privkey_pem_start");

namespace api_server {
namespace {
httpd_handle_t server = nullptr;
std::mutex latest_mutex;
Readings latest;

size_t measure_pem(const uint8_t* pem) {
    return std::strlen(reinterpret_cast<const char*>(pem)) + 1;
}

Readings copy_latest() {
    const std::lock_guard<std::mutex> lock(latest_mutex);
    return latest;
}

esp_err_t handle_readings(httpd_req_t* req) {
    const std::string body = serialise_readings(copy_latest());
    httpd_resp_set_type(req, "application/json");
    httpd_resp_set_hdr(req, "Cache-Control", "no-store");
    httpd_resp_set_hdr(req, "Access-Control-Allow-Origin", "*");
    return httpd_resp_send(req, body.c_str(), static_cast<ssize_t>(body.size()));
}
} // namespace

esp_err_t begin() {
    httpd_ssl_config_t config = HTTPD_SSL_CONFIG_DEFAULT();

    config.cacert_pem = FULLCHAIN_PEM;
    config.cacert_len = measure_pem(FULLCHAIN_PEM);
    config.prvtkey_pem = PRIVKEY_PEM;
    config.prvtkey_len = measure_pem(PRIVKEY_PEM);

    const esp_err_t err = httpd_ssl_start(&server, &config);
    if (err != ESP_OK) {
        return err;
    }
    const httpd_uri_t readings = {
        .uri = "/api/readings",
        .method = HTTP_GET,
        .handler = handle_readings,
    };
    return httpd_register_uri_handler(server, &readings);
}

void publish(const Readings& readings) {
    const std::lock_guard<std::mutex> lock(latest_mutex);
    latest = readings;
}
} // namespace api_server
