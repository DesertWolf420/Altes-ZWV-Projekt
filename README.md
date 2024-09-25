# ZWV Project

## Deployment

### Install required packages

#### openSUSE Tumbleweed

```
zypper ar obs://home:M0ses:perl/openSUSE_Tumbleweed hMp
zypper ref -s
zypper in perl-Mojo-Plugin-DBIC
```

#### Ubuntu

```
# sudo apt install lib
```

### Create and populate database

`dbic-migration --dsn "dbi:SQLite:data/zwv.db" -S "ZWV::Project::Schema" -Ilib/ install`

`dbic-migration --dsn "dbi:SQLite:data/zwv.db" -S "ZWV::Project::Schema" -Ilib/ populate`

### RESTful API

#### Routes

##### /rest/flights/copy

If you skip the element `ids` or provide an empty Array, 
all lines will be copied to the history.

If you provide an Array including id's, only the lines from 'flights'
table with the matching id's will be copied.

**Example:**

```
curl -X POST -d '{"ids":[]}' http://127.0.0.1:3000/rest/flights/copy
```

**TODO:** Implement filter by id's

##### /rest/history/list

**Example:**

```
# Get all entries in history for today
curl -X POST -d '{"filter":"today"}' http://127.0.0.1:3000/rest/history/list

# Get entry with 'id' 1 from history
curl -X POST -d '{"filter":{"id":"1"}}' http://127.0.0.1:3000/rest/history/list
```


##### /rest/history/:id

**Example:**

```
# update history row with id 1 and set state to 2
curl -X PUT -d '{"state":2}' http://127.0.0.1:3000/rest/history/1
```


### Database commands

**Examples:**

```
# List all flights (Template)
sqlite3 data/zwv.db 'select * from flights'

# List history (All rows)
sqlite3 data/zwv.db 'select * from history'
```
