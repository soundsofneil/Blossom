# blossom

## Phase 1

1. Install node_modules: `npm install` in the base folder.
2. Start the react server: `npm start` in the base folder.
3. Click Sign in or Sign up.
4. Either Sign in with username+password: `user`, or username+password: `admin`, or Sign up by clicking `No account? Sign Up.`.
    1. If signing up, enter new username, name, and password.
    2. Enter programs of interest.
    3. Enter regions of interest.
    4. Enter grades.
    5. Click complete profile.
5. Scroll through the available schools, click one's image to see its details.
    1. Click through the links to navigate to a school's available links.
6. To edit the user profile, click on `Preferences` in the middle of the banner.
7. If on the `admin` account, to open the admin profile, click `Admin Profile` in the top right, under `Sign Out`.
8. To sign out, click `Sign Out` in the top right.

## Phase 2

The application operates similar to as it did in phase 1.
### User
 - Log in with one of the existing users below, or sign up.
 - After logging in or signing up, schools will be listed based on a user's profile.
 - Users can add schools to their list, or learn more by clicking on certain schools.
 - Users can update their information by clicking 'Preferences'.

### Admin
 - Admin users can only modify other users, by opening the 'Admin Panel'.
 - Admins can type in a user's username, then they can change their username, name, and password.

### Existing Test Users
format=username:password
 - admin:admin
 - user:user

### Express Routes