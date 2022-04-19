dev:
	docker-compose up -d --build

prod:
	docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build

down:
	docker-compose down
