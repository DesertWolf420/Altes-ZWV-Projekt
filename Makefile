


deploy:
	dbic-migration --dsn "dbi:SQLite:data/zwv.db" -S "ZWV::Project::Schema" -Ilib/ install
	dbic-migration --dsn "dbi:SQLite:data/zwv.db" -S "ZWV::Project::Schema" -Ilib/ populate

