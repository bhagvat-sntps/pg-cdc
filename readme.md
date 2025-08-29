## How to run

this will build required images
    
    - kafka
    - postgres
    - zookeeper
    - debezium connector

Hit below to cmd to run containers for above images , 

`$ docker-compose up --build`

In case you are using local postgres , then use below one

`$ docker compose --profile local-db up -d`

-----

## Add connector configs

then add connector configuaration with below POST call from postman

Http Type : POST

`url : http://localhost:8083/connectors`

``` json : body
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

```

## Running kafka UI

kafka UI exposed on `http://localhost   :8080/`

## Run message listner

Added node js script which listen to topic and add in logs , run with

`node index.js`


## what problem may occur in setup
- if message not arriving on topic try to run sql cmds from init.sql manually
- delete the coonctor config reload and then create new one


## Refrences
- https://www.postgresql.org/docs/9.4/logicaldecoding-explanation.html
- https://debezium.io/documentation/reference/3.1/connectors/postgresql.html#postgresql-in-the-cloud
- https://www.youtube.com/watch?v=YNfQon8sC9w&t=39s


## notes
- enable wal_type 
- create use which have assign REPLICATION enabled

`sql

SELECT rolname, rolsuper, rolreplication
FROM pg_roles
WHERE rolname = current_user;

-- if not assign 
ALTER ROLE USERNAME WITH REPLICATION;

`