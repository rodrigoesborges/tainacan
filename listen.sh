#!/bin/sh
dir1=src/
while inotifywait -qqre modify "$dir1"; do
    sh build.sh
done
