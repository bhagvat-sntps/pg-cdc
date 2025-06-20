// docker commands
docker-compose down -v
docker-compose up --build

// db connection
docker exec -it $(docker ps --filter "ancestor=postgres:15-alpine" --format "{{.ID}}") psql -U postgres -d testdb


// list connectors : GET
http://localhost:8083/connectors

// create connetor : POST
{
	"name": "postgres-connector",
	"config": {
		"connector.class": "io.debezium.connector.postgresql.PostgresConnector",
		"database.hostname": "postgres",
		"database.port": "5432",
		"database.user": "postgres",
		"database.password": "postgres",
		"database.dbname": "testdb",
		"database.server.name": "testdb-server",
		"plugin.name": "pgoutput",
		"slot.name": "debezium_slot_2",
		"publication.name": "debezium_pub_3",
		"table.include.list": "public.users",
		"tombstones.on.delete": "false",
		"key.converter.schemas.enable": "false",
		"value.converter.schemas.enable": "false",
		"topic.prefix": "testdb-server",
		"snapshot.mode": "always"
	}
}

// connector status : GET
http://localhost:8083/connectors/postgres-connector/status