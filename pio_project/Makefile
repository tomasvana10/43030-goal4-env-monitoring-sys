.PHONY: build up upq monitor devices clean cleanall prune

build:
	pio run

up:
	pio run -t upload -t monitor

upq:
	pio run -t upload

monitor:
	pio device monitor

devices:
	pio device list

clean:
	pio run -t clean

cleanall:
	pio run -t cleanall

prune:
	pio system prune -f
