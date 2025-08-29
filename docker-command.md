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

// add connector to gcp pg
{
	"name": "postgres-connector",
	"config": {
		"connector.class": "io.debezium.connector.postgresql.PostgresConnector",
		"database.hostname": "GCP PG HOST",
		"database.port": "5432",
		"database.user": "GCP PG USERNAME",
		"database.password": "GCP PG  PSW",
		"database.dbname": "DB NAME",
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

// when hit post expected to receive below error

{
	"error_code": 400,
	"message": "Connector configuration is invalid and contains the following 1 error(s):\nError while validating connector config: Postgres server wal_level property must be 'logical' but is: 'replica'\nYou can also find the above list of errors at the endpoint `/connector-plugins/{connectorType}/config/validate`"
}



// connector status : GET
http://localhost:8083/connectors/postgres-connector/status