#!/usr/bin/env bash
set -euo pipefail

domain="${1:?Usage: scripts/issue-cert.sh <domain>}"
certs="$(cd "$(dirname "$0")/.." && pwd)/certs"
mkdir -p "$certs/letsencrypt"

docker run --rm -it \
    --user "$(id -u):$(id -g)" \
    -v "$certs/letsencrypt:/le" \
    certbot/certbot certonly \
    --manual --preferred-challenges dns \
    --config-dir /le/config --work-dir /le/work --logs-dir /le/logs \
    -d "$domain"

cp -L "$certs/letsencrypt/config/live/$domain/fullchain.pem" "$certs/fullchain.pem"
cp -L "$certs/letsencrypt/config/live/$domain/privkey.pem" "$certs/privkey.pem"
