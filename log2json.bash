#!/usr/bin/env bash

#
# Translates data from ../access-50k.log to ./data/log.json
# Json file can be validated via https://jsonlint.com/
#


sed -En 's/([0-9]{1,3}(\.[0-9]{1,3}){3}).+\[([0-9]{1,2})\/([a-z]{3})\/[0-9]{4}:([0-9]{2}(:[0-9]{2}){2}).+(http[s]?:\/\/[a-z.0-9-]+).+/\1\,\3\,\4\,\5\,\7/pI' ../access-50k.log > ./helper.csv

mkdir -p ./data/ && awk -f helper.awk helper.csv > ./data/log.json

rm ./helper.csv

if [[ -a "./data/log.json" ]]; then
    printf "'./data/log.json' file created!\\n"
fi
