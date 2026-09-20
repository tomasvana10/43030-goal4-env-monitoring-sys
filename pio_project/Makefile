.PHONY: build up upq monitor devices test cert cert-expiry clean cleanall prune

build: include/secrets.h certs/fullchain.pem
	pio run

up: include/secrets.h certs/fullchain.pem
	pio run -t upload -t monitor

upq: include/secrets.h certs/fullchain.pem
	pio run -t upload

monitor:
	pio device monitor

devices:
	pio device list

test:
	pio test -e native

cert:
	scripts/issue-cert.sh $(DOMAIN)

cert-expiry:
	openssl x509 -in certs/fullchain.pem -noout -subject -enddate

include/secrets.h:
	cp include/secrets.example.h $@

certs/fullchain.pem:
	mkdir -p certs
	openssl req -x509 -newkey ec -pkeyopt ec_paramgen_curve:P-256 -nodes \
		-keyout certs/privkey.pem -out $@ -subj /CN=placeholder -days 365

clean:
	pio run -t clean

cleanall:
	pio run -t cleanall

prune:
	pio system prune -f
