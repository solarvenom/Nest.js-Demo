## Summary
I've chose NestJS for this challange as a framework, PSQL with Nest's Typeorm support and swagger for documentation and endpoint demonstration.

NestJS just has a nice set of inbuilt tools available right of the box, like `dotenv`, `typeorm`, `swagger` and I enjoy project's modularity, and the general project structure it forces upon you.

I chose PSQL first of all because I know you are using it, but it would be a good choice your this type project regardless.

Also Swagger/OpenAPI specifications are available at `${host}:${port}/api` for your convenience. 
  

## Endpoints

`/sync` - populates PSQL with the song dataset present in the link from the `.env` file. Normally, I would prefer not to depend on an online source for data in an operation that is essentially a data migration, but since we're working with a google sheet, I thought some interactivity could be nice!

`/search` - an endpoint that is supposed to emulated an endpoint for a searchfield that returns any and all matching entities with a entity type `album | artist | writer | song` to be easily picked up and displayed by the FE.

`/albums` - a sortable list of albums.

`/albums/{uuid}` - detailed information regarding the album and it's contents, including songs, artists and authors.

`/artists` - an endpoint that returns a list of artists with nothings else. It's more of an afterthought.

`/artists/rankings` - returns a sortable list or artists and their stats over June, July, August and overall.

`/writers` - returns a sortable list of authors, with their song/album involvement stats.

`/songs` - returns a paginated list of songs, since this is the most represented entity.

## Installation

  

```bash

$  npm  install

```

  

## Running the app
You are welcome to edit `.end` in the root of the project to assign whatever ports are available on your machine for app's docker containers. 
```bash
$  docker-compose up -d
```
After you verify both app and db containers are running, you are welcome to visit `${host}:${port}/api` to play around with the endpoints with swagger.

Next, you'll need to populate the DB with the song dataset present in the google sheet provided in the challenge document.
This can be done buy sending a `Get` request to the `${host}:${port}/sync` endpoint directly from swagger.

After this you are free to play with the api however you like.  

## Test

  

```bash
$  npm  run  test
```

 
## Conclusion
The challange doc mentioned that one could add closing thoughts regarding the further improvement of this project.

I have never dealt with a large-scale rating system that counts song plays, but my first instinct would be to consider something like `Redis` to work with the dynamic metric tracking. Either by tracking the song stats entirely with Redis and persistently backing up the stats with a replica, or if storing the song stats is a hard requirement - write the stats from Redis into PSQL every now and then.

Also, probably all of the endpoints should be paginated.

If we are going really large scale, perhaps consider DB sharding, but I'm not super-sure about that, depending of how the actual operations with DB entities would look like and how user activity would affect the DB data beyond just tracking the number of song plays.

Cheers!

  