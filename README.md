## Extremely simple example of a web application in pure Node.js / Javascript

### STEP 4

Ok, time to store the data somewhere. Not sure if you noticed, but everytime you reach localhost:3000, there are no any data you've input previously. Not good at all. Using databases is out of the scope, lets just create a vanilla array. This way we won't lose data until server restart.

But in order to store data, we need to send it to the server somehow. So both server/client scripts should be updated correspondingly.

Please keep in mind that goal of this repo is to show example of client-server communication. It may not follow best practices.

As a task I'd suggest doing the next:
* Refactor script.js. It has at least string constants, which could be reused. You can also use async/await here. Not much but still
* Refactor server.js. Gathering data from response object can be reused for sure. Check other places that could be reused / should be refactored
* You should have noticed that you are able to create todos with the same name. Check what is happening on removal. Implement more complex structure with Ids (or so)
* Add a delay to server responses and try to indicate waiting for response process. You can switch button color / text / make it disabled / etc. It doesn't matter, just find a correct place to add the logic. In order to do that, you can use setTimeout or rewrite it with promises and apply async/await. Your choise
* Check what happens if server fails on some operations. Check what happens if server responds with non-200 code (see response.writeHead method, for example). Add error handlers for both client / server
* Add a way to notify users of failed requests
* Add an ability to mark your todos as complete along with removal. Text of completed todo should be crossed