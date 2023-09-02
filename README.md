Vercel link: https://dashing-task.vercel.app/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Project Notes

App opens to login component, you can login with any valid password to view the table component.
Default role is "viewer". You can login to "editor" more by using the password "P@ssw0rd123".

Table is populated with dummy API data being fetched from the website "https://dummyjson.com/".
Adding/Deleting/Editing a new product will not persist on their server.
It will simulate a POST/DELETE/PUT request and will return the new updated product object.
In this case I'm injecting it into the state. Refreshing the page will refetch the original data.

- Please note deleting an object you added yourself will result in an error.
-
