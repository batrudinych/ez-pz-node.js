## Extremely simple example of a web application in pure Node.js / Javascript

### STEP 1

Here we have a simple index.html. It could be opened in every modern browser. Simplest TODO list application is implemented here in pure Javascript.
I could have done something non-elegant. It may have some performance or other flaws. I don't really care because it is not the purpose of this. Just check the way it is done and make sure you understand what is going on.

On the very first step we have a static HTML page, which is a simple file in our filesystem. It contains Javascript code, which inflates page with logic.
The goal is simple: show todos that have been added so far and remove unwanted ones
