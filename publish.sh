#!/bin/sh

npm run build

GIT_USERNAME=$(git config user.name)
# if username is empty ask for it
if [ -z "$GIT_USERNAME" ]
then
    echo "Enter your git username:"
    read GIT_USERNAME
fi

# Using the git username in the scp command
scp -r dist/* "${GIT_USERNAME}@it2810-13.idi.ntnu.no:/var/www/html/project1/"
