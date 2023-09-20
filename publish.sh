#!/bin/sh

npm run build

scp -r dist/* jogt@it2810-13.idi.ntnu.no:/var/www/html/project1/